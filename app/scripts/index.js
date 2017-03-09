var React = require('react');
var ReactDOM = require('react-dom');

var ImageBoardContainer = require('./components/image_board.jsx').ImageBoardContainer;

ReactDOM.render(
  React.createElement(ImageBoardContainer),
  document.getElementById('app')
);
