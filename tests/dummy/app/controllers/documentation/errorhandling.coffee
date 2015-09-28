controller = Ember.Controller.extend
  email: 'john@example'

  emailValid: Ember.computed 'email', ->
    emailpat = /^[^@]+@[^@]+\.[^@\.]{2,}$/
    email = @get('email')

    unless email.match(emailpat)
      return 'We need a valid email address'


`export default controller`
