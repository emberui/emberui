`import styleSupport from 'appkit/mixins/style-support'`
`import popupLayout from 'appkit/templates/components/eui-popup'`

popup = Em.Component.extend styleSupport,
  layout: popupLayout
  classNames: ['eui-popup']

  actions:
    closePopup: ->
      @hide()

    sendAction: (action) ->
      @sendAction('action')
      @hide()

  hide: ->
    @destroy()


popup.reopenClass
  show: (options = {}) ->
    popup = this.create options
    popup.appendTo 'body'

    Ember.run.next this, -> @position(options.origin.$(), popup)
    popup

  position: (origin, popup) ->
    popupContainer = popup.$()

    # TODO - Rewrite all this
    # make sure popup is at least as wide as the button
    popupContainer.find('.eui-windowwrapper').css 'min-width', origin.width()

    # Don't allow the popup window to dominate the entire page
    height = $(window).height() - 100;
    popupContainer.find('.eui-windowwrapper').css 'max-height', "#{height}px"

    # position the popup in the center
    popupContainer.css 'top', '200px'
    popupContainer.css 'left', '400px'


`export default popup`
