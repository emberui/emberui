controller = Ember.ObjectController.extend
  # Shows or hides navigation for mobile site
  showNavigation: false

  currentPathChanged: (->
    window.scrollTo(0, 0)
    @set 'showNavigation', false
  ).observes 'currentPath'

`export default controller`
