var Backbone = require('backbone');

var Image = Backbone.Model.extend({
  idAttribute: '_id',
  urlRoot: 'https://tiny-lasagna-server.herokuapp.com/collections/patricksimages'
});

var ImageCollection = Backbone.Collection.extend({
  model: Image,
  url: 'https://tiny-lasagna-server.herokuapp.com/collections/patricksimages'
});


module.exports = {
  Image,
  ImageCollection
};
