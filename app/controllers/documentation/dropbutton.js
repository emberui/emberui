export default Ember.ObjectController.extend({
  actionList: [
    Ember.Object.create({ label: 'Save', action: 'save' }),
    Ember.Object.create({ label: 'Delete', action: 'delete' }),
    Ember.Object.create({ label: 'Edit', action: 'edit' })
  ],

  actionListNoLabel: [
    Ember.Object.create({ action: 'save' }),
    Ember.Object.create({ label: 'Delete', action: 'delete' }),
    Ember.Object.create({ label: 'Edit', action: 'edit' })
  ],

  actionListPrimary: [
    Ember.Object.create({ label: 'Save', action: 'save', primary: true }),
    Ember.Object.create({ label: 'Delete', action: 'delete' }),
    Ember.Object.create({ label: 'Edit', action: 'edit' })
  ],

  actionListContext: [
    Ember.Object.create({ label: 'Save', action: 'saveItem', primary: true }),
    Ember.Object.create({ label: 'Delete', action: 'deleteItem' }),
    Ember.Object.create({ label: 'Edit', action: 'editItem' })
  ]
});
