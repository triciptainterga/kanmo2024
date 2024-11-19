$(document).ready(function () {
    //$("#Ticket_SearchCustomerBD").on("input", function () {
    //    var jumlahString = $(this).val().length;
    //    if (jumlahString >= 4) {
    //        console.log($(this).val());
    //        UIDESK_TrmCustomer($(this).val());
    //    }
    //});
    var displayShortCut = ""
    displayShortCut = '<div id="chat-box-body" onclick="modalUidesk()">' +
        '<div id="chat-circle" class="waves-effect waves-circle btn btn-circle btn-lg btn-dark l-h-70">' +
        '<div id="chat-overlay"></div>' +
        '<img src="../Images/uidesk.png" width="52px">' +
        '</div>' +
        '</div>'
    $("#chat-box-body").append(displayShortCut)
});
$("#chat-box-toggle").on("click", function () {
    var displayShortCut = ""
    displayShortCut = '<div id="chat-box-body" onclick="modalUidesk()">' +
        '<div id="chat-circle" class="waves-effect waves-circle btn btn-circle btn-lg btn-dark l-h-70">' +
        '<div id="chat-overlay"></div>' +
        '<img src="../Images/uidesk.png" width="52px">' +
        '</div>' +
        '</div>'
    $("#chat-box-bodyDrop").append(displayShortCut)
});
var displayShortCut = ""
displayShortCut = '<div id="chat-box-body" onclick="modalUidesk()">' +
    '<div id="chat-circle" class="waves-effect waves-circle btn btn-circle btn-lg btn-dark l-h-70">' +
    '<div id="chat-overlay"></div>' +
    '<img src="../Images/uidesk.png" width="52px">' +
    '</div>' +
    '</div>'
$("#chat-box-body").append(displayShortCut)
function modalUidesk() {
    $("#modal-SearchUI").modal('show')
    $("#chat-box-body").empty()
    $('.nav-item a[href="#navpills-5"]').tab('show')
    $("#chat-box-bodyDrop").empty()
    var displayShortCut = ""
    displayShortCut = '<div id="chat-box-body" onclick="modalUidesk()">' +
        '<div id="chat-circle" class="waves-effect waves-circle btn btn-circle btn-lg btn-dark l-h-70">' +
        '<div id="chat-overlay"></div>' +
        '<img src="../Images/uidesk.png" width="52px">' +
        '</div>' +
        '</div>'
    $("#chat-box-body").append(displayShortCut)
}
function modalAPI() {
    $("#modal-SearchAPI").modal('show')
    $("#chat-box-body").empty()
    $('.nav-item a[href="#navpills-5"]').tab('show')
    $("#chat-box-bodyDrop").empty()
    var displayShortCut = ""
    displayShortCut = '<div id="chat-box-body" onclick="modalUidesk()">' +
        '<div id="chat-circle" class="waves-effect waves-circle btn btn-circle btn-lg btn-dark l-h-70">' +
        '<div id="chat-overlay"></div>' +
        '<img src="../Images/uidesk.png" width="52px">' +
        '</div>' +
        '</div>'
    $("#chat-box-body").append(displayShortCut)
}

//$("#txtSearchTicket").keyup(function () {
//    FuncListDataTicket();
//});
//$("#txtSearchTicket").keydown(function () {
//    FuncListDataTicket();
//});
function FuncListDataTicket() {
    var DataListTicketDiv = $('#listSearchTicket');
    var DataListTicket = "";


    var form_data = JSON.stringify({ ValueNya: $("#txtSearchTicket").val() });
    $.ajax({
        url: "https://kanmo.uidesk.id/kanmohuk/WebService.asmx/GetDataSearchTicket",
        method: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        //data: "{ TrxUsername: '" + TrxUsername + "', TrxCustomerID: '" + TrxCustomerID + "',TxtThreadID: '" + TxtThreadID + "',TxtAccount: '" + TxtAccount + "',TrxPelapor: '" + TrxPelapor + "',TrxPelaporEmail: '" + TrxPelaporEmail + "',TrxPelaporPhone: '" + TrxPelaporPhone + "',TrxPelaporAddress: '" + encodeData(TrxPelaporAddress) + "',TrxKejadian: '" + TrxKejadian + "',TrxPenyebab: '" + TrxPenyebab + "',TrxPenerimaPengaduan: '" + TrxPenerimaPengaduan + "',TrxStatusPelapor: '" + TrxStatusPelapor + "',TrxSkalaPrioritas: '" + TrxSkalaPrioritas + "',TrxJenisNasabah: '" + TrxJenisNasabah + "',TrxNomorRekening: '" + TrxNomorRekening + "',TrxSumberInformasi: '" + TrxSumberInformasi + "',TrxCategory: '" + TrxCategory + "',TrxLevel1: '" + TrxLevel1 + "',TrxLevel2: '" + TrxLevel2 + "',TrxLevel3: '" + TrxLevel3 + "',TrxComplaint: '" + encodeData(TrxComplaint) + "',TrxResponse: '" + encodeData(TrxResponse) + "',TrxChannel: '" + TrxChannel + "',TrxStatus: '" + TrxStatus + "',TrxEskalasi: '" + TrxEskalasi + "',TrxSLA: '" + TrxSLA + "',TrxExtendCategory: '" + TrxExtendCategory + "',TrxLayer: '" + TrxLayer + "',TrxThreadID:'" + TxtThreadID + "', TrxGenesysID:'" + TrxGenesysID + "', TxtContactID:'" + TxtContactID + "'}",
        data: form_data,
        success: function (data) {
            console.log("Action Select Instan Note : " + form_data)

            DataListTicketDiv.empty();
            var json = JSON.parse(data.d);
            var i, x = "";
            for (i = 0; i < json.length; i++) {
                result = "<div class='box'><div class='box-body'><table class='table table-lg table-striped' style='overflow-x: scroll'>" +
                    "<tr><td>Customer</td><td>:</td><td><a class='avatar float-left mr-20' onclick=ViewDetailInfoTicket(&quot;" + json[i].TicketNumber + "&quot;)>" + json[i].NamaPelanggan + "</a></td></tr>" +
                    "<tr><td>Ticket Number</td><td>:</td><td style='width:300px;'>" + json[i].TicketNumber + "</td></tr>" +
                    "<tr><td>Channel</td><td>:</td><td>" + json[i].TicketSourceName + "</td></tr>" +
                    "<tr><td>Status</td><td>:</td><td>" + json[i].StatusTicket + "</td></tr>" +
                    "<tr><td>Status</td><td>:</td><td><a href='1_journey_new.aspx?ticketid=" + json[i].TicketNumber + "&numberid=0&threadid=0&status=Open' target='_blank'>Follow up</a></td></tr>" +
                    //"<tr><td>Quantity</td><td>:</td><td>" + product.qty + "</td></tr>" +
                    //"<tr><td>Sub Total</td><td>:</td><td>" + productsubtotal + "</td></tr>" +
                    //"<tr><td>Notes</td><td>:</td><td>" + product.notes + "</td></tr>" +
                    ////"<tr><td>image_url</td><td>:</td><td style='width:300px;'>" + productimage + "</td></tr>" +
                    //"<tr><td>Variant Name</td><td>:</td><td>" + product.variant_name + "</td></tr>" +
                    '<p class="my-0 font-size-12 text-white">' + json[i].KeluhanPelanggan + '</p>' +
                    "</table></div></div> "

                //result = '<div class="box box-inverse box-secondary">' +
                //    '<div class="box-body">' +
                //    '<a class="avatar float-left mr-20" onclick="ViewDetailInfoTicket(&quot;' + json[i].TicketNumber + '&quot;)">' +
                //    '<img src="../Images/uidesk.png" alt="">' +
                //    '</a>' +
                //    '<div>' +
                //    '<small class="float-right">' + json[i].DateTicket + '</small>' +
                //    '<div class="font-size-18"><a onclick="ViewDetailInfoTicket(&quot;' + json[i].TicketNumber + '&quot;)">' + json[i].NamaPelanggan + '</a></div>' +
                //    '<div class="font-size-14 mb-10"><span class="badge badge-dark">' + json[i].StatusTicket + '</span>-' + json[i].TicketSourceName + '-<small class="float">' + json[i].TicketNumber + '</small></div>' +
                //    '<p class="my-0 font-size-12 text-white">' + json[i].KeluhanPelanggan + '</p>' +
                //    '</div>' +
                //    '</div>' +
                //    '</div>';
                DataListTicketDiv.append(result);
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

function ViewDetailInfoTicket(TicketNumber) {
    console.log("Popup Show Detail Ticket : " + TicketNumber);


    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'" + TicketNumber + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK55'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            console.log(data);
            var json = JSON.parse(data.d);
            var i, x, resultSourceEnquiryReason = "";
            var iconLinkIframe;
            for (i = 0; i < json.length; i++) {
                console.log(json);

                $("#ViewTicketNumber").text(json[i].TicketNumber);
                $("#ViewNamaCust").text(json[i].NAMA_PELAPOR);
                $("#ViewStatus").text(json[i].Status);
                $("#ViewChannel").text(json[i].TicketSourceName);
                $("#ViewWaktu").text(json[i].DateConvert);
                $("#ViewKeluhanPelanggan").html(json[i].ExtractComplaint);
                $("#ViewJawabanAgent").html(json[i].ExtractResponse);
            }
        }
    });

    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'" + TicketNumber + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK56'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: async function (data) {

            var json = JSON.parse(data.d);
            var i, x;
            var DataListInteraction = "";
            $("#DataListInteraction").empty();
            var iconLinkIframe = "";
            for (i = 0; i < json.length; i++) {
                DataListInteraction = '<div class="box-comment">' +
                    '<!-- User image -->' +
                    '<img class="avatar" src="../images/user3-128x128.jpg" alt="User Image">' +
                    '<div class="comment-text">' +
                    '<span class="username">' +
                    json[i].AgentCreate +
                    '<span class="text-muted pull-right">' + json[i].TanggalNya + '</span>' +
                    '</span><!-- /.username -->' +
                    json[i].Channel + ' - ' + json[i].ResponseComplaint +
                    '</div>' +
                    '<!-- /.comment-text -->' +
                    '</div>';
                $("#DataListInteraction").append(DataListInteraction);
            }
        }
    });

    $("#modal-dataticket").modal('show');
}

function UIDESK_TrmCustomer(custName) {
    var selectedValue = custName;
    var listDataCustomer = $('#Ticket_ListCustomer');
    console.log(custName);
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrxTransactionTicket",
        data: "{TrxID:'" + selectedValue + "', TrxSearching:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK324'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, resultSourceCustomer = "";

            listDataCustomer.empty();
            if (json.length == 0) {

            } else {
                for (i = 0; i < json.length; i++) {

                    if (json[i].JenisKelamin == "Male") {
                        var jenisKelamin = '5.jpg';
                    } else {
                        var jenisKelamin = '2.jpg';
                    }
                    if (json[i].Email == "" || json[i].Email == null) {
                        var Email = ""
                    } else {
                        var Email = '<small class="text-fader">' + json[i].Email + '</small></br>'
                    }
                    if (json[i].HP == "" || json[i].HP == null) {
                        var PhoneNumber = ""
                    } else {
                        var PhoneNumber = '<small class="text-fader">' + json[i].HP + '</small></br>'
                    }
                    if (json[i].PolisNumber == "" || json[i].PolisNumber == null) {
                        var PolisNumber = ""
                    } else {
                        var PolisNumber = '<small class="text-fader">' + json[i].PolisNumber + '</small>'
                    }
                    resultSourceCustomer = '<div class="media media-single" > ' +
                        '<a href="#">' +
                        '<img class="avatar avatar-lg" src="../images/avatar/' + jenisKelamin + '" alt="...">' +
                        '</a>' +
                        '<div class="media-body">' +
                        '<h6><a href="#" onclick="showHistoryTicket(' + json[i].CustomerID + ')">' + json[i].Name + '</a></h6>' +
                        '' + Email + '' +
                        '' + PhoneNumber + '' +
                        '' + PolisNumber + '' +
                        '</div>' +
                        //'<div class="media-right">' +
                        //'<a onclick="SearchingDataCustomer(\'' + json[i].CustomerID + '\')" class="btn btn-block btn-default btn-sm">Submit</a>' +
                        //'</div>' +
                        '</div>';
                    console.log("json[i].CustomerID " + json[i].CustomerID)
                    listDataCustomer.append(resultSourceCustomer);
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