/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-cli-emberui',

  included: function(app) {
    this._super.included(app);

    app.import(app.bowerDirectory + '/moment/moment.js');
    app.import(app.bowerDirectory + '/twix/bin/twix.js');
  }
};
