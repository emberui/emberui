export default Ember.View.extend({
  exampleLabel: "{{eui-button label='Save Changes'}}",
  exampleSize: "{{eui-button label='Save Changes' size='tiny'}} \n{{eui-button label='Save Changes' size='small'}} \n{{eui-button label='Save Changes' size='medium'}} \n{{eui-button label='Save Changes' size='large'}}",
  exampleStyle: "{{eui-button label='Save Changes' style='secondary'}} \n{{eui-button label='Save Changes' style='primary'}}",
  exampleIcon: "{{eui-button label='Settings' icon='fa fa-cog'}} \n{{eui-button icon='fa fa-cog'}}",
  exampleDisabled_A: "{{eui-button label='Save Changes' disabled=true}} \n{{eui-button label='Click to Disable' disabledBinding=isDisabled action='switchToDisabled'}}",
  exampleDisabled_B: "actions: { \n  switchToDisabled: function(controller) { \n    this.get('controller').set('isDisabled', true);\n  } \n}",
  exampleLoading_A: "{{eui-button label='Save Changed' loading=true}} \n{{eui-button label='Click to Load' loadingBinding=isLoading action='switchToLoading'}}",
  exampleLoading_B: "actions: { \n  switchToLoading: function(controller) { \n    this.get('controller').set('isLoading', true);\n  } \n}"
});
