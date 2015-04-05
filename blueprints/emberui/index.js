module.exports = {
  normalizeEntityName: function() {}, // no-op since we're just adding dependencies

  afterInstall: function() {
    return this.addPackagesToProject([
      // TODO: remove this because it forces the consuming user to use app.scss
      { name: 'broccoli-sass' }

    ]).then(function() {
      return this.addBowerPackagesToProject([
        { name: 'moment' },
        { name: 'twix'}
      ])

    }.bind(this)).then(function() {
      return this.addAddonToProject('ember-cli-velocity')

    }.bind(this)).then(function() {
      return this.addAddonToProject('ember-cli-list-view')

    }.bind(this))
  }
};
