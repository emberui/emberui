import styleSupport from '../mixins/style-support';
import sizeSupport from '../mixins/size-support';

export default Ember.Component.extend(styleSupport, sizeSupport, {
  tagName: 'eui-dropbutton',

  showOptionList: false,
  listWidth: 'auto',

  // Option for the left button
  primaryOption: Ember.computed('options', function() {
    return this.get('options').find(function(option) {
      return (option.primary || (option.get && option.get('primary'))) === true;
    });
  }),

  // List of options without any primary actions
  optionsWithoutPrimaryOption: Ember.computed.filter('options', function(option) {
    return !option.primary;
  }),

  actions: {
    showOptionList() {
      this.set('showOptionList', true);
    },

    primaryAction() {
      this.sendAction('primaryOption.action', this.get('primaryOption'), this);
      this.hideOptionList();
    },

    secondaryAction(option) {
      let action = option.action || (option.get && option.get('action'));

      this.set('action', action);
      this.sendAction('action', option, this);
      this.hideOptionList();
    },

    cancel() {
      this.hideOptionList();
    }
  },

  hideOptionList() {
    this.set('showOptionList', false);
  }
});
