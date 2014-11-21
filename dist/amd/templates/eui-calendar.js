define(
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"] || __dependency1__;
    __exports__["default"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
    this.compilerInfo = [4,'>= 1.0.0'];
    helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
      var buffer = '', stack1, helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

    function program1(depth0,data) {
      
      var buffer = '', stack1, helper, options;
      data.buffer.push("\n    <div class=\"eui-month-container\">\n      <header>\n        ");
      stack1 = helpers._triageMustache.call(depth0, "prevMonthLabel", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("\n      </header>\n      <div class=\"eui-month-frame\">\n        <ol class=\"eui-daysofweek\">\n          <li class=\"eui-nameofday\">Sun</li>\n          <li class=\"eui-nameofday\">Mon</li>\n          <li class=\"eui-nameofday\">Tue</li>\n          <li class=\"eui-nameofday\">Wed</li>\n          <li class=\"eui-nameofday\">Thu</li>\n          <li class=\"eui-nameofday\">Fri</li>\n          <li class=\"eui-nameofday\">Sat</li>\n        </ol>\n        ");
      data.buffer.push(escapeExpression((helper = helpers['eui-month'] || (depth0 && depth0['eui-month']),options={hash:{
        'month': ("prevMonth"),
        'selection': ("_selection"),
        'disabledDates': ("disabledDates"),
        'maxPastDate': ("maxPastDate"),
        'maxFutureDate': ("maxFutureDate"),
        'select': ("dateSelected")
      },hashTypes:{'month': "ID",'selection': "ID",'disabledDates': "ID",'maxPastDate': "ID",'maxFutureDate': "ID",'select': "STRING"},hashContexts:{'month': depth0,'selection': depth0,'disabledDates': depth0,'maxPastDate': depth0,'maxFutureDate': depth0,'select': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "eui-month", options))));
      data.buffer.push("\n      </div>\n    </div>\n  ");
      return buffer;
      }

    function program3(depth0,data) {
      
      var buffer = '', stack1, helper, options;
      data.buffer.push("\n    <div class=\"eui-month-container\">\n      <header>\n        ");
      stack1 = helpers._triageMustache.call(depth0, "nextMonthLabel", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("\n      </header>\n      <div class=\"eui-month-frame\">\n        <ol class=\"eui-daysofweek\">\n          <li class=\"eui-nameofday\">Sun</li>\n          <li class=\"eui-nameofday\">Mon</li>\n          <li class=\"eui-nameofday\">Tue</li>\n          <li class=\"eui-nameofday\">Wed</li>\n          <li class=\"eui-nameofday\">Thu</li>\n          <li class=\"eui-nameofday\">Fri</li>\n          <li class=\"eui-nameofday\">Sat</li>\n        </ol>\n        ");
      data.buffer.push(escapeExpression((helper = helpers['eui-month'] || (depth0 && depth0['eui-month']),options={hash:{
        'month': ("nextMonth"),
        'selection': ("_selection"),
        'disabledDates': ("disabledDates"),
        'maxPastDate': ("maxPastDate"),
        'maxFutureDate': ("maxFutureDate"),
        'select': ("dateSelected")
      },hashTypes:{'month': "ID",'selection': "ID",'disabledDates': "ID",'maxPastDate': "ID",'maxFutureDate': "ID",'select': "STRING"},hashContexts:{'month': depth0,'selection': depth0,'disabledDates': depth0,'maxPastDate': depth0,'maxFutureDate': depth0,'select': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "eui-month", options))));
      data.buffer.push("\n      </div>\n    </div>\n  ");
      return buffer;
      }

      data.buffer.push("<div class=\"eui-component-wrapper\">\n  <button ");
      data.buffer.push(escapeExpression(helpers.action.call(depth0, "prev", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
      data.buffer.push(" ");
      data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
        'disabled': ("isPrevDisabled")
      },hashTypes:{'disabled': "STRING"},hashContexts:{'disabled': depth0},contexts:[],types:[],data:data})));
      data.buffer.push(" class=\"eui-previous\"></button>\n  <button ");
      data.buffer.push(escapeExpression(helpers.action.call(depth0, "next", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
      data.buffer.push(" ");
      data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
        'disabled': ("isNextDisabled")
      },hashTypes:{'disabled': "STRING"},hashContexts:{'disabled': depth0},contexts:[],types:[],data:data})));
      data.buffer.push(" class=\"eui-next\"></button>\n\n  ");
      stack1 = helpers['if'].call(depth0, "showPrevMonth", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("\n\n  <div class=\"eui-month-container\">\n    <header>\n      ");
      stack1 = helpers._triageMustache.call(depth0, "monthLabel", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("\n    </header>\n    <div class=\"eui-month-frame\">\n      <ol class=\"eui-daysofweek\">\n        <li class=\"eui-nameofday\">Sun</li>\n        <li class=\"eui-nameofday\">Mon</li>\n        <li class=\"eui-nameofday\">Tue</li>\n        <li class=\"eui-nameofday\">Wed</li>\n        <li class=\"eui-nameofday\">Thu</li>\n        <li class=\"eui-nameofday\">Fri</li>\n        <li class=\"eui-nameofday\">Sat</li>\n      </ol>\n      ");
      data.buffer.push(escapeExpression((helper = helpers['eui-month'] || (depth0 && depth0['eui-month']),options={hash:{
        'month': ("month"),
        'selection': ("_selection"),
        'disabledDates': ("disabledDates"),
        'maxPastDate': ("maxPastDate"),
        'maxFutureDate': ("maxFutureDate"),
        'select': ("dateSelected")
      },hashTypes:{'month': "ID",'selection': "ID",'disabledDates': "ID",'maxPastDate': "ID",'maxFutureDate': "ID",'select': "STRING"},hashContexts:{'month': depth0,'selection': depth0,'disabledDates': depth0,'maxPastDate': depth0,'maxFutureDate': depth0,'select': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "eui-month", options))));
      data.buffer.push("\n    </div>\n  </div>\n\n  ");
      stack1 = helpers['if'].call(depth0, "showNextMonth", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("\n</div>\n");
      return buffer;
      
    });
  });