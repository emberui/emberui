import Ember from 'ember';

export default Ember.Controller.extend({
  isLoading: false,
  isDisabled: false,

  actions: {
    switchToLoading(controller) {
      this.set('isLoading', true);
    },

    switchToDisabled(controller) {
      this.set('isDisabled', true);
    },

    showAlert() {
      alert("Showing Alert");
    }
  }
});
