/*!
EmberUI (c) 2014 Jaco Joubert
License: https://github.com/emberui/emberui/blob/master/LICENSE
*/

import EuiInitializer from './initializers/eui-initializer';
import EuiWaiAriaInitializer from './initializers/eui-wai-aria-initializer';



Ember.libraries.register("EmberUI", "0.4.1");

Ember.Application.initializer({
  name: 'emberui-initializer',

  initialize: function(container) {
    EuiInitializer(container);
    EuiWaiAriaInitializer();
  }

});

export {
  EuiInitializer,
  EuiWaiAriaInitializer
};
