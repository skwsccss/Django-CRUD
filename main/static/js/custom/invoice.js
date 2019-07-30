function fnFormatDetails(table_id, html) {
  var sOut = "<table id=\"exampleTable_" + table_id + "\">";
  sOut += html;
  sOut += "</table>";
  return sOut;
}

//////////////////////////////////////////////////////////// EXTERNAL DATA - Array of Objects 

var terranImage = "https://i.imgur.com/HhCfFSb.jpg"; 
var jaedongImage = "https://i.imgur.com/s3OMQ09.png";
var grubbyImage = "https://i.imgur.com/wnEiUxt.png";
var stephanoImage = "https://i.imgur.com/vYJHVSQ.jpg";
var scarlettImage = "https://i.imgur.com/zKamh3P.jpg";

// DETAILS ROW A 
var detailsRowAPlayer1 = { pic: jaedongImage, name: "Jaedong", team: "evil geniuses", server: "NA" };
var detailsRowAPlayer2 = { pic: scarlettImage, name: "Scarlett", team: "acer", server: "Europe" };
var detailsRowAPlayer3 = { pic: stephanoImage, name: "Stephano", team: "evil geniuses", server: "Europe" };
                       
var detailsRowA = [ detailsRowAPlayer1, detailsRowAPlayer2, detailsRowAPlayer3 ];

// DETAILS ROW B 
var detailsRowBPlayer1 = { pic: grubbyImage, name: "Grubby", team: "independent", server: "Europe" };
                       
var detailsRowB = [ detailsRowBPlayer1 ];
                  
// DETAILS ROW C 
var detailsRowCPlayer1 = { pic: terranImage, name: "Bomber", team: "independent", server: "NA" };
                       
var detailsRowC = [ detailsRowCPlayer1 ];

var rowA = { race: "Zerg", year: "2014", total: "3", details: detailsRowA};
var rowB = { race: "Protoss", year: "2014", total: "1", details: detailsRowB};
var rowC = { race: "Terran", year: "2014", total: "1", details: detailsRowC};

var newRowData = [rowA, rowB, rowC] ;

////////////////////////////////////////////////////////////

var iTableCounter = 1;
  var oTable;
  var oInnerTable;
  var detailsTableHtml;



$(document).ready(function () {
// you would probably be using templates here
detailsTableHtml = $("#detailsTable").html();

//Insert a 'details' column to the table
var nCloneTh = document.createElement('th');
var nCloneTd = document.createElement('td');
nCloneTd.innerHTML = '<img src="http://i.imgur.com/SD7Dz.png">';
nCloneTd.className = "center";

$('#exampleTable thead tr').each(function () {
    this.insertBefore(nCloneTh, this.childNodes[0]);
});

$('#exampleTable tbody tr').each(function () {
    this.insertBefore(nCloneTd.cloneNode(true), this.childNodes[0]);
});


//Initialse DataTables, with no sorting on the 'details' column
var oTable = $('#exampleTable').dataTable({
    "bJQueryUI": true,
    "aaData": newRowData,
    "bPaginate": false,
    "aoColumns": [
        {
           "mDataProp": null,
           "sClass": "control center",
           "sDefaultContent": '<img src="http://i.imgur.com/SD7Dz.png">'
        },
        { "mDataProp": "race" },
        { "mDataProp": "year" },
        { "mDataProp": "total" }
    ],
    "oLanguage": {
  "sInfo": "_TOTAL_ entries"
},
    "aaSorting": [[1, 'asc']]
});

/* Add event listener for opening and closing details
* Note that the indicator for showing which row is open is not controlled by DataTables,
* rather it is done here
*/
$('#exampleTable tbody td img').live('click', function () {
    var nTr = $(this).parents('tr')[0];
    var nTds = this;
    
    if (oTable.fnIsOpen(nTr)) {
        /* This row is already open - close it */
        this.src = "http://i.imgur.com/SD7Dz.png";
        oTable.fnClose(nTr);
    }
    else {
        /* Open this row */
        var rowIndex = oTable.fnGetPosition( $(nTds).closest('tr')[0] ); 
      var detailsRowData = newRowData[rowIndex].details;
       
        this.src = "http://i.imgur.com/d4ICC.png";
        oTable.fnOpen(nTr, fnFormatDetails(iTableCounter, detailsTableHtml), 'details');
        oInnerTable = $("#exampleTable_" + iTableCounter).dataTable({
            "bJQueryUI": true,
            "bFilter": false,
            "aaData": detailsRowData,
            "bSort" : true, // disables sorting
            "aoColumns": [
            { "mDataProp": "pic" },
          { "mDataProp": "name" },
          { "mDataProp": "team" },
          { "mDataProp": "server" }
      ],
            "bPaginate": false,
            "oLanguage": {
    "sInfo": "_TOTAL_ entries"
      },
            "fnRowCallback": function( nRow, aData, iDisplayIndex, iDisplayIndexFull ) {
              var imgLink = aData['pic']; 
              var imgTag = '<img width="100px" src="' + imgLink + '"/>';
              $('td:eq(0)', nRow).html(imgTag);  
             return nRow;
            }
        });
        iTableCounter = iTableCounter + 1;
    }
});


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
        url: '/getdata/' + 1000000,
        method: 'GET',
  
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
              sel_pro[index + 1] = item['fields']['DES_PROVEEDOR']
            });
            unidad_negocio.forEach((item, index) => {
              sel_uni[index + 1] = item['fields']['DES_UNIDAD_NEGOCIO']
            });
            sociedad.forEach((item, index) => {
              sel_soc[index + 1] = item['fields']['RAZON_SOCIAL']
            });
            pais.forEach((item, index) => {
              sel_pais[index + 1] = item['fields']['DES_PAIS']
            });
            cliente.forEach((item, index) => {
              sel_cliente[index + 1] = item['fields']['RAZON_SOCIAL']
            });
            contacto.forEach((item, index) => {
              sel_contacto[index + 1] = item['fields']['MAIL']
            });
            tipo_contrato.forEach((item, index) => {
              sel_tipo[index + 1] = item['fields']['DES_TIPO_CONTRATO']
            });
            region.forEach((item, index) => {
              sel_region[index + 1] = item['fields']['DES_REGION']
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
          url: '/add/',
          method: 'POST',
          data: {
            selection: "1",
            ID_PROVEEDOR: $('#new_proveedor').val(),
            ID_UNIDAD_NEGOCIO: $('#new_unidad_negocio').val(),
            ID_SOCIEDAD: $('#new_sociedad').val(),
            ID_PAIS: $('#new_pais').val(),
            ID_CLIENTE: $('#new_cliente').val(),
            ID_CONTACTO: $('#new_contacto').val(),
            ID_TIPO_CONTRATO: $('#new_tipo_contrato').val(),
            ID_REGION: $('#new_region').val(),
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
            selection: "1",
            ID_PROVEEDOR: $('#proveedor').val(),
            ID_UNIDAD_NEGOCIO: $('#unidad_negocio').val(),
            ID_SOCIEDAD: $('#sociedad').val(),
            ID_PAIS: $('#pais').val(),
            ID_CLIENTE: $('#cliente').val(),
            ID_CONTACTO: $('#contacto').val(),
            ID_TIPO_CONTRATO: $('#tipo_contrato').val(),
            ID_REGION: $('#region').val(),
            FINALIZADO: $('#finalizado').val(),
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
      url: '/getdata/' + id,
      method: 'GET',
  
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
            sel_pro[index + 1] = item['fields']['DES_PROVEEDOR']
          });
          unidad_negocio.forEach((item, index) => {
            sel_uni[index + 1] = item['fields']['DES_UNIDAD_NEGOCIO']
          });
          sociedad.forEach((item, index) => {
            sel_soc[index + 1] = item['fields']['RAZON_SOCIAL']
          });
          pais.forEach((item, index) => {
            sel_pais[index + 1] = item['fields']['DES_PAIS']
          });
          cliente.forEach((item, index) => {
            sel_cliente[index + 1] = item['fields']['RAZON_SOCIAL']
          });
          contacto.forEach((item, index) => {
            sel_contacto[index + 1] = item['fields']['MAIL']
          });
          tipo_contrato.forEach((item, index) => {
            sel_tipo[index + 1] = item['fields']['DES_TIPO_CONTRATO']
          });
          region.forEach((item, index) => {
            sel_region[index + 1] = item['fields']['DES_REGION']
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
          $('#comentario').val(res.contract.COMENTARIO);
          $('#up_id').val(id)
          $('#Edit_Modal').modal('show');
        } else {
          console.log(res);
        }
      }
    });
  };
  
  function delete_item(id){
    $.ajax({
      url: '/delete/' + id,
      method: 'POST',
      data: {
        selection: "1",
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


  
  