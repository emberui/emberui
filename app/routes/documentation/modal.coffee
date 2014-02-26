`import modalComponent from 'appkit/components/eui-modal'`
`import modalContentView from 'appkit/views/documentation/modal-example'`

route = Ember.Route.extend
  actions:
    showModal: ->
      modalComponent.show
        contentViewClass: modalContentView
        content: { name: "Jaco" }

`export default route`
