module.exports = function(broccoli) {
  var filterCoffeeScript  = require('broccoli-coffee')
  var filterTemplates     = require('broccoli-template');
  var vndFilterES6Modules = require('broccoli-dist-es6-module');
  var compileSass         = require('broccoli-sass');
  var lib                 = broccoli.makeTree('lib');
  var styles              = broccoli.makeTree('scss/emberui');
  var defaultTheme        = broccoli.makeTree('scss/default-theme');

  function filterES6Modules(tree, opts) {
    return new broccoli.MergedTree(vndFilterES6Modules(tree, opts));
  }

  // Need to figure out compass before we can compile scss
  // styles = compileSass([scss], 'emberui.scss', 'emberui.css');
  // defaultTheme = compileSass([scss], 'theme.scss', 'default-theme.css');

  lib = filterTemplates(lib, {
    extensions: ['hbs'],
    compileFunction: 'Ember.Handlebars.compile'
  });

  lib = filterCoffeeScript(lib, {
    bare: true
  })

  lib = filterES6Modules(lib, {
    global:      'Ember.EmberUi',
    packageName: 'emberui',
    main:        'main',

    shim: {
      ember:      'Ember',
      handlebars: 'Handlebars'
    }
  });

  return [lib];
};
