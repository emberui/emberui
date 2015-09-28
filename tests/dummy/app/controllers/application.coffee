controller = Ember.Controller.extend
  # Shows or hides navigation for mobile site
  showNavigation: false

  currentPathChanged: Ember.observer 'currentPath', ->
    window.scrollTo(0, 0)
    @set 'showNavigation', false

`export default controller`
