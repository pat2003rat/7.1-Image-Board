var React = require('react');

var MainContainer = React.createClass({
  sayHello: function(){
    alert('hello');
  },
  render: function(){
    var label = "Don't click me!";

    return (
      <div>
        <Button name={label} cool={10} sayHello={this.sayHello}  />
      </div>
    );
  }
});

var Button = React.createClass({
  propTypes: {
    name: React.PropTypes.string,
    cool: React.PropTypes.number.isRequired,
    sayHello: React.PropTypes.func.isRequired
  },
  render: function(){
    console.log(this.props.cool);
    return <button onClick={this.props.sayHello}>{this.props.name}</button>;
  }
});

module.exports = {
  MainContainer,
  Button
};
