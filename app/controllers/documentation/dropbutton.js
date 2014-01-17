export default Ember.ObjectController.extend({
  actionList: [
    Ember.Object.create({ label: 'Action 1', action: 'action-one'}),
    Ember.Object.create({ label: 'Action 2', action: 'action-two', disabled: true}),
    Ember.Object.create({ label: 'Action 3', action: 'action-three'})
  ]
});
