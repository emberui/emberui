var Router = Ember.Router.extend(); // ensure we don't share routes between all Router instances

Router.reopen({
  location: 'history'
});

Router.map(function() {
  this.resource("documentation", { path: "/documentation" }, function() {
    this.route('sizingandlayout', { path: '/sizingandlayout' });
    this.route('stylesandtheming', { path: '/stylesandtheming' });
    this.route('errorhandling', { path: '/errorhandling' });

    this.route('button', { path: '/button' });
    this.route('dropbutton', { path: '/dropbutton' });
    this.route('input', { path: '/input' });
    this.route('textarea', { path: '/textarea' });
    this.route('popup', { path: '/popup' });
  });
});

export default Router;
