export default Ember.ObjectController.extend({
  options: [
    Ember.Object.create({ label: 'Save', action: 'save' }),
    Ember.Object.create({ label: 'Delete', action: 'delete' }),
    Ember.Object.create({ label: 'Edit', action: 'edit' })
  ],

  optionsPrimary: [
    Ember.Object.create({ label: 'Save', action: 'save', primary: true }),
    Ember.Object.create({ label: 'Delete', action: 'delete' }),
    Ember.Object.create({ label: 'Edit', action: 'edit' })
  ],

  bigOptionList: [
    Ember.Object.create({ label: 'Save', action: 'save' }),
    Ember.Object.create({ label: 'Delete', action: 'delete' }),
    Ember.Object.create({ label: 'Edit', action: 'edit' }),
    Ember.Object.create({ label: 'Save', action: 'save' }),
    Ember.Object.create({ label: 'Delete', action: 'delete' }),
    Ember.Object.create({ label: 'Edit', action: 'edit' }),
    Ember.Object.create({ label: 'Save', action: 'save' }),
    Ember.Object.create({ label: 'Delete', action: 'delete' }),
    Ember.Object.create({ label: 'Edit', action: 'edit' }),
    Ember.Object.create({ label: 'Save', action: 'save' }),
    Ember.Object.create({ label: 'Delete', action: 'delete' }),
    Ember.Object.create({ label: 'Edit', action: 'edit' }),
    Ember.Object.create({ label: 'Save', action: 'save' }),
    Ember.Object.create({ label: 'Delete', action: 'delete' }),
    Ember.Object.create({ label: 'Edit', action: 'edit' }),
    Ember.Object.create({ label: 'Save', action: 'save' }),
    Ember.Object.create({ label: 'Delete', action: 'delete' }),
    Ember.Object.create({ label: 'Edit', action: 'edit' }),
    Ember.Object.create({ label: 'Save', action: 'save' }),
    Ember.Object.create({ label: 'Delete', action: 'delete' }),
    Ember.Object.create({ label: 'Edit', action: 'edit' }),
    Ember.Object.create({ label: 'Save', action: 'save' }),
    Ember.Object.create({ label: 'Delete', action: 'delete' }),
    Ember.Object.create({ label: 'Edit', action: 'edit' }),
    Ember.Object.create({ label: 'Save', action: 'save' }),
    Ember.Object.create({ label: 'Delete', action: 'delete' }),
    Ember.Object.create({ label: 'Edit', action: 'edit' })
  ]
});
