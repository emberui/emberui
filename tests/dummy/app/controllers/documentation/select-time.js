import Ember from 'ember';

export default Ember.Controller.extend({
  selection: moment().minute(0).hour(10).second(0).millisecond(0)
});
