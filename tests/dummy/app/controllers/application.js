export default Ember.Controller.extend({
  showNavigation: false,

  currentPathChanged: Ember.observer('currentPath', function() {
    window.scrollTo(0, 0);
    this.set('showNavigation', false);
  }),

  actions: {
    toggleNavigation() {
      this.toggleProperty('showNavigation');
    }
  }
});
