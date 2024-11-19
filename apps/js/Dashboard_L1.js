﻿$(document).ready(function() {
    "use strict";
    WSActionGetSummary($("#dataAgentName").val(), $("#dataStartDate").val(), $("#dataEndDate").val());
    WSActionGetSummaryCategory($("#dataAgentName").val(), $("#dataStartDate").val(), $("#dataEndDate").val());
    //chartWeekly($("#dataAgentName").val(), $("#dataStartDate").val(), $("#dataEndDate").val());
    chartWeekly($("#dataAgentName").val(), $("#dataStartDate").val(), $("#dataEndDate").val());
    getWS_MasterAgent($("#hd_leveluser").val(), $("#hd_sessionLogin").val(), $("#hd_Unitkerja").val(), $("#hd_Org").val());
});

function getWS_MasterAgent(LevelUser, Username, Unituser, Org) {
   //#RestuUIDESK 2020-12-28 - Check Value
    console.log("Session : " + LevelUser + "- " + Username + "- " + Unituser + "- " + Org + "")
    //End
    var cmbData = $('#dataAgentName');
    var jsonText = JSON.stringify({ LevelUser: LevelUser, Username: Username, Unituser: Unituser, Org: Org });
    $.ajax({
        type: "POST",
        url: "asmx/Dashboard_L1.asmx/GetDataAgent",
        data: jsonText,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data) {
            var json = JSON.parse(data.d);
            var i, x, result = "";
            for (i = 0; i < json.length; i++) {
                //alert();
                //alert();
                //alert(json[i].UserCreate);
                result = '<option value="' + json[i].Username + '">' + json[i].Username + '</option>';
                cmbData.append(result);

            }

        },
        error: function(xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}

function clickResult() {
    console.log($("#dataAgentName").val() + "-" + $("#dataStartDate").val() + "-" + $("#dataEndDate").val())
    WSActionGetSummary($("#dataAgentName").val(), $("#dataStartDate").val(), $("#dataEndDate").val());
    WSActionGetSummaryCategory($("#dataAgentName").val(), $("#dataStartDate").val(), $("#dataEndDate").val());
    chartWeekly($("#dataAgentName").val(), $("#dataStartDate").val(), $("#dataEndDate").val());
}

async function chartWeekly(agentname, startdate, enddate) {
    var j = { keterangan1: "1", keterangan2: "2", keterangan3: "3", keterangan4: "4" };
    console.log("Sample array");
    console.log(Object.values(j));
    var stackedChart = echarts.init(document.getElementById('stacked-bar'));

    var dataLabel = [];
    var dataLegend = [];
    var dataSeries = [];
    await $.ajax({
        type: "POST",
        url: "http://omni.uidesk.id/waiframe/api/da_weekly",
        // url: "api/da_weekly",
        data: JSON.stringify({
            AgentName: agentname,
            StartDate: startdate,
            EndDate: enddate
        }),
        // data: "{AgentName: '" + agentname + "',StartDate: '" + startdate + "',EndDate: '" + enddate + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: async function(result) {
            dataLabel = result.label;
            result.data.forEach(nilai => {
                dataLegend.push(nilai.name);
                dataSeries.push({
                    name: nilai.name,
                    type: 'bar',
                    stack: 'Total',
                    itemStyle: { normal: { label: { show: true, position: 'insideRight' } } },
                    data: nilai.data
                });
            });
        },
        error: function(xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    });

    console.log(dataLegend)
    console.log(dataSeries)
    // specify chart configuration item and data
    var option = {
        // Setup grid
        grid: {
            x: 40,
            x2: 40,
            y: 45,
            y2: 25
        },

        // Add tooltip
        tooltip: {
            trigger: 'axis',
            axisPointer: {            // Axis indicator axis trigger effective
                type: 'shadow'        // The default is a straight line, optionally: 'line' | 'shadow'
            }
        },

        // Add legend
        legend: {
            data: dataLegend
        },

        // Add custom colors
        color: ['#689f38', '#38649f', '#389f99', '#ff8f00', '#ee1044', '#ffdc99'],

        // Horizontal axis
        xAxis: [{
            type: 'value',
        }],

        // Vertical axis
        yAxis: [{
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        }],

        // Add series
        series: dataSeries
    };
    // use configuration item and data specified to show chart
    stackedChart.setOption(option);
    /*var j = { 0: "1", 1: "2", 2: "3", 3: "4" };
    console.log(Object.values(j));
    var stackedChart = echarts.init(document.getElementById('stacked-bar'));
    $.ajax({
        type: "POST",
        url: "asmx/Dashboard_L1.asmx/GetDataLegendChart",
        data: "{AgentName: '" + agentname + "',StartDate: '" + startdate + "',EndDate: '" + enddate + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i = 0;
            // messageDiv.empty();
            console.log(json);
            console.log(json[0].Keterangan);
            console.log("Test Array");
            console.log(Object.values(json));
            //console.log(json[0].Keterangan);

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
    // specify chart configuration item and data
    var dataLegend = ['Facebookaaa', 'Instagram', 'Twitter', 'Whatsapp', 'Email', 'Call'];
    var option = {
        // Setup grid
        grid: {
            x: 40,
            x2: 40,
            y: 45,
            y2: 25
        },

        // Add tooltip
        tooltip: {
            trigger: 'axis',
            axisPointer: {            // Axis indicator axis trigger effective
                type: 'shadow'        // The default is a straight line, optionally: 'line' | 'shadow'
            }
        },

        // Add legend
        legend: {
            data: dataLegend
        },

        // Add custom colors
        color: ['#689f38', '#38649f', '#389f99', '#ff8f00', '#ee1044', '#ffdc99'],

        // Horizontal axis
        xAxis: [{
            type: 'value',
        }],

        // Vertical axis
        yAxis: [{
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        }],

        // Add series
        series: [
            {
                name: 'Facebookaaa',
                type: 'bar',
                stack: 'Total',
                itemStyle: { normal: { label: { show: true, position: 'insideRight' } } },
                data: [10, 7, 10, 9, 19, 32, 21]
            },
            {
                name: 'Instagram',
                type: 'bar',
                stack: 'Total',
                itemStyle: { normal: { label: { show: true, position: 'insideRight' } } },
                data: [4, 9, 3, 20, 54, 11, 12]
            },
            {
                name: 'Twitter',
                type: 'bar',
                stack: 'Total',
                itemStyle: { normal: { label: { show: true, position: 'insideRight' } } },
                data: [16, 17, 20, 29, 41, 10, 15]
            },
            {
                name: 'Whatsapp',
                type: 'bar',
                stack: 'Total',
                itemStyle: { normal: { label: { show: true, position: 'insideRight' } } },
                data: [8, 7, 5, 6, 2, 1, 2]
            },
            {
                name: 'Email',
                type: 'bar',
                stack: 'Total',
                itemStyle: { normal: { label: { show: true, position: 'insideRight' } } },
                data: [11, 12, 13, 14, 15, 16, 17]
            }
            ,
            {
                name: 'Call',
                type: 'bar',
                stack: 'Total',
                itemStyle: { normal: { label: { show: true, position: 'insideRight' } } },
                data: [1, 2, 3, 4, 5, 6, 7]
            }
        ]
    };
    // use configuration item and data specified to show chart
    stackedChart.setOption(option);*/

}

function WSActionGetSummary(agentname, startdate, enddate) {

    //alert(ValUserID)
    $.ajax({
        type: "POST",
        url: "asmx/Dashboard_L1.asmx/GetDataListSummary",
        data: "{AgentName: '" + agentname + "',StartDate: '" + startdate + "',EndDate: '" + enddate + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data) {
            var json = JSON.parse(data.d);
            var i = 0;
            // messageDiv.empty();
            console.log(json);
            console.log(json[0].Keterangan);
            if (json[0].Keterangan == "False") {
                $("#spanTotTickets").text("0");
                $("#spanTicketsProcessed").text("0");
                $("#spanTicketsClosed").text("0");
                $("#spanTotalClosedByAgent").text("0");
                $("#spanAvgResolvedDays").text("0");
                $("#spanResolvedWithSLA").text("0");
            } else {
                for (i = 0; i < json.length; i++) {
                    if (json[i].Keterangan == "TotalOpenTickets") {
                        $("#spanTotTickets").text(json[i].Nilai.slice(0, -3));
                    }
                    else if (json[i].Keterangan == "TotalTicketsProcessed") {
                        $("#spanTicketsProcessed").text(json[i].Nilai.slice(0, -3));
                    }
                    else if (json[i].Keterangan == "TotalClosedTickets") {
                        $("#spanTicketsClosed").text(json[i].Nilai.slice(0, -3));
                    }
                    else if (json[i].Keterangan == "TotalClosedByAgent") {
                        $("#spanTotalClosedByAgent").text(json[i].Nilai + " %");
                    }
                    else if (json[i].Keterangan == "AvgResolvedDays") {
                        $("#spanAvgResolvedDays").text(json[i].Nilai);
                    }
                    else if (json[i].Keterangan == "SatisfactionScore") {
                        //$("#spanSatisfactionScore").text(json[i].Nilai + " %");
                    }
                    else if (json[i].Keterangan == "ResolvedWithSLA") {
                        $("#spanResolvedWithSLA").text(json[i].Nilai + " %");
                    }
                }

            }
        },
        error: function(xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}

function WSActionGetSummaryCategory(agentname, startdate, enddate) {

    //alert(ValUserID)
    $.ajax({
        type: "POST",
        url: "asmx/Dashboard_L1.asmx/GetDataListSummaryCategory",
        data: "{AgentName: '" + agentname + "',StartDate: '" + startdate + "',EndDate: '" + enddate + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data) {
            var json = JSON.parse(data.d);
            var i = 0;
            // messageDiv.empty();
            console.log(json);
            if (json.length == 0) {
                console.log("False");
                $("#spanComplaint").text("0");
                $("#spanInformation").text("0");
                $("#spanRequest").text("0");
                $("#spanInquiry").text("0");
            }
            var isiKotak = "";
            $("#isiBoxCategory").empty();
            for (i = 0; i < json.length; i++) {
                if (json[i].Keterangan == "Complaint") {
                    $("#spanComplaint").text(json[i].Nilai);
                }
                if (json[i].Keterangan == "Information") {
                    $("#spanInformation").text(json[i].Nilai);
                }
                if (json[i].Keterangan == "Request") {
                    $("#spanRequest").text(json[i].Nilai);
                }
                if (json[i].Keterangan == "Inquiry") {
                    $("#spanInquiry").text(json[i].Nilai);
                }

                isiKotak += '<div class="col-12 col-lg-3"> ' +
                    '<div class="box-body br-1 border-light"> ' +
                    '<div class="flexbox mb-1"> ' +
                    '<span> ' +
                    '<img width="52" src="../images/icon/' + json[i].Keterangan + '.png"/><br> ' +
                    json[i].Keterangan +
                    '</span> ' +
                    '<span class="text-primary font-size-40" id="spanComplaint">' + json[i].Nilai + '</span> ' +
                    '</div> ' +
                    '<div class="progress progress-xxs mt-10 mb-0"> ' +
                    '<div class="progress-bar" role="progressbar" style="width: 100%; height: 4px;" aria-valuenow="35" aria-valuemin="0" aria-valuemax="100"></div> ' +
                    '</div> ' +
                    '</div> ' +
                    '</div>';

            }
            $("#isiBoxCategory").append(isiKotak);
        },
        error: function(xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}