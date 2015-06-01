controller = Ember.Controller.extend
  options: [
    Ember.Object.create label: 'Save', action: 'save'
    Ember.Object.create label: 'Delete', action: 'delete'
    Ember.Object.create label: 'Edit', action: 'edit'
  ]

  optionsNoLabel: [
    Ember.Object.create action: 'save'
    Ember.Object.create label: 'Delete', action: 'delete'
    Ember.Object.create label: 'Edit', action: 'edit'
  ]

  optionsPrimary: [
    Ember.Object.create label: 'Save', action: 'save', primary: true
    Ember.Object.create label: 'Delete', action: 'delete'
    Ember.Object.create label: 'Edit', action: 'edit'
  ]

  optionsContext: [
    Ember.Object.create label: 'Save', action: 'saveItem', primary: true
    Ember.Object.create label: 'Delete', action: 'deleteItem'
    Ember.Object.create label: 'Edit', action: 'editItem'
  ]

`export default controller`
