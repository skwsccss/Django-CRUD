$(document).ready(function () {

  $('#input_error').addClass('d-none');
  $('#input_error2').addClass('d-none');
  $('#add_btn').click(function () {
    if ($('#username').val() == '' || $('#last_name').val() == '' || $('#first_name').val() == '' || $('#email').val() == '' || $('#is_superuser').val() == '') {
      $('#input_error').removeClass('d-none');
    }
    else {
      $('#input_error').addClass('d-none');
      $.ajax({
        url: '/add/',
        method: 'POST',
        data: {
          selection: "1",
          username: $('#username').val(),
          first_name: $('#first_name').val(),
          last_name: $('#last_name').val(),
          email: $('#email').val(),
          is_superuser: $('#is_superuser').val(),
          csrfmiddlewaretoken: $("input[name='csrfmiddlewaretoken']").val(),
        },
        success: function (res) {
          if (res.status == "ok") {
            location.reload();

          } else {
            $('#input_error').removeClass('d-none');
          }
        }
      })
    }


  });
  $('#update_btn').click(function () {

    if ($('#up_username').val() == '' || $('#up_last_name').val() == '' || $('#up_first_name').val() == '' || $('#up_email').val() == '' || $('#up_is_superuser').val() == '') {
      $('#input_error2').removeClass('d-none');
    }
    else {
      $('#input_error2').addClass('d-none');
       $.ajax({
        
        url: '/update/'+ $('#up_id').val(),
        method: 'POST',
        data: {
          selection: "1",
          username: $('#up_username').val(),
          first_name: $('#up_first_name').val(),
          last_name: $('#up_last_name').val(),
          email: $('#up_email').val(),
          is_superuser: $('#up_is_superuser').val(),
          csrfmiddlewaretoken: $("input[name='csrfmiddlewaretoken']").val(),
        },
        success: function (res) {
          if (res.status == "ok") {
            location.reload();

          } else {
            $('#input_error2').removeClass('d-none');
          }
        }
      })
    }
    // $('#Edit_Modal').modal('hide');

  });


});

function showedit(e) {

  var id = e;

  $.ajax({
    url: '/getdata/' + id,
    method: 'GET',

    success: function (res) {
      if (res.status == "ok") {
        var username = res.contract.username;
        var first_name = res.contract.first_name;
        var last_name = res.contract.last_name;
        var email = res.contract.email;
        var is_superuser = res.contract.is_superuser;
        // var id = res.contract.id;

        $('[name="up_id"]').val(id);
        $('[name="up_username"]').val(username);
        $('[name="up_first_name"]').val(first_name);
        $('[name="up_last_name"]').val(last_name);
        $('[name="up_email"]').val(email);
        $('[name="up_is_superuser"]').val(is_superuser);
        $('#Edit_Modal').modal('show');
      } else {
        console.log(res);
      }
    }
  });
};

