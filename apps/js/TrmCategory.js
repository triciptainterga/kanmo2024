$(document).ready(function () {
    TrmCategory();
    Brand()
    $("#LoaderPage").hide();
});
function Brand() {
    var cmbBrand = $('#cmbBrand');
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction:'UIDESK117'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, resultBrand = "";

            for (i = 0; i < json.length; i++) {

                resultBrand = '<option value="' + json[i].BrandID + '">' + json[i].BrandName + '</option>';
                cmbBrand.append(resultBrand);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function htmlEncode(str) {
    return String(str).replace(/[^\w. ]/gi, function (c) {
        return '&#' + c.charCodeAt(0) + ';';
    });
}
function TrmCategory() {
    var myTable = $('#TrmCategory').DataTable();
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/SelectTransactionTrmCategory",
        data: "{TrxID:'-', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxBrand:'0', TrxName: '-', TrxStatus: '-'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i = "";

            myTable.clear().draw();
            for (i = 0; i < json.length; i++) {

                var d = new Date(json[i].DateCreate);
                var milisegundos = parseInt(json[i].DateCreate.replace("/Date(", "").replace(")/", ""));
                var newDate = new Date(milisegundos).toLocaleDateString("en-UE");
                var newTime = new Date(milisegundos).toLocaleTimeString("en-UE");

                var urlClick = "<div class='dropdown'>" +
                    "<a data-toggle='dropdown' href='#'><i class='ti-more-alt rotate-90 text-black'></i></a>" +
                    "<div class='dropdown-menu dropdown-menu-right'>" +
                    "<a class='dropdown-item' href='#' onclick=showUpdate('" + json[i].ID + "')><i class='fa fa-pencil'></i> Edit</a>" +
                    "</div>" +
                    "</div>"

                if (json[i].Status == "Aktif") {
                    var TrxParam = "<span class='badge badge-pill badge-success' style='width: 60px;'>Aktif</span>"
                } else {
                    var TrxParam = "<span class='badge badge-pill badge-danger' style='width: 60px;'>Non Aktif</span>"
                }
                myTable.row.add([json[i].ID, json[i].BrandName, json[i].Name, TrxParam, urlClick]).draw(false);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function showAdd() {
    $('#TxtCategoryName').attr("disabled", false);
    $("#TxtCategoryName").val("");
    $("#ModalChannel").modal('show');
    $("#Simpan").css("display", "block");
    $("#Update").css("display", "none");
}
function showUpdate(TrxID) {
    $("#ModalChannel").modal('show');
    $("#Simpan").css("display", "none");
    $("#Update").css("display", "block");
    $("#ContentPlaceHolder1_TrxID").val(TrxID);
    TrmSelect()
}
function ActionSimpan() {
    if ($("#TxtCategoryName").val() == '') {
        swal(
            '',
            'Category Is Empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#cmbStatus").val() == '') {
        swal(
            '',
            'Status Is Empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    swal({
        title: "Do you want to process?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {

                var form_data = JSON.stringify({ TrxUserName: $("#hd_sessionLogin").val(), TrxBrand: $("#cmbBrand").val(), TrxName: $("#TxtCategoryName").val(), TrxStatus: $("#cmbStatus").val() });
                $.ajax({
                    url: "WebServiceGetDataMaster.asmx/InsertTransactionTrmCategory",
                    method: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: form_data,
                    success: function (data) {

                        for (i = 0; i < json.length; i++) {
                            if (json[i].Result == "True") {
                                swal(
                                    '',
                                    'Insert Data Has Been Success',
                                    'success'
                                ).then(function () {
                                    location.href = "TrmCategory.aspx"
                                });
                            } else {
                                swal(
                                    '',
                                    'Insert Data Has Been Failed!',
                                    'error'
                                ).then(function () {
                                    return false;
                                });
                                return false;
                            }
                        }
                        
                    },
                    error: function (xmlHttpRequest, textStatus, errorThrown) {
                        console.log(xmlHttpRequest.responseText);
                        console.log(textStatus);
                        console.log(errorThrown);
                    },
                    complete: function () {

                    }
                });

            }
        });
}
function ActionUpdate() {
    if ($("#ContentPlaceHolder1_TrxID").val() == '') {
        swal(
            '',
            'Data Is Empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    $("#cmbStatus").find("option:selected").text();
    swal({
        title: "Do you want to process?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {

                $("#LoaderPage").show();
                var form_data = JSON.stringify({ TrxID: $("#ContentPlaceHolder1_TrxID").val(), TrxUserName: $("#hd_sessionLogin").val(), TrxBrand: $("#cmbBrand").val(), TrxName: TrxName, TrxStatus: $("#cmbStatus").val() });
                $.ajax({
                    url: "WebServiceGetDataMaster.asmx/UpdateTransactionTrmCategory",
                    method: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: form_data,
                    success: function (data) {

                        for (i = 0; i < json.length; i++) {
                            if (json[i].Result == "True") {
                                swal(
                                    '',
                                    'Update Data Has Been Success',
                                    'success'
                                ).then(function () {
                                    location.href = "TrmCategory.aspx"
                                });
                            } else {
                                swal(
                                    '',
                                    'Update Data Has Been Failed!',
                                    'error'
                                ).then(function () {
                                    return false;
                                });
                                return false;
                            }
                        }

                    },
                    error: function (xmlHttpRequest, textStatus, errorThrown) {
                        console.log(xmlHttpRequest.responseText);
                        console.log(textStatus);
                        console.log(errorThrown);
                    },
                    complete: function () {

                    }
                });

            }
        });
}
function AutoValidasiSuccess(TrxCreatedby, Message) {
    $.toast({
        heading: '<b>Hi agent ' + TrxCreatedby + '</b>',
        text: '' + Message + '',
        position: 'top-right',
        loaderBg: '#ff6849',
        icon: 'success',
        hideAfter: 3500,
        stack: 6
    });
    //return false
}
function TrmSelect() {
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'" + $("#ContentPlaceHolder1_TrxID").val() + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction:'UIDESK118'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i = "";

            for (i = 0; i < json.length; i++) {

                $("#cmbBrand").val(json[i].BrandID);
                $('#cmbBrand').attr('disabled', true);
                $("#TxtCategoryName").val(json[i].Name);
                $('#TxtCategoryName').attr('disabled', true);
                $("#cmbStatus").find("option:selected").text();
                $("#cmbStatus").val(json[i].NA);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}