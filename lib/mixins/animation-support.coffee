animationSupport = Em.Mixin.create
  animationStyle: null
  animationClass: null

  openAnimation: Em.computed 'computedAnimationStyle', ->
    style = @get 'computedAnimationStyle'
    component = @get 'animationClass'
    return unless style and component

    style = "#{component}Open#{style}"

    if $.velocity.Sequences.hasOwnProperty style then style else return


  closeAnimation: Em.computed 'computedAnimationStyle', ->
    style = @get 'computedAnimationStyle'
    component = @get 'animationClass'
    return unless style and component

    style = "#{component}Close#{style}"

    if $.velocity.Sequences.hasOwnProperty style then style else return


  computedAnimationStyle: Em.computed 'animationStyle', 'style', ->
    style = @get('animationStyle')?.capitalize()
    style = @get('style')?.capitalize() unless style
    style


  # Animate in

  animateIn: ->
    return unless openAnimation = @get 'openAnimation'
    Em.run.next @, ->
      @.$().velocity openAnimation


  # Animate out

  animateOut: ->
    return unless closeAnimation = @get('closeAnimation')
    @.$().velocity closeAnimation, {
      complete: => @breakdown()
    }

`export default animationSupport`
