route = Ember.Route.extend
  actions:
    dateDidChange: (date) ->
      alert('Date selected was ' + date.toISOString() + ' but we will ignore it.');

`export default route`
