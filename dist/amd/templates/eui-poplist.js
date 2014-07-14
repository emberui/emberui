define(
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"] || __dependency1__;
    __exports__["default"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
    this.compilerInfo = [4,'>= 1.0.0'];
    helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
      var buffer = '', stack1, helper, options, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

    function program1(depth0,data) {
      
      
      data.buffer.push("\n    <div class=\"eui-nooptions\">No results found.</div>\n  ");
      }

    function program3(depth0,data) {
      
      var buffer = '';
      data.buffer.push("\n    ");
      data.buffer.push(escapeExpression(helpers.view.call(depth0, "listView", {hash:{
        'contentBinding': ("filteredOptions")
      },hashTypes:{'contentBinding': "STRING"},hashContexts:{'contentBinding': depth0},contexts:[depth0],types:["ID"],data:data})));
      data.buffer.push("\n  ");
      return buffer;
      }

      data.buffer.push("<div class=\"eui-poplistwrapper\">\n  <div ");
      data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
        'class': (":eui-search-wrapper searchString:eui-active")
      },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
      data.buffer.push(">\n    ");
      data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
        'class': ("eui-search"),
        'valueBinding': ("searchString"),
        'size': ("1"),
        'ariaRole': ("combobox"),
        'aria-autocomplete': ("list")
      },hashTypes:{'class': "STRING",'valueBinding': "STRING",'size': "STRING",'ariaRole': "STRING",'aria-autocomplete': "STRING"},hashContexts:{'class': depth0,'valueBinding': depth0,'size': depth0,'ariaRole': depth0,'aria-autocomplete': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
      data.buffer.push("\n  </div>\n\n  ");
      stack1 = helpers['if'].call(depth0, "hasNoOptions", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("\n</div>\n");
      return buffer;
      
    });
  });