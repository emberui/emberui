controller = Ember.Controller.extend
  options: Ember.A([
    label: 'Save', action: 'save'
    label: 'Delete', action: 'delete'
    label: 'Edit', action: 'edit'
  ])

  optionsNoLabel: Ember.A([
    Ember.Object.create action: 'save'
    Ember.Object.create label: 'Delete', action: 'delete'
    Ember.Object.create label: 'Edit', action: 'edit'
  ])

  optionsPrimary: Ember.A([
    Ember.Object.create label: 'Save', action: 'save', primary: true
    Ember.Object.create label: 'Delete', action: 'delete'
    Ember.Object.create label: 'Edit', action: 'edit'
  ])

  optionsContext: Ember.A([
    Ember.Object.create label: 'Save', action: 'saveItem', primary: true
    Ember.Object.create label: 'Delete', action: 'deleteItem'
    Ember.Object.create label: 'Edit', action: 'editItem'
  ])

`export default controller`
