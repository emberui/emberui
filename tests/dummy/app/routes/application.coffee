route = Ember.Route.extend
  actions:
    toggleNavigation: ->
      @toggleProperty 'controller.showNavigation'

`export default route`
