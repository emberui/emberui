moduleForComponent('eui-input');

test('starts with errorState null', function() {
  expect(1);
  var input = this.subject();
  this.append();
  equal(input.get('errorState'), null);
});

test('inputId is stored on didInsertElement', function() {
  expect(2);
  var input = this.subject({
    value: 'bonk',
    error: true
  });
  ok(!input.get('inputId'), 'inputId is not set until append');
  this.append()
  ok(input.get('inputId'), 'inputId is set after append');
});
