var React = require('react');
var Backbone = require('backbone');

var ImageCollection = require('../models/image').ImageCollection;
var Image = require('../models/image').Image;

var ImageBoardContainer = React.createClass({
  getInitialState: function(){
    var imageCollection = new ImageCollection();

    return {
      imageCollection: imageCollection,
      showForm: false,
      imageToEdit: new Image()
    }
  },
  componentWillMount: function(){
    var newImageCollection = this.state.imageCollection;
    newImageCollection.fetch().then(()=>{
      this.setState({ imageCollection: newImageCollection });
    });
  },
  handleToggleForm: function(event){
    event.preventDefault();
    this.setState({showForm: !this.state.showForm});
  },
  addImage: function(image){
    console.log('image', image);
    // adds image to server
    var image = new Image(image);
    image.save();

    // updates state with new image
    var images = this.state.imageCollection;
    images.add(image);
    this.setState({imageCollection: images, showForm: false});
  },
  editImage: function(model, imageData){
    model.set(imageData);
    model.save();
    this.setState({ imageCollection: this.state.imageCollection });
  },
  showEditForm: function(imageToEdit){
    this.setState({showForm: true, imageToEdit: imageToEdit});
  },
  deleteImage: function(e, image) {
    e.preventDefault();
    console.log('image', image);
    // removes image from server
    image.destroy();

    // update state
    var collection = this.state.imageCollection;
    collection.remove(image);
    this.setState({ imageCollection: collection })

  },
  render: function(){
    return (
      <div className="container">
        <div className="row">
          <div className="well">
        <ul className="nav nav-pills">
          <li role="presentation" className="active">
            <a onClick={this.handleToggleForm} href="#">Click To Add An Image</a>
          </li>
        </ul>
        {this.state.showForm ? <ImageForm
          imageToEdit={this.state.imageToEdit}
          addImage={this.addImage}
          editImage={this.editImage}
          /> : null}
        <ImageList
          imageCollection={this.state.imageCollection}
          showEditForm={this.showEditForm}
          deleteImage={this.deleteImage}
        />
        </div>
      </div>
    </div>
    )
  }
});

var ImageForm = React.createClass({
  propTypes: {
    addImage: React.PropTypes.func.isRequired
  },
  getInitialState: function(){
    return this.props.imageToEdit.toJSON();
  },
  componentWillReceiveProps: function(nextProps){
    this.setState(nextProps.imageToEdit.toJSON());
  },
  handleUrlChange: function(event){
    this.setState({'url': event.target.value});
  },
  handletitleChange: function(event){
    this.setState({'title': event.target.value});
  },
  handleSubmit: function(event){
    event.preventDefault();
    if(this.props.imageToEdit.isNew()){
      this.props.addImage(this.state);
    }else{
      this.props.editImage(this.props.imageToEdit, this.state);
    }

    this.setState({url: '', title: ''});
  },
  render: function(){
    return (
      <form onSubmit={this.handleSubmit} className="well">
        <div className="form-group">
          <label htmlFor="urllink"> Input URL Below </label>
          <input onChange={this.handleUrlChange} value={this.state.url} type="text" className="form-control" id="url" placeholder="https://..." />
        </div>
        <div className="form-group">
          <label htmlFor="title">Name your picture </label>
          <input onChange={this.handletitleChange} value={this.state.title} type="text" className="form-control" id="title" placeholder="Image Caption" />
        </div>
        <button type="submit" className="btn btn-info"> Upload Image</button>
      </form>
    )
  }
});

var ImageList = React.createClass({
  propTypes: {
    imageCollection: React.PropTypes.instanceOf(Backbone.Collection).isRequired,
    showEditForm: React.PropTypes.func.isRequired
  },
  render: function(){
    var self = this;
    var imageBoardListItem = this.props.imageCollection.map(function(image){
      return (
        <div key={image.cid} className="thumbnail">
          <img src={image.get('url')} alt={image.get('title')} />
          <div className="caption">
            {/*<h3>Thumbnail label</h3>*/}
            <p>{image.get('title')}</p>
            <p>
              <a onClick={(e) =>
                  {e.preventDefault();
                    self.props.showEditForm(image);
                  }}
                href="#"
                className="btn btn-warning"
                role="button"
                >
                Edit ImageList
              </a>
              <a onClick={(e) => {
                  self.props.deleteImage(e, image);
                }} href="#" className="btn btn-danger" role="button">Delete</a>
            </p>
          </div>
        </div>
      )
    });

    return (
      <div className="row">
        <div className="col-sm-6 col-md-4">
          {imageBoardListItem}
        </div>
      </div>
    )
  }
});

module.exports = {
  ImageBoardContainer
};
