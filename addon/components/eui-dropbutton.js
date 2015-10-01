import styleSupport from '../mixins/style-support';
import sizeSupport from '../mixins/size-support';
import poplistComponent from '../components/eui-poplist';

export default Ember.Component.extend(styleSupport, sizeSupport, {
  tagName: 'eui-dropbutton',

  showPoplist: false,
  listWidth: 'auto',

  // Action for the left button
  primaryAction: Ember.computed('options', function() {
    return this.get('options').find(function(option) {
      return option.get('primary') === true;
    });
  }),

  // If the selection changes peform the action and reset it so it can get triggered
  // again if same option is selected
  selection: Ember.computed({
    get(key) {
      return null;
    },

    set(key, value) {
      const action = value.get('action');

      if (action) {
        return this.triggerAction({
          action: action
        });
      }
    }
  }),

  // List of options without any primary actions
  optionsWithoutPrimaryAction: Ember.computed.filter('options', function(option) {
    return !option.primary;
  }),

  actions: {
    toggleWindow() {
      return this.toggleProperty('showPoplist');
    },

    primaryAction() {
      return this.sendAction('primaryAction.action', this);
    }
  }
});
