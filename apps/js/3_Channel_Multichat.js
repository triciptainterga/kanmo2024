
$(document).ready(function () {
    
});

var TrmProfileAddress = CKEDITOR.replace('txtDescriptionThread');
TrmProfileAddress.config.height = 150;
function SendDataToMultichat() {
    console.log("Send Ticket " + $("#ViewTicketNumber").text());
    const frame = document.getElementById('iframe_channel');
    frame.contentWindow.postMessage({ "event": "TicketID", "valEvent": $("#ViewTicketNumber").text() }, 'https://multichat-2.uidesk.id/');
}

function DivShowSearchData(keterangan) {
    
    if (keterangan == 1) {

        $("#DivMultichat").hide();
        $("#DivComments").hide();
        $("#DivSearchTicket").show();
    } else {
        $("#DivMultichat").show();
        $("#DivComments").show();
        $("#DivSearchTicket").hide();
    }

}

$("#txtSearchTicket").keyup(function () {
    FuncListDataTicket();
});
$("#txtSearchTicket").keydown(function () {
    FuncListDataTicket();
});


function FuncListDataTicket() {
    var DataListTicketDiv = $('#listSearchTicket');
    var DataListTicket = "";
    
    
    var form_data = JSON.stringify({ ValueNya: $("#txtSearchTicket").val()});
    $.ajax({
        url: "asmx/3_Channel_Multichat.asmx/GetDataSearchTicket",
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
                //alert(json[i].TrxNote)
                //$("#divInstanNote").val(json[i].TrxNote);
                //result = '<div class="media-list bb-1 bb-dashed border-light">' +
                //    '<div class="media align-items-center" >' +
                //    '<div class="media-body">' +
                //    '<p class="font-size-16">' +
                //    '<a class="hover-primary" href="#"><strong>' + json[i].TicketNumber +'</strong></a>' +
                //    '</p> ' + json[i].TicketSourceName + '-' + json[i].DateTicket +'</div>' +
                //    '<div class="media-right">' +
                //    '<span class="badge badge-warning">' + json[i].StatusTicket +'</span>' +
                //    '</div>' +
                //    '</div>' +
                //    '<blockquote class="blockquote">' +
                //    '<p>' + json[i].KeluhanPelanggan + '</p>' +
                //    '</blockquote>' +
                //    '<div class="media-block-actions">' +
                //    '<nav class="nav no-gutters gap-2 font-size-16 media-hover-show">' +
                //    '<a class="nav-link text-success" href="#" data-toggle="tooltip" title="" data-original-title="Approve"><i class="ion-checkmark"></i></a>' +
                //    '<a class="nav-link text-danger" href="#" data-toggle="tooltip" title="" data-original-title="Delete">\'ex1\'<i class="ion-close"></i></a>' +
                //    '</nav>' +
                //    '</div>' +
                //    '</div>';
                result = '<div class="box box-inverse box-secondary">' +
                    '<div class="box-body">' +
                    '<a class="avatar float-left mr-20" onclick="ViewDetailInfoTicket(&quot;' + json[i].TicketNumber + '&quot;)">' +
                    '<img src="../images/icon/'+ json[i].TicketSourceName +'.png" alt="">' +
                    '</a>' +
                    '<div>' +
                    '<small class="float-right">' + json[i].DateTicket +'</small>' +
                    '<div class="font-size-18">' + json[i].NamaPelanggan + '</div>' +
                    '<div class="font-size-14 mb-10"><span class="badge badge-dark">' + json[i].StatusTicket + '</span>-' + json[i].TicketSourceName + '-<small class="float">' + json[i].TicketNumber + '</small></div>' +
                    '<p class="my-0 font-size-12 text-white">' + json[i].KeluhanPelanggan + '</p>' +
                    '</div>' +
                    '</div>' +
                    '</div>';
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
                    '<span class="text-muted pull-right">' + json[i].TanggalNya +'</span>' +
                    '</span><!-- /.username -->' +
                    json[i].Channel +' - '+ json[i].ResponseComplaint +
                    '</div>' +
                    '<!-- /.comment-text -->' +
                    '</div>';
                $("#DataListInteraction").append(DataListInteraction);
            }
        }
    });

    $("#modal-dataticket").modal('show');
}