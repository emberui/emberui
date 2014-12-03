import EuiInitializer from 'emberui/initializers/eui-initializer';
import EuiWaiAriaInitializer from 'emberui/initializers/eui-wai-aria-initializer';

export default {
  name: 'emberui-initializer',

  initialize: function(container) {
    EuiInitializer(container);
    EuiWaiAriaInitializer();
  }
};

