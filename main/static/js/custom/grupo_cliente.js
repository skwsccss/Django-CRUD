$(document).ready(function () {

    $('#input_error').addClass('d-none');
    $('#input_error2').addClass('d-none');

    $('#showmodal').click(function () {

        $.ajax({
            url: '/readdata/' + 1000000,
            method: 'POST',
            data: {
                selection: "grupo_cliente",
                csrfmiddlewaretoken: $("input[name='csrfmiddlewaretoken']").val(),
            },
            success: function (res) {
                if (res.status == "ok") {
                    $('#Add_Modal').modal('show');
                } else {
                    console.log(res);
                }
            }
        });

    });

    $('#add_btn').click(function () {
        if ($('#new_cod_grupo_cliente').val() == '' || $('#new_des_grupo_cliente').val() == '') {
            $('#input_error').removeClass('d-none');
        }
        else {
            $('#input_error').addClass('d-none');
            
            console.log($('#new_fecha_fin_oc_cliente').val())
            $.ajax({
                url: '/create/',
                method: 'POST',
                data: {
                    selection: "grupo_cliente",
                    COD_GRUPO_CLIENTE: $('#new_cod_grupo_cliente').val(),
                    DES_GRUPO_CLIENTE: $('#new_des_grupo_cliente').val(),
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
                    selection: "grupo_cliente",
                    COD_GRUPO_CLIENTE: $('#cod_grupo_cliente').val(),
                    DES_GRUPO_CLIENTE: $('#des_grupo_cliente').val(),
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

    $.ajax({
        url: '/readdata/' + id,
        method: 'POST',
        data: {
            selection: "grupo_cliente",
            csrfmiddlewaretoken: $("input[name='csrfmiddlewaretoken']").val(),
        },

        success: function (res) {
            if (res.status == "ok") {
                $('#new_cod_grupo_cliente').val(res.grupo_cliente.COD_GRUPO_CLIENTE);
                $('#new_des_grupo_cliente').val(res.grupo_cliente.DES_GRUPO_CLIENTE);
               $('#Add_Modal').modal('show');
            } else {
                console.log(res);
            }
        }
    }); 
}

function showedit(id) {

    $.ajax({
        url: '/readdata/' + id,
        method: 'POST',
        data: {
            selection: "grupo_cliente",
            csrfmiddlewaretoken: $("input[name='csrfmiddlewaretoken']").val(),
        },

        success: function (res) {
            if (res.status == "ok") {
                $('#cod_grupo_cliente').val(res.grupo_cliente.COD_GRUPO_CLIENTE);
                $('#des_grupo_cliente').val(res.grupo_cliente.DES_GRUPO_CLIENTE);
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
            selection: "grupo_cliente",
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

