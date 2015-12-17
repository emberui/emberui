import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    viewDocumenation() {
      this.transitionToRoute('documentation');
    },

    viewGithub() {
      window.location.href = 'http://github.com/emberui/emberui';
    }
  }
});
