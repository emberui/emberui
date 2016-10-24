import Ember from 'ember';
import moment from 'moment';

export default Ember.Controller.extend({
  selection: moment().minute(0).hour(10).second(0).millisecond(0)
});
