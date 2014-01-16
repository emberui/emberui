var Router = Ember.Router.extend(); // ensure we don't share routes between all Router instances

Router.map(function() {
  this.resource("documentation", { path: "/documentation" }, function() {
    this.route('button', { path: '/button' });
  });
});

export default Router;
