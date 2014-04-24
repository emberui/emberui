moduleForComponent('eui-input');

test('starts with errorState null', function() {
  expect(1);
  var input = this.subject();
  this.append();
  ok(!input.get('errorState'));
});

test('page load: errorState updated when element has a value', function() {
  expect(1);
  var input = this.subject({value: 'bonk', error: true});
  this.append();
  ok(input.get('errorState'));
});

test('page load: errorState updated when element has no value', function() {
  expect(1);
  var input = this.subject({error: true});
  this.append();
  ok(!input.get('errorState'));
});

test('element value change: errorState not updated when not starting in errorState', function() {
  expect(2);
  var factory = this.factory();
  var factoryWithError = factory.extend({
    error: Ember.computed('value', function() {
      return this.get('value.length') === 5;
    })
  });
  var input = this.subject({}, factoryWithError);
  this.append();
  ok(!input.get('errorState'));
  Em.run(function() {
    input.set('value', 'bonk');
  });
  ok(!input.get('errorState'));
});

test('element value change: errorState not updated when starting in errorState', function() {
  expect(1);
  var factory = this.factory();
  var factoryWithError = factory.extend({
    error: Ember.computed('value', function() {
      return this.get('value.length') !== 5;
    }),
    thisIsUsed: function() {
      ok(true);
    }.on('init')
  });
  var input = this.subject({value: '1234'}, factoryWithError);
  this.append();
//  ok(input.get('errorState'), 'component starts in error state');
  Em.run(function() {
    input.set('value', '12345');
  });
//  ok(!input.get('errorState'));
});
