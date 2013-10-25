EmberUI.Register = Ember.Mixin.create({
  setupComponents: function() {
    this.EuiButtonComponent = EmberUI.EuiButtonComponent;
  }.on('init')
});
