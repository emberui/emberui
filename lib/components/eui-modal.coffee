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

  tabindex: -1


  # If the dialog was created programatically we set this to true which renders the
  # view specified by the user instead of yielding.

  programmatic: false


  # isOpen controls whether the guts of the modal gets rendered into the DOM. IsClosing
  # is set to true when we want the closing animations to play. Seperating them allows
  # animations to finish playing before the markup gets removed from the DOM.

  isOpen: false
  isClosing: false


  # Set focus to modal. didInsertElment is for programmtic creation, and didOpenModel does
  # it if eui-modal is being used as a block level component.

  didInsertElement: ->
    if @get 'programmatic'
      # Store orignal focus so we can restore it when the modal is closed
      @set 'previousFocus', $("*:focus")

      @.$().focus()

  didOpenModal: (->
    @.$().focus() if @get 'isOpen'
  ).observes 'isOpen'


  # Remove the Modal from the DOM

  hide: ->
    # Set isClosing to true so the animation class gets added
    @set 'isClosing', true

    @animationsDidComplete().then =>
      @remove()


  # Restore focus to where it was before the modal was opened and remove the modal from
  # the DOM via the isOpen flag, or if it was created programattically by destroying it.

  remove: ->
    @get('previousFocus')?.focus()

    if @get 'programmatic'
      @destroy()
    else
      @set 'isClosing', false
      @set 'isOpen', false


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
    @constrainTabNavigation(event) if event.keyCode == 9

    # ESC
    if event.keyCode == 27
      @sendAction 'cancel'
      @hide()


  # Makes sure the tab focus cannot leave the modal otherwise keyboard controls will
  # not work and the page may scroll underneath the modal

  constrainTabNavigation: ->
    # TODO
    return

modal.reopenClass
  # Creates the modal programmatically and inserts it into the DOM

  show: (options = {}) ->
    options.isOpen = true
    options.programmatic = true

    modal = this.create options
    modal.container = modal.get('targetObject.container')
    modal.appendTo 'body'
    modal

`export default modal`
