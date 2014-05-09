animationSupport = Em.Mixin.create
  animationStyle: null
  animationClass: null

  openAnimation: Em.computed 'computedAnimationStyle', ->
    style = @get 'computedAnimationStyle'
    component = @get 'animationClass'
    return unless style and component

    style = "#{component}Open#{style}"
    backupStyle = "#{component}OpenDefault"

    if $.velocity.Sequences.hasOwnProperty style then style else backupStyle


  closeAnimation: Em.computed 'computedAnimationStyle', ->
    style = @get 'computedAnimationStyle'
    component = @get 'animationClass'
    return unless style and component

    style = "#{component}Close#{style}"
    backupStyle = "#{component}CloseDefault"

    if $.velocity.Sequences.hasOwnProperty style then style else backupStyle


  computedAnimationStyle: Em.computed 'animationStyle', 'style', ->
    style = @get('animationStyle')?.capitalize()
    style = @get('style')?.capitalize() unless style
    style


  # Animate in

  animateIn: (options) ->
    return unless openAnimation = @get 'openAnimation'

    options = {} unless options

    Em.run.next @, ->
      @.$().velocity openAnimation, options


  # Animate out

  animateOut: (options) ->
    return unless closeAnimation = @get('closeAnimation')

    options = {} unless options

    @.$().velocity closeAnimation, options

`export default animationSupport`
