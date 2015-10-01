import Ember from 'ember';

export default Ember.Controller.extend({
  options: Ember.A([
    { 'label': 'option one', 'value': 1 },
    { 'label': 'option two', 'value': 2 },
    { 'label': 'option three', 'value': 3 },
    { 'label': 'option four', 'value': 4 },
    { 'label': 'option five', 'value': 5 },
    { 'label': 'option six', 'value': 6 },
    { 'label': 'option seven', 'value': 7 },
    { 'label': 'option eight', 'value': 8 },
    { 'label': 'option nine', 'value': 9 }
  ]),

  highlights: [],

  actions: {
    toggleSelection(option) {
      this.set('highlights', [option]);
    }
  }
});
