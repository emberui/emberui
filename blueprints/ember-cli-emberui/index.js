module.exports = {
  normalizeEntityName: function() {}, // no-op since we're just adding dependencies

  afterInstall: function() {
    this.addPackagesToProject([
      { name: 'broccoli-sass' }
    ]);

    this.addAddonToProject('ember-cli-velocity');
    this.addAddonToProject('ember-cli-list-view');

    return this.addBowerPackagesToProject([
      { name: 'moment' },
      { name: 'twix'}
    ]);
  }
};
