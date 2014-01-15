var Router = Ember.Router.extend(); // ensure we don't share routes between all Router instances

Router.map(function() {
  this.route("documentation", { path: "/documentation" });
});

export default Router;
