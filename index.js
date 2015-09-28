/* jshint node: true */
'use strict';

module.exports = {
  name: 'emberui',
  included: function(app) {
    this._super.included(app);

    app.import(app.bowerDirectory + '/moment/moment.js');
    app.import(app.bowerDirectory + '/twix/dist/twix.js');
    app.import('vendor/dithered_radial_gradient.js');
  }
};
