import Ember from 'ember';
import { test, moduleForComponent } from 'ember-qunit';

moduleForComponent('eui-input');

test('starts with errorState null', function(assert) {
  assert.expect(1);
  var input = this.subject();
  this.append();
  assert.ok(!input.get('errorState'));
});

test('page load: errorState updated when element has a value', function(assert) {
  assert.expect(1);
  var input = this.subject({value: 'bonk', error: true});
  this.append();
  assert.ok(input.get('errorState'));
});

test('page load: errorState updated when element has no value', function(assert) {
  assert.expect(1);
  var input = this.subject({error: true});
  this.append();
  assert.ok(!input.get('errorState'));
});

// NOTE: this test is setup in a somewhat roundabout way because the current implementation
// of the error support mixin does not allow a more direct testing approach. That is, we cannot
// setup the initial state and then modify the error property to trigger an errorState change
// because the mixin does not listen to changes on the error property, only the value property.
// Once the implementation is improved this can be replaced with a more direct test.
var fakeController = Ember.Object.extend({
  value: null,

  error: Ember.computed('value', function() {
    return this.get('value.length') !== 5;
  })
});

test('element value change: errorState not updated when not starting in errorState', function(assert) {
  assert.expect(2);
  var input = this.subject({c: fakeController.create(), errorBinding: 'c.error', valueBinding: 'c.value'});
  this.append();
  assert.ok(!input.get('errorState'), 'does not start in error state');
  Ember.run(function() {
    input.set('value', '1234');
  });
  assert.ok(!input.get('errorState'), 'does not update error state when not in errorState');
});

// NOTE: see above.
test('element value change: errorState updated when starting in errorState', function(assert) {
  assert.expect(2);
  var input = this.subject({c: fakeController.create({value: '1234'}), errorBinding: 'c.error', valueBinding: 'c.value'});
  this.append();
  assert.ok(input.get('errorState'), 'starts in error state');
  Ember.run(function() {
    input.set('value', '12345');
  });
  assert.ok(!input.get('errorState'), 'updated after starting in error state');
});

// NOTE: see above
test('element loses focus: errorState updated on focusout', function(assert) {
  assert.expect(3);
  var input = this.subject({c: fakeController.create(), errorBinding: 'c.error', valueBinding: 'c.value'});
  this.append();
  assert.ok(!input.get('errorState'), 'does not start in error state');
  Ember.run(function() {
    input.set('value', '1234');
  });
  assert.ok(!input.get('errorState'), 'error state not updated before focusout');
  Ember.run(function() {
    input.$().trigger('focusout');
  });
  assert.ok(input.get('errorState'), 'error state updated after focusout');
});

// NOTE: see above
test('force error check: errorState is updated when forceErrorCheck is true', function(assert) {
  assert.expect(1);
  var input = this.subject({c: fakeController.create(), errorBinding: 'c.error', valueBinding: 'c.value'});
  this.append();
  // NOTE: we are also going out of our way to set this after the input is created because forceErrorCheck
  // is *currently* being observed instead of computed. This test should change once that is not longer true
  Ember.run(function(){
    input.set('forceErrorCheck', true);
  });
  assert.ok(input.get('errorState'));
});

test('string error property should be presented on errorMessage property', function(assert) {
  assert.expect(1);
  var input = this.subject({error: "This is broken, please fix it", forceErrorCheck: true});

  assert.equal(input.get('errorMessage'), "This is broken, please fix it", "errorMessage should be error");
});

test('element focus: focusin resets error state', function(assert) {
  assert.expect(4);
  var input = this.subject({c: fakeController.create(), errorBinding: 'c.error', valueBinding: 'c.value'});
  this.append();

  Ember.run(function() {
    input.set('value', '1234');
    input.$().trigger('focusout');
  });

  assert.ok(input.get('errorState'), 'starts in error state');

  Ember.run(function() {
    input.$().trigger('focusin');
    input.set('value', '12345');
  });

  assert.ok(!input.get('errorState'), 'error state updated after starting in error state');

  Ember.run(function() {
    input.set('value', '1234');
  });

  assert.ok(!input.get('errorState'), 'error state not updated before focusout');

  Ember.run(function() {
    input.$().trigger('focusout');
  });

  assert.ok(input.get('errorState'), 'error updated on focusout');
});

test('inputId is stored on didInsertElement', function(assert) {
  assert.expect(2);
  var input = this.subject({
    value: 'bonk',
    error: true
  });
  assert.ok(!input.get('inputId'), 'inputId is not set until append');
  this.append();
  assert.ok(input.get('inputId'), 'inputId is set after append');
});
