define(
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"] || __dependency1__;
    __exports__["default"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
    this.compilerInfo = [4,'>= 1.0.0'];
    helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
      var buffer = '', stack1, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

    function program1(depth0,data) {
      
      var buffer = '', helper, options;
      data.buffer.push("\n  ");
      data.buffer.push(escapeExpression((helper = helpers['eui-button'] || (depth0 && depth0['eui-button']),options={hash:{
        'label': ("primaryAction.label"),
        'style': ("view.style"),
        'size': ("view.size"),
        'leadingIcon': ("view.icon"),
        'loading': ("view.loading"),
        'disabled': ("view.disabled"),
        'class': ("eui-dropbutton--primary-action"),
        'action': ("primaryAction")
      },hashTypes:{'label': "ID",'style': "ID",'size': "ID",'leadingIcon': "ID",'loading': "ID",'disabled': "ID",'class': "STRING",'action': "STRING"},hashContexts:{'label': depth0,'style': depth0,'size': depth0,'leadingIcon': depth0,'loading': depth0,'disabled': depth0,'class': depth0,'action': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "eui-button", options))));
      data.buffer.push("\n\n  ");
      data.buffer.push(escapeExpression((helper = helpers['eui-button'] || (depth0 && depth0['eui-button']),options={hash:{
        'style': ("view.style"),
        'size': ("view.size"),
        'leadingIcon': ("fa fa-angle-down"),
        'loading': (false),
        'disabled': ("view.disabled"),
        'classBinding': (":eui-dropbutton--trigger poplistIsOpen:eui-active"),
        'action': ("toggleWindow")
      },hashTypes:{'style': "ID",'size': "ID",'leadingIcon': "STRING",'loading': "BOOLEAN",'disabled': "ID",'classBinding': "STRING",'action': "STRING"},hashContexts:{'style': depth0,'size': depth0,'leadingIcon': depth0,'loading': depth0,'disabled': depth0,'classBinding': depth0,'action': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "eui-button", options))));
      data.buffer.push("\n\n");
      return buffer;
      }

    function program3(depth0,data) {
      
      var buffer = '', helper, options;
      data.buffer.push("\n  ");
      data.buffer.push(escapeExpression((helper = helpers['eui-button'] || (depth0 && depth0['eui-button']),options={hash:{
        'label': ("view.label"),
        'style': ("view.style"),
        'size': ("view.size"),
        'leadingIcon': ("view.icon"),
        'trailingIcon': ("fa fa-angle-down"),
        'loading': ("view.loading"),
        'disabled': ("view.disabled"),
        'classBinding': ("poplistIsOpen:eui-active"),
        'action': ("toggleWindow")
      },hashTypes:{'label': "ID",'style': "ID",'size': "ID",'leadingIcon': "ID",'trailingIcon': "STRING",'loading': "ID",'disabled': "ID",'classBinding': "STRING",'action': "STRING"},hashContexts:{'label': depth0,'style': depth0,'size': depth0,'leadingIcon': depth0,'trailingIcon': depth0,'loading': depth0,'disabled': depth0,'classBinding': depth0,'action': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "eui-button", options))));
      data.buffer.push("\n\n");
      return buffer;
      }

      stack1 = helpers['if'].call(depth0, "primaryAction", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("\n");
      return buffer;
      
    });
  });