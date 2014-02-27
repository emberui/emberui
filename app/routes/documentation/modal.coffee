`import modalComponent from 'appkit/components/eui-modal'`
`import modalContentView from 'appkit/views/documentation/modal-example'`

route = Ember.Route.extend
  actions:
    showModal: ->
      modalComponent.show
        targetObject: @
        contentViewClass: modalContentView
        content: { name: "Jaco", message: "This style is best for quick promts from the user." }

    showFullModal: ->
      modalComponent.show
        targetObject: @
        contentViewClass: modalContentView
        content: { name: "Jaco", message: "This is a great style for more involved modals." }
        style: 'full'

`export default route`
