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

  var library = broccoli.makeTree('lib')

  var components = pickFiles(library, {
    srcDir: '/components',
    destDir: 'build/components'
  })
  components = preprocess(components)

  var mixins = pickFiles(library, {
    srcDir: '/mixins',
    destDir: 'build/mixins'
  })
  mixins = preprocess(mixins)

  var templates = pickFiles(library, {
    srcDir: '/templates',
    destDir: 'build/templates'
  })
  templates = preprocess(templates)

  var defaultThemeStyles = pickFiles(library, {
    srcDir: '/styles/default-theme',
    destDir: 'build/styles/default-theme'
  })
  defaultThemeStyles = preprocess(defaultThemeStyles)

  var requiredStyles = pickFiles(library, {
    srcDir: '/styles/emberui',
    destDir: 'build/styles/emberui'
  })
  requiredStyles = preprocess(requiredStyles)

  var vendor = broccoli.makeTree('vendor')

  var sourceTrees = [components, mixins, templates, defaultThemeStyles, requiredStyles, vendor]

  sourceTrees = sourceTrees.concat(broccoli.bowerTrees())

  var emberui = new broccoli.MergedTree(sourceTrees)

  var appJs = compileES6(emberui, {
    loaderFile: 'loader.js',
    ignoredModules: [
      'ember/resolver'
    ],
    inputFiles: [
      'build/**/*.js'
    ],
    wrapInEval: env !== 'production',
    outputFile: '/emberui.js'
  })

  // Remove until we get compass working
  // var requiredCss = compileSass(sourceTrees, 'build/emberui.scss', 'build/emberui.css')
  // var themeCss = compileSass(sourceTrees, 'build/theme.scss', 'build/default-theme.css')

  var publicFiles = broccoli.makeTree('public')

  return [appJs, publicFiles]
}
