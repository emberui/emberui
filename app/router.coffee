Router = Ember.Router.extend() # ensure we don't share routes between all Router instances

Router.reopen
  location: 'history'

Router.map ->
  this.resource "documentation", ->
    this.route 'layout'
    this.route 'theming'
    this.route 'errorhandling'

    this.route 'button'
    this.route 'checkbox'
    this.route 'dropbutton'
    this.route 'input'
    this.route 'modal'
    this.route 'select'
    this.route 'textarea'

    this.route 'popup'

  this.route '404', { path: '*path' } # Catch all for all remaining routes

`export default Router`
