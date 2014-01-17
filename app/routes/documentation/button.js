export default Ember.Route.extend({
  actions: {
    switchToLoading: function(controller) {
      this.get("controller").set('isLoading', true);
    },

    switchToDisabled: function(controller) {
      this.get("controller").set('isDisabled', true);
    },

    showAlert: function() {
      alert("Showing Alert");
    }
  }
});
