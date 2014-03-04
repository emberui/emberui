export default Ember.ObjectController.extend({
  testValueOne: 'save',
  testselectionOne: null,

  testValueTwo: null,
  testselectionTwo: null,

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
    Ember.Object.create({ name: 'Jaco', value: 'jaco' }),
    Ember.Object.create({ name: 'Justin', value: 'justin' }),
    Ember.Object.create({ name: 'Zach', value: 'zach' })
  ]
});
