import Ember from 'ember';
import poplistComponent from '../components/eui-poplist';
import disabledSupport from '../mixins/disabled-support';
import errorSupport from '../mixins/error-support';
import widthSupport from '../mixins/width-support';

export default Ember.Component.extend(disabledSupport, errorSupport, widthSupport, {
  classNameBindings: ['isDisabled:eui-disabled', 'class'],
  tagName: 'eui-select',

  baseClass: 'select',
  style: 'default',
  size: 'medium',

  showPoplist: false,
  required: false,
  options: [],
  labelPath: 'label',
  valuePath: 'value',

  _selection: null,

  selectClass: Ember.computed('size', 'style', function() {
    const baseClass = this.get('baseClass');
    const size = this.get('size');
    const style = this.get('style');

    return `eui-${baseClass}-button-${size}-${style}`;
  }),

  // WAI-ARIA support values
  ariaHasPopup: true,
  ariaOwns: Ember.computed('poplist', function() {
    return this.get('poplist.elementId');
  }),

  listWidth: 'auto',

  // Stores a object that we will consider to be null. If this object is selected we
  // will return null instead

  nullValue: new Object(),

  // If this field is not required we automatically add a copy of the nullValue object at
  // the top of the list. This acts as a zero value so the user can deselect all options.
  optionsWithBlank: Ember.computed('options.@each', 'required', function() {
    const options = this.get('options');
    let paddedOptions = options.slice(0);

    if (!this.get('required')) {
      paddedOptions.unshift(this.get('nullValue'));
    }

    return paddedOptions;
  }),

  // Label of the selected option or the placeholder text
  label: Ember.computed('selection', 'placeholder', 'labelPath', function() {
    const labelPath = this.get('labelPath');

    return this.get(`selection.${labelPath}`) || this.get('placeholder');
  }),


  // Current option the user has selected. It is a wrapper around _selection
  // which the poplist binds to. It allows us to return null when the user selects
  // the nullValue object we inserted.
  selection: Ember.computed('_selection', {
    get(key) {
      const selection = this.get('_selection');
      const nullValue = this.get('nullValue');

      if (selection === nullValue) {
        return null;
      } else {
        return selection;
      }
    },

    set(key, value) {
      this.set('_selection', value);
      return value;
    }
  }),

  // Computes the value of the selection based on the valuePath specified by the user.
  // Allows for getting and setting so the user can set the initial value of the select
  // without passing in the full object
  value: Ember.computed('selection', 'valuePath', {
    get(key) {
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
          return option.get(valuePath) === value;
        });
      }
      this.set('selection', selection || value);

      return value;
    }
  }),

  initialization: Ember.on('init', function() {
    // Make sure we have options or things will break badly
    if (this.get('options') === void 0) {
      Ember.Logger.error('EmberUI: eui-select options paramater has undefined value');
      return;
    }

    // Create observer for the selection's label so we can monitor it for changes
    const labelPath = 'selection.' + this.get('labelPath');

    this.addObserver(labelPath, () => {
      this.notifyPropertyChange('label');
    });

    // Set the initial selection based on the value
    const valuePath = this.get('valuePath');
    let value = this.get('value');

    if (valuePath) {
      value = this.get('options').find((option) => {
        return option[valuePath] === value;
      });
    }

    return this.set('_selection', value || this.get('nullValue'));
  }),

  click: function() {
    this.toggleProperty('showPoplist');
  },

  keyUp: function(event) {
    // Down Arrow Key
    if (event.which === 40) {
      event.preventDefault();
      this.click();
    }
  },

  // Error check should happen without user having to focus on component
  isEntered: true
});
