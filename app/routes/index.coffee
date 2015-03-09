route = Ember.Route.extend
  # Reset the demo state
  deactivate: () ->
    controller = @get 'controller'
    controller.setProperties { isDemoActive: false }

  actions:
    showDemo: ->
      @get('controller').set('isDemoActive', true)

    toggleNavigation: ->
      @toggleProperty 'controller.showNavigation'

`export default route`
