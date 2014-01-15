export default Ember.Component.extend({
  tagName: 'div',
  classNameBindings: ['primaryAction:eui-groupbutton:eui-singlebutton'],

  primaryAction: function() {
    var action = this.get("action").findBy('primary', true);
    if (!action) return false;
    return action;
  }.property('action'),

  actions: {
    toggleWindow: function() {
      throw "TODO: open window with list of actions";
    },

    primaryAction: function() {
      this.sendAction('primaryAction.action');
    }
  }
});
