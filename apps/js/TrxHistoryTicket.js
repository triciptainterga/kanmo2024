$(document).ready(function () {
    $("#LoaderPage").hide();
});
function TrxHistory() {
    var TimeStartDate = $("#startdate").val();
    var TimeEndDate = $("#enddate").val();
    var TrxUserName = $("#hd_sessionLogin").val();
    var TrxLayerUser = $("#TrxLayerUser").val();
    if (TimeStartDate != "") {
        if (TimeEndDate == "") {
            swal("End Date is empty");
            return false;
        } else {
            if (TimeEndDate < TimeStartDate) {
                swal("End date smaller than start date")
                $("#LoaderPage").hide();
                return false
            }
            CheckSummaryDay()
        }
    } else {
        if (TimeEndDate != "") {
            swal("Start Date is empty");
            return false;
        }
    }
    var myTable = $('#TrxHistory').DataTable();
    $.ajax({
        type: "POST",
        url: "asmx/TrxHistoryTicket.asmx/UIDESK_TrxHistoryTicket",
        data: "{TrxStartDate:'" + TimeStartDate + "', TrxEnddate:'" + TimeEndDate + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxTicketNumber: '" + $("#TicketNumber").val() + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "";

            myTable.clear().draw();
            if (json.length == 0) {
                swal("Data history ticket is empty");
                $("#LoaderPage").hide();
                return false

            } else {

                for (i = 0; i < json.length; i++) {

                    var urlClick = "<a href='1_journey_new.aspx?ticketid=" + json[i].TicketNumber + "' target='_blank' class='text-success' data-toggle='tooltip' data-original-title='Follow up'><i class='mdi mdi-book-open font-size-20' aria-hidden='true'></i></a>"
                    var d = new Date(json[i].DateCreate);
                    var milisegundos = parseInt(json[i].DateCreate.replace("/Date(", "").replace(")/", ""));
                    var newDate = new Date(milisegundos).toLocaleDateString("en-UE");
                    var newTime = new Date(milisegundos).toLocaleTimeString("en-UE");

                    if (json[i].Status == "Open") {
                        var TrxParam = "<span class='badge badge-pill badge-primary' style='width: 70px;'>" + json[i].Status + "</span>"
                    } else if (json[i].Status == "Progress") {
                        var TrxParam = "<span class='badge badge-pill badge-warning' style='width: 70px;'>" + json[i].Status + "</span>"
                    } else if (json[i].Status == "Pending") {
                        var TrxParam = "<span class='badge badge-pill badge-danger' style='width: 70px;'>" + json[i].Status + "</span>"
                    } else if (json[i].Status == "Closed") {
                        var TrxParam = "<span class='badge badge-pill badge-success' style='width: 70px;'>" + json[i].Status + "</span>"
                    } else if (json[i].Status == "Solved") {
                        var TrxParam = "<span class='badge badge-pill badge-info' style='width: 70px;'>" + json[i].Status + "</span>"
                    }

                    myTable.row.add([json[i].TicketNumber, json[i].CustomerName, json[i].CategoryName, json[i].NAME, json[i].Layer, json[i].SLA, TrxParam,
                    newDate + newTime, urlClick]).draw(false);

                    $("#modal-history").modal('hide')
                    $("#LoaderPage").hide();
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
function showAdd() {
    $("#startdate").val("");
    $("#enddate").val("");
    $("#TicketNumber").val("");
    $("#modal-history").modal('show')
}
function ActionHistory() {
    $("#LoaderPage").show();
    TrxHistory()
}
function CheckSummaryDay() {
    var jsonTextTanggal = JSON.stringify({ TrxID: "0", StartDate: $("#startdate").val(), EndDate: $("#enddate").val(), TrxUserName: $("#hd_sessionLogin").val(), TrxAction: "CheckDay" });
    $.ajax({
        url: "asmx/TrmMailSystem.asmx/UIDESK_TrxFilterDate",
        method: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: jsonTextTanggal,
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, result = "";

            for (i = 0; i < json.length; i++) {

                if (json[i].SummaryDay > 3) {

                    swal(
                        '',
                        'Date more than 3 days',
                        'error'
                    ).then(function () {
                        window.location = "TrxHistoryTicket.aspx";
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

    //var jsonText = JSON.stringify({ StartDate: $("#startdate").val(), EndDate: $("#enddate").val(), TrxUserName: $("#hd_sessionLogin").val() });
    //$.ajax({
    //    url: "asmx/TrxHistoryOutbound.asmx/CheckSummaryDay",
    //    method: "POST",
    //    contentType: "application/json; charset=utf-8",
    //    dataType: "json",
    //    data: jsonText,
    //    success: function (data) {

    //        var json = JSON.parse(data.d);
    //        var j, result = "";

    //        for (j = 0; j < json.length; j++) {

    //            if (json[j].SummaryDay > 3) {
    //                swal(" Date more than 3 days ");
    //                window.location.href = "TrxHistoryTicket.aspx"
    //                return false;
    //            }
    //        }

    //    },
    //    error: function (xmlHttpRequest, textStatus, errorThrown) {
    //        console.log(xmlHttpRequest.responseText);
    //        console.log(textStatus);
    //        console.log(errorThrown);
    //    },
    //    complete: function () {

    //    }
    //});
}