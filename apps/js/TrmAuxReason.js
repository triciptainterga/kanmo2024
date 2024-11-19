$(document).ready(function () {
    TrmAuxReason();
    $("#LoaderPage").hide();
});
function TrmAuxReason() {
    var myTable = $('#TrmAuxReason').DataTable();
    $.ajax({
        type: "POST",
        url: "asmx/TrmAuxReason.asmx/TableMasterAuxReason",
        data: "{TrxUserName: '" + $("#hd_sessionLogin").val() + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i = "";

            myTable.clear().draw();
            for (i = 0; i < json.length; i++) {

                var d = new Date(json[i].Datecreate);
                var milisegundos = parseInt(json[i].Datecreate.replace("/Date(", "").replace(")/", ""));
                var newDate = new Date(milisegundos).toLocaleDateString("en-UE");
                var newTime = new Date(milisegundos).toLocaleTimeString("en-UE");

                var urlClick = "<div class='dropdown'>" +
                    "<a data-toggle='dropdown' href='#'><i class='ti-more-alt rotate-90 text-black'></i></a>" +
                    "<div class='dropdown-menu dropdown-menu-right'>" +
                    "<a class='dropdown-item' href='#' onclick=showUpdate('" + json[i].ID + "')><i class='fa fa-pencil'></i> Edit</a>" +
                    "<a class='dropdown-item' href='#' onclick=showdDelete('" + json[i].ID + "')><i class='fa fa-trash-o'></i> Delete</a>" +
                    "</div>" +
                    "</div>"

                if (json[i].NA == "Y") {
                    var TrxParam = "<span class='badge badge-pill badge-success' style='width: 60px;'>Aktif</span>"
                } else {
                    var TrxParam = "<span class='badge badge-pill badge-danger' style='width: 60px;'>Non Aktif</span>"
                }
                myTable.row.add([json[i].ID, json[i].Deskripsi, TrxParam, urlClick]).draw(false);
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })

    //var JenisKondisi = "AllWhereData";
    //var NamaView = "UIDESK_TrmAux";
    //var KondisiData = "";
    //var jsonText = JSON.stringify({ tableType: JenisKondisi, tableName: NamaView, paramQuery: KondisiData });
    //var myTable = $('#TrmAuxReason').DataTable();
    //$.ajax({
    //    type: "POST",
    //    url: "WebServiceGetDataMaster.asmx/GetWhereRecords",
    //    data: jsonText,
    //    contentType: "application/json; charset=utf-8",
    //    dataType: "json",
    //    success: function (data) {
    //        var json = JSON.parse(data.d);
    //        var i, x, result = "";

    //        myTable.clear().draw();
    //        for (i = 0; i < json.length; i++) {

    //            var d = new Date(json[i].Datecreate);
    //            var milisegundos = parseInt(json[i].Datecreate.replace("/Date(", "").replace(")/", ""));
    //            var newDate = new Date(milisegundos).toLocaleDateString("en-UE");
    //            var newTime = new Date(milisegundos).toLocaleTimeString("en-UE");

    //            var urlClick = "<div class='dropdown'>" +
    //                "<a data-toggle='dropdown' href='#'><i class='ti-more-alt rotate-90 text-black'></i></a>" +
    //                "<div class='dropdown-menu dropdown-menu-right'>" +
    //                "<a class='dropdown-item' href='#' onclick=showUpdate('" + json[i].ID + "')><i class='fa fa-pencil'></i> Edit</a>" +
    //                "<a class='dropdown-item' href='#' onclick=showdDelete('" + json[i].ID + "')><i class='fa fa-trash-o'></i> Delete</a>" +
    //                "</div>" +
    //                "</div>"

    //            if (json[i].NA == "Y") {
    //                var TrxParam = "<span class='badge badge-pill badge-success' style='width: 60px;'>Aktif</span>"
    //            } else {
    //                var TrxParam = "<span class='badge badge-pill badge-danger' style='width: 60px;'>Non Aktif</span>"
    //            }
    //            myTable.row.add([json[i].ID, json[i].Deskripsi, TrxParam, json[i].Usercreate, newDate + ' ' + newTime, urlClick]).draw(false);
    //        }
    //    },
    //    error: function (xmlHttpRequest, textStatus, errorThrown) {
    //        console.log(xmlHttpRequest.responseText);
    //        console.log(textStatus);
    //        console.log(errorThrown);
    //    }
    //})
}
function TrmSelectAuxReason(rec_id) {
    $("#ContentPlaceHolder1_TrxID").val(rec_id);
    $.ajax({
        type: "POST",
        url: "asmx/TrmAuxReason.asmx/SelectedMasterAuxReason",
        data: "{TrxID:'" + $("#ContentPlaceHolder1_TrxID").val() + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i = "";

            for (i = 0; i < json.length; i++) {
                $("#Aux_Reason").val(json[i].Deskripsi);
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
function ActionSimpan() {
    if ($("#Aux_Reason").val() == "") {
        swal("Aux Reason is empty")
        return false;
    } else {
        var regex = /^[\u2019a-zA-ZÀ-ÿ0-9\s\\-]+$/;
        if (regex.test($("#Aux_Reason").val())) {
        } else {
            swal(
                '',
                'Data has been block',
                'error'
            ).then(function () {
                return false;
            });
            return false;
        }
    }
    if ($("#cmbStatus").val() == "" || $("#cmbStatus").val() == "Select") {
        swal("Status is empty")
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

                var form_data = JSON.stringify({ TrxID: "0", TrxAuxReason: $("#Aux_Reason").val(), TrxAuxStatus: $("#cmbStatus").val(), TrxUserName: $("#hd_sessionLogin").val(), TrxAction:'INSERT' });
                $.ajax({
                    url: "asmx/TrmAuxReason.asmx/MasterAuxReason",
                    method: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: form_data,
                    success: function () {
                        console.log(form_data)

                        swal("Done", {
                            icon: "success",
                        });
                        $("#ModalChannel").modal('hide');
                        TrmAuxReason();

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
    if ($("#ContentPlaceHolder1_TrxID").val() == "") {
        swal("Aux Reason is empty")
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

                var form_data = JSON.stringify({ TrxID: $("#ContentPlaceHolder1_TrxID").val(), TrxAuxReason: $("#Aux_Reason").val(), TrxAuxStatus: $("#cmbStatus").val(), TrxUserName: $("#hd_sessionLogin").val(), TrxAction: 'UPDATE' });
                $.ajax({
                    url: "asmx/TrmAuxReason.asmx/MasterAuxReason",
                    method: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: form_data,
                    success: function () {
                        console.log(form_data)

                        swal("Done", {
                            icon: "success",
                        });
                        $("#ModalChannel").modal('hide');
                        TrmAuxReason();

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
function ActionDelete() {
    if ($("#ContentPlaceHolder1_TrxID").val() == "") {
        swal("Aux Reason is empty")
        return false;
    }
    event.preventDefault();
    var form = document.forms["myForm"];
    swal({
        title: "Do you want to process?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {

                var form_data = JSON.stringify({ TrxID: $("#ContentPlaceHolder1_TrxID").val(), TrxAuxReason: $("#Aux_Reason").val(), TrxAuxStatus: $("#cmbStatus").val(), TrxUserName: $("#hd_sessionLogin").val(), TrxAction: 'DELETE' });
                $.ajax({
                    url: "asmx/TrmAuxReason.asmx/MasterAuxReason",
                    method: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: form_data,
                    success: function () {
                        console.log(form_data)

                        swal("Done", {
                            icon: "success",
                        });
                        $("#ModalChannel").modal('hide');
                        TrmAuxReason();

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
function showAdd() {
    $("#ContentPlaceHolder1_TrxID").val("");
    $("#Aux_Reason").val("");
    $("#cmbStatus option:selected").val("");
    $("#ModalChannel").modal('show');
    $("#Simpan").css("display", "block");
    $("#Update").css("display", "none");
    $("#Delete").css("display", "none");
}
function showUpdate(rec_id) {
    $("#ModalChannel").modal('show');
    $("#Simpan").css("display", "none");
    $("#Update").css("display", "block");
    $("#Delete").css("display", "none");
    $("#ContentPlaceHolder1_TrxID").val(rec_id);
    TrmSelectAuxReason($("#ContentPlaceHolder1_TrxID").val());
}
function showdDelete(rec_id) {
    $("#ModalChannel").modal('show');
    $("#Simpan").css("display", "none");
    $("#Update").css("display", "none");
    $("#Delete").css("display", "block");
    $("#ContentPlaceHolder1_TrxID").val(rec_id);
    TrmSelectAuxReason($("#ContentPlaceHolder1_TrxID").val());
}