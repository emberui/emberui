module.exports = function (broccoli) {
  var filterCoffeeScript = require('broccoli-coffee')
  var filterTemplates = require('broccoli-template')
  var compileES6 = require('broccoli-es6-concatenator')
  var compileSass = require('broccoli-sass')
  var pickFiles = require('broccoli-static-compiler')
  var env = require('broccoli-env').getEnv()

  function preprocess (tree) {
    tree = filterTemplates(tree, {
      extensions: ['hbs', 'handlebars'],
      compileFunction: 'Ember.Handlebars.compile'
    })
    tree = filterCoffeeScript(tree, {
      bare: true
    })
    return tree
  }

  var app = broccoli.makeTree('app')
  app = pickFiles(app, {
    srcDir: '/',
    destDir: 'appkit' // move under appkit namespace
  })
  app = preprocess(app)

  var styles = broccoli.makeTree('styles')
  styles = pickFiles(styles, {
    srcDir: '/',
    destDir: 'appkit'
  })
  styles = preprocess(styles)

  var tests = broccoli.makeTree('tests')
  tests = pickFiles(tests, {
    srcDir: '/',
    destDir: 'appkit/tests'
  })
  tests = preprocess(tests)

  var vendor = broccoli.makeTree('vendor')

  var sourceTrees = [app, styles, vendor]
  if (env !== 'production') {
    sourceTrees.push(tests)
  }
  sourceTrees = sourceTrees.concat(broccoli.bowerTrees())

  var appAndDependencies = new broccoli.MergedTree(sourceTrees)

  var appJs = compileES6(appAndDependencies, {
    loaderFile: 'loader.js',
    ignoredModules: [
      'ember/resolver'
    ],
    inputFiles: [
      'appkit/**/*.js'
    ],
    legacyFilesToAppend: [
      'jquery.js',
      'handlebars.js',
      'ember.js',
      'ember-data.js',
      'ember-resolver.js'
    ],
    wrapInEval: env !== 'production',
    outputFile: '/assets/app.js'
  })

  var appCss = compileSass(sourceTrees, 'appkit/app.scss', 'assets/app.css')

  if (env === 'production') {
    appJs = uglifyJavaScript(appJs, {
      // mangle: false,
      // compress: false
    })
  }

  var publicFiles = broccoli.makeTree('public')

  return [appJs, appCss, publicFiles]
}
