animationsDidComplete = Em.Mixin.create
  # Returns a promise and resovles it once any animations that may be playing have
  # compeleted.

  animationsDidComplete: ->
    promise = new Ember.RSVP.Promise (resolve, reject) =>
      animation = false
      
      # Check only elements tagged with the eui-animation class
      primaryElement = @.$()
      animatedElements = @.$().find('.eui-animation')

      elements = $.merge primaryElement, animatedElements
      domPrefixes = ['', 'Webkit', 'Moz', 'O', 'ms']

      for element in elements
        break if animation

        for prefix in domPrefixes
          cssRule = $(element).css prefix + 'animationName'
          animation = true if cssRule and cssRule isnt 'none'
          break if animation

      if animation
        @$().one 'webkitAnimationEnd mozAnimationEnd oanimationend msAnimationEnd animationend', =>
          resolve(@)
      else
        resolve(@)

    return promise

`export default animationsDidComplete`
