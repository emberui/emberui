import Ember from 'ember';

export default Ember.Controller.extend({
  isLoading: false,
  isDisabled: false,

  actions: {
    switchToLoading() {
      this.set('isLoading', true);
    },

    switchToDisabled() {
      this.set('isDisabled', true);
    },

    showAlert() {
      window.alert("Showing Alert");
    }
  }
});
