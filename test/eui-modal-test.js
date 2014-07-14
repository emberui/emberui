var modal = eui.EuiModalComponent;

test('renders view template to the DOM', function() {
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
