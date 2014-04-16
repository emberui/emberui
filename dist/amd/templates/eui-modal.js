define(
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = Ember.Handlebars.compile("{{#if renderModal}}\n  <div class=\"eui-modal-wrapper\">\n\n    <div class=\"eui-modal-table\">\n      <div class=\"eui-modal-cell\">\n\n        <div class=\"eui-modalobject eui-animation\">\n          <div class=\"eui-modalobject-wrapper\">\n            {{#if programmatic}}\n              {{view contentViewClass contentBinding=\"content\"}}\n            {{else}}\n              {{yield}}\n            {{/if}}\n          </div>\n        </div>\n\n      </div>\n    </div>\n\n    <div class=\"eui-overlay eui-animation\"></div>\n  </div>\n{{/if}}\n");
  });