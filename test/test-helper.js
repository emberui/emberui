document.write('<div id="ember-testing-container"><div id="ember-testing"></div></div>');

emq.globalize();

setResolver(Ember.DefaultResolver.extend({
  testSubjects: {
    'component:eui-input': eui.EuiInputComponent,
    'template:components/eui-input': eui.EuiInputTemplate
  },
  resolve: function(fullName) {
    return this.testSubjects[fullName] || this._super.apply(this, arguments);
  }
}).create());

Function.prototype.compile = function() {
  var template = this.toString().split('\n').slice(1,-1).join('\n') + '\n';
  return Ember.Handlebars.compile(template);
};

function lookupComponent(id) {
  return Ember.View.views[id];
}

function buildComponent(test, props) {
  props = props || {};
  var component = test.subject(Ember.merge({
    template: function(){/*
    */}.compile()
  }, props));
  test.append();
  return component;
}
