var idWA = "3";
var noWA = "08170154444";
var apiKeyWA = "qRbkioekrn2xVSUwQWWiBzet03ysIhhUZZD";
var urlDatakelola;
var companyToken;

$(document).ready(function () {
    urlDatakelola = $("#SM_UrlDatakelola").val();
    companyToken = $("#SM_CompanyToken").val();
    CmbSosialMediaType();
    CmbSosialMediaAccount();
    CmbMaximalHandle();
    TrmAgentSetting("0");
    $('#Agent_Checkbox').click(function () {
        if ($(this).is(':checked')) {
            $("#ContentPlaceHolder1_HDUserAgent_Checkbox").val("1")
        } else {
            $("#ContentPlaceHolder1_HDUserAgent_Checkbox").val("0")
        }
    });
});
function TrmAgentSetting(TrxValue) {
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'" + TrxValue + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK52'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, resultUserNotification = "";

            $('#divUserNotification').empty();
            for (i = 0; i < json.length; i++) {
                if (json.length > 2) {
                    var columns = "3"
                } else {
                    var columns = "6"
                }
                if (json[i].GENDER == "Wanita") {
                    var JenisKelamin = "<img src ='../images/avatar/375x200/7.jpg' alt='...'> "
                } else {
                    var JenisKelamin = "<img src ='../images/avatar/375x200/2.jpg' alt='...'> "
                }
                if (json[i].product_campaign == null) {
                    var AccountName = "-"
                } else {
                    var AccountName = json[i].product_campaign
                }
                resultUserNotification = '<div class="col-md-12 col-lg-' + columns + '">' +
                    '<div class="box box-default">' +
                    '<div class="fx-card-item">' +
                    '<div class="fx-card-avatar fx-overlay-1">' +
                    '' + JenisKelamin + '' +
                    '<div class="fx-overlay">' +
                    '<ul class="fx-info">' +
                    '<li><a class="btn default btn-outline image-popup-vertical-fit" href="#" onclick="ButtonUpdate(' + json[i].id + ');"><i class="fa fa-pencil"></i></a></li>' +
                    '<li><a class="btn default btn-outline" href="#" onclick="ButtonDelete(' + json[i].id + ');"><i class="fa fa-trash-o"></i></a></li>' +
                    '</ul>' +
                    '</div>' +
                    '</div>' +
                    '<div class="fx-card-content">' +
                    '<h4 class="box-title">' + json[i].NAME + '</h4></br>' +
                    '<small>' + AccountName + '</small><br>' +
                    '<span class="badge badge-pill badge-primary badge-lg"><small>Max Handle ' + json[i].maxhandle + '</small></span>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>'
                $('#divUserNotification').append(resultUserNotification)

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function TrmAgent(TrxValue) {
    var myTable = $('#TrmAgent').DataTable();
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'" + TrxValue + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK31'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "";

            myTable.clear().draw();
            for (i = 0; i < json.length; i++) {
                var TrxParam = '<input type = "checkbox" class="checkbox" name="checkbox' + json[i].USERID + '" id = "checkbox' + json[i].USERID + '" >' +
                    '<label class="checkbox" for="checkbox' + json[i].USERID + '"></label>'
                myTable.row.add([TrxParam, json[i].USERID, json[i].USERNAME, json[i].NAME, json[i].EMAIL_ADDRESS, json[i].TokenMeta]).draw(false);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
    $("#LoaderPage").hide();
}
function AgentSetting() {
    $("#modal-agent").modal('show')
}
function CmbSosialMediaType() {
    var CmbSosialMediaType = $('#CmbSosialMediaType');
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK32'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "";
            for (i = 0; i < json.length; i++) {

                result = '<option value="' + json[i].TypeID + '">' + json[i].Name + '</option>';
                CmbSosialMediaType.append(result);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function CmbSosialMediaAccount(TrxValue) {
    //Facebook 5 -> Page
    //Instagram 9 -> Account
    console.log("Get Data Multichat List FB/IG" + TrxValue);
    //https://multichat-2.uidesk.id/api/chat/lists?token=01H8X14ZNY1CQAAQ7ZF51J17Z9
    var settings = {
        "url": urlDatakelola + "api/channel/accounts?token=" + companyToken + "",
        "method": "GET",
        "timeout": 0,
    };
    var CmbSosialMediaTransaksi = $('#CmbSosialMediaTransaksi');
    $.ajax(settings).done(function (response) {
        console.log(response);
        var json = response.data;
        var i, x, result = "";

        CmbSosialMediaTransaksi.empty();
        for (i = 0; i < json.length; i++) {
            if (TrxValue == "5" && json[i].channel_id == "1") {
                result = '<option value="' + json[i].account_id + '">' + json[i].name + '</option>';
                CmbSosialMediaTransaksi.append(result);
            } else if (TrxValue == "9" && json[i].channel_id == "2") {
                result = '<option value="' + json[i].account_id + '">' + json[i].name + '</option>';
                CmbSosialMediaTransaksi.append(result);
            } else if (TrxValue == "4" && json[i].channel_id == "4") {
                result = '<option value="' + json[i].account_id + '">' + json[i].name + '</option>';
                CmbSosialMediaTransaksi.append(result);
            } else if (TrxValue == "5" && json[i].channel_id == "5") {
                result = '<option value="' + json[i].account_id + '">' + json[i].name + '</option>';
                CmbSosialMediaTransaksi.append(result);
            } else if (TrxValue == "14" && json[i].channel_id == "14") {
                result = '<option value="' + json[i].account_id + '">' + json[i].name + '</option>';
                CmbSosialMediaTransaksi.append(result);
            } else if (TrxValue == "15" && json[i].channel_id == "15") {
                result = '<option value="' + json[i].account_id + '">' + json[i].name + '</option>';
                CmbSosialMediaTransaksi.append(result);
            } else if (TrxValue == "16" && json[i].channel_id == "16") {
                result = '<option value="' + json[i].account_id + '">' + json[i].name + '</option>';
                CmbSosialMediaTransaksi.append(result);
            } else if (TrxValue == "18" && json[i].channel_id == "3") {
                result = '<option value="' + json[i].account_id + '">' + json[i].name + '</option>';
                CmbSosialMediaTransaksi.append(result);
            }
        }
    });

    /*var CmbSosialMediaTransaksi = $('#CmbSosialMediaTransaksi');
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'" + TrxValue + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK33'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "";

            CmbSosialMediaTransaksi.empty();
            for (i = 0; i < json.length; i++) {

                result = '<option value="' + json[i].ID + '">' + json[i].AccountName + '</option>';
                CmbSosialMediaTransaksi.append(result);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })*/
}
function ButtonUpdate(rec_id) {
    $("#ContentPlaceHolder1_TrxTransaksiID").val(rec_id);
    SelectDetailProduct();
    $("#modalright").modal('show');
}
function ButtonDelete(rec_id) {
    swal({
        title: "Do you want to process?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {

                var form_data = JSON.stringify({ TrxID: rec_id, TrxUserName: $("#hd_sessionLogin").val() });
                $.ajax({
                    url: "asmx/TrxAgentSM.asmx/DeleteAgentDistributionData",
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
                                    'Transaction Successfully',
                                    'success'
                                ).then(function () {
                                    window.location = "TrxAgentSM_New.aspx";
                                });
                            } else {
                                swal(
                                    '',
                                    'Transaction Failed',
                                    'error'
                                ).then(function () {
                                    window.location = "TrxAgentSM_New.aspx";
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
function Pre_DropdownAccountSM(smID) {
    var TrxText = $("#CmbSosialMedia").find("option:selected").text();
    var TrxValue = $("#CmbSosialMedia").val();
    if (TrxValue == "") {
        TrmAgentSetting("0")
    } else {
        TrmAgentSetting(TrxValue)
    }
}
function Add_DropdownSosialMedia(smID) {
    var TrxText = $("#CmbSosialMediaType").find("option:selected").text();
    var TrxValue = $("#CmbSosialMediaType").val();
    CmbSosialMediaAccount(TrxValue);
    TrmAgent(TrxValue);
}
function Add_DropdownAccountSM(smID) {
    var TrxText = $("#CmbSosialMediaTransaksi").find("option:selected").text();
    var TrxValue = $("#CmbSosialMediaTransaksi").val();
}
function ActionUpdate() {
    if ($("#ContentPlaceHolder1_TrxTransaksiID").val() == "") {
        swal("Agent is empty")
        return false;
    }
    if ($("#CmbUpdateSosialMedia").val() == "Select" || $("#CmbUpdateSosialMedia").val() == "") {
        swal("Account sosial media is empty")
        return false;
    }
    if ($("#CmbUpdateMaxCampaign").val() == "" || $("#CmbUpdateMaxCampaign").val() == "Select") {
        swal("Maximal distribution data is empty")
        return false;
    }
    var TrxFlag = $("#ContentPlaceHolder1_HDUserAgent_Checkbox").val();
    swal({
        title: "Do you want to process?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {

                var form_data = JSON.stringify({ TrxID: $("#ContentPlaceHolder1_TrxTransaksiID").val(), TrxUserName: $("#hd_sessionLogin").val(), TrxSosialMedia: $("#CmbUpdateSosialMediaType").val(), TrxAccount: $("#CmbUpdateSosialMediaAccount").val(), TrxData: $("#CmbUpdateMaxCampaign").val(), TrxFlag: TrxFlag });
                $.ajax({
                    url: "asmx/TrxAgentSM.asmx/UpdateAgentDistributionData",
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
                                    'Transaction Successfully',
                                    'success'
                                ).then(function () {
                                    $("#CmbUpdateSosialMedia").val("");
                                    $("#CmbUpdateMaxCampaign").val("")
                                    $("#ContentPlaceHolder1_HDUserAgent_Checkbox").val("")
                                    $("#modalright").modal('hide');
                                    window.location.href = "TrxAgentSM_New.aspx";
                                });
                            } else {
                                swal(
                                    '',
                                    'Transaction Failed',
                                    'error'
                                ).then(function () {
                                    window.location = "TrxAgentSM_New.aspx";
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
$(function () {
    //Assign Click event to Button.
    $("#btnSimpan").click(function () {
        //var message = "Id Name                  Country\n";
        var message = ""
        var varToken = [];
        //Loop through all checked CheckBoxes in GridView.
        $("#TrmAgent input[type=checkbox]:checked").each(function () {
            var row = $(this).closest("tr")[0];
            message += row.cells[1].innerHTML + ",";
            varToken.push(row.cells[5].innerHTML);
            //message += "   " + row.cells[2].innerHTML;
            //message += "   " + row.cells[3].innerHTML;
            //message += "\n";
        });
        console.log("token ", varToken)
        //Display selected Row data in Alert Box.
        //alert(message);
        //return false;
        $("#ContentPlaceHolder1_TrxUserAgentId").val(message)

        if ($("#CmbSosialMediaType").val() == "Select" || $("#CmbSosialMediaType").val() == "") {
            swal("Sosial Media is empty")
            return false;
        }
        if ($("#CmbSosialMediaTransaksi").val() == "Select" || $("#CmbSosialMediaTransaksi").val() == "") {
            swal("Account sosial media is empty")
            return false;
        }
        if ($("#CmbMaxCampaign").val() == "Select" || $("#CmbMaxCampaign").val() == "") {
            swal("Maximal distribution data is empty")
            return false;
        }
        if ($("#ContentPlaceHolder1_TrxUserAgentId").val() == "") {
            swal("Agent is empty")
            return false;
        }

        event.preventDefault();
        var form = document.forms["myForm"];
        var strType = "";
        swal({
            title: "Do you want to process?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    //Post Data To Multichat
                    //Facebook 5,WA 4 -> Page
                    //Instagram 9 -> Account
                    if ($("#CmbSosialMediaType").val() == "5" || $("#CmbSosialMediaType").val() == "4") {
                        strType = "Page";
                    } else if ($("#CmbSosialMediaType").val() == "9") {
                        strType = "Account";
                    } else if ($("#CmbSosialMediaType").val() == "18") {
                        strType = "Page";
                    }
                    var settings = {
                        "url": urlDatakelola + "api/agent/assign-multiple",
                        "method": "POST",
                        "timeout": 0,
                        "headers": {
                            "Accept": "/",
                            "User-Agent": "Thunder Client (https://www.thunderclient.com)",
                            "Content-Type": "application/json"
                        },
                        "data": JSON.stringify({
                            "token": companyToken,
                            "account_id": $("#CmbSosialMediaTransaksi").val(),
                            "type": strType,
                            "agent_tokens": varToken
                        }),
                    };

                    $.ajax(settings).done(function (response) {
                        console.log(response);
                    });
                    //End Multichat


                    var form_data = JSON.stringify({ TrxUserName: $("#hd_sessionLogin").val(), TrxData: $("#ContentPlaceHolder1_TrxUserAgentId").val(), TrxSosialMedia: $("#CmbSosialMediaType").val(), TrxCampaign: $("#CmbSosialMediaTransaksi").val(), MaxCampaign: $("#CmbMaxCampaign").val() });
                    $.ajax({
                        url: "asmx/TrxAgentSM.asmx/InsertAgentDistributionData",
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
                                        'Transaction Successfully',
                                        'success'
                                    ).then(function () {
                                        window.location.href = "TrxAgentSM_New.aspx";
                                    });
                                } else {
                                    swal(
                                        '',
                                        'Transaction Failed',
                                        'error'
                                    ).then(function () {
                                        window.location = "TrxAgentSM_New.aspx";
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

    });
});
function encodeData(s) {
    return encodeURIComponent(s).replace(/\-/g, "%2D").replace(/\_/g, "%5F").replace(/\./g, "%2E").replace(/\!/g, "%21").replace(/\~/g, "%7E").replace(/\*/g, "%2A").replace(/\'/g, "%27").replace(/\(/g, "%28").replace(/\)/g, "%29");
}
function SelectDetailProduct() {
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'" + $("#ContentPlaceHolder1_TrxTransaksiID").val() + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK27'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "";

            for (i = 0; i < json.length; i++) {

                CmbUpdateSosialMediaType(json[i].channelid);
                CmbUpdateSosialMediaAccount(json[i].product_id);
                $('#CmbUpdateMaxCampaign').val(json[i].maxhandle);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function CmbMaximalHandle() {
    var CmbMaximalHandle = $('#CmbMaxCampaign');
    var CmbUpdateMaxCampaign = $('#CmbUpdateMaxCampaign');
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK25'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "";
            for (i = 0; i < json.length; i++) {

                result = '<option value="' + json[i].max_handle + '">' + json[i].max_handle + '</option>';
                CmbMaximalHandle.append(result);
                CmbUpdateMaxCampaign.append(result);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function CmbUpdateSosialMediaType(TrxChannelID) {
    $('#CmbUpdateSosialMediaType').attr("disabled", true);
    var CmbUpdateSosialMediaType = $('#CmbUpdateSosialMediaType');
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'" + TrxChannelID + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK32'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "";

            CmbUpdateSosialMediaType.empty();
            for (i = 0; i < json.length; i++) {

                result = '<option value="' + json[i].TypeID + '">' + json[i].Name + '</option>';
                CmbUpdateSosialMediaType.append(result);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function CmbUpdateSosialMediaAccount(TrxProductID) {
    $('#CmbUpdateSosialMediaAccount').attr("disabled", true);
    var CmbUpdateSosialMediaAccount = $('#CmbUpdateSosialMediaAccount');
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'" + TrxProductID + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK33'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "";

            CmbUpdateSosialMediaAccount.empty();
            for (i = 0; i < json.length; i++) {

                result = '<option value="' + json[i].ID + '">' + json[i].AccountName + '</option>';
                CmbUpdateSosialMediaAccount.append(result);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}