import { EuiInitializer, EuiWaiAriaInitializer } from 'emberui';

export default {
  name: 'emberui-initializer',

  initialize: function(container) {
    EuiInitializer(container);
    EuiWaiAriaInitializer();
  }
};

