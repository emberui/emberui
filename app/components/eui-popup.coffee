`import styleSupport from 'appkit/mixins/style-support'`
`import popupLayout from 'appkit/templates/components/eui-popup'`

popup = Em.Component.extend styleSupport,
  layout: popupLayout
  classNames: ['eui-popup']

  labelPath: 'label'
  options: null
  listHeight: '80'
  listRowHeight: '20'

  hide: ->
    @set('isOpen', false)
    $(window).unbind('scroll.emberui')
    $(window).unbind('click.emberui')
    @destroy()

  didInsertElement: ->
    @set('isOpen', true)

  updateListHeight: ->
    optionCount = @get('options.length')
    rowHeight = @get('listRowHeight')

    if optionCount <= 12
      @set('listHeight', (optionCount * rowHeight))
    else
      @set('listHeight', (10 * rowHeight))

  optionsLengthDidChange: (->
    @updateListHeight()
  ).observes 'options.length'

  listView: Ember.ListView.extend
    classNames: ['eui-options']
    height: Ember.computed.alias 'controller.listHeight'
    rowHeight: Ember.computed.alias 'controller.listRowHeight'

    itemViewClass: Ember.ListItemView.extend
      classNames: ['eui-option']
      classNameBindings: ['isHighlighted:eui-hover', 'isSelected:eui-selected']
      template: Ember.Handlebars.compile('{{view.label}}')

      labelPath: Ember.computed.alias 'controller.labelPath'

      # creates Label property based on specified labelPath
      labelPathDidChange: Ember.observer ->
        labelPath = @get 'labelPath'
        Ember.defineProperty(this, 'label', Ember.computed.alias("content.#{labelPath}"))
        @notifyPropertyChange 'label'
      , 'content', 'labelPath'

      initializeLabelPath: (->
        @labelPathDidChange()
      ).on 'init'

      # TODO: Unsure why this is not done automatically. Without this @get('content') returns undefined.
      updateContext: (context) ->
        @_super context
        @set 'content', context

      isHighlighted: Ember.computed ->
        @get('controller.highlighted') is @get('content')
      .property 'controller.highlighted', 'content'

      isSelected: Ember.computed ->
        @get('controller.selection') is @get('content')
      .property 'controller.selection', 'content'

      click: ->
        option = @get('content')
        event = @get('controller.event')

        if event == 'select'
          @set('controller.selection', option)

        else if event == 'action'
          action = option.get('action')
          @get('controller.targetObject').triggerAction({action})

        @get('controller').hide()

      mouseEnter: ->
        @set 'controller.highlighted', @get('content')

      mouseLeave: ->
        @set 'controller.highlighted', undefined


popup.reopenClass
  show: (options = {}) ->
    popup = @.create options
    popup.container = popup.get('targetObject.container')
    popup.appendTo '.ember-application'

    popup.updateHeight()

    Ember.run.next this, -> @position(options.targetObject, popup)
    popup

  position: (targetObject, popup) ->
    element = targetObject.$()
    popupElement = popup.$()

    offset = element.offset()

    # set a reasonable min-width on the popup before we caclulate its actual size
    elementWidthMinusPopupPadding = element.width() - parseFloat(popupElement.css('paddingLeft')) - parseFloat(popupElement.css('paddingRight'))
    popupElement.css('min-width', elementWidthMinusPopupPadding)

    # calculate all the numbers needed to set positioning
    elementPositionTop = offset.top - element.scrollTop()
    elementPositionLeft = offset.left - element.scrollLeft()
    elementHeight = element.height()
    elementWidth = element.width()
    popupWidth = popupElement.width()
    popupHorizontalPadding = parseFloat(popupElement.css('paddingLeft')) + parseFloat(popupElement.css('paddingRight'))
    windowScrollTop = $(window).scrollTop()
    windowScrollLeft = $(window).scrollLeft()

    popupPositionTop = elementPositionTop + elementHeight  - windowScrollTop
    popupPositionLeft = elementPositionLeft + elementWidth - popupWidth - popupHorizontalPadding - windowScrollLeft

    popupElement.css('top', popupPositionTop)
    popupElement.css('left', popupPositionLeft)

    $(window).bind 'scroll.emberui', ->
      popup.hide()

    $(window).bind 'click.emberui', (event) ->
      unless $(event.target).parents('.eui-popup').length
        event.preventDefault()
        popup.hide()


`export default popup`
