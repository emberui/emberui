button = Ember.Route.extend
  actions:
    switchToLoading: (controller) ->
      @get("controller").set('isLoading', true)

    switchToDisabled: (controller) ->
      @get("controller").set('isDisabled', true)

    showAlert: ->
      alert("Showing Alert");

`export default button`
