controller = Ember.ObjectController.extend
  testValueOne: 'save'
  testselectionOne: null

  testValueTwo: null
  testselectionTwo: null

  options: [
    Ember.Object.create label: 'Save', action: 'save'
    Ember.Object.create label: 'Delete this really long item already', action: 'delete'
    Ember.Object.create label: 'Edit', action: 'edit'
  ]

  optionsPrimary: [
    Ember.Object.create label: 'Save', action: 'save', primary: true
    Ember.Object.create label: 'Delete', action: 'delete'
    Ember.Object.create label: 'Edit', action: 'edit'
  ]

  bigOptionList: []

  nooptions: []

`export default controller`
