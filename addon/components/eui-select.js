import Ember from 'ember';
import disabledSupport from '../mixins/disabled-support';
import errorSupport from '../mixins/error-support';
import widthSupport from '../mixins/width-support';

export default Ember.Component.extend(disabledSupport, errorSupport, widthSupport, {
  classNameBindings: ['isDisabled:eui-disabled', 'class'],
  tagName: 'eui-select',

  baseClass: 'select',
  style: 'default',
  size: 'medium',

  showOptionList: false,
  required: false,
  options: [],
  valuePath: 'value',
  onChange: null,

  // WAI-ARIA support values
  ariaHasPopup: true,

  // If this field is not required we automatically add a copy of the nullValue object at
  // the top of the list. This acts as a zero value so the user can deselect all options.
  optionsWithBlank: Ember.computed('options.[]', 'required', function() {
    const options = this.get('options');

    Ember.assert("You must pass in options to eui-select", options);

    let paddedOptions = options.slice(0);

    if (!this.get('required')) {
      paddedOptions.unshift(null);
    }

    return paddedOptions;
  }),

  // Computes the value of the selection based on the valuePath specified by the user.
  // Allows for getting and setting so the user can set the initial value of the select
  // without passing in the full object
  value: Ember.computed('selection', 'valuePath', {
    get() {
      const valuePath = this.get('valuePath');

      if (valuePath) {
        return this.get(`selection.${valuePath}`);
      } else {
        return null;
      }
    },

    set(key, value) {
      const valuePath = this.get('valuePath');
      let selection;

      if (valuePath) {
        selection = this.get('options').find(function(option) {
          return option[valuePath] === value;
        });
      }
      this.set('selection', selection || value);

      return value;
    }
  }),

  selectionArray: Ember.computed('selection', function() {
    return [this.get('selection')];
  }),

  setup: Ember.on('init', function() {
    if (!this.attrs.options) {
      Ember.Logger.warn('EmberUI: eui-select created without any options.');
    }

    this.setInitialSelection();
  }),

  // Set the initial selection based on the value attribute
  setInitialSelection() {
    const valuePath = this.get('valuePath');
    const value = this.get('value');
    const options = this.get('options');

    if (!valuePath || value === undefined) {
      return;
    }

    Ember.assert("You must pass in options to eui-select", options);

    let option = options.find((option) => {
      return option[valuePath] === value;
    });

    this.set('selection', option || null);
  },

  listWidth: null,

  popupWidth: Ember.computed('listWidth', function() {
    if (this.get('listWidth')) {
      let width = this.get('listWidth');
      return width;

    } else {
      let width = this.get('element').offsetWidth;
      return new Ember.String.htmlSafe(`${width}px`);
    }
  }).volatile(),

  attachment: 'center center',
  targetAttachment: 'center center',

  actions: {
    showOptionList() {
      this.set('showOptionList', true);
    },

    selectOption(option) {
      if (option !== undefined) {
        if (this.onChange) {
          this.onChange(option);
        } else {
          this.set('value', option);
        }
      }

      this.set('showOptionList', false);
    }
  },

  keyUp: function(event) {
    // Down Arrow Key
    if (event.which === 40) {
      event.preventDefault();
      this.send('showOptionList');
    }
  },

  // Error check should happen without user having to focus on component
  isEntered: true
});
