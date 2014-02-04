export default Ember.ObjectController.extend({
  currentPathChanged: function () {
    window.scrollTo(0, 0);
  }.observes('currentPath')
});
