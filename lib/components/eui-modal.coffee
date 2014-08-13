`import styleSupport from '../mixins/style-support'`
`import animationSupport from '../mixins/animation-support'`
`import modalLayout from '../templates/eui-modal'`

modal = Em.Component.extend styleSupport, animationSupport,
  layout: 'eui-modal'
  tagName: 'eui-modal'
  classNames: ['eui-modal']
  classNameBindings: ['class']
  attributeBindings: ['tabindex']

  class: null
  animationClass: 'euiModal'


  # Stores the element that had focus before the modal was opened if the user
  # uses the keyboard to open it

  previousFocus: null


  # We don't really want to modal to be focusable, but we do need it to catch
  # all key presses so we can scope the tab key to only tab the modal contents.

  tabindex: 0


  # If the dialog was created programatically we set this to true which renders
  # the view specified by the user instead of yielding.

  programmatic: false


  # Set to true when we want the closing animations to play.

  isClosing: false


  # Determines if the modal contents should be rendered into the DOM

  renderModal: false


  # Determines if the user can close the modal with ESC

  enforceModality: false


  # Proxy for renderModal. Allows us to animate the modal closing by delaying
  # the setting of renderModal until the animation is done playing. Used for
  # inline modal creation.

  open: Ember.computed (key, value) ->
    # setter
    if arguments.length is 2
      if value
        @set 'renderModal', value

        # Initiate setup on next run loop so we can be sure modal has been
        # inserter into the DOM
        Em.run.next @, -> @setup()

      else if @get 'renderModal'
        @hide()

      value

    # getter
    else
      value = @get 'renderModal'
      value

  .property 'renderModal'


  hide: ->
    @animateOut({ complete: => @breakdown() })


  didInsertElement: ->
    if @get 'programmatic'
      @setup()


  setup: ->
    @animateIn()

    # Store orignal focus so we can restore it when the modal is closed
    @set 'previousFocus', $(document.activeElement)

    # Focus on modal so we can catch key events
    @.$().focus()

    # Add a class to the body element of the page so we can disable page
    # scrolling
    $('body').toggleClass('eui-modal-open')


  breakdown: ->
    # Restore focus to where it was before the modal was open
    @get('previousFocus')?.focus()

    # Remove class set on body to disable page scrolling
    $('body').toggleClass('eui-modal-open')

    if @get 'programmatic'
      @destroy()
    else
      @set 'renderModal', false


  # Does cleanup if the user navigates to a different page while modal is open

  willDestroy: ->
    $('body').removeClass('eui-modal-open')


  # Makes sure the tab focus cannot leave the modal since all user action is
  # scoped to this modal and there is no need to leave it
  # Adapted from ic-modal (https://github.com/instructure/ic-modal)

  constrainTabNavigationToModal: (event) ->
    return unless @get 'open'

    activeElement = document.activeElement
    tabbable = @.$(':tabbable')
    finalTabbable = tabbable[event.shiftKey && 'first' || 'last']()[0]
    leavingFinalTabbable = finalTabbable is activeElement || @get('element') is activeElement and event.shiftKey

    return unless leavingFinalTabbable

    event.preventDefault()
    tabbable[event.shiftKey && 'last' || 'first']()[0].focus()


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
  # Tab key must be under keyDown so we can catch the event before it happens
  keyDown: (event) ->
    # TAB
    @constrainTabNavigationToModal(event) if event.keyCode == 9

  # If Esc is not under keyUp multiple events can get triggered under Safari
  keyUp: (event) ->
    # ESC
    if event.keyCode == 27
      @sendAction 'cancel'
      unless @get 'enforceModality'
        @hide()


modal.reopenClass
  # Creates the modal programmatically and inserts it into the DOM

  show: (options = {}) ->
    options.renderModal = true
    options.programmatic = true
    options.layout = modalLayout

    modal = this.create options
    modal.container = modal.get('targetObject.container')
    modal.appendTo 'body'
    modal

`export default modal`
