$(document).ready(function () {

  $('#input_error').addClass('d-none');
  $('#input_error2').addClass('d-none');

  $('#showmodal').click(function () {
    var sel_pro = [];
    var sel_uni = [];
    var sel_soc = [];
    var sel_pais = [];
    var sel_cliente = [];
    var sel_contacto = [];
    var sel_tipo = [];
    var sel_region = [];
    $.ajax({
      url: '/readdata/' + 1000000,
      method: 'POST',
      data: {
        selection: "contrato",
        csrfmiddlewaretoken: $("input[name='csrfmiddlewaretoken']").val(),
      },

      success: function (res) {
        if (res.status == "ok") {
          var proveedor = res.proveedor;
          var unidad_negocio = res.unidad_negocio;
          var sociedad = res.sociedad;
          var pais = res.pais;
          var cliente = res.cliente;
          var contacto = res.contacto;
          var tipo_contrato = res.tipo_contrato;
          var region = res.region;

          proveedor.forEach((item, index) => {
            sel_pro[proveedor[index]['pk']] = item['fields']['DES_PROVEEDOR']
          });
          unidad_negocio.forEach((item, index) => {
            sel_uni[unidad_negocio[index]['pk']] = item['fields']['DES_UNIDAD_NEGOCIO']
          });
          sociedad.forEach((item, index) => {
            sel_soc[sociedad[index]['pk']] = item['fields']['RAZON_SOCIAL']
          });
          pais.forEach((item, index) => {
            sel_pais[pais[index]['pk']] = item['fields']['DES_PAIS']
          });
          cliente.forEach((item, index) => {
            sel_cliente[cliente[index]['pk']] = item['fields']['RAZON_SOCIAL']
          });
          contacto.forEach((item, index) => {
            sel_contacto[contacto[index]['pk']] = item['fields']['MAIL']
          });
          tipo_contrato.forEach((item, index) => {
            sel_tipo[tipo_contrato[index]['pk']] = item['fields']['DES_TIPO_CONTRATO']
          });
          region.forEach((item, index) => {
            sel_region[region[index]['pk']] = item['fields']['DES_REGION']
          });

          $('#proveedor').html('');
          $('#unidad_negocio').html('');
          $('#sociedad').html('');
          $('#pais').html('');
          $('#cliente').html('');
          $('#contacto').html('');
          $('#tipo_contrato').html('');
          $('#region').html('');

          let select_options_pro = '';
          let select_options_uni = '';
          let select_options_soc = '';
          let select_options_cliente = '';
          let select_options_pais = '';
          let select_options_contacto = '';
          let select_options_tipo = '';
          let select_options_region = '';
          for (index in sel_pro) {
            select_options_pro += '<option value="' + index + '" ' + '>' + sel_pro[index] + '</option>'
          }
          for (index in sel_uni) {
            select_options_uni += '<option value="' + index + '" ' + '>' + sel_uni[index] + '</option>'
          }
          for (index in sel_soc) {
            select_options_soc += '<option value="' + index + '" ' + '>' + sel_soc[index] + '</option>'
          }
          for (index in sel_pais) {
            select_options_pais += '<option value="' + index + '" ' + '>' + sel_pais[index] + '</option>'
          }
          for (index in sel_cliente) {
            select_options_cliente += '<option value="' + index + '" ' + '>' + sel_cliente[index] + '</option>'
          }
          for (index in sel_contacto) {
            select_options_contacto += '<option value="' + index + '" ' + '>' + sel_contacto[index] + '</option>'
          }
          for (index in sel_tipo) {
            select_options_tipo += '<option value="' + index + '" ' + '>' + sel_tipo[index] + '</option>'
          }
          for (index in sel_region) {
            select_options_region += '<option value="' + index + '" ' + '>' + sel_region[index] + '</option>'
          }
          $('#new_proveedor').html(select_options_pro);
          $('#new_unidad_negocio').html(select_options_uni);
          $('#new_sociedad').html(select_options_soc);
          $('#new_pais').html(select_options_pais);
          $('#new_cliente').html(select_options_cliente);
          $('#new_contacto').html(select_options_contacto);
          $('#new_tipo_contrato').html(select_options_tipo);
          $('#new_region').html(select_options_region);

          $('#Add_Modal').modal('show');
        } else {
          console.log(res);
        }
      }
    });

  });

  $('#add_btn').click(function () {
    if ($('#new_finalizado').val() == '' || $('#new_comentario').val() == '') {
      $('#input_error').removeClass('d-none');
    }
    else {
      $('#input_error').addClass('d-none');
      $.ajax({
        url: '/create/',
        method: 'POST',
        data: {
          selection: "contrato",
          ID_PROVEEDOR: $('#new_proveedor').val(),
          ID_UNIDAD_NEGOCIO: $('#new_unidad_negocio').val(),
          ID_SOCIEDAD: $('#new_sociedad').val(),
          ID_PAIS: $('#new_pais').val(),
          ID_CLIENTE: $('#new_cliente').val(),
          ID_CONTACTO: $('#new_contacto').val(),
          ID_TIPO_CONTRATO: $('#new_tipo_contrato').val(),
          ID_REGION: $('#new_region').val(),
          FECHA_INICIO: moment($('#new_fecha_inicio').val(), 'DD/MM/YYYY HH:mm').format("YYYY-MM-DD HH:mm"),
          FECHA_FIN: moment($('#new_fecha_fin').val(), 'DD/MM/YYYY HH:mm').format("YYYY-MM-DD HH:mm"),
          FECHA_FIRMA: moment($('#new_fecha_firma').val(), 'DD/MM/YYYY HH:mm').format("YYYY-MM-DD HH:mm"),
          // FINALIZADO: $('#finalizado').val(),
          COMENTARIO: $('#new_comentario').val(),
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

    if ($('#finalizado').val() == '' || $('#comentario').val() == '') {
      $('#input_error2').removeClass('d-none');
    }
    else {
      $('#input_error2').addClass('d-none');
      $.ajax({
        url: '/update/' + $('#up_id').val(),
        method: 'POST',
        data: {
          selection: "contrato",
          ID_PROVEEDOR: $('#proveedor').val(),
          ID_UNIDAD_NEGOCIO: $('#unidad_negocio').val(),
          ID_SOCIEDAD: $('#sociedad').val(),
          ID_PAIS: $('#pais').val(),
          ID_CLIENTE: $('#cliente').val(),
          ID_CONTACTO: $('#contacto').val(),
          ID_TIPO_CONTRATO: $('#tipo_contrato').val(),
          ID_REGION: $('#region').val(),
          FINALIZADO: $('#finalizado').val(),
          FECHA_INICIO: moment($('#fecha_inicio').val(), 'DD/MM/YYYY HH:mm').format("YYYY-MM-DD HH:mm"),
          FECHA_FIN: moment($('#fecha_fin').val(), 'DD/MM/YYYY HH:mm').format("YYYY-MM-DD HH:mm"),
          FECHA_FIRMA: moment($('#fecha_firma').val(), 'DD/MM/YYYY HH:mm').format("YYYY-MM-DD HH:mm"),
          COMENTARIO: $('#comentario').val(),
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
  var sel_pro = [];
  var sel_uni = [];
  var sel_soc = [];
  var sel_pais = [];
  var sel_cliente = [];
  var sel_contacto = [];
  var sel_tipo = [];
  var sel_region = [];
  $.ajax({
    url: '/readdata/' + id,
    method: 'POST',
    data: {
      selection: "contrato",
      csrfmiddlewaretoken: $("input[name='csrfmiddlewaretoken']").val(),
    },
    success: function (res) {
      if (res.status == "ok") {
        var proveedor = res.proveedor;
        var unidad_negocio = res.unidad_negocio;
        var sociedad = res.sociedad;
        var pais = res.pais;
        var cliente = res.cliente;
        var contacto = res.contacto;
        var tipo_contrato = res.tipo_contrato;
        var region = res.region;

        proveedor.forEach((item, index) => {
          sel_pro[proveedor[index]['pk']] = item['fields']['DES_PROVEEDOR']
        });
        unidad_negocio.forEach((item, index) => {
          sel_uni[unidad_negocio[index]['pk']] = item['fields']['DES_UNIDAD_NEGOCIO']
        });
        sociedad.forEach((item, index) => {
          sel_soc[sociedad[index]['pk']] = item['fields']['RAZON_SOCIAL']
        });
        pais.forEach((item, index) => {
          sel_pais[pais[index]['pk']] = item['fields']['DES_PAIS']
        });
        cliente.forEach((item, index) => {
          sel_cliente[cliente[index]['pk']] = item['fields']['RAZON_SOCIAL']
        });
        contacto.forEach((item, index) => {
          sel_contacto[contacto[index]['pk']] = item['fields']['MAIL']
        });
        tipo_contrato.forEach((item, index) => {
          sel_tipo[tipo_contrato[index]['pk']] = item['fields']['DES_TIPO_CONTRATO']
        });
        region.forEach((item, index) => {
          sel_region[region[index]['pk']] = item['fields']['DES_REGION']
        });

        $('#proveedor').html('');
        $('#unidad_negocio').html('');
        $('#sociedad').html('');
        $('#pais').html('');
        $('#cliente').html('');
        $('#contacto').html('');
        $('#tipo_contrato').html('');
        $('#region').html('');

        let select_options_pro = '';
        let select_options_uni = '';
        let select_options_soc = '';
        let select_options_cliente = '';
        let select_options_pais = '';
        let select_options_contacto = '';
        let select_options_tipo = '';
        let select_options_region = '';
        for (index in sel_pro) {
          select_options_pro += '<option value="' + index + '" ' + ((res.contract.ID_PROVEEDOR == index) ? 'selected' : '') + '>' + sel_pro[index] + '</option>'
        }
        for (index in sel_uni) {
          select_options_uni += '<option value="' + index + '" ' + ((res.contract.ID_UNIDAD_NEGOCIO == index) ? 'selected' : '') + '>' + sel_uni[index] + '</option>'
        }
        for (index in sel_soc) {
          select_options_soc += '<option value="' + index + '" ' + ((res.contract.ID_SOCIEDAD == index) ? 'selected' : '') + '>' + sel_soc[index] + '</option>'
        }
        for (index in sel_pais) {
          select_options_pais += '<option value="' + index + '" ' + ((res.contract.ID_PAIS == index) ? 'selected' : '') + '>' + sel_pais[index] + '</option>'
        }
        for (index in sel_cliente) {
          select_options_cliente += '<option value="' + index + '" ' + ((res.contract.ID_CLIENTE == index) ? 'selected' : '') + '>' + sel_cliente[index] + '</option>'
        }
        for (index in sel_contacto) {
          select_options_contacto += '<option value="' + index + '" ' + ((res.contract.ID_CONTACTO == index) ? 'selected' : '') + '>' + sel_contacto[index] + '</option>'
        }
        for (index in sel_tipo) {
          select_options_tipo += '<option value="' + index + '" ' + ((res.contract.ID_TIPO_CONTRATO == index) ? 'selected' : '') + '>' + sel_tipo[index] + '</option>'
        }
        for (index in sel_region) {
          select_options_region += '<option value="' + index + '" ' + ((res.contract.ID_REGION == index) ? 'selected' : '') + '>' + sel_region[index] + '</option>'
        }
        $('#proveedor').html(select_options_pro);
        $('#unidad_negocio').html(select_options_uni);
        $('#sociedad').html(select_options_soc);
        $('#pais').html(select_options_pais);
        $('#cliente').html(select_options_cliente);
        $('#contacto').html(select_options_contacto);
        $('#tipo_contrato').html(select_options_tipo);
        $('#region').html(select_options_region);
        $('#finalizado').val(res.contract.FINALIZADO);
        $('#fecha_fin').val(conv_date(res.contract.FECHA_FIN));
        $('#fecha_inicio').val(conv_date(res.contract.FECHA_INICIO));
        $('#fecha_firma').val(conv_date(res.contract.FECHA_FIRMA));
        $('#comentario').val(res.contract.COMENTARIO);
        $('#up_id').val(id)
        $('#Edit_Modal').modal('show');
      } else {
        console.log(res);
      }
    }
  });
};

function delete_item(id) {
  $.ajax({
    url: '/delete/' + id,
    method: 'POST',
    data: {
      selection: "contrato",
      csrfmiddlewaretoken: $("input[name='csrfmiddlewaretoken']").val(),
    },
    success: function (res) {
      if (res.status == "ok") {
        location.reload();
      } else {
        console.log(res)
      }
    }
  });
};

function conv_date(param) {
  param = param.replace('T', ' ').replace('Z', '');
  param = moment(param, 'YYYY-MM-DD HH:mm').format("DD/MM/YYYY HH:mm");
  return param;
}