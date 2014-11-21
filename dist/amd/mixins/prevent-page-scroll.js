define(
  ["exports"],
  function(__exports__) {
    "use strict";
    var preventPageScroll;

    preventPageScroll = Em.Mixin.create({
      disablePageScroll: function() {
        var net;
        net = this.$().find('.eui-scroller--net');
        net.scrollTop(5000).scrollLeft(5000).addClass('eui-enabled');
        return net.scroll(function() {
          return $(this).scrollTop(5000).scrollLeft(5000);
        });
      },
      enablePageScroll: function() {
        return this.$().find('.eui-scroller--net').unbind('scroll');
      }
    });

    __exports__["default"] = preventPageScroll;
  });