var added_count = 0;
function myaddEventListener() {
    $('input').change(function () {

        $('#new_apendice').val($('#new_des_apendice').val())
        $('#new_producto').val($('#new_des_producto').val())
        $('#new_total').val($('#new_cantidad').val() * $('#new_valor_unitario').val())
        $('#new_valor_venta').val(Math.round($('#new_total').val() * (1 - $('#new_descuento_cliente').val() / 100)))
        $('#new_costo_vendor').val(Math.round($('#new_total').val() * (1 - $('#new_descuento_vendor').val() / 100)))
        $('#new_costo_partner').val(Math.round($('#new_comision_partner').val() * $('#new_valor_venta').val() / 100))
        $('#new_costo_total').val(parseFloat($('#new_costo_vendor').val()) + parseFloat($('#new_costo_partner').val()))
        $('#new_margen').val($('#new_valor_venta').val() - $('#new_costo_total').val())

        for (let i = 1; i <= added_count; i++) {
            $('#new_apendice_' + i).val($('#new_des_apendice_' + i).val())
            $('#new_producto_' + i).val($('#new_des_producto_' + i).val())
            $('#new_total_' + i).val($('#new_cantidad_' + i).val() * $('#new_valor_unitario_' + i).val())
            $('#new_valor_venta_' + i).val($('#new_total_' + i).val() * (1 - $('#new_descuento_cliente_' + i).val() / 100))
            $('#new_costo_vendor_' + i).val($('#new_total_' + i).val() * (1 - $('#new_descuento_vendor_' + i).val() / 100))
            $('#new_costo_partner_' + i).val($('#new_comision_partner_' + i).val() * $('#new_valor_venta_' + i).val() / 100)
            $('#new_costo_total_' + i).val(parseFloat($('#new_costo_vendor_' + i).val()) + parseFloat($('#new_costo_partner_' + i).val()))
            $('#new_margen_' + i).val($('#new_valor_venta_' + i).val() - $('#new_costo_total_' + i).val())
        }
    })
    $('button').click(function () {
        for (let i = 1; i <= added_count; i++) {
            $('#delete_div_' + i).click(function () {
                $('#productsapendice_' + i).remove();
            })

        }
    })
}

$(document).ready(function () {
    myaddEventListener();

    $('#input_error').addClass('d-none');
    $('#input_error2').addClass('d-none');

    $('#showmodal').click(function () {
        var sel_contrato = [];
        var sel_contacto = [];
        var sel_vendedor = [];
        var sel_estado = [];

        $.ajax({
            url: '/readdata/' + 1000000,
            method: 'POST',
            data: {
                selection: "apendice",
                csrfmiddlewaretoken: $("input[name='csrfmiddlewaretoken']").val(),
            },
            success: function (res) {
                if (res.status == "ok") {
                    var contrato = res.contrato;
                    var vendedor = res.vendedor;
                    var estado = res.estado;
                    var contacto = res.contacto;
                    contrato.forEach((item, index) => {
                        sel_contrato[contrato[index]['pk']] = item['fields']['COMENTARIO']
                    });
                    vendedor.forEach((item, index) => {
                        sel_vendedor[vendedor[index]['pk']] = item['fields']['NOMBRE_VENDEDOR']
                    });
                    estado.forEach((item, index) => {
                        sel_estado[estado[index]['pk']] = item['fields']['DES_ESTADO']
                    });
                    contacto.forEach((item, index) => {
                        sel_contacto[contacto[index]['pk']] = item['fields']['MAIL']
                    });

                    $('#new_contrato').html('');
                    $('#new_vendedor').html('');
                    $('#new_estado').html('');
                    $('#new_contatco').html('');


                    let select_options_contrato = '';
                    let select_options_contacto = '';
                    let select_options_vendedor = '';
                    let select_options_estado = '';
                    console.log(sel_contrato)
                    for (index in sel_contrato) {
                        select_options_contrato += '<option value="' + index + '" ' + '>' + sel_contrato[index] + '</option>'
                    }
                    for (index in sel_vendedor) {
                        select_options_vendedor += '<option value="' + index + '" ' + '>' + sel_vendedor[index] + '</option>'
                    }
                    for (index in sel_estado) {
                        select_options_estado += '<option value="' + index + '" ' + '>' + sel_estado[index] + '</option>'
                    }
                    for (index in sel_contacto) {
                        select_options_contacto += '<option value="' + index + '" ' + '>' + sel_contacto[index] + '</option>'
                    }
                    $('#new_contrato').html(select_options_contrato);
                    $('#new_vendedor').html(select_options_vendedor);
                    $('#new_estado').html(select_options_estado);
                    $('#new_contacto').html(select_options_contacto);
                    $('#new_posicion').val(1);
                    $('#Add_Modal').modal('show');
                } else {
                    console.log(res);
                }
            }
        });

    });

    $('#add_btn').click(function () {
        if ($('#new_des_apendice').val() == '' || $('#new_comentario').val() == '') {
            $('#input_error').removeClass('d-none');
        }
        else {
            $('#input_error').addClass('d-none');
            if (document.getElementById("new_filnalizado").checked) { var ch = 1 }
            else { ch = 0 }
            $.ajax({
                url: '/create/',
                method: 'POST',
                data: {
                    selection: "apendice",
                    DES_APENDICE: $('#new_des_apendice').val(),
                    ID_CONTRATO: $('#new_contrato').val(),
                    ID_CONTACTO: $('#new_contacto').val(),
                    ID_VENDEDOR: $('#new_vendedor').val(),
                    ID_ESTADO: $('#new_estado').val(),
                    FECHA_INICIO: moment($('#new_fecha_inicio').val(), 'DD/MM/YYYY HH:mm').format("YYYY-MM-DD HH:mm"),
                    FECHA_FIN: moment($('#new_fecha_fin').val(), 'DD/MM/YYYY HH:mm').format("YYYY-MM-DD HH:mm"),
                    FECHA_FIN_OC_CLIENTE: moment($('#new_fecha_fin_oc_cliente').val(), 'DD/MM/YYYY HH:mm').format("YYYY-MM-DD HH:mm"),
                    FINALIZADO: ch,
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
                    selection: "apendice",
                    DES_APENDICE: $('#des_apendice').val(),
                    ID_CONTRATO: $('#contrato').val(),
                    ID_CONTACTO: $('#contacto').val(),
                    ID_VENDEDOR: $('#vendedor').val(),
                    ID_ESTADO: $('#estado').val(),
                    FECHA_INICIO: moment($('#fecha_inicio').val(), 'DD/MM/YYYY HH:mm').format("YYYY-MM-DD HH:mm"),
                    FECHA_FIN: moment($('#fecha_fin').val(), 'DD/MM/YYYY HH:mm').format("YYYY-MM-DD HH:mm"),
                    FECHA_FIN_OC_CLIENTE: moment($('#fecha_fin_oc_cliente').val(), 'DD/MM/YYYY HH:mm').format("YYYY-MM-DD HH:mm"),
                    // FINALIZADO: $('#finalizado').val(),
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

function copydata(id) {
    var sel_contrato = [];
    var sel_contacto = [];
    var sel_vendedor = [];
    var sel_estado = [];
    $.ajax({
        url: '/readdata/' + id,
        method: 'POST',
        data: {
            selection: "apendice",
            csrfmiddlewaretoken: $("input[name='csrfmiddlewaretoken']").val(),
        },

        success: function (res) {
            if (res.status == "ok") {
                var contrato = res.contrato;
                var vendedor = res.vendedor;
                var estado = res.estado;
                var contacto = res.contacto;

                contrato.forEach((item, index) => {
                    sel_contrato[contrato[index]['pk']] = item['fields']['ID_TIPO_CONTRATO']
                });
                vendedor.forEach((item, index) => {
                    sel_vendedor[vendedor[index]['pk']] = item['fields']['NOMBRE_VENDEDOR']
                });
                estado.forEach((item, index) => {
                    sel_estado[estado[index]['pk']] = item['fields']['DES_ESTADO']
                });
                contacto.forEach((item, index) => {
                    sel_contacto[contacto[index]['pk']] = item['fields']['MAIL']
                });

                $('#new_contrato').html('');
                $('#new_vendedor').html('');
                $('#new_estado').html('');
                $('#new_contatco').html('');


                let select_options_contrato = '';
                let select_options_contacto = '';
                let select_options_vendedor = '';
                let select_options_estado = '';

                for (index in sel_contrato) {
                    select_options_contrato += '<option value="' + index + '" ' + ((res.apendice.ID_CONTRATO == index) ? 'selected' : '') + '>' + sel_contrato[index] + '</option>'
                }
                for (index in sel_vendedor) {
                    select_options_vendedor += '<option value="' + index + '" ' + ((res.apendice.ID_VENDEDOR == index) ? 'selected' : '') + '>' + sel_vendedor[index] + '</option>'
                }
                for (index in sel_estado) {
                    select_options_estado += '<option value="' + index + '" ' + ((res.apendice.ID_ESTADO == index) ? 'selected' : '') + '>' + sel_estado[index] + '</option>'
                }
                for (index in sel_contacto) {
                    select_options_contacto += '<option value="' + index + '" ' + ((res.apendice.ID_CONTACTO == index) ? 'selected' : '') + '>' + sel_contacto[index] + '</option>'
                }
                if (res.apendice.FINALIZADO) {
                    document.getElementById("new_filnalizado").checked = true;
                } else {
                    document.getElementById("new_filnalizado").checked = false;
                }
                $('#new_contrato').html(select_options_contrato);
                $('#new_vendedor').html(select_options_vendedor);
                $('#new_estado').html(select_options_estado);
                $('#new_contacto').html(select_options_contacto);
                $('#new_id').val(id)
                $('#new_des_apendice').val(res.apendice.DES_APENDICE);
                $('#new_fecha_fin').val(conv_date(res.apendice.FECHA_FIN));
                $('#new_fecha_inicio').val(conv_date(res.apendice.FECHA_INICIO));
                $('#new_fecha_fin_oc_cliente').val(conv_date(res.apendice.FECHA_FIN_OC_CLIENTE));
                $('#new_comentario').val(res.apendice.COMENTARIO);
                $('#Add_Modal').modal('show');
            } else {
                console.log(res);
            }
        }
    });
}

function showedit(id) {

    var sel_contrato = [];
    var sel_contacto = [];
    var sel_vendedor = [];
    var sel_estado = [];
    $.ajax({
        url: '/readdata/' + id,
        method: 'POST',
        data: {
            selection: "apendice",
            csrfmiddlewaretoken: $("input[name='csrfmiddlewaretoken']").val(),
        },

        success: function (res) {
            if (res.status == "ok") {
                var contrato = res.contrato;
                var vendedor = res.vendedor;
                var estado = res.estado;
                var contacto = res.contacto;

                contrato.forEach((item, index) => {
                    sel_contrato[contrato[index]['pk']] = item['fields']['ID_TIPO_CONTRATO']
                });
                vendedor.forEach((item, index) => {
                    sel_vendedor[vendedor[index]['pk']] = item['fields']['NOMBRE_VENDEDOR']
                });
                estado.forEach((item, index) => {
                    sel_estado[estado[index]['pk']] = item['fields']['DES_ESTADO']
                });
                contacto.forEach((item, index) => {
                    sel_contacto[contacto[index]['pk']] = item['fields']['MAIL']
                });

                $('#contrato').html('');
                $('#vendedor').html('');
                $('#estado').html('');
                $('#contatco').html('');


                let select_options_contrato = '';
                let select_options_contacto = '';
                let select_options_vendedor = '';
                let select_options_estado = '';

                for (index in sel_contrato) {
                    select_options_contrato += '<option value="' + index + '" ' + ((res.apendice.ID_CONTRATO == index) ? 'selected' : '') + '>' + sel_contrato[index] + '</option>'
                }
                for (index in sel_vendedor) {
                    select_options_vendedor += '<option value="' + index + '" ' + ((res.apendice.ID_VENDEDOR == index) ? 'selected' : '') + '>' + sel_vendedor[index] + '</option>'
                }
                for (index in sel_estado) {
                    select_options_estado += '<option value="' + index + '" ' + ((res.apendice.ID_ESTADO == index) ? 'selected' : '') + '>' + sel_estado[index] + '</option>'
                }
                for (index in sel_contacto) {
                    select_options_contacto += '<option value="' + index + '" ' + ((res.apendice.ID_CONTACTO == index) ? 'selected' : '') + '>' + sel_contacto[index] + '</option>'
                }
                if (res.apendice.FINALIZADO) {
                    document.getElementById("filnalizado").checked = true;
                } else {
                    document.getElementById("filnalizado").checked = false;
                }
                $('#contrato').html(select_options_contrato);
                $('#vendedor').html(select_options_vendedor);
                $('#estado').html(select_options_estado);
                $('#contacto').html(select_options_contacto);
                $('#id').val(id)
                $('#des_apendice').val(res.apendice.DES_APENDICE);
                $('#fecha_fin').val(conv_date(res.apendice.FECHA_FIN));
                $('#fecha_inicio').val(conv_date(res.apendice.FECHA_INICIO));
                $('#fecha_fin_oc_cliente').val(conv_date(res.apendice.FECHA_FIN_OC_CLIENTE));
                $('#comentario').val(res.apendice.COMENTARIO);
                $('#Edit_Modal').modal('show');
            } else {
                console.log(res);
            }
        }
    });
};

function conv_date(param) {
    param = param.replace('T', ' ').replace('Z', '');
    param = moment(param, 'YYYY-MM-DD HH:mm').format("DD/MM/YYYY HH:mm");
    return param;
}

function delete_item(id) {
    $.ajax({
        url: '/delete/' + id,
        method: 'POST',
        data: {
            selection: "apendice",
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
(function () {

    var button = document.getElementById("newproductbtn");

    button.addEventListener("click", function () {
        var sourceNode = document.getElementById("productsapendice");
        var node = duplicateNode(sourceNode, ["id", "placeholder"]);

        sourceNode.parentNode.appendChild(node);
        added_count++;
        myaddEventListener();

        $('#new_cod_producto_' + added_count).val('')
        $('#new_des_producto_' + added_count).val('')
        $('#new_tipo_producto_' + added_count).val('')
        $('#new_metrica_' + added_count).val('')
        $('#new_bloques_' + added_count).val('')
        $('#new_minimo_' + added_count).val('')
        $('#new_apendice_' + added_count).val('')
        $('#new_producto_' + added_count).val('')
        $('#new_cantidad_' + added_count).val('')
        $('#new_valor_unitario_' + added_count).val('')
        $('#new_tipo_posicion_' + added_count).val('')
        $('#new_descuento_cliente_' + added_count).val('')
        $('#new_descuento_vendor_' + added_count).val('')
        $('#new_comision_partner_' + added_count).val('')
        $('#new_posicion_' + added_count).val(added_count + 1)
        $('#new_apendice_' + added_count).val('')
        $('#new_producto_' + added_count).val('')
        $('#new_total_' + added_count).val('')
        $('#new_valor_venta_' + added_count).val('')
        $('#new_costo_vendor_' + added_count).val('')
        $('#new_costo_total_' + added_count).val('')
        $('#new_costo_partner_' + added_count).val('')
        $('#new_margen_' + added_count).val('')
    }, false);


    var counter = 0;
    function duplicateNode(/*DOMNode*/sourceNode, /*Array*/attributesToBump) {
        counter++;
        var out = sourceNode.cloneNode(true);
        if (out.hasAttribute("id")) { out["id"] = bump(out["id"]); }
        var nodes = out.getElementsByTagName("*");

        for (var i = 0, len1 = nodes.length; i < len1; i++) {
            var node = nodes[i];
            for (var j = 0, len2 = attributesToBump.length; j < len2; j++) {
                var attribute = attributesToBump[j];
                if (node.hasAttribute(attribute)) {
                    node[attribute] = bump(node[attribute]);
                }
            }
        }

        function bump(/*String*/str) {
            return str + "_" + counter;
        }

        return out;
    }

})();


