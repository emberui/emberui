route = Ember.Route.extend
  actions:
    showDemo: ->
      @get('controller').set('isDemoActive', true)

`export default route`
