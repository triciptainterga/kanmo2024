$(document).ready(function () {
    Brand()
    cmbCategory();
    TrmCategoryDetail();
});
function TrmCategoryDetail() {
    var myTable = $('#TrmCategoryDetail').DataTable();
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/TableTransactionTrmCategoryDetail",
        data: "{TrxID:'-', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxName: '-', TrxStatus: '-'}",
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

                myTable.row.add([json[i].ID, json[i].BrandName, json[i].CategoryName, json[i].CategoryType, json[i].SubName, TrxParam, json[i].UserCreate, newDate + ' ' + newTime, urlClick]).draw(false);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function TrmSelectCategoryDetail(TrxID) {
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/SelectedTransactionTrmCategoryDetail",
        data: "{TrxID:'" + $("#ContentPlaceHolder1_TrxID").val() + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxName: '-', TrxStatus: '-'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i = "";

            for (i = 0; i < json.length; i++) {

                $('#cmbCategory option:selected').text(json[i].CategoryName);
                $("#cmbCategoryType option:selected").text(json[i].CategoryType);
                $('#TxtCategoryTypeName').val(json[i].SubName);
                $("#cmbStatus option:selected").text(json[i].Status);

                $("#ContentPlaceHolder1_Hd_CmbCategory").val(json[i].CategoryID);
                $("#ContentPlaceHolder1_Hd_CmbCategoryType").val(json[i].SubCategory1ID);
                $("#ContentPlaceHolder1_Hd_Status").val(json[i].NA);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })

    //var JenisKondisi = "AllWhereData";
    //var NamaView = "TrmCategoryDetail";
    //var KondisiData = "Where ID='" + TrxID + "'";
    //var jsonText = JSON.stringify({ tableType: JenisKondisi, tableName: NamaView, paramQuery: KondisiData });

    //$.ajax({
    //    type: "POST",
    //    url: "WebServiceGetDataMaster.asmx/GetWhereRecords",
    //    data: jsonText,
    //    contentType: "application/json; charset=utf-8",
    //    dataType: "json",
    //    success: function (data) {
    //        var json = JSON.parse(data.d);
    //        var i, x, result = "";

    //        for (i = 0; i < json.length; i++) {

    //            $('#cmbCategory option:selected').text(json[i].CategoryName);
    //            $("#cmbCategoryType option:selected").text(json[i].CategoryType);
    //            $('#TxtCategoryTypeName').val(json[i].SubName);
    //            $("#cmbStatus option:selected").text(json[i].Status);

    //            $("#ContentPlaceHolder1_Hd_CmbCategory").val(json[i].CategoryID);
    //            $("#ContentPlaceHolder1_Hd_CmbCategoryType").val(json[i].SubCategory1ID);
    //            $("#ContentPlaceHolder1_Hd_Status").val(json[i].NA);
    //        }

    //    },
    //    error: function (xmlHttpRequest, textStatus, errorThrown) {
    //        console.log(xmlHttpRequest.responseText);
    //        console.log(textStatus);
    //        console.log(errorThrown);
    //    }
    //})
}
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
function cmbBrandChange(value) {
    var selectedText = $("#cmbBrand").find("option:selected").text();
    var selectedValue = $("#cmbBrand").val();
    $("#ContentPlaceHolder1_Hd_CmbCategory").val(selectedValue);
    console.log("Selected Text: " + selectedText + " Value: " + selectedValue);

    var cmbCategory = $('#cmbCategory');
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'" + selectedValue + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction:'UIDESK119'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x, resultCategory = "";

            cmbCategory.empty();
            cmbCategory.append('<option value="">Select</option>');
            for (i = 0; i < json.length; i++) {
                resultCategory = '<option value="' + json[i].CategoryID + '">' + json[i].Name + '</option>';
                cmbCategory.append(resultCategory);
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function cmbCategory() {
    var cmbCategorySource = $('#cmbCategory');
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmDropdown",
        data: "{TrxID:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i = "";

            cmbCategorySource.empty();
            cmbCategorySource.append('<option value="">Select</option>');
            for (i = 0; i < json.length; i++) {

                resultCategory = '<option value="' + json[i].CategoryID + '">' + json[i].Name + '</option>';
                cmbCategorySource.append(resultCategory);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function cmbCategoryChange() {
    var JenisKondisi = "AllWhereData";
    var cmbCategoryType = $('#cmbCategoryType');
    var selectedText = $("#cmbCategory").find("option:selected").text();
    var selectedValue = $("#cmbCategory").val();
    $("#ContentPlaceHolder1_Hd_CmbCategory").val(selectedValue);

    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/OnChangeTransactionTrmCategoryType",
        data: "{TrxID:'" + selectedValue + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxName: '0', TrxStatus: '0'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x, resultCategoryType = "";

            cmbCategoryType.empty();
            cmbCategoryType.append('<option value="">Select</option>');
            for (i = 0; i < json.length; i++) {
                resultCategoryType = '<option value="' + json[i].SubCategory1ID + '">' + json[i].SubName + '</option>';
                cmbCategoryType.append(resultCategoryType);
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function getWS_cmbCategoryType(value) {
    var selectedText = $("#cmbCategoryType").find("option:selected").text();
    var selectedValue = $("#cmbCategoryType").val();
    console.log("Selected Text: " + selectedText + " Value: " + selectedValue);
    $("#ContentPlaceHolder1_Hd_CmbCategoryType").val(selectedValue)
    //alert(selectedValue)
    //alert($("#ContentPlaceHolder1_Hd_CmbCategoryDetail").val())
}
function getWS_Status(value) {
    var selectedText = $("#cmbStatus").find("option:selected").text();
    var selectedValue = $("#cmbStatus").val();
    console.log("Selected Text: " + selectedText + " Value: " + selectedValue);
    $("#ContentPlaceHolder1_Hd_Status").val(selectedValue)
    //alert(selectedValue)
    //alert($("#ContentPlaceHolder1_Hd_CmbCategoryDetail").val())
}
function showAdd() {
    $("#ModalChannel").modal('show');
    $("#Simpan").css("display", "block");
    $("#Update").css("display", "none");
    $("#TxtCategoryTypeName").val("");
    $("#cmbCategory").val("")
    $("#cmbCategoryType").val("");
    $("#cmbStatus").val("");
}
function showUpdate(TrxID) {
    $("#ModalChannel").modal('show');
    $("#Simpan").css("display", "none");
    $("#Update").css("display", "block");
    $("#ContentPlaceHolder1_TrxID").val(TrxID);
    TrmSelectCategoryDetail($("#ContentPlaceHolder1_TrxID").val())
}
function ActionSimpan() {
    var TrxName = $('#TxtCategoryTypeName').val();
    var TrxCmbCategory = $("#ContentPlaceHolder1_Hd_CmbCategory").val();
    var TrxCmbCategoryType = $("#ContentPlaceHolder1_Hd_CmbCategoryType").val();
    var TrxCmbStatus = $("#ContentPlaceHolder1_Hd_Status").val();
    if ($("#cmbBrand").val() == '' || $("#cmbBrand").val() == 'Select') {
        swal(
            '',
            'Brand is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if (TrxCmbCategory == '') {
        swal(
            '',
            'Type is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if (TrxCmbCategoryType == '') {
        swal(
            '',
            'Category is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }  
    if (TrxCmbStatus == '') {
        swal(
            '',
            'Status is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if (TrxName == '') {
        swal(
            '',
            'Meta is empty',
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
                TrxCategoryID: TrxCmbCategory, TrxBrandID: $("#cmbBrand").val(), TrxSubCategory1ID: TrxCmbCategoryType, TrxName: TrxName,
                TrxStatus: TrxCmbStatus, TrxUserName: $("#hd_sessionLogin").val()
            });
            $.ajax({
                url: "WebServiceGetDataMaster.asmx/InsertTransactionTrmCategoryDetail",
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
                            swal(
                                '',
                                'Insert Data Has Been Success',
                                'success'
                            ).then(function () {
                                window.location.href = "TrmCategoryDetail.aspx";
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
    var TrxName = $('#TxtCategoryTypeName').val();
    var TrxCmbCategory = $("#ContentPlaceHolder1_Hd_CmbCategory").val();
    var TrxCmbCategoryType = $("#ContentPlaceHolder1_Hd_CmbCategoryType").val();
    var TrxCmbStatus = $("#ContentPlaceHolder1_Hd_Status").val();
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
    swal({
        title: "Do you want to process?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
    .then((willDelete) => {
        if (willDelete) {        
                    
            var form_data = JSON.stringify({
                TrxID: $("#ContentPlaceHolder1_TrxID").val(), TrxCategoryID: TrxCmbCategory, TrxBrandID: $("#cmbBrand").val(), TrxSubCategory1ID: TrxCmbCategoryType,
                TrxName: TrxName, TrxStatus: TrxCmbStatus, TrxUserName: $("#hd_sessionLogin").val()
            });
           $.ajax({
               url: "WebServiceGetDataMaster.asmx/UpdateTransactionTrmCategoryDetail",
               method: "POST",
               contentType: "application/json; charset=utf-8",
               dataType: "json",
               data: form_data,
               success: function (data) {
                   console.log(form_data)
 
                   var json = JSON.parse(data.d);
                   var i, x = "";
                   var result = "";

                   for (i = 0; i < json.length; i++) {
                       if (json[i].Result == "True") {
                           swal(
                               '',
                               'Update Data Has Been Success',
                               'success'
                           ).then(function () {
                               window.location.href = "TrmCategoryDetail.aspx";
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