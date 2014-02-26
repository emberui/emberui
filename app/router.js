var Router = Ember.Router.extend(); // ensure we don't share routes between all Router instances

Router.reopen({
  location: 'history'
});

Router.map(function() {
  this.resource("documentation", { path: "/documentation" }, function() {
    this.route('layout', { path: '/layout' });
    this.route('theming', { path: '/theming' });
    this.route('errorhandling', { path: '/errorhandling' });

    this.route('button', { path: '/button' });
    this.route('checkbox', { path: '/checkbox' });
    this.route('dropbutton', { path: '/dropbutton' });
    this.route('input', { path: '/input' });
    this.route('modal', { path: '/modal' });
    this.route('textarea', { path: '/textarea' });

    this.route('popup', { path: '/popup' });
  });

  this.route('404', { path: '*path' }); // Catch all for all remaining routes
});

export default Router;
