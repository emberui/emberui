define(
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = Ember.Handlebars.compile("<div class=\"eui-verticalspacer\">\n  <div class=\"eui-modalobject\">\n    <div class=\"eui-modalwrapper\">\n      {{view contentViewClass contentBinding=\"content\"}}\n    </div>\n  </div>\n</div>\n\n<div class=\"eui-overlay\"></div>\n");
  });