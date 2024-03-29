import Ember from 'ember';
import className from '../mixins/class-name';
import sizeSupport from '../mixins/size-support';

export default Ember.Component.extend(className, sizeSupport, {
  tagName: 'eui-dropbutton',

  baseClass: 'dropbutton',
  style: 'default',

  showOptionList: false,

  attachment: 'right top',
  targetAttachment: 'right bottom',

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

  popupWidth: Ember.computed('', function() {
    let width = this.get('element').offsetWidth;
    return new Ember.String.htmlSafe(`${width}px`);
  }).volatile(),

  actions: {
    showOptionList() {
      this.set('showOptionList', true);
    },

    primaryAction() {
      this.sendAction('primaryOption.action', this.get('primaryOption'), this);
      this.hideOptionList();
    },

    secondaryAction(option) {
      if (option) {
        let action = option.action || (option.get && option.get('action'));

        this.set('action', action);
        this.sendAction('action', option, this);
      }

      this.hideOptionList();
    }
  },

  hideOptionList() {
    this.set('showOptionList', false);
  }
});
