"use strict";
var Ember = require("ember")["default"] || require("ember");
exports["default"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\n  ");
  data.buffer.push(escapeExpression((helper = helpers['eui-calendar'] || (depth0 && depth0['eui-calendar']),options={hash:{
    'style': ("popup"),
    'selection': ("selection"),
    'allowMultipleBinding': ("dateRange"),
    'class': ("eui-animation"),
    'selectAction': ("closeCalendar"),
    'disablePast': ("disablePast"),
    'disableFuture': ("disableFuture"),
    'maxPastDate': ("maxPastDate"),
    'maxFutureDate': ("maxFutureDate"),
    'disabledDates': ("disabledDates")
  },hashTypes:{'style': "STRING",'selection': "ID",'allowMultipleBinding': "STRING",'class': "STRING",'selectAction': "STRING",'disablePast': "ID",'disableFuture': "ID",'maxPastDate': "ID",'maxFutureDate': "ID",'disabledDates': "ID"},hashContexts:{'style': depth0,'selection': depth0,'allowMultipleBinding': depth0,'class': depth0,'selectAction': depth0,'disablePast': depth0,'disableFuture': depth0,'maxPastDate': depth0,'maxFutureDate': depth0,'disabledDates': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "eui-calendar", options))));
  data.buffer.push("\n");
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n  <div class=\"eui-error-message\">\n    <div class=\"eui-error-wrapper\">\n      <p>\n        ");
  stack1 = helpers._triageMustache.call(depth0, "errorMessage", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n      </p>\n    </div>\n  </div>\n");
  return buffer;
  }

  data.buffer.push(escapeExpression((helper = helpers['eui-button'] || (depth0 && depth0['eui-button']),options={hash:{
    'label': ("view.label"),
    'disabled': ("disabled"),
    'style': ("style"),
    'size': ("size"),
    'width': ("100%"),
    'classBinding': (":eui-select showCalendar:eui-active"),
    'action': ("toggleCalendar"),
    'icon': ("eui-icon")
  },hashTypes:{'label': "ID",'disabled': "ID",'style': "ID",'size': "ID",'width': "STRING",'classBinding': "STRING",'action': "STRING",'icon': "STRING"},hashContexts:{'label': depth0,'disabled': depth0,'style': depth0,'size': depth0,'width': depth0,'classBinding': depth0,'action': depth0,'icon': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "eui-button", options))));
  data.buffer.push("\n\n");
  stack1 = helpers['if'].call(depth0, "renderModal", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n");
  stack1 = helpers['if'].call(depth0, "errorMessage", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n");
  return buffer;
  
});