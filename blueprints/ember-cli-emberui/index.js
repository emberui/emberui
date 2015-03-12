module.exports = {
  normalizeEntityName: function() {}, // no-op since we're just adding dependencies

  afterInstall: function() {
    return this.addBowerPackagesToProject([
      { name: 'moment' },
      { name: 'ember-cli-list-view' },
      { name: 'twix'}
    ])
  }
};
