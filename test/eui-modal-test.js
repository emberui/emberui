var modal = eui.EuiModalComponent;

test('renders view with template to the DOM', function() {
  expect(1);
  var modalView = Ember.View.extend({
    template: Handlebars.compile("<h1>boglins</h1>")
  });

  Ember.run(function() {
    modal.show({
      contentViewClass: modalView,
      content: {}
    });
  });

  equal($('h1:contains("boglins")').length, 1);
});

test('renders view with template to the DOM using view property', function() {
  expect(1);
  var modalView = Ember.View.extend({
    template: Handlebars.compile("<h1>gremlins</h1>")
  });

  Ember.run(function() {
    modal.show({
      view: modalView,
      content: {}
    });
  });

  equal($('h1:contains("gremlins")').length, 1);
});

test('renders template with no view to the DOM', function() {
  expect(1);

  Ember.run(function() {
    modal.show({
      template: Handlebars.compile("<h1>snorks</h1>"),
      content: {}
    });
  });

  equal($('h1:contains("snorks")').length, 1);
});

// NOTE: this represents the current method of accessing context
// in the rendered template but will be deprecated in favor of
// using controllers and accessing context properties without
// requiring a prefix
test('renders content properties to the DOM', function() {
  expect(1);

  Ember.run(function() {
    modal.show({
      template: Ember.Handlebars.compile("<h1>{{content.title}}</h1>"),
      content: { title: 'smurfs' }
    });
  });

  equal($('h1:contains("smurfs")').length, 1);
});

test('renders content properties to the DOM without "content" prefix', function() {
  expect(1);

  Ember.run(function() {
    modal.show({
      template: Ember.Handlebars.compile("<h1>{{title}}</h1>"),
      controller: { title: 'fraggles' }
    });
  });

  equal($('h1:contains("fraggles")').length, 1);
});
