`import Ember from 'ember'`
`import config from './config/environment'`

Router = Ember.Router.extend
  location: config.locationType

Router.map ->
  this.resource "documentation", ->
    this.route 'animations'
    this.route 'layout'
    this.route 'theming'
    this.route 'errorhandling'

    this.route 'button'
    this.route 'calendar'
    this.route 'checkbox'
    this.route 'dropbutton'
    this.route 'input'
    this.route 'select'
    this.route 'selectdate'
    this.route 'textarea'

  this.route '404', { path: '*path' } # Catch all for all remaining routes

`export default Router`
