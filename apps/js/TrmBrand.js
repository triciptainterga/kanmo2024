$(document).ready(function () {
    TrmBrand();
});
function TrmBrand() {
    var myTable = $('#TrmBrandNames').DataTable();
    $.ajax({
        type: "POST",
        url: "asmx/TrmBrand.asmx/Uidesk_TrxBrandName",
        data: "{ID: '0', BrandID: '0', BrandName: '0', BrandStatus: '0', UserName: '" + $("#hd_sessionLogin").val() + "', Action:'TABLE'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i = "";

            myTable.clear().draw();
            for (i = 0; i < json.length; i++) {

                var urlClick = "<div class='dropdown'>" +
                    "<a data-toggle='dropdown' href='#'><i class='ti-more-alt rotate-90 text-black'></i></a>" +
                    "<div class='dropdown-menu dropdown-menu-right'>" +
                    "<a class='dropdown-item' href='#' onclick=showUpdate('" + json[i].ID + "')><i class='fa fa-pencil'></i> Edit</a>" +
                    "</div>" +
                    "</div>"
                if (json[i].NA == "Y") {
                    var TrxParam = "<span class='badge badge-pill badge-success' style='width: 70px;'>Aktif</span>"
                } else {
                    var TrxParam = "<span class='badge badge-pill badge-danger' style='width: 70px;'>Non Aktif</span>"
                }
                myTable.row.add([json[i].ID, json[i].BrandName, TrxParam, urlClick]).draw(false);

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
    $("#cmbStatus option:selected").val("");
    $("#TxtBrandName").val("");
    $("#ModalChannel").modal('show');
    $("#Simpan").css("display", "block");
    $("#Update").css("display", "none");
    $("#Delete").css("display", "none");
}
function showUpdate(ID) {
    $("#ModalChannel").modal('show');
    $("#Simpan").css("display", "none");
    $("#Update").css("display", "block");
    $("#Delete").css("display", "none");
    $("#ContentPlaceHolder1_TrxID").val(ID);
    TrmSelected()
}
function ActionSimpan() {
    if ($("#TxtBrandName").val() == '') {
        swal(
            '',
            'Brand Name is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#cmbStatus").val() == '') {
        swal(
            '',
            'Status is empty',
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

                var form_data = JSON.stringify({
                    ID: "0", BrandID: "0", BrandName: $("#TxtBrandName").val(),
                    BrandStatus: $("#cmbStatus").val(), UserName: $("#hd_sessionLogin").val(), Action: "INSERT"
                });
                $.ajax({
                    url: "asmx/TrmBrand.asmx/Uidesk_TrxBrandName",
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
                                    window.location.href = "TrmBrand.aspx";
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
    if ($("#ContentPlaceHolder1_TrxID").val() == '') {
        swal(
            '',
            'Data is empty',
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

                var form_data = JSON.stringify({
                    ID: $("#ContentPlaceHolder1_TrxID").val(), BrandID: "0", BrandName: $("#TxtBrandName").val(),
                    BrandStatus: $("#cmbStatus").val(), UserName: $("#hd_sessionLogin").val(), Action: "UPDATE"
                });
                $.ajax({
                    url: "asmx/TrmBrand.asmx/Uidesk_TrxBrandName",
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
                                    'Update Data Has Been Success',
                                    'success'
                                ).then(function () {
                                    window.location.href = "TrmBrand.aspx";
                                });
                            } else {
                                swal(
                                    '',
                                    'Update Data Has Been Failed',
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
function TrmSelected() {
    $.ajax({
        type: "POST",
        url: "asmx/TrmBrand.asmx/Uidesk_TrxBrandName",
        data: "{ID: '" + $("#ContentPlaceHolder1_TrxID").val() +"', BrandID: '0', BrandName: '0', BrandStatus: '0', UserName: '" + $("#hd_sessionLogin").val() + "', Action:'SELECT'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, resultCallCampaigns = "";

            for (i = 0; i < json.length; i++) {

                $("#TxtBrandName").val(json[i].BrandName);
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