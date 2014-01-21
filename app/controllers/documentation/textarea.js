export default Ember.ObjectController.extend({
  message: 'Hey',

  validateMessage: function() {
    var messageLength = this.get('message.length');

    if (messageLength > 10 ) {
      return false;
    } else {
      return 'A message can\'t be that short';
    }
  }.property('message')
});
