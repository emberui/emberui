import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route("documentation", function() {
    this.route('layout');
    this.route('theming');
    this.route('errorhandling');
    this.route('button');
    this.route('checkbox');
    this.route('dropbutton');
    this.route('input');
    this.route('select');
    this.route('selectdate');
    this.route('select-time');
    this.route('textarea');
    return this.route('option-list');
  });

  return this.route('404', {
    path: '*path'
  });
});

export default Router;
