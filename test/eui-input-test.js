moduleForComponent('eui-input');

test('starts with error null', function() {
  expect(1);
  var input = this.subject();
  this.append();
  equal(input.get('error'), null);
});
