﻿$(document).ready(function () {
    DropdownCmbGroupName()
    TrmProductType();
});
function TrmProductType() {
    var myTable = $('#TrmProductType').DataTable();
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/TableTransactionTrmProductType",
        data: "{TrxUserName: '" + $("#hd_sessionLogin").val() + "'}",
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
                    //"<a class='dropdown-item' href='#' onclick=showdDelete('" + json[i].ID + "','" + encodeURI(json[i].NamaPenyebab) + "','" + json[i].NA + "')><i class='fa fa-trash-o'></i> Delete</a>" +
                    "</div>" +
                    "</div>"
                if (json[i].Status == "Aktif") {
                    var TrxParam = "<span class='badge badge-pill badge-success' style='width: 70px;'>Aktif</span>"
                } else {
                    var TrxParam = "<span class='badge badge-pill badge-danger' style='width: 70px;'>Non Aktif</span>"
                }
                myTable.row.add([json[i].ID, json[i].BrandName, json[i].NamaPenyebab, TrxParam, urlClick]).draw(false);
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })

    //var JenisKondisi = "AllWhereData";
    //var NamaView = "TrmProductType";
    //var KondisiData = "";
    //var jsonText = JSON.stringify({ tableType: JenisKondisi, tableName: NamaView, paramQuery: KondisiData });
    //var myTable = $('#TrmProductType').DataTable();
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

    //            var d = new Date(json[i].DateCreate);
    //            var milisegundos = parseInt(json[i].DateCreate.replace("/Date(", "").replace(")/", ""));
    //            var newDate = new Date(milisegundos).toLocaleDateString("en-UE");
    //            var newTime = new Date(milisegundos).toLocaleTimeString("en-UE");

    //            var urlClick = "<div class='dropdown'>" +
    //                              "<a data-toggle='dropdown' href='#'><i class='ti-more-alt rotate-90 text-black'></i></a>" +
    //                              "<div class='dropdown-menu dropdown-menu-right'>" +
    //                              "<a class='dropdown-item' href='#' onclick=showUpdate('" + json[i].ID + "','" + encodeURI(json[i].NamaPenyebab) + "','" + json[i].NA + "')><i class='fa fa-pencil'></i> Edit</a>" +
    //                              "<a class='dropdown-item' href='#' onclick=showdDelete('" + json[i].ID + "','" + encodeURI(json[i].NamaPenyebab) + "','" + json[i].NA + "')><i class='fa fa-trash-o'></i> Delete</a>" +
    //                              "</div>" +
    //                          "</div>"
    //            if (json[i].Status == "Aktif") {
    //                var TrxParam = "<span class='badge badge-pill badge-success' style='width: 60px;'>Aktif</span>"
    //            } else {
    //                var TrxParam = "<span class='badge badge-pill badge-danger' style='width: 60px;'>Non Aktif</span>"
    //            }
    //            myTable.row.add([json[i].ID, json[i].NamaPenyebab, json[i].UserCreate, newDate + ' ' + newTime, TrxParam, urlClick]).draw(false);
    //        }

    //    },
    //    error: function (xmlHttpRequest, textStatus, errorThrown) {
    //        console.log(xmlHttpRequest.responseText);
    //        console.log(textStatus);
    //        console.log(errorThrown);
    //    }
    //})
}
function showAdd() {
    DropdownCmbGroupName()
    $("#ContentPlaceHolder1_TrxID").val("");
    $("#TxtProductType").val("");
    $("#cmbStatus").find("option:selected").text();
    $("#cmbStatus").val("");
    $("#ModalChannel").modal('show');
    $("#Simpan").css("display", "block");
    $("#Update").css("display", "none");
    $("#Delete").css("display", "none");
}
function showUpdate(TrxID) {
    $("#ModalChannel").modal('show');
    $("#Simpan").css("display", "none");
    $("#Update").css("display", "block");
    $("#Delete").css("display", "none");
    $("#ContentPlaceHolder1_TrxID").val(TrxID);
    TrmSelectProductName()
}
function showdDelete(TrxID, Name, Status) {
    //alert(Name)
    if (Status == 'N') {
        var TrxStatusjs = "Non Aktif";
    } else {
        var TrxStatusjs = "Aktif";
    }
    $("#ModalChannel").modal('show');
    $("#Simpan").css("display", "none");
    $("#Update").css("display", "none");
    $("#Delete").css("display", "block");
    //$('#TxtChannel').attr("disabled", true);
    $("#ContentPlaceHolder1_TrxID").val(TrxID);
    $("#TxtProductType").val(decodeURI(Name));
    $("#cmbStatus").find("option:selected").text();
    $("#cmbStatus").val(TrxStatusjs);
}
function ActionSimpan() {
    var TrxName = $("#TxtProductType").val();
    var TrxStatus = $("#cmbStatus").val();
    if ($("#CmbGroupName").val() == '') {
        swal(
            '',
            'Group Name is empty',
            'info'
        ).then(function () {
            return false
        });
        return false
    }
    if ($("#TxtProductType").val() == '') {
        swal(
            '',
            'Brand Category is empty',
            'info'
        ).then(function () {
            return false
        });
        return false
    }
    if ($("#cmbStatus").val() == '') {
        swal(
            '',
            'Status is empty',
            'info'
        ).then(function () {
            return false
        });
        return false
    }
    swal({
        title: "Do you want to process?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {

                var form_data = JSON.stringify({ TrxUserName: $("#hd_sessionLogin").val(), TrxGroup: $("#CmbGroupName").val(), TrxName: TrxName, TrxStatus: TrxStatus });
                $.ajax({
                    url: "WebServiceGetDataMaster.asmx/InsertTransactionTrmProductType",
                    method: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: form_data,
                    success: function (data) {

                        var json = JSON.parse(data.d);
                        var i = "";
                        for (i = 0; i < json.length; i++) {
                            if (json[i].Result == "True") {
                                swal(
                                    '',
                                    'Insert Data Has Been Success',
                                    'success'
                                ).then(function () {
                                    window.location.href = "TrmProductType.aspx";
                                });
                            } else {
                                swal(
                                    '',
                                    'Insert Data Has Been Failed !',
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
    var TrxName = $("#TxtProductType").val();
    var TrxStatus = $("#cmbStatus").val();
    if ($("#ContentPlaceHolder1_TrxID").val() == '') {
        swal(
            '',
            'Data is empty',
            'info'
        ).then(function () {
            return false
        });
        return false
    }
    if (TrxName == '') {
        swal(
            '',
            'Brand Category is empty',
            'info'
        ).then(function () {
            return false
        });
        return false
    }
    swal({
        title: "Do you want to process?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                var form_data = JSON.stringify({
                    TrxID: $("#ContentPlaceHolder1_TrxID").val(), TrxUserName: $("#hd_sessionLogin").val(), TrxGroup: $("#CmbGroupName").val(),
                    TrxName: TrxName, TrxStatus: TrxStatus, TrxAction: "UPDATE"
                });
                $.ajax({
                    url: "WebServiceGetDataMaster.asmx/UpdateTransactionTrmProductType",
                    method: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: form_data,
                    success: function (data) {

                        var json = JSON.parse(data.d);
                        var i = "";
                        for (i = 0; i < json.length; i++) {
                            if (json[i].Result == "True") {
                                swal(
                                    '',
                                    'Update Data Has Been Success',
                                    'success'
                                ).then(function () {
                                    window.location.href = "TrmProductType.aspx";
                                });
                            } else {
                                swal(
                                    '',
                                    'Update Data Has Been Failed !',
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
function ActionDelete() {
    var TrxName = $("#TxtProductType").val();
    var TrxStatus = $("#cmbStatus").val();
    if (TrxName == '') {
        swal("Category type is empty")
        return false;
    } else {
        var regex = /^[\u2019a-zA-ZÀ-ÿ0-9\s\\-]+$/;
        if (regex.test(TrxName)) {
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
    swal({
        title: "Do you want to process?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                var form_data = JSON.stringify({ TrxID: $("#ContentPlaceHolder1_TrxID").val(), TrxUserName: $("#hd_sessionLogin").val(), TrxName: TrxName, TrxStatus: TrxStatus, TrxAction: "DELETE" });
                $.ajax({
                    url: "WebServiceGetDataMaster.asmx/UpdateTransactionTrmProductType",
                    method: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    //data: "{ TrxUsername: '" + TrxUsername + "', TrxCustomerID: '" + TrxCustomerID + "',TxtThreadID: '" + TxtThreadID + "',TxtAccount: '" + TxtAccount + "',TrxPelapor: '" + TrxPelapor + "',TrxPelaporEmail: '" + TrxPelaporEmail + "',TrxPelaporPhone: '" + TrxPelaporPhone + "',TrxPelaporAddress: '" + encodeData(TrxPelaporAddress) + "',TrxKejadian: '" + TrxKejadian + "',TrxPenyebab: '" + TrxPenyebab + "',TrxPenerimaPengaduan: '" + TrxPenerimaPengaduan + "',TrxStatusPelapor: '" + TrxStatusPelapor + "',TrxSkalaPrioritas: '" + TrxSkalaPrioritas + "',TrxJenisNasabah: '" + TrxJenisNasabah + "',TrxNomorRekening: '" + TrxNomorRekening + "',TrxSumberInformasi: '" + TrxSumberInformasi + "',TrxCategory: '" + TrxCategory + "',TrxLevel1: '" + TrxLevel1 + "',TrxLevel2: '" + TrxLevel2 + "',TrxLevel3: '" + TrxLevel3 + "',TrxComplaint: '" + encodeData(TrxComplaint) + "',TrxResponse: '" + encodeData(TrxResponse) + "',TrxChannel: '" + TrxChannel + "',TrxStatus: '" + TrxStatus + "',TrxEskalasi: '" + TrxEskalasi + "',TrxSLA: '" + TrxSLA + "',TrxExtendCategory: '" + TrxExtendCategory + "',TrxLayer: '" + TrxLayer + "',TrxThreadID:'" + TxtThreadID + "', TrxGenesysID:'" + TrxGenesysID + "', TxtContactID:'" + TxtContactID + "'}",
                    data: form_data,
                    success: function () {
                        console.log(form_data)
                        var TrxMessage = 'Your data <b>' + $("#TxtProductType").val() + '</b> has been Update'
                        AutoValidasiSuccess($("#hd_sessionLogin").val(), TrxMessage);

                        $("#TxtProductType").val("");
                        $("#cmbStatus").val("");
                        $("#ModalChannel").modal('hide');
                        TrmProductType();
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
            else {
                $("#ModalChannel").modal('hide');
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
function DropdownCmbGroupName() {
    var cmbproductType = $('#CmbGroupName');
    $.ajax({
        type: "POST",
        url: "asmx/TrmProductName.asmx/Uidesk_MBrandName",
        data: "{TrxUserName: '" + $("#hd_sessionLogin").val() + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "";

            cmbproductType.empty();
            cmbproductType.append('<option value="">Select</option>');
            for (i = 0; i < json.length; i++) {
                result = '<option value="' + json[i].BrandID + '">' + json[i].BrandName + '</option>';
                cmbproductType.append(result);
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function TrmSelectProductName() {
    $.ajax({
        type: "POST",
        url: "asmx/TrmProductName.asmx/BrandCategory",
        data: "{TrxID:'" + $("#ContentPlaceHolder1_TrxID").val() + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i = "";

            for (i = 0; i < json.length; i++) {
                $("#CmbGroupName  option:selected").text(json[i].BrandName)
                $("#CmbGroupName  option:selected").val(json[i].ID_Penyebab)
                $("#TxtProductType").val(json[i].NamaPenyebab);
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