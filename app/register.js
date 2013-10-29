EmberUI.Register = Ember.Mixin.create({
  setupComponents: function() {
    this.EuiButtonComponent = EmberUI.EuiButtonComponent;
    this.EuiDropbuttonComponent = EmberUI.EuiDropbuttonComponent;
  }.on('init')
});
