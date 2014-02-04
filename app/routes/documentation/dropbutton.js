export default Ember.Route.extend({
  actions: {
    save: function() {
      alert("Saving... ");
    },

    delete: function() {
      alert("Deleting... ");
    },

    edit: function() {
      alert("Editing... ");
    },

    saveItem: function(context) {
      alert("Saving... " + context.item);
    },

    deleteItem: function(context) {
      alert("Deleting... " + context.item);
    },

    editItem: function(context) {
      alert("Editing... " + context.item);
    }
  }
});
