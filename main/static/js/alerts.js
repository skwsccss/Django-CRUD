(function ($) {
  showSwal = function (type) {
    $.ajax({
      url: 'getusername/',
      method: 'GET',
      success: function (res) {
        swal({
          title: 'Welcome!',
          text: 'Username: ' + res.username + '\n' + 'Email:' + ' ' + res.email,
          icon: 'success',
          button: {
            text: "Close",
            value: true,
            visible: true,
            className: "btn btn-primary"
          }
        });
      }
    });



  }

})(jQuery);