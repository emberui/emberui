export default Ember.Controller.extend({
  options: Ember.A([
    {
      label: 'Save',
      action: 'save',
      label: 'Delete',
      action: 'delete',
      label: 'Edit',
      action: 'edit'
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
      alert("Saving... ");
    },

    delete() {
      alert("Deleting... ");
    },

    edit() {
      alert("Editing... ");
    },

    saveItem(context) {
      alert("Saving... " + context.item);
    },

    deleteItem(context) {
      alert("Deleting... " + context.item);
    },

    editItem(context) {
      alert("Editing... " + context.item);
    }
  }
});
