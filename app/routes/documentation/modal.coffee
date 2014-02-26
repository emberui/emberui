`import modalComponent from 'appkit/components/eui-modal'`
`import modalContentView from 'appkit/views/documentation/modal-example'`

route = Ember.Route.extend
  actions:
    showModal: ->
      modalComponent.show
        targetObject: @
        contentViewClass: modalContentView
        content: { name: "Jaco" }

    showFullModal: ->
      modalComponent.show
        targetObject: @
        contentViewClass: modalContentView
        content: { name: "Jaco", message: "(cool people use this style)" }
        style: 'full'

`export default route`
