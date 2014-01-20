export default Ember.ObjectController.extend({
  email: 'john@example',

  validateEmail: function() {
    var emailpat = /^[^@]+@[^@]+\.[^@\.]{2,}$/;
    var email = this.get('email');

    if (email.match(emailpat)) {
      return false;
    } else {
      return 'We need a valid email address';
    }
  }.property('email')
});
