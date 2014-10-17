'use strict';

module.exports = {
  normalizeEntityName: function() {
    // this prevents an error when the entityName is
    // not specified (since that doesn't actually matter
    // to us
  },

  afterInstall: function() {
    this.addBowerPackageToProject('moment', '>=2.5 <3');
    this.addBowerPackageToProject('twix', '~0.4.0');
    this.addBowerPackageToProject('velocity', '~1.0.0');
    return this.addBowerPackageToProject("ember-list-view", "0.0.4");
  }
};
