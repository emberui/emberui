export default Ember.ObjectController.extend({
  testValueOne: 'save',
  testselectionOne: null,

  testValueTwo: null,
  testselectionTwo: null,

  options: [
    Ember.Object.create({ label: 'Save', action: 'save' }),
    Ember.Object.create({ label: 'Delete this really long item already', action: 'delete' }),
    Ember.Object.create({ label: 'Edit', action: 'edit' })
  ],

  optionsPrimary: [
    Ember.Object.create({ label: 'Save', action: 'save', primary: true }),
    Ember.Object.create({ label: 'Delete', action: 'delete' }),
    Ember.Object.create({ label: 'Edit', action: 'edit' })
  ],

  bigOptionList: [
    Ember.Object.create({ name: '1', value: 'jaco' }),
    Ember.Object.create({ name: '2', value: 'justin' }),
    Ember.Object.create({ name: '3', value: 'zach' }),
    Ember.Object.create({ name: '4', value: 'jaco' }),
    Ember.Object.create({ name: '5', value: 'justin' }),
    Ember.Object.create({ name: '6', value: 'zach' }),
    Ember.Object.create({ name: '7', value: 'jaco' }),
    Ember.Object.create({ name: '8', value: 'justin' }),
    Ember.Object.create({ name: '9', value: 'zach' }),
    Ember.Object.create({ name: '10', value: 'jaco' }),
    Ember.Object.create({ name: '11', value: 'justin' }),
    Ember.Object.create({ name: '12', value: 'zach' }),
    Ember.Object.create({ name: '13', value: 'jaco' }),
    Ember.Object.create({ name: '14', value: 'justin' }),
    Ember.Object.create({ name: '15', value: 'zach' }),
    Ember.Object.create({ name: '16', value: 'jaco' }),
    Ember.Object.create({ name: '17', value: 'justin' }),
    Ember.Object.create({ name: '18', value: 'zach' }),
    Ember.Object.create({ name: '19', value: 'jaco' }),
    Ember.Object.create({ name: '20', value: 'justin' }),
    Ember.Object.create({ name: '21', value: 'zach' }),
    Ember.Object.create({ name: '22', value: 'jaco' }),
    Ember.Object.create({ name: '23', value: 'justin' }),
    Ember.Object.create({ name: '24', value: 'zach' }),
    Ember.Object.create({ name: '25', value: 'jaco' }),
    Ember.Object.create({ name: '26', value: 'justin' }),
    Ember.Object.create({ name: '27', value: 'zach' }),
    Ember.Object.create({ name: '28', value: 'jaco' }),
    Ember.Object.create({ name: '29', value: 'justin' }),
    Ember.Object.create({ name: '30', value: 'zach' }),
    Ember.Object.create({ name: '31', value: 'jaco' }),
    Ember.Object.create({ name: '32', value: 'justin' }),
    Ember.Object.create({ name: 'END', value: 'zach' })
  ],

  nooptions: []
});
