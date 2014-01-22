export default Ember.Route.extend({
  actions: {
    save: function() {
      alert("Saving...");
    },

    delete: function() {
      alert("Deleting...");
    },

    edit: function() {
      alert("Editing...");
    }
  }
});
