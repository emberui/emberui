/* jshint node: true */
'use strict';

var fs         = require('fs');
var path       = require('path');

function unwatchedTree(dir) {
  return {
    read: function() { return dir; },
    cleanup: function() { }
  };
}

function initializeOptions(options) {
  var defaultOptions = {
    defaultTheme: true
  };

  for (var option in defaultOptions) {
    if (!options.hasOwnProperty(option)) {
      options[option] = defaultOptions[option];
    }
  }
}

module.exports = {
  name: 'EmberUi',

  treeFor: function(name) {
    console.log(name);
    var treePath = path.join('node_modules', 'emberui',  name + '-addon');

    if (fs.existsSync(treePath)) {
      return unwatchedTree(treePath);
    }
  },

  included: function(app) {
    var options = app.options.emberui || {};
    initializeOptions(options);

    app.import(app.bowerDirectory + '/velocity/velocity.min.js');
    app.import(app.bowerDirectory + '/twix/bin/twix.js');
    app.import(app.bowerDirectory + '/moment/moment.js');
    app.import(app.bowerDirectory + '/ember-list-view/index.js');
    app.import(app.bowerDirectory + '/emberui/dist/named-amd/emberui.js', {
      exports: {
        'emberui': ['default']
      }
    });

    app.import(app.bowerDirectory + '/emberui/dist/emberui.css');

    if (options.defaultTheme) {
      app.import(app.bowerDirectory + '/emberui/dist/default-theme.css');
    }
  },

  config: function() {
    // prevent `config/environment.js` from being used
  }
};
