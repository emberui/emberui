import Ember from 'ember';

export default Ember.Controller.extend({
  options: Ember.A([
    {
      label: 'Save',
      action: 'save',
    },
    {
      label: 'Edit',
      action: 'edit',
    },
    {
      label: 'Delete',
      action: 'delete',
    }
  ]),

  optionsNoLabel: Ember.A([
    Ember.Object.create({ action: 'save' }),
    Ember.Object.create({ label: 'Delete', action: 'delete' }),
    Ember.Object.create({ label: 'Edit', action: 'edit' })
  ]),

  optionsPrimary: Ember.A([
    Ember.Object.create({ label: 'Save', action: 'save', primary: true }),
    Ember.Object.create({ label: 'Delete', action: 'delete' }),
    Ember.Object.create({ label: 'Edit', action: 'edit' })
  ]),

  optionsContext: Ember.A([
    Ember.Object.create({ label: 'Save', action: 'saveItem', primary: true }),
    Ember.Object.create({ label: 'Delete', action: 'deleteItem' }),
    Ember.Object.create({ label: 'Edit', action: 'editItem' })
  ]),

  actions: {
    save() {
      window.alert("Saving... ");
    },

    delete() {
      window.alert("Deleting... ");
    },

    edit() {
      window.alert("Editing... ");
    },

    saveItem(context) {
      window.alert("Saving... " + context.item);
    },

    deleteItem(context) {
      window.alert("Deleting... " + context.item);
    },

    editItem(context) {
      window.alert("Editing... " + context.item);
    }
  }
});
