export default Ember.Controller.extend({
  showNavigation: false,
  currentPathChanged: Ember.observer('currentPath', function() {
    window.scrollTo(0, 0);
    return this.set('showNavigation', false);
  })
});
