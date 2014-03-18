controller = Ember.ObjectController.extend
  currentPathChanged: (->
    window.scrollTo(0, 0)
  ).observes 'currentPath'

`export default controller`
