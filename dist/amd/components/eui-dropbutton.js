define(
  ["../mixins/style-support","../mixins/size-support","../components/eui-poplist","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __exports__) {
    "use strict";
    var styleSupport = __dependency1__["default"] || __dependency1__;
    var sizeSupport = __dependency2__["default"] || __dependency2__;
    var poplistComponent = __dependency3__["default"] || __dependency3__;
    var dropbutton;

    dropbutton = Em.Component.extend(styleSupport, sizeSupport, {
      tagName: 'eui-dropbutton',
      poplistIsOpen: false,
      listWidth: 'auto',
      primaryAction: Em.computed('options', function() {
        return this.get('options').findBy('primary', true);
      }),
      peformSecondaryAction: (function() {
        var action;
        action = this.get('selection.action');
        if (action) {
          this.triggerAction({
            action: action
          });
        }
        return this.set('selection', null);
      }).observes('selection'),
      optionsWithoutPrimaryAction: Ember.computed.filter('options', function(option) {
        return !option.primary;
      }),
      actions: {
        toggleWindow: function() {
          if (!this.get('poplistIsOpen')) {
            return poplistComponent.show({
              targetObject: this,
              isOpenBinding: 'targetObject.poplistIsOpen',
              selectionBinding: 'targetObject.selection',
              optionsBinding: 'targetObject.optionsWithoutPrimaryAction',
              labelPath: 'label',
              style: 'default',
              listWidth: this.get('listWidth'),
              animationStyle: this.get('animationStyle')
            });
          }
        },
        primaryAction: function() {
          return this.sendAction('primaryAction.action', this);
        }
      }
    });

    __exports__["default"] = dropbutton;
  });