$(document).ready(function () {

    $('#input_error').addClass('d-none');
    $('#input_error2').addClass('d-none');

    $('#showmodal').click(function () {
        var sel_pais = [];
        var sel_industria = [];
        var sel_grupo_cliente = [];

        $.ajax({
            url: '/readdata/' + 1000000,
            method: 'POST',
            data: {
                selection: "cliente",
                csrfmiddlewaretoken: $("input[name='csrfmiddlewaretoken']").val(),
            },
            success: function (res) {
                if (res.status == "ok") {
                    var pais = res.pais;
                    var industria = res.industria;
                    var grupo_cliente = res.grupo_cliente;

                    pais.forEach((item, index) => {
                        sel_pais[pais[index]['pk']] = item['fields']['DES_PAIS']
                    });
                    industria.forEach((item, index) => {
                        sel_industria[industria[index]['pk']] = item['fields']['DES_INDUSTRIA']
                    });
                    grupo_cliente.forEach((item, index) => {
                        sel_grupo_cliente[grupo_cliente[index]['pk']] = item['fields']['DES_GRUPO_CLIENTE']
                    });

                    $('#new_pais').html('');
                    $('#new_industria').html('');
                    $('#new_grupo_cliente').html('');


                    let select_options_pais = '';
                    let select_options_industria = '';
                    let select_options_grupo_cliente = '';

                    for (index in sel_pais) {
                        select_options_pais += '<option value="' + index + '" ' + '>' + sel_pais[index] + '</option>'
                    }
                    for (index in sel_grupo_cliente) {
                        select_options_grupo_cliente += '<option value="' + index + '" ' + '>' + sel_grupo_cliente[index] + '</option>'
                    }
                    for (index in sel_industria) {
                        select_options_industria += '<option value="' + index + '" ' + '>' + sel_industria[index] + '</option>'
                    }
                    $('#new_pais').html(select_options_pais);
                    $('#new_industria').html(select_options_grupo_cliente);
                    $('#new_grupo_cliente').html(select_options_industria);

                    $('#Add_Modal').modal('show');
                } else {
                    console.log(res);
                }
            }
        });

    });

    $('#add_btn').click(function () {
        if ($('#new_fecha_alta').val() == '' || $('#new_num_cliente_prov').val() == '' || $('#new_num_cliente_plng').val() == '' || $('#new_razon_social').val() == '' || $('#new_clave_fiscal').val() == '' || $('#new_comentario').val() == '') {
            $('#input_error').removeClass('d-none');
        }
        else {
            $('#input_error').addClass('d-none');
            $.ajax({
                url: '/create/',
                method: 'POST',
                data: {
                    selection: "cliente",
                    ID_PAIS: $('#new_pais').val(),
                    ID_INDUSTRIA: $('#new_industria').val(),
                    ID_GRUPO_CLIENTE: $('#new_grupo_cliente').val(),
                    FECHA_ALTA: moment($('#new_fecha_alta').val(), 'DD/MM/YYYY HH:mm').format("YYYY-MM-DD HH:mm"),
                    NUM_CLIENTE_PROV: $('#new_num_cliente_prov').val(),
                    NUM_CLIENTE_PLNG: $('#new_num_cliente_plng').val(),
                    RAZON_SOCIAL: $('#new_razon_social').val(),
                    CLAVE_FISCAL: $('#new_clave_fiscal').val(),
                    COMENTARIO: $('#new_comentario').val(),
                    csrfmiddlewaretoken: $("input[name='csrfmiddlewaretoken']").val(),
                },
                success: function (res) {
                    if (res.status == "ok") {
                        location.reload();

                    } else {
                        $('#input_error').removeClass('d-none');
                        // console.log(res.message)
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
                url: '/update/' + $('#id').val(),
                method: 'POST',
                data: {
                    selection: "cliente",
                    ID_PAIS: $('#pais').val(),
                    ID_INDUSTRIA: $('#industria').val(),
                    ID_GRUPO_CLIENTE: $('#grupo_cliente').val(),
                    FECHA_ALTA: moment($('#fecha_alta').val(), 'DD/MM/YYYY HH:mm').format("YYYY-MM-DD HH:mm"),
                    NUM_CLIENTE_PROV: $('#num_cliente_prov').val(),
                    NUM_CLIENTE_PLNG: $('#num_cliente_plng').val(),
                    RAZON_SOCIAL: $('#razon_social').val(),
                    CLAVE_FISCAL: $('#clave_fiscal').val(),
                    COMENTARIO: $('#comentario').val(),
                    csrfmiddlewaretoken: $("input[name='csrfmiddlewaretoken']").val(),
                },
                success: function (res) {
                    if (res.status == "ok") {
                        location.reload();

                    } else {
                        $('#input_error2').removeClass('d-none');
                        console.log(res.message)
                    }
                }
            })
        }
        // $('#Edit_Modal').modal('hide');

    });


});

function copydata(id){
    var sel_pais = [];
    var sel_industria = [];
    var sel_grupo_cliente = [];
    $.ajax({
        url: '/readdata/' + id,
        method: 'POST',
        data: {
            selection: "cliente",
            csrfmiddlewaretoken: $("input[name='csrfmiddlewaretoken']").val(),
        },

        success: function (res) {
            if (res.status == "ok") {
                var industria = res.industria;
                var pais = res.pais;
                var grupo_cliente = res.grupo_cliente;

                pais.forEach((item, index) => {
                    sel_pais[pais[index]['pk']] = item['fields']['DES_PAIS']
                });
                industria.forEach((item, index) => {
                    sel_industria[industria[index]['pk']] = item['fields']['DES_INDUSTRIA']
                });
                grupo_cliente.forEach((item, index) => {
                    sel_grupo_cliente[grupo_cliente[index]['pk']] = item['fields']['DES_GRUPO_CLIENTE']
                });

                $('#industria').html('');
                $('#pais').html('');
                $('#grupo_cliente').html('');

                let select_options_pais = '';
                let select_options_industria = '';
                let select_options_grupo_cliente = '';

                for (index in sel_pais) {
                    select_options_pais += '<option value="' + index + '" ' + ((res.cliente.ID_PAIS == index) ? 'selected' : '') + '>' + sel_pais[index] + '</option>'
                }
                for (index in sel_grupo_cliente) {
                    select_options_grupo_cliente += '<option value="' + index + '" ' + ((res.cliente.ID_GRUPO_CLIENTE == index) ? 'selected' : '') + '>' + sel_grupo_cliente[index] + '</option>'
                }
                for (index in sel_industria) {
                    select_options_industria += '<option value="' + index + '" ' + ((res.cliente.ID_INDISTRIA == index) ? 'selected' : '') + '>' + sel_industria[index] + '</option>'
                }

                var fecha_alta = res.cliente.FECHA_ALTA;
                fecha_alta = fecha_alta.replace('T', ' ').replace('Z','');
                fecha_alta = moment(fecha_alta, 'YYYY-MM-DD HH:mm').format("DD/MM/YYYY HH:mm");
                console.log(fecha_alta)
                $('#new_pais').html(select_options_pais);
                $('#new_grupo_cliente').html(select_options_grupo_cliente);
                $('#new_industria').html(select_options_industria);
                $('#new_fecha_alta').val(fecha_alta);
                $('#new_num_cliente_prov').val(res.cliente.NUM_CLIENTE_PROV);
                $('#new_num_cliente_plng').val(res.cliente.NUM_CLIENTE_PLNG);
                $('#new_razon_social').val(res.cliente.RAZON_SOCIAL);
                $('#new_clave_fiscal').val(res.cliente.CLAVE_FISCAL);
                $('#new_comentario').val(res.cliente.COMENTARIO);
                $('#Add_Modal').modal('show');
            } else {
                console.log(res);
            }
        }
    });
}
function showedit(id) {

    var sel_pais = [];
    var sel_industria = [];
    var sel_grupo_cliente = [];
    $.ajax({
        url: '/readdata/' + id,
        method: 'POST',
        data: {
            selection: "cliente",
            csrfmiddlewaretoken: $("input[name='csrfmiddlewaretoken']").val(),
        },

        success: function (res) {
            if (res.status == "ok") {
                var industria = res.industria;
                var pais = res.pais;
                var grupo_cliente = res.grupo_cliente;

                pais.forEach((item, index) => {
                    sel_pais[pais[index]['pk']] = item['fields']['DES_PAIS']
                });
                industria.forEach((item, index) => {
                    sel_industria[industria[index]['pk']] = item['fields']['DES_INDUSTRIA']
                });
                grupo_cliente.forEach((item, index) => {
                    sel_grupo_cliente[grupo_cliente[index]['pk']] = item['fields']['DES_GRUPO_CLIENTE']
                });

                $('#industria').html('');
                $('#pais').html('');
                $('#grupo_cliente').html('');

                let select_options_pais = '';
                let select_options_industria = '';
                let select_options_grupo_cliente = '';

                for (index in sel_pais) {
                    select_options_pais += '<option value="' + index + '" ' + ((res.cliente.ID_PAIS == index) ? 'selected' : '') + '>' + sel_pais[index] + '</option>'
                }
                for (index in sel_grupo_cliente) {
                    select_options_grupo_cliente += '<option value="' + index + '" ' + ((res.cliente.ID_GRUPO_CLIENTE == index) ? 'selected' : '') + '>' + sel_grupo_cliente[index] + '</option>'
                }
                for (index in sel_industria) {
                    select_options_industria += '<option value="' + index + '" ' + ((res.cliente.ID_INDISTRIA == index) ? 'selected' : '') + '>' + sel_industria[index] + '</option>'
                }

                var fecha_alta = res.cliente.FECHA_ALTA;
                fecha_alta = fecha_alta.replace('T', ' ').replace('Z','');
                fecha_alta = moment(fecha_alta, 'YYYY-MM-DD HH:mm').format("DD/MM/YYYY HH:mm");
                console.log(fecha_alta)
                $('#pais').html(select_options_pais);
                $('#grupo_cliente').html(select_options_grupo_cliente);
                $('#industria').html(select_options_industria);
                $('#id').val(id)
                $('#fecha_alta').val(fecha_alta);
                $('#num_cliente_prov').val(res.cliente.NUM_CLIENTE_PROV);
                $('#num_cliente_plng').val(res.cliente.NUM_CLIENTE_PLNG);
                $('#razon_social').val(res.cliente.RAZON_SOCIAL);
                $('#clave_fiscal').val(res.cliente.CLAVE_FISCAL);
                $('#comentario').val(res.cliente.COMENTARIO);
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
            selection: "cliente",
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

