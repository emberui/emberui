modalBehaviour = Em.Mixin.create
  classNameBindings: ['class', 'isClosing:eui-closing']
  attributeBindings: ['tabindex']


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

      # Focus on modal so we can catch key events
      @.$().focus()

      # Add a class to the body element of the page so we can disable page scrolling
      $('body').addClass('eui-modal-open')


  # Initial setup when modal is used as a block component

  didOpenModal: (->
    if @get 'renderModal'
      # Focus on modal so we can catch key events
      @.$().focus()

      # Add a class to the body element of the page so we can disable page scrolling
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

    # Remove class set on body to disable page scrolling
    $('body').removeClass('eui-modal-open')

    if @get 'programmatic'
      @destroy()
    else
      @setProperties { isClosing: false, renderModal: false }


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

`export default modalBehaviour`
