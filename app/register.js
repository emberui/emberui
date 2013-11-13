EmberUI.Register = Ember.Mixin.create({
  setupComponents: function() {
    this.EuiButtonComponent = EmberUI.EuiButtonComponent;
    this.EuiDropbuttonComponent = EmberUI.EuiDropbuttonComponent;
    this.EuiInputComponent = EmberUI.EuiInputComponent;
  }.on('init')
});
