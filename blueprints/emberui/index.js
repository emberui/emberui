module.exports = {
  normalizeEntityName: function() {}, // no-op since we're just adding dependencies

  afterInstall: function() {
    return this.addBowerPackagesToProject([
      { name: 'moment' },
      { name: 'twix'}

    ]).then(function() {
      return this.addAddonToProject('ember-cli-sass')

    }.bind(this)).then(function() {
      return this.addAddonToProject('ember-cli-velocity')

    }.bind(this)).then(function() {
      return this.addAddonToProject('ember-list-view')

    }.bind(this))
  }
};
