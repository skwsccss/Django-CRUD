$(document).ready(function () {

    $('#input_error').addClass('d-none');
    $('#input_error2').addClass('d-none');

    $('#showmodal').click(function () {
        var sel_cliente = [];
       
        $.ajax({
            url: '/readdata/' + 1000000,
            method: 'POST',
            data: {
                selection: "contacto",
                csrfmiddlewaretoken: $("input[name='csrfmiddlewaretoken']").val(),
            },
            success: function (res) {
                if (res.status == "ok") {
                    var cliente = res.cliente;

                    cliente.forEach((item, index) => {
                        sel_cliente[cliente[index]['pk']] = item['fields']['COMENTARIO']
                    });

                    $('#new_cliente').html('');

                    let select_options_cliente = '';

                    for (index in sel_cliente) {
                        select_options_cliente += '<option value="' + index + '" ' + '>' + sel_cliente[index] + '</option>'
                    }
                   
                    $('#new_cliente').html(select_options_cliente);
                    
                    $('#Add_Modal').modal('show');
                } else {
                    console.log(res);
                }
            }
        });

    });

    $('#add_btn').click(function () {
        if ($('#new_cliente').val() == '' || $('#new_nombre_contacto').val() == '' || $('#new_mail').val() == '' || $('#new_telefono').val() == '' || $('#new_domicilio').val() == '' || $('#new_cp').val() == '' || $('#new_ciudad').val() == '' || $('#new_provincia').val() == '' || $('#new_pais').val() == '' || $('#new_prioridad').val() == '') {
            $('#input_error').removeClass('d-none');
        }
        else {
            $('#input_error').addClass('d-none');

            $.ajax({
                url: '/create/',
                method: 'POST',
                data: {
                    selection: "contacto",
                    ID_CLIENTE: $('#new_cliente').val(),
                    NOMBRE_CONTACTO: $('#new_nombre_contacto').val(),
                    MAIL: $('#new_mail').val(),
                    TELEFONO: $('#new_telefono').val(),
                    DOMICILIO: $('#new_domicilio').val(),
                    CP: $('#new_cp').val(),
                    CIUDAD: $('#new_ciudad').val(),
                    PROVINCIA: $('#new_provincia').val(),
                    PAIS: $('#new_pais').val(),
                    PRIORIDAD: $('#new_prioridad').val(),
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

        if ($('#cliente').val() == '' || $('#nombre_contacto').val() == '' || $('#mail').val() == '' || $('#telefono').val() == '' || $('#domicilio').val() == '' || $('#cp').val() == '' || $('#ciudad').val() == '' || $('#provincia').val() == '' || $('#pais').val() == '' || $('#prioridad').val() == '') {
            $('#input_error2').removeClass('d-none');
        }
        else {
            $('#input_error2').addClass('d-none');
            $.ajax({
                url: '/update/' + $('#id').val(),
                method: 'POST',
                data: {
                    selection: "contacto",
                    ID_CLIENTE: $('#cliente').val(),
                    NOMBRE_CONTACTO: $('#nombre_contacto').val(),
                    MAIL: $('#mail').val(),
                    TELEFONO: $('#telefono').val(),
                    DOMICILIO: $('#domicilio').val(),
                    CP: $('#cp').val(),
                    CIUDAD: $('#ciudad').val(),
                    PROVINCIA: $('#provincia').val(),
                    PAIS: $('#pais').val(),
                    PRIORIDAD: $('#prioridad').val(),
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

function showedit(id) {

    var sel_cliente = [];
    
    $.ajax({
        url: '/readdata/' + id,
        method: 'POST',
        data: {
            selection: "contacto",
            csrfmiddlewaretoken: $("input[name='csrfmiddlewaretoken']").val(),
        },

        success: function (res) {
            if (res.status == "ok") {
                var cliente = res.cliente;

                cliente.forEach((item, index) => {
                    sel_cliente[cliente[index]['pk']] = item['fields']['COMENTARIO']
                });
                
                $('#cliente').html('');

                let select_options_cliente = '';

                for (index in sel_cliente) {
                    select_options_cliente += '<option value="' + index + '" ' + ((res.contacto.ID_CLIENTE == index) ? 'selected' : '') + '>' + sel_cliente[index] + '</option>'
                }
                
                $('#cliente').html(select_options_cliente);
                $('#nombre_contacto').val(res.contacto.NOMBRE_CONTACTO);
                $('#mail').val(res.contacto.MAIL);
                $('#telefono').val(res.contacto.TELEFONO);
                $('#domicilio').val(res.contacto.DOMICILIO);
                $('#cp').val(res.contacto.CP);
                $('#ciudad').val(res.contacto.CIUDAD);
                $('#provincia').val(res.contacto.PROVINCIA);
                $('#pais').val(res.contacto.PAIS);
                $('#prioridad').val(res.contacto.PRIORIDAD);
                $('#Edit_Modal').modal('show');
                $('#id').val(id);
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
            selection: "contacto",
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

