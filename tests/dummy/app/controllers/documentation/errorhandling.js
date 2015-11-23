export default Ember.Controller.extend({
  email: 'john@example',

  emailValid: Ember.computed('email', function() {
    const emailpat = /^[^@]+@[^@]+\.[^@\.]{2,}$/;
    const email = this.get('email');
    
    if (!email.match(emailpat)) {
      return 'We need a valid email address';
    }
  })
});
