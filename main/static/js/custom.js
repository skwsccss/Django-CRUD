

$(document).ready(function () {
    $('#changepwd-error').addClass('d-none');
    $('#btn-changePwd').click(function () {
      if ($('#newpwd').val() != $('#confirmpwd').val() || $('#currentpwd').val() == '') {
        $('#changepwd-error').removeClass('d-none');
      } else {
        $('#changepwd-error').addClass('d-none');
        $.ajax({
          url: '/changepwd/',
          method: 'POST',
          data: {
            currentpwd: $('#currentpwd').val(),
            newpwd: $('#newpwd').val(),
            csrfmiddlewaretoken: $("input[name='csrfmiddlewaretoken']").val(),
          },
          success: function (res) {
            if (res.status == "ok") {
              $('#exampleModal-3').modal('hide');
            } else {
              $('#changepwd-error').removeClass('d-none');
            }
          }
        })
      }
    });
  });
/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }
  
  // Close the dropdown if the user clicks outside of it
  window.onclick = function(e) {
    if (!e.target.matches('.dropbtn')) {
    var myDropdown = document.getElementById("myDropdown");
      if (myDropdown.classList.contains('show')) {
        myDropdown.classList.remove('show');
      }
    }
  }

  