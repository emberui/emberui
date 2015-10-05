route = Ember.Route.extend
  actions:
    dateDidChange: (date) ->
      alert('Date selection changed to: ' + date.toISOString());

`export default route`
