renderOnBody = Em.Mixin.create
  render: (buffer) ->
    @._morph = buffer.dom.appendMorph(document.getElementsByTagName('body')[0])
    @._super.apply(@, arguments)

  willClearRender: ->
    Ember.run.schedule('render', @._morph, @._morph.destroy)
    @._super.apply(@, arguments)


`export default renderOnBody`
