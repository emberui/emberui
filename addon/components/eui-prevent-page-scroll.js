import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['eui-pevent-page-scroll'],
  attributeBindings: ['style'],

  click: null,
  zIndex: 1000000,

  style: Ember.computed('zIndex', function() {
    let zIndex = parseInt(this.get('zIndex'));
    return new Ember.String.htmlSafe(`z-index: ${zIndex}`);
  }),

  setup: Ember.on('didInsertElement', function() {
    this.disablePageScroll();
  }),

  breakdown: Ember.on('willDestroyElement', function() {
    this.enablePageScroll();
  }),

  disablePageScroll: function() {
    let net = this.$().find('.eui-pevent-page-scroll--net');

    net.scrollTop(50000).scrollLeft(50000).addClass('eui-enabled');

    return net.scroll(function() {
      return $(this).scrollTop(50000).scrollLeft(50000);
    });
  },

  enablePageScroll: function() {
    return this.$().find('.eui-pevent-page-scroll--net').unbind('scroll');
  }
});
