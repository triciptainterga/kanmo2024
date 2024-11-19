$(document).ready(function () {
    $("#LoaderPageCounting").hide();
    DataTableNya()
});
function DataTableNya() {
    var myTable = $('#TaskboardTicketing').DataTable(
        {
            "order": [[0, "Desc"]],
            "destroy": true,
        },
    );
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'0', TrxUserName:'" + $("#hd_sessionLogin").val() + "', TrxAction:'UIDESK124'}",
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
                    "<a class='dropdown-item' href='1_journey_new.aspx?ticketid=" + json[i].TicketNumber + "&numberid=0&threadid=0&status=" + json[i].Status + "'><i class='si-arrow-right-circle si'></i> Follow up</a>" +
                    "</div>" +
                    "</div>"

                var d = new Date(json[i].DateCreate);
                var milisegundos = parseInt(json[i].DateCreate.replace("/Date(", "").replace(")/", ""));
                var newDate = new Date(milisegundos).toLocaleDateString("en-UE");
                var newTime = new Date(milisegundos).toLocaleTimeString("en-UE");

                if (json[i].Status == "Open") {
                    var StatusNya = "<span class='badge badge-pill badge-primary' style='width: 70px;'>" + json[i].Status + "</span>"
                } else if (json[i].Status == "Pending") {
                    var StatusNya = "<span class='badge badge-pill badge-warning' style='width: 70px;'>" + json[i].Status + "</span>"
                } else if (json[i].Status == "In progress") {
                    var StatusNya = "<span class='badge badge-pill badge-success' style='width: 70px;'>" + json[i].Status + "</span>"
                } else if (json[i].Status == "Closed") {
                    var StatusNya = "<span class='badge badge-pill badge-danger' style='width: 70px;'>" + json[i].Status + "</span>"
                }

                myTable.row.add([json[i].ID, json[i].TicketNumber, json[i].Name, json[i].CategoryName, json[i].Department, json[i].SLA, json[i].AgentName, StatusNya, newDate + ' ' + newTime, urlClick]).draw(false);
            }
            
        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}