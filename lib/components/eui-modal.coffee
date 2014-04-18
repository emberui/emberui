`import styleSupport from '../mixins/style-support'`
`import animationsDidComplete from '../mixins/animations-did-complete'`
`import modalLayout from '../templates/eui-modal'`

modal = Em.Component.extend styleSupport, animationsDidComplete,
  layout: modalLayout
  tagName: 'eui-modal'
  classNames: ['eui-modal']
  classNameBindings: ['class', 'isClosing:eui-closing']
  attributeBindings: ['tabindex']

  class: null

  # Stores the element that had focus before the modal was opened if the user uses the
  # keyboard to open it

  previousFocus: null


  # We don't really want to modal to be focusable, but we do need it to catch all key
  # presses so we can scope the tab key to only tab the modal contents.

  tabindex: 0


  # If the dialog was created programatically we set this to true which renders the
  # view specified by the user instead of yielding.

  programmatic: false


  # Set to true when we want the closing animations to play.

  isClosing: false


  # Determines if the modal contents should be rendered into the DOM

  renderModal: false


  # Proxy for renderModal. Allows us to animate the modal closing by delaying the setting of
  # renderModal until the animation is done playing

  open: Ember.computed (key, value) ->
    # setter
    if arguments.length is 2

      # If we are showing the modal we can do it immediately since it won't bugger animations
      if value
        @set 'renderModal', value

      # Enure that the modal is currently in the DOM before we hide it via hide method
      else
        @hide() if @get 'renderModal'

      value

    # getter
    else
      value = @get 'renderModal'
      value

  .property 'renderModal'


  # Initial setup when modal is shown programatically

  didInsertElement: ->
    if @get 'programmatic'
      # Store orignal focus so we can restore it when the modal is closed
      @set 'previousFocus', $(document.activeElement)

      # Disable page scrolling
      @constrainScrollEventsToModal()

      # Focus on modal so we can catch key events
      @.$().focus()

      # Add a class to the body element of the page so we can disable page scrolling on mobile
      $('body').addClass('eui-modal-open')


  # Initial setup when modal is used as a block component

  didOpenModal: (->
    if @get 'renderModal'
      # Disable page scrolling
      @constrainScrollEventsToModal()

      # Focus on modal so we can catch key events
      @.$().focus()

      # Add a class to the body element of the page so we can disable page scrolling on mobile
      $('body').addClass('eui-modal-open')
  ).observes 'renderModal'


  # Method to call to hide the Modal

  hide: ->
    # Set isClosing to true so the animation class gets added
    @set 'isClosing', true

    @animationsDidComplete().then =>
      @remove()


  # Removes the Modal from the DOM

  remove: ->
    # Restore focus to where it was before the modal was open
    @get('previousFocus')?.focus()

    # unbind scroll events
    @.$().unbind('.emberui')

    # Remove class set on body to disable mobile scrolling
    $('body').removeClass('eui-modal-open')

    if @get 'programmatic'
      @destroy()
    else
      @setProperties { isClosing: false, renderModal: false }


  # Actions will not bubble up from the programmatic modal so we need to create
  # pre-defined actions that the user can trigger to close the modal

  actions:
    cancel: (context) ->
      @sendAction 'cancel', context
      @hide()

    accept: (context) ->
      @sendAction 'accept', context
      @hide()


  # Catch and handle key presses

  keyDown: (event) ->
    # TAB
    @constrainTabNavigationToModal(event) if event.keyCode == 9

    # ESC
    if event.keyCode == 27
      @sendAction 'cancel'
      @hide()


  # Makes sure the tab focus cannot leave the modal since all user action is scoped to
  # this modal and there is no need to leave it
  # Adapted from ic-modal (https://github.com/instructure/ic-modal)

  constrainTabNavigationToModal: (event) ->
    activeElement = document.activeElement
    tabbable = @.$(':tabbable')
    finalTabbable = tabbable[event.shiftKey && 'first' || 'last']()[0]

    leavingFinalTabbable = finalTabbable is activeElement || @get('element') is activeElement

    return unless leavingFinalTabbable

    event.preventDefault()
    tabbable[event.shiftKey && 'last' || 'first']()[0].focus()


  # Don't let scroll events bubble up past the modal. This prevents the page from scrolling
  # behind the modal

  constrainScrollEventsToModal: ->
    @.$().bind('mousewheel.emberui DOMMouseScroll.emberui', (e) =>
      e.stopPropagation()


      # Build list of any element that could possible scroll due to event
      element = $(e.target)
      elements = []

      while element.parent().prop('tagName') isnt 'EUI-MODAL'
        elements.pushObject element
        element = element.parent()

      # Get scroll direction and then check each element to see if it can scroll in
      # that direction

      canScroll = false

      # scrolling up
      if e.originalEvent.wheelDelta >= 0
        for element in elements
          if element.scrollTop() isnt 0
            canScroll = true

      # scrolling down
      else
        for element in elements
          if (element.scrollTop() + element.innerHeight()) < element.prop('scrollHeight')
            canScroll = true
            break

      e.preventDefault() unless canScroll
    )


modal.reopenClass
  # Creates the modal programmatically and inserts it into the DOM

  show: (options = {}) ->
    options.renderModal = true
    options.programmatic = true

    modal = this.create options
    modal.container = modal.get('targetObject.container')
    modal.appendTo 'body'
    modal

`export default modal`
