$(document).ready(function () {

    $('#input_error').addClass('d-none');
    $('#input_error2').addClass('d-none');

    $('#showmodal').click(function () {
        var sel_tipo_producto = [];

        $.ajax({
            url: '/readdata/' + 1000000,
            method: 'POST',
            data: {
                selection: "producto",
                csrfmiddlewaretoken: $("input[name='csrfmiddlewaretoken']").val(),
            },
            success: function (res) {
                if (res.status == "ok") {
                    var tipo_producto = res.tipo_producto;

                    tipo_producto.forEach((item, index) => {
                        sel_tipo_producto[tipo_producto[index]['pk']] = item['fields']['DES_TIPO_PRODUCTO']
                    });

                    $('#new_tipo_producto').html('');

                    let select_options_tipo_producto = '';

                    for (index in sel_tipo_producto) {
                        select_options_tipo_producto += '<option value="' + index + '" ' + '>' + sel_tipo_producto[index] + '</option>'
                    }

                    $('#new_tipo_producto').html(select_options_tipo_producto);

                    $('#Add_Modal').modal('show');
                } else {
                    console.log(res);
                }
            }
        });

    });

    $('#add_btn').click(function () {
        if ($('#new_cod_producto').val() == '' || $('#new_des_producto').val() == '' || $('#new_metrica').val() == '' || $('#new_bloques').val() == '' || $('#new_minimo').val() == '') {
            $('#input_error').removeClass('d-none');
        }
        else {
            $('#input_error').addClass('d-none');

            $.ajax({
                url: '/create/',
                method: 'POST',
                data: {
                    selection: "producto",
                    ID_TIPO_PRODUCTO: $('#new_tipo_producto').val(),
                    COD_PRODUCTO: $('#new_cod_producto').val(),
                    DES_PRODUCTO: $('#new_des_producto').val(),
                    METRICA: $('#new_metrica').val(),
                    BLOQUES: $('#new_bloques').val(),
                    MINIMO: $('#new_minimo').val(),
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
        if ($('#cod_producto').val() == '' || $('#des_producto').val() == '' || $('#metrica').val() == '' || $('#bloques').val() == '' || $('#minimo').val() == '') {
            $('#input_error2').removeClass('d-none');
        }
        else {
            $('#input_error2').addClass('d-none');
            $.ajax({
                url: '/update/' + $('#id').val(),
                method: 'POST',
                data: {
                    selection: "producto",
                    ID_TIPO_PRODUCTO: $('#tipo_producto').val(),
                    COD_PRODUCTO: $('#cod_producto').val(),
                    DES_PRODUCTO: $('#des_producto').val(),
                    METRICA: $('#metrica').val(),
                    BLOQUES: $('#bloques').val(),
                    MINIMO: $('#minimo').val(),
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

function copydata(id) {
    var sel_tipo_producto = [];

    $.ajax({
        url: '/readdata/' + id,
        method: 'POST',
        data: {
            selection: "producto",
            csrfmiddlewaretoken: $("input[name='csrfmiddlewaretoken']").val(),
        },

        success: function (res) {
            if (res.status == "ok") {
                var tipo_producto = res.tipo_producto;

                tipo_producto.forEach((item, index) => {
                    sel_tipo_producto[tipo_producto[index]['pk']] = item['fields']['DES_TIPO_PRODUCTO']
                });

                $('#tipo_producto').html('');

                let select_options_tipo_producto = '';

                for (index in sel_tipo_producto) {
                    select_options_tipo_producto += '<option value="' + index + '" ' + ((res.producto.ID_TIPO_PRODUCTO == index) ? 'selected' : '') + '>' + sel_tipo_producto[index] + '</option>'
                }

                $('#new_tipo_producto').html(select_options_tipo_producto);
                $('#new_cod_producto').val(res.producto.COD_PRODUCTO);
                $('#new_des_producto').val(res.producto.DES_PRODUCTO);
                $('#new_metrica').val(res.producto.METRICA);
                $('#new_bloques').val(res.producto.BLOQUES);
                $('#new_minimo').val(res.producto.MINIMO);
                $('#new_id').val(id);
                $('#Add_Modal').modal('show');

            } else {
                console.log(res);
            }
        }
    });
}

function showedit(id) {

    var sel_tipo_producto = [];

    $.ajax({
        url: '/readdata/' + id,
        method: 'POST',
        data: {
            selection: "producto",
            csrfmiddlewaretoken: $("input[name='csrfmiddlewaretoken']").val(),
        },

        success: function (res) {
            if (res.status == "ok") {
                var tipo_producto = res.tipo_producto;

                tipo_producto.forEach((item, index) => {
                    sel_tipo_producto[tipo_producto[index]['pk']] = item['fields']['DES_TIPO_PRODUCTO']
                });

                $('#tipo_producto').html('');

                let select_options_tipo_producto = '';

                for (index in sel_tipo_producto) {
                    select_options_tipo_producto += '<option value="' + index + '" ' + ((res.producto.ID_TIPO_PRODUCTO == index) ? 'selected' : '') + '>' + sel_tipo_producto[index] + '</option>'
                }

                $('#tipo_producto').html(select_options_tipo_producto);
                $('#cod_producto').val(res.producto.COD_PRODUCTO);
                $('#des_producto').val(res.producto.DES_PRODUCTO);
                $('#metrica').val(res.producto.METRICA);
                $('#bloques').val(res.producto.BLOQUES);
                $('#minimo').val(res.producto.MINIMO);
                $('#id').val(id);
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
            selection: "producto",
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

