`import Ember from 'ember'`

waiAria =
  name: 'emberui-wai-aria',

  initialize: (container) ->
    Ember.TextSupport.reopen {
      attributeBindings: [
        'aria-expanded',
        'aria-autocomplete',
        'aria-owns',
        'aria-activedescendant'
      ]
    }

`export default waiAria`
