/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var app = new EmberApp({
  outputPaths: {
    app: {
      css: {
        'website': '/assets/website.css',
        'emberui': '/assets/emberui/emberui.css',
        'default-theme': '/assets/emberui/default-theme.css'
      }
    }
  }
});

app.import('bower_components/moment/moment.js');
app.import('bower_components/twix/bin/twix.js');
app.import('vendor/dithered_radial_gradient.js');

prefixCSS: {
  options: {
    browsers: ['last 2 versions']
  }
};


module.exports = app.toTree();
