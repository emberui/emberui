`import styleSupport from 'appkit/mixins/style-support'`
`import popupLayout from 'appkit/templates/components/eui-popup'`

popup = Em.Component.extend styleSupport,
  layout: popupLayout
  classNames: ['eui-popup']

  actions:
    closePopup: ->
      @hide()

    actionThenHide: (action) ->
      @triggerAction {action: action, actionContext: @get('parent')}
      @hide()

  hide: ->
    @set('isOpen', false)
    @destroy()

  didInsertElement: ->
    @set('isOpen', true)


popup.reopenClass
  show: (options = {}) ->
    popup = this.create options
    popup.appendTo 'body'

    Ember.run.next this, -> @position(options.parent.$(), popup)
    popup

  position: (parent, popup) ->
    popupContainer = popup.$()

    # TODO - Rewrite all this
    # make sure popup is at least as wide as the button
    popupContainer.find('.eui-windowwrapper').css 'min-width', parent.width()

    # Don't allow the popup window to dominate the entire page
    height = $(window).height() - 100;
    popupContainer.find('.eui-windowwrapper').css 'max-height', "#{height}px"

    # position the popup in the center
    popupContainer.css 'top', '200px'
    popupContainer.css 'left', '400px'


`export default popup`
