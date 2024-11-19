$(document).ready(function () {
    var cmbDataSourceBrand = $('#Ticket_Brand');
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrxTransactionTicket",
        data: "{TrxID:'UideskIndonesia', TrxSearching:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK330'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, resultSourceBrand = "";

            for (i = 0; i < json.length; i++) {

                resultSourceBrand = '<option value="' + json[i].BrandID + '">' + json[i].BrandName + '</option>';
                cmbDataSourceBrand.append(resultSourceBrand);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
});
function getWS_Category(value) {
    var selectedText = $("#Ticket_Brand").find("option:selected").text();
    var selectedValue = $("#Ticket_Brand").val();

    var cmbData = $('#Ticket_ProductType');
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrxTransactionTicket",
        data: "{TrxID:'" + selectedValue + "', TrxSearching:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK301'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "";

            cmbData.empty();
            cmbData.append('<option value="">Select</option>');
            for (i = 0; i < json.length; i++) {

                result = '<option value="' + json[i].ID + '">' + json[i].NamaPenyebab + '</option>';
                cmbData.append(result);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })

    var cmbDataSourceCategory = $('#Ticket_Category');
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrxTransactionTicket",
        data: "{TrxID:'" + selectedValue + "', TrxSearching:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK331'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, resultSourceCategory = "";

            cmbDataSourceCategory.empty();
            cmbDataSourceCategory.append('<option value="">Select</option>');
            for (i = 0; i < json.length; i++) {

                resultSourceCategory = '<option value="' + json[i].CategoryID + '">' + json[i].Name + '</option>';
                cmbDataSourceCategory.append(resultSourceCategory);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function Get_ProductName(TrxID) {
    var selectedText = $("#Ticket_ProductType").find("option:selected").text();
    var selectedValue = $("#Ticket_ProductType").val();

    var cmbProductName = $('#Ticket_ProductName');
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrxTransactionTicket",
        data: "{TrxID:'" + selectedValue + "', TrxSearching:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK327'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "";

            cmbProductName.empty()
            cmbProductName.append("<option value='0'>Select</option>")
            for (i = 0; i < json.length; i++) {

                result = '<option value="' + json[i].Product_Name + '">' + json[i].Product_Name + '</option>';
                cmbProductName.append(result);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function getWS_CategoryType(value) {
    var Ticket_BrandText = $("#Ticket_Brand").find("option:selected").text();
    var Ticket_BrandValue = $("#Ticket_Brand").val();
    var Ticket_CategoryText = $("#Ticket_Category").find("option:selected").text();
    var Ticket_CategoryValue = $("#Ticket_Category").val();

    var ComboTicket_EnquiryReason = $('#Ticket_EnquiryReason');
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrxTransactionTicket",
        data: "{TrxID:'" + Ticket_CategoryValue + "', TrxSearching:'" + Ticket_BrandValue + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK332'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, resultSourceEnquiryReason = "";

            ComboTicket_EnquiryReason.empty();
            ComboTicket_EnquiryReason.append('<option value="">Select</option>');
            for (i = 0; i < json.length; i++) {

                resultSourceEnquiryReason = '<option value="' + json[i].SubCategory3ID + '">' + json[i].SubName + '</option>';
                ComboTicket_EnquiryReason.append(resultSourceEnquiryReason);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function getWS_SLAReason(value) {
    var selectedText = $("#Ticket_EnquiryReason").find("option:selected").text();
    var selectedValue = $("#Ticket_EnquiryReason").val();

    var slaSpanData = $('#Ticket_SLA');
    var TicketLayer = $('#Ticket_Layer');
    var ComboTicket_Enquiry = $('#Ticket_Enquiry');
    var ComboTicket_EnquiryDetail = $('#Ticket_EnquiryDetail');
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrxTransactionTicket",
        data: "{TrxID:'" + selectedValue + "', TrxSearching:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK314'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, resultSourceEnquiryReason, resultSourceEnquiry, resultSourceEnquiryDetail = "";

            slaSpanData.empty();
            TicketLayer.empty();
            for (i = 0; i < json.length; i++) {

                slaSpanData.append("<span class='badge badge-pill badge-primary float-right' style='font-weight:bold;font-size:11px;' id='Ticket_SLA'><i class='fa fa-clock-o'></i>&nbsp;" + json[i].SLA + " Days</span>");
                $("#hd_SLA").val(json[i].SLA);
                //escalationUnit(json[i].TujuanEskalasi)

                $("#Ticket_Layer").css("display", "block")
                TicketLayer.append("<span class='badge badge-pill badge-primary float-right' style='font-weight:bold;font-size:11px;' id='Ticket_Layer'><i class='fa fa-share-alt'></i>&nbsp;Layer " + json[i].Layer + "</span>");
                //$("#Ticket_EscalationLayer").val(json[i].Layer)
                $("#ContentPlaceHolder1_hd_Layer").val(json[i].Layer);

                alert($('#Ticket_EnquiryReason').val())
                if ($('#Ticket_EnquiryReason').val() != "") {
                    resultSourceEnquiry = '<option value="' + json[i].CategoryID + '" selected=true>' + json[i].CategoryName + '</option>';
                    $('#Ticket_Enquiry').attr('disabled', true);

                    resultSourceEnquiryDetail = '<option value="' + json[i].MetaID + '" selected=true>' + json[i].MetaName + '</option>';
                    $('#Ticket_EnquiryDetail').attr('disabled', true);
                } else {
                    alert("1")
                    resultSourceEnquiry = '<option value="" selected=true>Select</option>';
                    $('#Ticket_Enquiry').attr('disabled', true);

                    resultSourceEnquiryDetail = '<option value="" selected=true>Select</option>';
                    $('#Ticket_EnquiryDetail').attr('disabled', true);
                }
              
                ComboTicket_Enquiry.append(resultSourceEnquiry);
                ComboTicket_EnquiryDetail.append(resultSourceEnquiryDetail);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}