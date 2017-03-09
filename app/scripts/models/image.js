var Backbone = require('backbone');

var Image = Backbone.Model.extend({

});

var ImageCollection = Backbone.Collection.extend({
  model: Image
});

module.exports = {
  Image,
  ImageCollection
};
