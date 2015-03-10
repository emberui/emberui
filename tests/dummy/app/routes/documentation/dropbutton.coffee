route = Ember.Route.extend
  actions:
    save: ->
      alert("Saving... ")

    delete: ->
      alert("Deleting... ")

    edit: ->
      alert("Editing... ")

    saveItem: (context) ->
      alert("Saving... " + context.item)

    deleteItem: (context) ->
      alert("Deleting... " + context.item)

    editItem: (context) ->
      alert("Editing... " + context.item)

`export default route`
