var pickFiles = require('broccoli-static-compiler');
var filterCoffeeScript  = require('broccoli-coffee');
var filterTemplates     = require('broccoli-template');
var vndFilterES6Modules = require('broccoli-dist-es6-module');
var compileSass         = require('broccoli-sass');
var autoprefixer        = require('broccoli-autoprefixer');
var mergeTrees = require('broccoli-merge-trees');
var templateCompiler = require('broccoli-ember-hbs-template-compiler');
var inlineTemplateCompiler = require('broccoli-ember-inline-template-compiler');
var instrument = require('broccoli-debug').instrument;

var lib                 = 'lib';
var scss                = 'scss';
var fonts               = 'fonts';

function filterES6Modules(tree, opts) {
  return vndFilterES6Modules(tree, opts);
}

var styles = compileSass([scss], 'emberui.scss', 'emberui.css');
styles = autoprefixer(styles);

var defaultTheme = compileSass([scss], 'default-theme.scss', 'default-theme.css');
defaultTheme = autoprefixer(defaultTheme);

var templates = pickFiles(lib, {
  srcDir: '/templates',
  destDir: '/templates'
});

templates = templateCompiler(templates, {
  module: true
});

var fonts = pickFiles(fonts, {
  srcDir: '/',
  destDir: '/fonts'
});

lib = mergeTrees([lib, templates]);

lib = filterCoffeeScript(lib, {
  bare: true
});

lib = inlineTemplateCompiler(lib);

lib = filterES6Modules(lib, {
  global:      'eui',
  packageName: 'emberui',
  main:        'emberui',

  shim: {
    ember:      'Ember',
    handlebars: 'Handlebars'
  }
});

module.exports = mergeTrees([lib, styles, defaultTheme, fonts]);
