route = Ember.Route.extend
  actions:
    generateOptions: ->
      options = @get('controller.bigOptionList')

      for num in [5..1]
        options.push(Ember.Object.create({name: num, value: num}))

      return

`export default route`
