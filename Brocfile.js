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

  var components = broccoli.makeTree('lib')
  components = pickFiles(components, {
    srcDir: '/components',
    destDir: 'build' // move under appkit namespace
  })
  components = preprocess(components)

  var mixins = broccoli.makeTree('lib')
  mixins = pickFiles(mixins, {
    srcDir: '/mixins',
    destDir: 'build' // move under appkit namespace
  })
  mixins = preprocess(mixins)

  var default_theme_styles = broccoli.makeTree('lib/styles')
  default_theme_styles = pickFiles(styles, {
    srcDir: '/default-theme',
    destDir: 'build'
  })
  default_theme_styles = preprocess(default_theme_styles)

  var styles = broccoli.makeTree('lib/styles')
  styles = pickFiles(styles, {
    srcDir: '/emberui',
    destDir: 'build'
  })
  styles = preprocess(styles)

  var templates = broccoli.makeTree('lib')
  templates = pickFiles(templates, {
    srcDir: '/templates',
    destDir: 'build'
  })
  templates = preprocess(templates)

  var sourceTrees = [components,
                     mixins,
                     default_theme_styles,
                     styles,
                     templates]


  sourceTrees = sourceTrees.concat(broccoli.bowerTrees())

  var appAndDependencies = new broccoli.MergedTree(sourceTrees)

  var appJs = compileES6(appAndDependencies, {
    ignoredModules: [
    ],
    inputFiles: [
    ],
    legacyFilesToAppend: [
    ],
    wrapInEval: env !== 'production',
    outputFile: '/assets/emberui.js'
  })

  var appCss = compileSass(sourceTrees)

  var publicFiles = broccoli.makeTree('public')

  return [appJs, appCss, publicFiles]
}
