/* jshint node: true */
'use strict';

module.exports = {
  name: 'emberui',

  included: function(app) {
   this._super.included.apply(this, arguments);

   app.import(app.bowerDirectory + '/twix/dist/twix.js');
 }
};
