$(function() {
  $('#contactForm input,#contactForm textarea').jqBootstrapValidation({
    preventSubmit: true,
    submitError: function($form, event, errors) {
      // additional error messages or events
    },
    submitSuccess: function($form, event) {
      event.preventDefault() // prevent default submit behaviour
      // get values from FORM
      var name = $('input#name').val()
      var email = $('input#email').val()
      var phone = $('input#phone').val()
      var message = $('textarea#message').val()
      var firstName = name // For Success/Failure Message
      // Check for white space in name for Success/Fail message
      if (firstName.indexOf(' ') >= 0) {
        firstName = name.split(' ').slice(0, -1).join(' ')
      }
      $this = $('#sendMessageButton')
      $this.prop('disabled', true) // Disable submit button until AJAX call is complete to prevent duplicate messages
      var content =
        '\n\n' +
        'full name: ' +
        name +
        '\n\n' +
        'phone : ' +
        phone +
        '\n\n' +
        'email : ' +
        email +
        '\n\n' +
        'message : ' +
        message
      Email.send(
        'rupert@beconnectedtech.com.au',
        'rupert@beconnectedtech.com.au',
        'beConnectedTech contact form email',
        content,
        {token: '6e244aea-551e-482f-bab0-324459321d4d'},
        function done(message) {
          $('#success > .alert-success').append('</div>')
          //clear all fields
          $('#contactForm').trigger('reset')
        },
      )
    },
    filter: function() {
      return $(this).is(':visible')
    },
  })

  $('a[data-toggle="tab"]').click(function(e) {
    e.preventDefault()
    $(this).tab('show')
  })
})

/*When clicking on Full hide fail/success boxes */
$('#name').focus(function() {
  $('#success').html('')
})
