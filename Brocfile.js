/* global require, module */
var EmberAddon = require('ember-cli/lib/broccoli/ember-addon');

var app = new EmberAddon();

app.import('vendor/dithered_radial_gradient.js');

prefixCSS: {
  options: {
    browsers: ['last 2 versions']
  }
};


module.exports = app.toTree();
