﻿$(document).ready(function () {
    $("#TxtSearchingCustomer").on("input", function () {
        var jumlahString = $(this).val().length;
        if (jumlahString >= 3) {
            searchingCustomer($(this).val());
        } else if (jumlahString == 0) {
            searchingCustomer($(this).val(""));
        }
    });
    TrmCustomer();
    comboBox();

    var cmbDatacusTomerProvince = $('#cusTomerProvince');
    var resultSourceCategory = "";
    // Replace ./data.json with your JSON feed
    fetch('https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json').then(response => {
        return response.json();
    }).then(data => {

        for (i = 0; i < data.length; i++) {
            resultSourceCategory = '<option value="' + data[i].id + '">' + data[i].name + '</option>';
            cmbDatacusTomerProvince.append(resultSourceCategory);
        }
        console.log(data);

    }).catch(err => {
        // Do something for an error here
    });

});
function comboBox() {
    var cmbOtherChannel = $('#cmbOtherChannel');
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'UIDESK0001', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK32'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, resultChannel = "";
            for (i = 0; i < json.length; i++) {

                resultChannel = '<option value="' + json[i].Name + '">' + json[i].Name + '</option>';
                cmbOtherChannel.append(resultChannel);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function TrmCustomer() {
    var divCustomer = $('#divCustomer');
    $.ajax({
        type: "POST",
        url: "asmx/TrmCustomer.asmx/UIDESK_TrxCustomer",
        data: "{TrxID:'0', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxSearching:'0', TrxAction:'Table'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x, resultCustomer = "";

            for (i = 0; i < json.length; i++) {
                if (json[i].JenisKelamin == 'Male') {
                    var TrxGender = "3"
                } else if (json[i].JenisKelamin == 'Female') {
                    var TrxGender = "2"
                } else {
                    var TrxGender = "2"
                }
                resultCustomer = '<div class="media bg-white box-shadowed mb-15">' +
                    '<a class="align-self-center mr-0" href="#"><img class="avatar avatar-lg" src="../images/avatar/' + TrxGender + '.jpg" alt="..."></a>' +
                    '<div class="media-body">' +
                    '<p><a class="hover-primary" href="#" onclick="selectedCustomer(' + json[i].CustomerID + ')"><strong>' + json[i].Name + '</strong></a></p>' +
                    '<p class="font-size-10">' + json[i].Email + '</p>' +
                    '<p class="font-size-10">' + json[i].HP + '</p>' +
                    '</div>' +
                    '</div>'
                divCustomer.append(resultCustomer);
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function searchingCustomer(TrxCustomer) {
    var divCustomer = $('#divCustomer');
    $.ajax({
        type: "POST",
        url: "asmx/TrmCustomer.asmx/UIDESK_TrxCustomer",
        data: "{TrxID:'0', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxSearching:'" + TrxCustomer + "', TrxAction:'Searching'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x, resultCustomer = "";

            divCustomer.empty();
            if (json.length == 0) {
                console.log("data not found " + i);
                resultCustomer = '<div class="media media-single" > No data found... </div>';
                divCustomer.append(resultCustomer);
            } else {
                for (i = 0; i < json.length; i++) {
                    if (json[i].JenisKelamin == 'Male') {
                        var TrxGender = "3"
                    } else {
                        var TrxGender = "2"
                    }
                    resultCustomer = '<div class="media bg-white box-shadowed mb-15">' +
                        '<a class="align-self-center mr-0" href="#"><img class="avatar avatar-lg" src="../images/avatar/' + TrxGender + '.jpg" alt="..."></a>' +
                        '<div class="media-body">' +
                        '<p><a class="hover-primary" href="#" onclick="selectedCustomer(' + json[i].CustomerID + ')"><strong>' + json[i].Name + '</strong></a></p>' +
                        '<p class="font-size-10">' + json[i].Email + '</p>' +
                        '<p class="font-size-10">' + json[i].HP + '</p>' +
                        '</div>' +
                        '</div>'
                    divCustomer.append(resultCustomer);
                }
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function selectedCustomer(TrxCustomer) {
    $("#modal-searching-other").modal('hide');
    $("#ContentPlaceHolder1_TrxCustomerID").val(TrxCustomer)
    $("#TxtSearchingCustomer").val("");

    $.ajax({
        type: "POST",
        url: "asmx/TrmCustomer.asmx/UIDESK_TrxCustomer",
        data: "{TrxID:'" + $("#ContentPlaceHolder1_TrxCustomerID").val() + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxSearching:'0', TrxAction:'Select'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x;

            for (i = 0; i < json.length; i++) {

                $("#Customer_Name").val(json[i].Name);
                $("#Customer_Email").val(json[i].Email);
                $("#Customer_Phone").val(json[i].HP);
                $("#Profile_Name").val(json[i].Name);
                $("#Profile_Email").val(json[i].Email);
                $("#Profile_Phone").val(json[i].HP);
                var milisegundos = parseInt(json[i].Birth.replace("/Date(", "").replace(")/", ""));
                var newDate = new Date(milisegundos).toLocaleDateString("en-GB");
                var getDateBirth = newDate.split('/');
                $("#Profile_Birth").val(getDateBirth[2] + "-" + getDateBirth[1] + "-" + getDateBirth[0]);
                $("#Profile_Gender").val(json[i].JenisKelamin);
                $('#Profile_State').val(json[i].NIK);
                $("#Facebook_Account").val(json[i].Facebook);
                $("#Instagram_BarCode").val(json[i].Instagram);
                $("#Instagram_Account").val(json[i].Instagram);
                $("#Twitter_Account").val(json[i].Twitter);
                CKEDITOR.instances.Profile_Address.setData(json[i].Alamat)
                CKEDITOR.instances.Profile_Address2.setData(json[i].AlamatIP)
                $("#cusTomerProvince option:selected").text(json[i].Provinsi);
                $("#cusTomerCity option:selected").text(json[i].Kota);
                $("#cusTomerDistrict option:selected").text(json[i].Kelurahan);
                $("#cusTomerZipCode option:selected").text(json[i].Desa);

                TrmHistoryTicket($("#ContentPlaceHolder1_TrxCustomerID").val());
                TrmChannelInformation($("#ContentPlaceHolder1_TrxCustomerID").val());
                TrmCustomer();

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function TrmHistoryTicket(TrxCustomerID) {
    var myTable = $('#TableHistoryTicket').DataTable();
    $.ajax({
        type: "POST",
        url: "asmx/TrmCustomer.asmx/UIDESK_TrxCustomer",
        data: "{TrxID:'" + TrxCustomerID + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxSearching:'0', TrxAction:'Ticket'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x, resultCustomer = "";

            myTable.clear().draw();
            for (i = 0; i < json.length; i++) {

                var d = new Date(json[i].DateCreate);
                var milisegundos = parseInt(json[i].DateCreate.replace("/Date(", "").replace(")/", ""));
                var newDate = new Date(milisegundos).toLocaleDateString("en-UE");
                var newTime = new Date(milisegundos).toLocaleTimeString("en-UE");

                if (json[i].Status == 'Open') {
                    var StatusColor = "primary"
                } else if (json[i].Status == 'Closed' || json[i].Status == 'Solved') {
                    var StatusColor = "danger"
                } else if (json[i].Status == 'Pending') {
                    var StatusColor = "warning"
                }
                var Status = "<span class='badge badge-pill badge-" + StatusColor + "' style='width: 60px;'>" + json[i].Status + "</span>"
                myTable.row.add([json[i].TicketNumber, json[i].CategoryName, Status, json[i].UserCreate, newDate + ' ' + newTime]).draw(false);
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function TrmChannelInformation(TrxCustomerID) {
    var myTable = $('#TableChannelInformation').DataTable();
    $.ajax({
        type: "POST",
        url: "asmx/TrmCustomer.asmx/UIDESK_TrxCustomer",
        data: "{TrxID:'" + TrxCustomerID + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxSearching:'0', TrxAction:'Channel'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x, resultCustomer = "";

            myTable.clear().draw();
            for (i = 0; i < json.length; i++) {

                var d = new Date(json[i].DateCreate);
                var milisegundos = parseInt(json[i].DateCreate.replace("/Date(", "").replace(")/", ""));
                var newDate = new Date(milisegundos).toLocaleDateString("en-UE");
                var newTime = new Date(milisegundos).toLocaleTimeString("en-UE");

                var urlClick = "<div class='dropdown'>" +
                    "<a data-toggle='dropdown' href='#'><i class='ti-more-alt rotate-90 text-black'></i></a>" +
                    "<div class='dropdown-menu dropdown-menu-right'>" +
                    "<a class='dropdown-item' href='#' onclick=addChannel()><i class='fa fa-plus'></i>New</a>" +
                    "<a class='dropdown-item' href='#' onclick=UpdatePopUP('" + json[i].ID + "','" + json[i].CustomerID + "','" + json[i].ValueChannel + "','" + json[i].FlagChannel + "')><i class='fa fa-pencil'></i>Edit</a>" +
                    "<a class='dropdown-item' href='#' onclick=DeletePopUP('" + json[i].ID + "','" + json[i].CustomerID + "','" + json[i].ValueChannel + "','" + json[i].FlagChannel + "')><i class='fa fa-trash-o'></i>Delete</a>" +
                    "</div>" +
                    "</div>"
                var Status = "<span class='badge badge-pill badge-" + json[i].StatusColor + "' style='width: 70px;'>" + json[i].StatusNya + "</span>"
                myTable.row.add([json[i].FlagChannel, json[i].ValueChannel, Status, json[i].UserCreate, newDate + ' ' + newTime, urlClick]).draw(false);
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function addChannel() {
    $("#ModalOtherChannelCustomer").modal('show');
    $("#SimpanOtherChannel").css("display", "block");
    $("#UpdateOtherChannel").css("display", "none");
    $("#DeleteOtherChannel").css("display", "none");
}
function ActionOtherChannel(Action) {
    console.log("ActionOtherChannel : " + $("#ContentPlaceHolder1_TrxCustomerID").val());
    if (Action == 'Simpan') {
        if ($("#ContentPlaceHolder1_TrxCustomerID").val() == "") {
            AutoValidasiWarning($("#hd_sessionLogin").val(), "Your data <b>customer</b> is empty ")
            return false
        }
        if ($("#TxtChannelValue").val() == "") {
            AutoValidasiWarning($("#TxtChannelValue").val(), "Your data <b>value channel</b> is empty ")
            return false
        }
        if ($("#cmbOtherChannel").val() == "") {
            AutoValidasiWarning($("#TxtChannelValue").val(), "Your data <b>channel type</b> is empty ")
            return false
        }
        var TrxChannelType = $("#cmbOtherChannel").val();
        var ActionSP = "InsertOtherChannel"
        var TrxID = "0";
    } else if (Action == 'Update') {
        var TrxChannelType = $("#cmbOtherChannel option:selected").text();
        var ActionSP = "UpdateOtherChannel"
        var TrxID = $("#ContentPlaceHolder1_TrxID").val();
    } else {
        var TrxChannelType = "Delete";
        var ActionSP = "DeleteOtherChannel"
        var TrxID = $("#ContentPlaceHolder1_TrxID").val();
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
                    TrxID: TrxID,
                    TrxUserName: $("#hd_sessionLogin").val(), TrxCustomerID: $("#ContentPlaceHolder1_TrxCustomerID").val(),
                    TrxChannelValue: $("#TxtChannelValue").val(), TrxChannelType: TrxChannelType
                });
                $.ajax({
                    url: "asmx/ServiceCustomer.asmx/" + ActionSP + "",
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
                                    $("#TxtChannelValue").val("");
                                    $("#cmbOtherChannel").val("");
                                    $("#ModalOtherChannelCustomer").modal('hide');
                                    TrmChannelInformation($("#ContentPlaceHolder1_TrxCustomerID").val());
                                });
                            } else {
                                swal(
                                    '',
                                    'Insert Data Has Been Failed',
                                    'error'
                                ).then(function () {
                                    $("#TxtChannelValue").val("");
                                    $("#cmbOtherChannel").val("");
                                    $("#ModalOtherChannelCustomer").modal('hide');
                                    TrmChannelInformation($("#ContentPlaceHolder1_TrxCustomerID").val());
                                });
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
        })
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
}
function addProduct() {
    $("#ModalProduct").modal('show');
    $("#SimpanProduct").css("display", "block");
}
function ActionProduct() {
    if ($("#ContentPlaceHolder1_TrxCustomerID").val() == "") {
        AutoValidasiWarning($("#hd_sessionLogin").val(), "Your data <b>customer</b> is empty ")
        return false
    }
    var TrxProduct = $("#Product_Name").val();
    var TrxDescription = $("#Textarea_Description").val();
    var TrxType = $("#Product_Type").val();
    var TrxStatus = $("#cmb_Status").val();
    if ($("#Product_Name").val() == '') {
        AutoValidasiWarning($("#hd_sessionLogin").val(), "<b>Product Name</b> is empty")
        return false
    }
    if ($("#Textarea_Description").val() == '') {
        AutoValidasiWarning($("#hd_sessionLogin").val(), "<b>Description</b> is empty")
        return false
    }
    if ($("#Product_Type").val() == '') {
        AutoValidasiWarning($("#hd_sessionLogin").val(), "<b>Product Type</b> is empty")
        return false
    }
    if ($("#cmb_Status").val() == '') {
        AutoValidasiWarning($("#hd_sessionLogin").val(), "<b>Status</b> is empty")
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
                    TrxCustomerID: $("#ContentPlaceHolder1_TrxCustomerID").val(), TrxUserName: $("#hd_sessionLogin").val(), TrxProduct: TrxProduct,
                    TrxDescription: TrxDescription, TrxType: TrxType, TrxStatus: TrxStatus
                });
                $.ajax({
                    url: "WebServiceGetDataMaster.asmx/InsertProductName",
                    method: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: form_data,
                    success: function (data) {
                        console.log(form_data)

                        var json = JSON.parse(data.d);
                        var i = "";
                        for (i = 0; i < json.length; i++) {
                            if (json[i].Result == "True") {
                                swal(
                                    '',
                                    'Insert Data Has Been Success',
                                    'success'
                                ).then(function () {
                                    $("#Product_Name").val("");
                                    $("#Textarea_Description").val("");
                                    $("#Product_Type").val("");
                                    $("#cmb_Status").val("");
                                    $("#ModalProduct").modal('hide');
                                });
                            } else {
                                swal(
                                    '',
                                    'Insert Data Has Been Failed',
                                    'error'
                                ).then(function () {
                                    $("#Product_Name").val("");
                                    $("#Textarea_Description").val("");
                                    $("#Product_Type").val("");
                                    $("#cmb_Status").val("");
                                    $("#ModalProduct").modal('hide');
                                });
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
function AddCustomer() {
    $("#modal-customer").modal('show');
}
function ActionInsertCustomer() {
    var TrxUsername = $("#hd_sessionLogin").val();
    var TrxCusTomerName = $("#cusTomerName").val();
    var TrxCusTomerEmail = $("#cusTomerEmail").val();
    var TrxCusTomerPhone = $("#cusTomerPhone").val();
    var TrxCusTomerGender = $("#addcusTomerGender").val();
    var TrxCusTomerDate = $("#cusTomerDate").val();
    var TrxCusTomerNIK = $("#cusTomerNIK").val();
    var TrxFacebook = $("#cusTomerFacebook").val();
    var TrxInstagram = $("#cusTomerInstagram").val();
    var TrxTwitter = $("#cusTomerTwitter").val();
    var TrxCusTomerAlamat = $("#cusTomerAlamat").val();

    console.log("TrxUsername : " + TrxUsername)
    if (TrxCusTomerName === '') {
        AutoValidasiWarning($("#hd_sessionLogin").val(), "<b>Name</b> is empty")
        return false
    }
    if (TrxCusTomerEmail != '') {
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (TrxCusTomerEmail.match(mailformat)) {
        }
        else {
            AutoValidasiWarning($("#hd_sessionLogin").val(), "Format <b>email address</b> not valid")
            return false
        }
    } else {
        AutoValidasiWarning($("#hd_sessionLogin").val(), "<b>Email Address</b> is mandatory")
        return false;
    }
    if (TrxCusTomerPhone != '') {
        var numberNya = /^[0-9]+$/;
        if (TrxCusTomerPhone.match(numberNya)) {
            var PhoneLengt = TrxCusTomerPhone.toString().length;
            if (PhoneLengt > '6') {

            } else {
                AutoValidasiWarning($("#hd_sessionLogin").val(), "Format <b>phone number</b> not valid")
                return false
            }
        } else {
            AutoValidasiWarning($("#hd_sessionLogin").val(), "Format <b>Phone Number</b> format is numeric")
            return false;
        }
    }
    if (TrxCusTomerGender == '--Select--' || TrxCusTomerGender == '' || TrxCusTomerGender == '0') {
        AutoValidasiWarning($("#hd_sessionLogin").val(), "<b>Gender</b> is empty")
        return false;
    }
    if (TrxCusTomerNIK == '' || TrxCusTomerNIK == '0') {
    } else {
        var numberNya = /^[0-9]+$/;
        if (TrxCusTomerNIK.match(numberNya)) {
            var NIKLengt = TrxCusTomerNIK.toString().length;
            if (NIKLengt == '16') {

            } else {
                AutoValidasiWarning($("#hd_sessionLogin").val(), "<b>NIK Number</b> format is 16 digit")
                return false;
            }
        } else {
            AutoValidasiWarning($("#hd_sessionLogin").val(), "<b>NIK Number</b> format is numeric")
            return false;
        }
    }
    if (TrxCusTomerAlamat == '') {
        AutoValidasiWarning($("#hd_sessionLogin").val(), "<b>Address</b> is empty")
        return false;
    }
    if (TrxFacebook == '') {
        TrxFacebook = "-";
    }
    if (TrxInstagram == '') {
        TrxInstagram = "-";
    }
    if (TrxTwitter == '') {
        TrxTwitter = "-";
    }

    swal({
        title: "Do you want to process?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                var form_data = JSON.stringify({ TrxUsername: TrxUsername, TrxCusTomerName: encodeData(TrxCusTomerName), TrxCusTomerEmail: TrxCusTomerEmail, TrxCusTomerPhone: TrxCusTomerPhone, TrxCusTomerGender: TrxCusTomerGender, TrxCusTomerDate: TrxCusTomerDate, TrxCusTomerNIK: TrxCusTomerNIK, TrxCusTomerAlamat: encodeData(TrxCusTomerAlamat), TrxNumberID: "0", TrxFacebook: TrxFacebook, TrxInstagram: TrxInstagram, TrxTwitter: TrxTwitter });
                console.log("ActionInsertCustomer" + form_data)
                $.ajax({
                    url: "asmx/ServiceCustomer.asmx/InsertTransactionCustomer",
                    method: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    //data: "{ TrxUsername: '" + TrxUsername + "', TrxCustomerID: '" + TrxCustomerID + "',TxtThreadID: '" + TxtThreadID + "',TxtAccount: '" + TxtAccount + "',TrxPelapor: '" + TrxPelapor + "',TrxPelaporEmail: '" + TrxPelaporEmail + "',TrxPelaporPhone: '" + TrxPelaporPhone + "',TrxPelaporAddress: '" + encodeData(TrxPelaporAddress) + "',TrxKejadian: '" + TrxKejadian + "',TrxPenyebab: '" + TrxPenyebab + "',TrxPenerimaPengaduan: '" + TrxPenerimaPengaduan + "',TrxStatusPelapor: '" + TrxStatusPelapor + "',TrxSkalaPrioritas: '" + TrxSkalaPrioritas + "',TrxJenisNasabah: '" + TrxJenisNasabah + "',TrxNomorRekening: '" + TrxNomorRekening + "',TrxSumberInformasi: '" + TrxSumberInformasi + "',TrxCategory: '" + TrxCategory + "',TrxLevel1: '" + TrxLevel1 + "',TrxLevel2: '" + TrxLevel2 + "',TrxLevel3: '" + TrxLevel3 + "',TrxComplaint: '" + encodeData(TrxComplaint) + "',TrxResponse: '" + encodeData(TrxResponse) + "',TrxChannel: '" + TrxChannel + "',TrxStatus: '" + TrxStatus + "',TrxEskalasi: '" + TrxEskalasi + "',TrxSLA: '" + TrxSLA + "',TrxExtendCategory: '" + TrxExtendCategory + "',TrxLayer: '" + TrxLayer + "',TrxThreadID:'" + TxtThreadID + "', TrxGenesysID:'" + TrxGenesysID + "', TxtContactID:'" + TxtContactID + "'}",
                    data: form_data,
                    success: function (data) {
                        var json = JSON.parse(data.d);
                        var i, x = "";
                        var result = "";
                        console.log("Exec InsertTransactionCustomer : " + form_data)
                        for (i = 0; i < json.length; i++) {
                            if (json[i].Result == "True") {
                                $.toast({
                                    heading: 'Hi agent ' + $("#hd_sessionLogin").val(),
                                    text: 'Your data customer has been save',
                                    position: 'top-right',
                                    loaderBg: '#ff6849',
                                    icon: 'success',
                                    hideAfter: 3500,
                                    stack: 6
                                });
                                ClearTextBoxt();
                                swal("Done", {
                                    icon: "success",
                                });
                                $("#modal-customer").modal('hide');
                                TrmCustomer();
                                window.location.reload();
                            } else {
                                //alert(json[i].msgSystem)
                                $.toast({
                                    heading: 'Hi agent ' + $("#hd_sessionLogin").val(),
                                    text: json[i].msgSystem,
                                    position: 'top-right',
                                    loaderBg: '#ff6849',
                                    icon: 'warning',
                                    hideAfter: 3500,
                                    stack: 6
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
                swal("Done", {
                    icon: "success",
                });
            } else {
                //swal("Your imaginary file is safe!");
                $("#modal-customer").modal('hide');
            }
        });
}
function UpdateProfile() {
    var TrxUsername = $("#hd_sessionLogin").val();
    var TrxCusTomerName = $("#Profile_Name").val();
    var TrxCusTomerEmail = $("#Profile_Email").val();
    var TrxCusTomerPhone = $("#Profile_Phone").val();
    var TrxCusTomerNIK = $("#Profile_State").val();
    if (TrxCusTomerName == "") {
        swal(
            '',
            'Full name is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if (TrxCusTomerEmail != '') {
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (TrxCusTomerEmail.match(mailformat)) {
        } else {
            swal(
                '',
                'Format email address not valid',
                'info'
            ).then(function () {
                return false;
            });
            return false;
        }
    }
    if (TrxCusTomerPhone != '') {
        var numberNya = /^[0-9]+$/;
        if (TrxCusTomerPhone.match(numberNya)) {
            var PhoneLengt = TrxCusTomerPhone.toString().length;
            if (PhoneLengt > '6') {
            } else {
                swal(
                    '',
                    'Format phone number not valid',
                    'info'
                ).then(function () {
                    return false;
                });
                return false;
            }
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

                var form_data = JSON.stringify({
                    TrxCustomerID: $("#ContentPlaceHolder1_TrxCustomerID").val(), TrxUsername: TrxUsername, TrxCusTomerName: encodeData(TrxCusTomerName),
                    TrxCusTomerEmail: TrxCusTomerEmail, TrxCusTomerPhone: TrxCusTomerPhone, TrxCusTomerNIK: TrxCusTomerNIK
                });
                $.ajax({
                    url: "asmx/ServiceCustomer.asmx/UpdateTransactionCustomer",
                    method: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: form_data,
                    success: function (data) {
                        var json = JSON.parse(data.d);
                        var i, x = "";
                        var result = "";

                        for (i = 0; i < json.length; i++) {
                            if (json[i].Result == "True") {
                                TrmCustomer();
                                swal(
                                    '',
                                    'Update Data Has Been Success',
                                    'success'
                                ).then(function () {
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
function AutoValidasiWarning(TrxCreatedby, Message) {
    $.toast({
        heading: '<b>Hi ' + TrxCreatedby + '</b>',
        text: '' + Message + '',
        position: 'top-left',
        loaderBg: '#ff6849',
        icon: 'warning',
        hideAfter: 3500,
        stack: 6
    });
}
function encodeData(s) {
    return encodeURIComponent(s).replace(/\-/g, "%2D").replace(/\_/g, "%5F").replace(/\./g, "%2E").replace(/\!/g, "%21").replace(/\~/g, "%7E").replace(/\*/g, "%2A").replace(/\'/g, "%27").replace(/\(/g, "%28").replace(/\)/g, "%29");
}
function ClearTextBoxt() {
    $("#cusTomerName").val("");
    $("#cusTomerEmail").val("");
    $("#cusTomerPhone").val("");
}
function otherChannel() {
    $("#modal-searching-other").modal('show')
    var JenisKondisi = "AllWhereData";
    var NamaTable = "TrmCustomerChannel";
    var KondisiData = "Where Name Is Not Null";
    var jsonText = JSON.stringify({ tableType: JenisKondisi, tableName: NamaTable, paramQuery: KondisiData });
    console.log("Table Searching Channel Information " + NamaTable + KondisiData + jsonText)
    var myTable = $('#TableSearchingChannel').DataTable();
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/GetWhereRecords",
        data: jsonText,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x, result = "";

            myTable.clear().draw();
            for (i = 0; i < json.length; i++) {

                var d = new Date(json[i].DateCreate);
                var milisegundos = parseInt(json[i].DateCreate.replace("/Date(", "").replace(")/", ""));
                var newDate = new Date(milisegundos).toLocaleDateString("en-UE");
                var newTime = new Date(milisegundos).toLocaleTimeString("en-UE");
                var TrxName = '<a class="hover-primary" href="#" onclick="selectedCustomer(' + json[i].CustomerID + ')"><strong>' + json[i].Name + '</strong></a>'
                var Status = "<span class='badge badge-pill badge-" + json[i].StatusColor + "' style='width: 60px;'>" + json[i].StatusNya + "</span>"

                myTable.row.add([TrxName, json[i].ValueChannel, json[i].FlagChannel, Status]).draw(false);
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function UpdatePopUP(TrxID, TrxCustomerID, ValueChannel, Type) {
    $("#ContentPlaceHolder1_TrxID").val(TrxID)
    $("#ModalOtherChannelCustomer").modal('show');
    $("#TxtChannelValue").val(ValueChannel);
    $("#cmbOtherChannel").find("option:selected").text();
    $("#cmbOtherChannel").val(Type);
    $("#SaveOtherChannel").css("display", "none");
    $("#UpdateOtherChannel").css("display", "block");
    $("#DeleteOtherChannel").css("display", "none");
}
function DeletePopUP(TrxID, TrxCustomerID, ValueChannel, Type) {
    $("#ContentPlaceHolder1_TrxID").val(TrxID)
    $("#ModalOtherChannelCustomer").modal('show');
    $("#TxtChannelValue").val(ValueChannel);
    $("#cmbOtherChannel").find("option:selected").text();
    $("#cmbOtherChannel").val(Type);
    $("#SaveOtherChannel").css("display", "none");
    $("#UpdateOtherChannel").css("display", "none");
    $("#DeleteOtherChannel").css("display", "block");
}
function getProvince(value) {
    var cmbDatacusTomerCity = $('#cusTomerCity');
    var idgetProvince = $("#cusTomerProvince").val();
    var resultSourceCategory = "";
    // Replace ./data.json with your JSON feed
    fetch('https://www.emsifa.com/api-wilayah-indonesia/api/regencies/' + idgetProvince + '.json').then(response => {
        return response.json();
    }).then(data => {
        cmbDatacusTomerCity.empty();
        cmbDatacusTomerCity.append('<option value="">Select</option>');
        for (i = 0; i < data.length; i++) {
            resultSourceCategory = '<option value="' + data[i].id + '">' + data[i].name + '</option>';
            cmbDatacusTomerCity.append(resultSourceCategory);
        }
        console.log(data);

    }).catch(err => {
        // Do something for an error here
    });
    //var selectedText = $("#cusTomerProvince").find("option:selected").text();
    //var cmbDatacusTomerProvince = $('#cusTomerProvince');
    //var resultSourceCategory = "";
    //// Replace ./data.json with your JSON feed
    //fetch('https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json').then(response => {
    //    return response.json();
    //}).then(data => {
    //    cmbDatacusTomerProvince.empty();
    //    cmbDatacusTomerProvince.append('<option value="">Select</option>');
    //    for (i = 0; i < data.length; i++) {
    //       resultSourceCategory = '<option value="' + data[i].id + '">' + data[i].name + '</option>';
    //       cmbDatacusTomerProvince.append(resultSourceCategory);
    //    }
    //    console.log(data);

    //}).catch(err => {
    //    // Do something for an error here
    //});
}
function getCity(value) {
    var cmbDatacusTomerCity = $('#cusTomerDistrict');
    var idgetProvince = $("#cusTomerCity").val();
    var resultSourceCategory = "";
    // Replace ./data.json with your JSON feed
    fetch('https://www.emsifa.com/api-wilayah-indonesia/api/districts/' + idgetProvince + '.json').then(response => {
        return response.json();
    }).then(data => {
        cmbDatacusTomerCity.empty();
        for (i = 0; i < data.length; i++) {
            resultSourceCategory = '<option value="' + data[i].id + '">' + data[i].name + '</option>';
            cmbDatacusTomerCity.append(resultSourceCategory);
        }
        console.log(data);

    }).catch(err => {
        // Do something for an error here
    });
}
function getDistrict(value) {
    var cmbDatacusTomerCity = $('#cusTomerZipCode');
    var idgetProvince = $("#cusTomerDistrict").val();
    var resultSourceCategory = "";
    // Replace ./data.json with your JSON feed
    fetch('https://www.emsifa.com/api-wilayah-indonesia/api/villages/' + idgetProvince + '.json').then(response => {
        return response.json();
    }).then(data => {
        cmbDatacusTomerCity.empty();
        for (i = 0; i < data.length; i++) {
            resultSourceCategory = '<option value="' + data[i].id + '">' + data[i].name + '</option>';
            cmbDatacusTomerCity.append(resultSourceCategory);
        }
        console.log(data);

    }).catch(err => {
        // Do something for an error here
    });
}
function getZipCode(value) {
    console.log("Zip Code");
}