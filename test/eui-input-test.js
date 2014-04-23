moduleForComponent('eui-input');

test('starts with errorState null', function() {
  expect(1);
  var input = this.subject();
  this.append();
  equal(input.get('errorState'), null);
});
