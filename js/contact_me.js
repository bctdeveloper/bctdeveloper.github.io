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

      $.ajax({
        url:
          'https://71f86b1f6abfa58368ee279fb66f2ea5:c58f9f720497a2d3ed1bf5585facbd91@api.mailjet.com/v3.1/send',
        type: 'POST',
        data: {
          subject: 'Contact Form',
          fromAddress: 'rupert@beconnectedtech.com.au',
          toAddress: 'rupert@beconnectedtech.com.au',
          content: content,
          encoding: 'UTF-8',
        },
        cache: false,
        success: function() {
          // Success message
          $('#success').html("<div class='alert alert-success'>")
          $('#success > .alert-success')
            .html(
              "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;",
            )
            .append('</button>')
          $('#success > .alert-success').append(
            '<strong>Your message has been sent. </strong>',
          )
          $('#success > .alert-success').append('</div>')
          //clear all fields
          $('#contactForm').trigger('reset')
        },
        error: function() {
          // Fail message
          $('#success').html("<div class='alert alert-danger'>")
          $('#success > .alert-danger')
            .html(
              "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;",
            )
            .append('</button>')
          $('#success > .alert-danger').append(
            $('<strong>').text(
              'Sorry ' +
                firstName +
                ', it seems that my mail server is not responding. Please try again later!',
            ),
          )
          $('#success > .alert-danger').append('</div>')
          //clear all fields
          $('#contactForm').trigger('reset')
        },
        complete: function() {
          setTimeout(function() {
            $this.prop('disabled', false) // Re-enable submit button when AJAX call is complete
          }, 1000)
        },
      })
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
