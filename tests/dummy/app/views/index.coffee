view = Ember.View.extend
  classNames: ['homepage']

  didInsertElement: ->
    Ember.run.next this, -> @drawGradient()

  # Draw dithered gradient
  drawGradient: ()->
    canvas = document.getElementById("backgroundcanvas")
    context = canvas.getContext("2d")
    width = canvas.width
    height = canvas.height

    outerRad = Math.sqrt(width*width + height*height)/1.7
    gradient = new DitheredRadialGradient(width,height,0,width/2.0,height/1.3,outerRad)

    gradient.addColorStop(0.00, 239, 247, 252)
    gradient.addColorStop(0.50, 196, 216, 226)
    gradient.addColorStop(0.70, 21, 96, 173)
    gradient.addColorStop(0.93, 3, 8, 30)
    gradient.addColorStop(1.00, 3, 8, 30)

    gradient.fillRect(context,0,0,width,height);


`export default view`
