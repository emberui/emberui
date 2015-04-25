route = Ember.Route.extend
  actions:
    generateOptions: ->
      newOptions = []

      for num in [5000..1]
        newOptions.push(Ember.Object.create({name: num, value: num}))

      @set('controller.bigOptionList', newOptions)

`export default route`
