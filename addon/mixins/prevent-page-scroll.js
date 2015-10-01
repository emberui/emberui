import Ember from 'ember';

export default Ember.Mixin.create({
  // Prevent scrolling while poplist is open. We have to use a hack with eui-enabled
  // to move the scroller off-screen so we can crop out the scrollbars that is visible.
  // If we do it when we show it osx shows the scrollbars regardless.
  disablePageScroll: function() {
    let net = this.$().find('.eui-pevent-page-scroll--net');

    net.scrollTop(5000).scrollLeft(5000).addClass('eui-enabled');

    return net.scroll(function() {
      return $(this).scrollTop(5000).scrollLeft(5000);
    });
  },

  enablePageScroll: function() {
    return this.$().find('.eui-pevent-page-scroll--net').unbind('scroll');
  }
});
