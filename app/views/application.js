export default Ember.View.extend({
  scrolled: false,

  didInsertElement: function() {
    var _this = this;
    $(window).scroll(function() {
      if ($(window).scrollTop() > 45) {
        _this.set('scrolled', true);
      } else {
        _this.set('scrolled', false);
      }
    });
  }
});
