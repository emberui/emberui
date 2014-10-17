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
    app.import(app.bowerDirectory + '/velocity/velocity.min.js');
    app.import(app.bowerDirectory + '/twix/bin/twix.js');
    app.import(app.bowerDirectory + '/moment/moment.js');
    app.import(app.bowerDirectory + '/ember-list-view/list-view.prod.js');
  },

  config: function() {
    // prevent `config/environment.js` from being used
  }
};
