(function($) {
  'use strict';
  var iconTochange;
  dragula([document.getElementById("dragula-left"), document.getElementById("dragula-right")]);
  dragula([document.getElementById("profile-list-left"), document.getElementById("profile-list-right")]);
  dragula([document.getElementById("dragula-event-left"), document.getElementById("dragula-event-right")])
    .on('drop', function(el) {
      console.log($(el));
      iconTochange = $(el).find('.fas');
      if (iconTochange.hasClass('fa-check')) {
        iconTochange.removeClass('fa-check text-primary').addClass('fa-check-double text-success');
      } else if (iconTochange.hasClass('fa-check-double')) {
        iconTochange.removeClass('fa-check-double text-success').addClass('fa-check text-primary');
      }
    })
})(jQuery);