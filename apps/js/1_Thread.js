var idWA = "3";
var noWA = "08170154444";
var apiKeyWA = "qRbkioekrn2xVSUwQWWiBzet03ysIhhUZZD";
var urlDatakelola;
var urlEmail;
var companyToken;

$(document).ready(function () {
    urlDatakelola = $("#SM_UrlDatakelola").val();
    companyToken = $("#SM_CompanyToken").val();
    getWS_1_Thread_select();
    WSActionTransactionKotak();
    $("#gabungMergeButton").hide();
    $("#gabungKeterangan").hide();
});
function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
function getWS_1_Thread_select() {
    //alert("test")
    var TrxUserName = $("#hd_sessionLogin").val();
    var TrxUnitKerja = $("#ContentPlaceHolder1_TrxUnitKerja").val();
    var TrxLevelUser = $("#ContentPlaceHolder1_TrxLevelUser").val();
    var result = "";

    console.log("session : " + $("#hd_sessionLogin").val());
    console.log("TrxUnitKerja : " + $("#ContentPlaceHolder1_TrxUnitKerja").val());
    console.log("TrxLevelUser : " + $("#ContentPlaceHolder1_TrxLevelUser").val());

    //Exec TR_DataThread
    //var myTable = $('#ticketThread').DataTable();
    var myTable = $('#ticketThread').DataTable({
        "processing": true,
        "destroy": true,
		 "order": [[ 0, "asc" ]],
		 "columnDefs" : [
        //hide the second & fourth column
        { 'visible': false, 'targets': [0] }
    ],
        "language": {
            processing: '<i class="spinner-border text-warning"></i><span>Loading...</span> '
        },
        //"serverSide": true,
    });
    if (getParameterByName("name") != null) {
        myTable.search(getParameterByName("name")).draw();
    }
    console.log("{TrxUserName: '" + TrxUserName + "',TrxUnitKerja: '" + TrxUnitKerja + "',TrxLevelUser: '" + TrxLevelUser + "'}");
    $.ajax({
        type: "POST",
        url: "asmx/ServiceThread.asmx/DataTableThread",
        data: "{TrxUserName: '" + TrxUserName + "',TrxUnitKerja: '" + TrxUnitKerja + "',TrxLevelUser: '" + TrxLevelUser + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x = "";

            myTable.clear().draw();
            if (json.length == 0) {
                console.log("Data not found " + i);
            } else {
                for (i = 0; i < json.length; i++) {

                    var d = new Date(json[i].DateCreate);
                    var milisegundos = parseInt(json[i].DateCreate.replace("/Date(", "").replace(")/", ""));
                    var newDate = new Date(milisegundos).toLocaleDateString("en-UE");
                    var newTime = new Date(milisegundos).toLocaleTimeString("en-UE");
                    var ConverTanggal = newDate + ' ' + newTime

                    //alert(json[i].TrxIconThreadChannel)
                    if (json[i].ValueThread == "FBcommentcomment" || json[i].ValueThread == "FBcommentpost" || json[i].ValueThread == "FBcommentreply" || json[i].ValueThread == "FBmentions") {
                        var FollowThread = "Facebook"
                    } else {
                        var FollowThread = json[i].ValueThread
                    }
                    //if (json[i].ValueThread == "IGcommentsmore" || json[i].ValueThread == "IGmentions") {
                    //    var FollowThread = "Instagram"
                    //} else {
                    //    var FollowThread = json[i].ValueThread
                    //}
                    //if (json[i].ValueThread == "TWmentionpage") {
                    //    var FollowThread = "Twitter"
                    //} else {
                    //    var FollowThread = json[i].ValueThread
                    //}
                    if (json[i].ValueThread == "Email" || json[i].ValueThread == "EMAIL") {
                        var TrxColor = "info";
                        var urlClick = "<div class='dropdown'>" +
                            "<a data-toggle='dropdown' href='#'><i class='ti-more-alt rotate-90 text-black'></i></a>" +
                            "<div class='dropdown-menu dropdown-menu-right'>" +
                            "<a class='dropdown-item' href='#' onclick=ActionType('" + json[i].ID + "','Spam')><i class='fa fa-ban'></i> Spam</a>" +
                            "<a class='dropdown-item' href='#' onclick=ActionType('" + json[i].ID + "','Solved')><i class='si-check si'></i> Solved</a>" +
                            "<a class='dropdown-item' href='#' onclick=Assign('" + json[i].ID + "')><i class='fa fa-share-alt'></i> Assign</a>" +
                            "<a class='dropdown-item' href='#' onclick=PreviewEmail('" + json[i].ThreadID + "')><i class='fa fa-folder-open-o'></i> Preview</a>" +
                            "<div class='dropdown-divider'></div>" +
                            "<a class='dropdown-item' href='1_doticket.aspx?id=" + json[i].CustomerID + "&channel=" + FollowThread + "&n=1&threadid=" + json[i].ThreadID + "&numberid=" + json[i].GenesysNumber + "&account=" + json[i].Account + "' title='" + json[i].ValueThread + "'><i class='si-arrow-right-circle si'></i> Follow Up</a>" +
                            "</div>" +
                            "</div>"
                        var ThreadCategoryImg = "<img width='32px' src='../images/icon/channel/email.png'>";
                    } else if (json[i].ValueThread == "Call" || json[i].ValueThread == "call") {
                        var TrxColor = "danger";
                        var urlClick = "<div class='dropdown'>" +
                            "<a data-toggle='dropdown' href='#'><i class='ti-more-alt rotate-90 text-black'></i></a>" +
                            "<div class='dropdown-menu dropdown-menu-right'>" +
                            //"<a class='dropdown-item' href='#' onclick=ActionType('" + json[i].ID + "','Spam')><i class='fa fa-ban'></i> Spam</a>" +
                            "<a class='dropdown-item' href='#' onclick=ActionType('" + json[i].ID + "','Prank&nbsp;Call')><i class='si-call-end si'></i> Prank Call</a>" +
                            "<a class='dropdown-item' href='#' onclick=ActionType('" + json[i].ID + "','Ignore')><i class='fa fa-trash-o'></i> Ignore</a>" +
                            //"<a class='dropdown-item' href='#' onclick=ActionType('" + json[i].TrxID + "','Delete')><i class='si-close si'></i> Delete</a>" +
                            "<div class='dropdown-divider'></div>" +
                            "<a class='dropdown-item' href='1_doticket.aspx?id=" + json[i].CustomerID + "&channel=" + FollowThread + "&n=1&threadid=" + json[i].ThreadID + "&numberid=" + json[i].GenesysNumber + "&account=" + json[i].Account + "' title='" + json[i].ValueThread + "'><i class='si-arrow-right-circle si'></i> Follow Up</a>" +
                            "</div>" +
                            "</div>"
                    } else if (json[i].ValueThread == "Facebook") {
                        var TrxColor = "primary";
                    } else if (json[i].ValueThread == "Instagram") {
                        var TrxColor = "warning";
                    } else if (json[i].ValueThread == "Facebook") {
                        var TrxColor = "primary";
                    } else if (json[i].ValueThread == "Whatsapp") {
                        var TrxColor = "success";
                        var urlClick = "<div class='dropdown'>" +
                            "<a data-toggle='dropdown' href='#'><i class='ti-more-alt rotate-90 text-black'></i></a>" +
                            "<div class='dropdown-menu dropdown-menu-right'>" +
                            "<a class='dropdown-item' href='#' onclick=ActionType('" + json[i].ID + "','Spam')><i class='fa fa-ban'></i> Spam</a>" +
                            "<a class='dropdown-item' href='#' onclick=PreviewWhatsApp('" + json[i].GenesysNumber + "','" + getParameterByName("name") + "')><i class='fa fa-folder-open-o'></i> Preview WA</a>" +
                            "<!--<a class='dropdown-item' href='#' onclick=PreviewSosmed('" + json[i].GenesysNumber + "')><i class='fa fa-folder-open-o'></i> Preview Sosmed</a>-->" +
                            "<div class='dropdown-divider'></div>" +
                            "<a class='dropdown-item' href='1_doticket.aspx?id=" + json[i].CustomerID + "&channel=" + FollowThread + "&n=1&threadid=" + json[i].ThreadID + "&numberid=" + json[i].GenesysNumber + "&account=" + json[i].Account + "' title='" + json[i].ValueThread + "'><i class='si-arrow-right-circle si'></i> Follow Up</a>" +
                            "</div>" +
                            "</div>"
                    } else if (json[i].ValueThread == "Twitter") {
                        var TrxColor = "primary";
                    } else if (json[i].ValueThread == "Outbound Call") {
                        var TrxColor = "danger";
                    } else {
                        var TrxColor = "success";
                        var urlClick = "<div class='dropdown'>" +
                            "<a data-toggle='dropdown' href='#'><i class='ti-more-alt rotate-90 text-black'></i></a>" +
                            "<div class='dropdown-menu dropdown-menu-right'>" +
                            "<a class='dropdown-item' href='#' onclick=ActionType('" + json[i].ID + "','Spam')><i class='fa fa-ban'></i> Spam</a>" +
                            "<a class='dropdown-item' href='#' onclick=PreviewWhatsApp('" + json[i].ThreadID + "','" + getParameterByName("name") + "')><i class='fa fa-folder-open-o'></i> Preview</a>" +
                            "<div class='dropdown-divider'></div>" +
                            "<a class='dropdown-item' href='1_doticket.aspx?id=" + json[i].CustomerID + "&channel=" + FollowThread + "&n=1&threadid=" + json[i].ThreadID + "&numberid=" + json[i].GenesysNumber + "&account=" + json[i].Account + "' title='" + json[i].ValueThread + "'><i class='si-arrow-right-circle si'></i> Follow Up</a>" +
                            "</div>" +
                            "</div>"
                    } 

                    if (json[i].IconValueThread == "" || json[i].IconValueThread == null) {
                        var TrxIcon = "<span class='badge badge-pill badge-" + TrxColor + "' style='width: 100%;'><a style='color:white;' href='1_doticket.aspx?n=1&id=" + json[i].CustomerID + "&channel=" + FollowThread + "&n=1&threadid=" + json[i].ThreadID + "&numberid=" + json[i].GenesysNumber + "&account=" + json[i].Account + "'>" + json[i].ValueThread + "</a></span>"
                    } else {
                        if (json[i].ThreadCustomerName == "" || json[i].ThreadCustomerName == null) {
                            var TrxIcon = "<span class='badge badge-pill badge-" + TrxColor + "' style='width: 90px;'><a style='color:white;' href='1_doticket.aspx?n=1&id=" + json[i].CustomerID + "&channel=" + FollowThread + "&n=1&threadid=" + json[i].ThreadID + "&numberid=" + json[i].GenesysNumber + "&account=" + json[i].Account + "'>" + json[i].ValueThread + "</a></span>"
                        }else{
                            var TrxIcon = "<span class='badge badge-pill badge-" + TrxColor + "' style='width: 90px;'><a style='color:white;' href='1_doticket.aspx?n=1&id=" + json[i].CustomerID + "&channel=" + FollowThread + "&n=1&threadid=" + json[i].ThreadID + "&numberid=" + json[i].GenesysNumber + "&account=" + json[i].Account + "'>" + json[i].ValueThread + "</a></span>"
                        }
                    }
                    if (json[i].AgentName == "" || json[i].AgentName == null) {
                        var TrxAgent = "<center>-</center>";
                    } else {
                        var TrxAgent = "<span class='badge badge-pill badge-warning' style='width: 120px;color:white;'>" + json[i].AgentName + "</span>";
                    }

                    if (json[i].ThreadCategory == "" || json[i].ThreadCategory == null) {
                        if (json[i].ValueThread == "Email" || json[i].ValueThread == "EMAIL") {
                            var ThreadCategoryImg = "<img width='32px' src='../images/icon/channel/email.png'>";
                        } else if (json[i].ValueThread == "Multichat") {
                            var ThreadCategoryImg = "<img width='32px' src='../images/icon/channel/messenger.png'>";
                        } else if (json[i].ValueThread == "Call" || json[i].ValueThread == "call") {
                            var ThreadCategoryImg = "<img width='32px' src='../images/icon/channel/inbound.png'>";
                        } else {
                            var ThreadCategoryImg = "<center>-</center>";
                        }
                    } else if (json[i].ThreadCategory == "ig") {
                        var ThreadCategoryImg = "<img width='32px' src='../images/icon/channel/instagram.png'>";
                    } else if (json[i].ThreadCategory == "fb") {
                        var ThreadCategoryImg = "<img width='32px' src='../images/icon/channel/facebook.png'>";
                    } else if (json[i].ThreadCategory == "whatsapp") {
                        var ThreadCategoryImg = "<img width='32px' src='../images/icon/channel/whatsapp.png'>";
                    } else if (json[i].ThreadCategory == "chat-widget") {
                        var ThreadCategoryImg = "<img width='32px' src='../images/icon/channel/LiveChat.png'>";
                    }

                    myTable.row.add([json[i].ID,ThreadCategoryImg, TrxIcon, json[i].ThreadCustomerName, json[i].GenesysNumber, json[i].Account, json[i].Subject, TrxAgent, newDate + ' ' + newTime, urlClick]).draw(false);
                   //alert(myTable)


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
function ActionType(TrxID, TrxType) {
    $("#ContentPlaceHolder1_TrxID").val(TrxID);
    $("#ContentPlaceHolder1_TrxType").val(TrxType);
    $("#hd_sessionLogin").val();
    $("#modal-center-reason").modal('show');
    console.log("session : " + $("#hd_sessionLogin").val());
    console.log("TrxID : " + $("#ContentPlaceHolder1_TrxID").val());
    console.log("TrxType : " + $("#ContentPlaceHolder1_TrxType").val());

    var result = "";
    var messageDiv = $('#divInstanNote');
    var form_data = JSON.stringify({ TrxID: $("#ContentPlaceHolder1_TrxID").val(), TrxType: 'Thread' });
    $.ajax({
        url: "asmx/ServiceThread.asmx/ThreadDataSelectInstanNote",
        method: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        //data: "{ TrxUsername: '" + TrxUsername + "', TrxCustomerID: '" + TrxCustomerID + "',TxtThreadID: '" + TxtThreadID + "',TxtAccount: '" + TxtAccount + "',TrxPelapor: '" + TrxPelapor + "',TrxPelaporEmail: '" + TrxPelaporEmail + "',TrxPelaporPhone: '" + TrxPelaporPhone + "',TrxPelaporAddress: '" + encodeData(TrxPelaporAddress) + "',TrxKejadian: '" + TrxKejadian + "',TrxPenyebab: '" + TrxPenyebab + "',TrxPenerimaPengaduan: '" + TrxPenerimaPengaduan + "',TrxStatusPelapor: '" + TrxStatusPelapor + "',TrxSkalaPrioritas: '" + TrxSkalaPrioritas + "',TrxJenisNasabah: '" + TrxJenisNasabah + "',TrxNomorRekening: '" + TrxNomorRekening + "',TrxSumberInformasi: '" + TrxSumberInformasi + "',TrxCategory: '" + TrxCategory + "',TrxLevel1: '" + TrxLevel1 + "',TrxLevel2: '" + TrxLevel2 + "',TrxLevel3: '" + TrxLevel3 + "',TrxComplaint: '" + encodeData(TrxComplaint) + "',TrxResponse: '" + encodeData(TrxResponse) + "',TrxChannel: '" + TrxChannel + "',TrxStatus: '" + TrxStatus + "',TrxEskalasi: '" + TrxEskalasi + "',TrxSLA: '" + TrxSLA + "',TrxExtendCategory: '" + TrxExtendCategory + "',TrxLayer: '" + TrxLayer + "',TrxThreadID:'" + TxtThreadID + "', TrxGenesysID:'" + TrxGenesysID + "', TxtContactID:'" + TxtContactID + "'}",
        data: form_data,
        success: function (data) {
            console.log("Action Select Instan Note : " + form_data)

            messageDiv.empty();
            var json = JSON.parse(data.d);
            var i, x = "";
            for (i = 0; i < json.length; i++) {
                //alert(json[i].TrxNote)
                //$("#divInstanNote").val(json[i].TrxNote);
                    result = '<div class="post clearfix">' +
                                          '<div class="user-block">' +
                                '<img class="img-bordered-sm rounded-circle" src="../images/user7-128x128.jpg" alt="user image">' +
                                '<span class="username">' +
                                '<a href="#">' + json[i].TrxUserCreate + '</a>' +
                                '</span>' +
                                '<span class="description" style="font-size:11px;">' + json[i].TrxDateView + '</span>' +
                                '</div>' +
                                '<div class="activitytimeline">' +
                                '<p>' +
                                '' + json[i].TrxNote + '' +
                                '</p>' +
                                '<div class="form-horizontal form-element">' +
                                '<div class="form-group row no-gutters">' +
                                '</div>' +
                                '</div>' +
                                '</div>' +
                    '</div>'
                                messageDiv.append(result);
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
function encodeData(s) {
    return encodeURIComponent(s).replace(/\-/g, "%2D").replace(/\_/g, "%5F").replace(/\./g, "%2E").replace(/\!/g, "%21").replace(/\~/g, "%7E").replace(/\*/g, "%2A").replace(/\'/g, "%27").replace(/\(/g, "%28").replace(/\)/g, "%29");
}
function ActionReasonThread() {
    console.log("session : " + $("#hd_sessionLogin").val());
    console.log("TrxID : " + $("#ContentPlaceHolder1_TrxID").val());
    console.log("TrxType : " + $("#ContentPlaceHolder1_TrxType").val());
    var ReasonThread = CKEDITOR.instances.ReasonThread.getData();
    if (ReasonThread == "") {
        AutoValidasiWarning($("#hd_sessionLogin").val(), "Your data <b>thread reason</b> is empty ")
        return false
    }
    var form_data = JSON.stringify({ TrxUserName: $("#hd_sessionLogin").val(), TrxID: $("#ContentPlaceHolder1_TrxID").val(), TrxType: $("#ContentPlaceHolder1_TrxType").val(), TrxReason: ReasonThread });
    swal({
        title: "Do you want to process?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    }) // Function event sweat alert
        .then((willDelete) => { // Function event sweat alert
            if (willDelete) {  
                /*UIDESK_Temp_UpdateThread*/
                $.ajax({
                    url: "asmx/ServiceThread.asmx/UpdateDataThread",
                    method: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    //data: "{ TrxUsername: '" + TrxUsername + "', TrxCustomerID: '" + TrxCustomerID + "',TxtThreadID: '" + TxtThreadID + "',TxtAccount: '" + TxtAccount + "',TrxPelapor: '" + TrxPelapor + "',TrxPelaporEmail: '" + TrxPelaporEmail + "',TrxPelaporPhone: '" + TrxPelaporPhone + "',TrxPelaporAddress: '" + encodeData(TrxPelaporAddress) + "',TrxKejadian: '" + TrxKejadian + "',TrxPenyebab: '" + TrxPenyebab + "',TrxPenerimaPengaduan: '" + TrxPenerimaPengaduan + "',TrxStatusPelapor: '" + TrxStatusPelapor + "',TrxSkalaPrioritas: '" + TrxSkalaPrioritas + "',TrxJenisNasabah: '" + TrxJenisNasabah + "',TrxNomorRekening: '" + TrxNomorRekening + "',TrxSumberInformasi: '" + TrxSumberInformasi + "',TrxCategory: '" + TrxCategory + "',TrxLevel1: '" + TrxLevel1 + "',TrxLevel2: '" + TrxLevel2 + "',TrxLevel3: '" + TrxLevel3 + "',TrxComplaint: '" + encodeData(TrxComplaint) + "',TrxResponse: '" + encodeData(TrxResponse) + "',TrxChannel: '" + TrxChannel + "',TrxStatus: '" + TrxStatus + "',TrxEskalasi: '" + TrxEskalasi + "',TrxSLA: '" + TrxSLA + "',TrxExtendCategory: '" + TrxExtendCategory + "',TrxLayer: '" + TrxLayer + "',TrxThreadID:'" + TxtThreadID + "', TrxGenesysID:'" + TrxGenesysID + "', TxtContactID:'" + TxtContactID + "'}",
                    data: form_data,
                    success: function () {
                        console.log("Action UpdateDataThread : " + form_data)
                        var TrxMessage = 'Your data thread has been <b>' + $("#ContentPlaceHolder1_TrxType").val() + '</b>'
                        AutoValidasiSuccess($("#hd_sessionLogin").val(), TrxMessage);
                        $("#ReasonThread").val("");
                        $("#modal-center-reason").modal('hide');
                        getWS_1_Thread_select()
                        WSActionTransactionKotak()
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
        heading: '<b>Hi agent ' + TrxCreatedby + '</b>',
        text: '' + Message + '',
        position: 'top-left',
        loaderBg: '#ff6849',
        icon: 'warning',
        hideAfter: 3500,
        stack: 6
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
    //return false
}
function WSActionTransactionKotak() {
    var ValUserID = $("#hd_sessionLogin").val();
    var ValLayerID = $("#TrxLoginTypeAngka").val();
    var ValSpv = $("#TrxLayerUser").val();
    var result = "";
    var resultStart = "";
    var resultEnd = "";
    var messageDiv = $('#1_TampungKotakAtas');
    //alert(ValUserID)
    //Exec SP_TempKotakThread
    console.log("{UserID: '" + ValUserID + "',LayerID: '" + ValLayerID + "',Spv: '" + ValSpv + "'}");
    $.ajax({
        type: "POST",
        url: "asmx/ServiceThread.asmx/ActionTransactionKotak",
        data: "{UserID: '" + ValUserID + "',LayerID: '" + ValLayerID + "',Spv: '" + ValSpv + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i = 0;
            var x = 0;
            messageDiv.empty();
            console.log(json);
            for (x = 0; x < 1; x++) {

                result += "<div class='row'>";
                for (i = 0; i < json.length; i++) {
                    if (json[i].ChannelData == "Email") {
                        var TrxColor = "primary";
                        var imgChannel = "email.png";
                        var sizeImg = "36";
                    } else if (json[i].ChannelData == "Call") {
                        var TrxColor = "primary";
                        var imgChannel = "inbound.png";
                        var sizeImg = "36";
                    } else if (json[i].ChannelData == "Instagram") {
                        var TrxColor = "primary";
                        var imgChannel = "instagram.png";
                        var sizeImg = "36";
                    } else if (json[i].ChannelData == "Facebook") {
                        var TrxColor = "primary";
                        var imgChannel = "facebook.png";
                        var sizeImg = "36";
                    } else if (json[i].ChannelData == "Whatsapp") {
                        var TrxColor = "primary";
                        var imgChannel = "whatsapp.png";
                        var sizeImg = "36";
                    } else if (json[i].ChannelData == "Twitter") {
                        var TrxColor = "primary";
                        var imgChannel = "twitter.png";
                        var sizeImg = "36";
                    } else if (json[i].ChannelData == "Outbound") {
                        var TrxColor = "primary";
                        var imgChannel = "outgoingcall.png";
                        var sizeImg = "36";
                    } else if (json[i].ChannelData == "Tokopedia") {
                        var TrxColor = "primary";
                        var imgChannel = "tokopedia.png";
                        var sizeImg = "46";
                    } else if (json[i].ChannelData == "Shopee") {
                        var TrxColor = "primary";
                        var imgChannel = "shopee.png";
                        var sizeImg = "46";
                    } else if (json[i].ChannelData == "Lazada") {
                        var TrxColor = "primary";
                        var imgChannel = "lazada.png";
                        var sizeImg = "46";
                    } else if (json[i].ChannelData == "WalkIN") {
                        var TrxColor = "primary";
                        var imgChannel = "walkin.png";
                        var sizeImg = "46";
                    } else if (json[i].ChannelData == "Multichat") {
                        var TrxColor = "primary";
                        var imgChannel = "messenger.png";
                        var sizeImg = "46";
                    }
                    
                    result += '<div class="col-12 col-lg-4"><a href="1_Thread.aspx?mid=1009&name='+ json[i].ChannelData +'">' +
                        '<div class="box-body br-1 border-light">' +
                        '<div class="flexbox mb-1">' +
                        '<span>' +
                        '<img class="img-bordered-sm" src="../images/icon/channel/' + imgChannel + '" alt="' + json[i].ChannelData +'" height="'+ sizeImg +'"><!--<i class="' + json[i].statusIcon + ' font-size-46"></i>-->' +
                        '<!--<br>' +
                        json[i].ChannelData +
                        '--></span>' +
                        '<span class="text-' + TrxColor +' font-size-40">' + json[i].JumlahData + '</span>' +
                        '</div>' +
                        '<div class="progress progress-xxs mt-10 mb-0">' +
                        '<div class="progress-bar bg-' + TrxColor +'" role="progressbar" style="width: 100%; height: 4px;" aria-valuenow="35" aria-valuemin="0" aria-valuemax="100"></div>' +
                        '</div>' +
                        '</div>' +
                        '</a></div>';
                    
                }
                result += "</div>";              
            }
            messageDiv.append(result);
        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function PreviewEmail(TrxEmailID) {
    $("#ThreadNumber").val(TrxEmailID);
    document.getElementById("framefile_html").src = "../FileEmail/INBOX/" + TrxEmailID + "/file.html"
    $("#modal-center-email").modal('show')
}
function PreviewWhatsApp(TrxWhatsAppID, nameChannel) {
    //document.getElementById("framefile_html").src = "http://10.28.2.222/brilifecc/apps/template/wa.html?convid=" + TrxWhatsAppID + ""
    //document.getElementById("framefile_html").src = "http://omnichannel.uidesk.id/omnichannel_dev/apps/template/wa.html?convid=" + TrxWhatsAppID.replace("WA-", "") + ""
    //document.getElementById("framefile_html").src = "http://omnichannel.uidesk.id/omnichannel_dev/apps/template/wa.html?convid=51"
    //$("#modal-center-email").modal('show')
    $("#ThreadNumber").val(TrxWhatsAppID);
    if (nameChannel == "Multichat") {
        document.getElementById("framefile_html").src = urlDatakelola+"chat/" + TrxWhatsAppID + "/history?token=" + $("#SM_MultiChatToken").val() + "";
    } else {
        document.getElementById("framefile_html").src = urlDatakelola +"chat/" + TrxWhatsAppID + "/history?token=" + $("#SM_MultiChatToken").val() + "";
    }

    $("#modal-center-email").modal('show');
}
function PreviewSosmed(TrxWhatsAppID) {
    document.getElementById("framefile_html").src = urlDatakelola +"chat/" + TrxWhatsAppID + "/history?token=" + $("#SM_MultiChatToken").val() + ""
    //document.getElementById("framefile_html").src = "http://omnichannel.uidesk.id/omnichannel_dev/apps/template/wa.html?convid=" + TrxWhatsAppID.replace("WA-", "") + ""
    //document.getElementById("framefile_html").src = "http://omnichannel.uidesk.id/omnichannel_dev/apps/template/wa.html?convid=51"
    $("#modal-center-email").modal('show')
}
//New Restu Merge ticket
function getWS_DataTicketYangAkanDigabung(value) {
    var selectedValue = value;
   
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'" + $("#Cari_TicketNumber").val() + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK55'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, resultSourceEnquiryReason = "";
            console.log(json);
            for (i = 0; i < json.length; i++) {

                var milisegundos = parseInt(json[i].TglKejadian.replace("/Date(", "").replace(")/", ""));
                var newDate = new Date(milisegundos).toLocaleDateString("en-GB");
                var getDateBirth = newDate.split('/');

               
                $("#gabungTicketDari").text($("#Cari_TicketNumber").val());
                $("#gabungCategoryDari").text(json[i].CategoryName);
                $("#gabungKeluhanDari").html(json[i].ExtractComplaint +"<br>"+ json[i].ExtractResponse);
                $("#gabungTanggalDari").text(getDateBirth[2] + "-" + getDateBirth[1] + "-" + getDateBirth[0]);
                $("#gabungNamaDari").text(json[i].NAMA_PELAPOR);
                $("#gabungMergeButton").show();
                $("#gabungKeterangan").show();

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function popupMergeTicket(){
    var ticketid=getParameterByName("ticketid");
    var ticketcategory=$("#Ticket_Category").text();
    var ticketkeluhanasal=$("#Ticket_Complaints").text();
    var ticketnamaasal=$("#TxtName").val();
    var tickettanggalasal=$("#Ticket_DateofTransaction").text();
    console.log(ticketnamaasal);
    console.log(ticketkeluhanasal);
    $("#gabungTicketAsal").text(ticketid);
    $("#gabungCategory").text(ticketcategory);
    $("#gabungKeluhanAsal").html(ticketkeluhanasal);
    $("#gabungTanggalAsal").text(tickettanggalasal);
    $("#gabungNamaAsal").text(ticketnamaasal);
}
function SearchDataTicket(){
    console.log("Mulai Cari Ticket");
    getWS_DataTicketYangAkanDigabung($("#Cari_TicketNumber").val());
}
function MergeThisTicket(){
    console.log("Merge This Thread");
    //var form_data = JSON.stringify({ TrxTicketAsal: $("#ThreadNumber").val(), TrxTicketDari: $("#gabungTicketDari").text(), TrxMergeDescription: encodeData($("#gabungKeteranganEditor").val()), TrxAgentCreate: $("#hd_sessionLogin").val() });
                
    //console.log(form_data);
    swal({
        title: "Do you want to process merge?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                var form_data = JSON.stringify({ TrxTicketAsal: $("#ThreadNumber").val(), TrxTicketDari: $("#gabungTicketDari").text(), TrxMergeDescription: encodeData($("#gabungKeteranganEditor").val()), TrxAgentCreate: $("#hd_sessionLogin").val() });
                $.ajax({
                    url: "asmx/TrxMergeTicket.asmx/InsertTransactionMergeThread",
                    method: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    //data: "{ TrxUsername: '" + TrxUsername + "', TrxCustomerID: '" + TrxCustomerID + "',TxtThreadID: '" + TxtThreadID + "',TxtAccount: '" + TxtAccount + "',TrxPelapor: '" + TrxPelapor + "',TrxPelaporEmail: '" + TrxPelaporEmail + "',TrxPelaporPhone: '" + TrxPelaporPhone + "',TrxPelaporAddress: '" + encodeData(TrxPelaporAddress) + "',TrxKejadian: '" + TrxKejadian + "',TrxPenyebab: '" + TrxPenyebab + "',TrxPenerimaPengaduan: '" + TrxPenerimaPengaduan + "',TrxStatusPelapor: '" + TrxStatusPelapor + "',TrxSkalaPrioritas: '" + TrxSkalaPrioritas + "',TrxJenisNasabah: '" + TrxJenisNasabah + "',TrxNomorRekening: '" + TrxNomorRekening + "',TrxSumberInformasi: '" + TrxSumberInformasi + "',TrxCategory: '" + TrxCategory + "',TrxLevel1: '" + TrxLevel1 + "',TrxLevel2: '" + TrxLevel2 + "',TrxLevel3: '" + TrxLevel3 + "',TrxComplaint: '" + encodeData(TrxComplaint) + "',TrxResponse: '" + encodeData(TrxResponse) + "',TrxChannel: '" + TrxChannel + "',TrxStatus: '" + TrxStatus + "',TrxEskalasi: '" + TrxEskalasi + "',TrxSLA: '" + TrxSLA + "',TrxExtendCategory: '" + TrxExtendCategory + "',TrxLayer: '" + TrxLayer + "',TrxThreadID:'" + TxtThreadID + "', TrxGenesysID:'" + TrxGenesysID + "', TxtContactID:'" + TxtContactID + "'}",
                    data: form_data,
                    success: function () {
                        console.log(form_data)
                        swal("Done!", {
                            icon: "success",
                        });
                        //window.location.reload();
                    },
                    error: function (xmlHttpRequest, textStatus, errorThrown) {
                        console.log(xmlHttpRequest.responseText);
                        console.log(textStatus);
                        console.log(errorThrown);
                    },
                    complete: function () {

                    }
                });
                
                //window.location.reload();
            } else {
                //swal("Your imaginary file is safe!");          
            }
        });
    //getWS_DataTicketYangAkanDigabung($("#Cari_TicketNumber").val());
}
//End
function Assign(IvcID) {
    $("#ContentPlaceHolder1_AssignID").val(IvcID);
    $("#modal-assign").modal('show');
    ComboAgentEmail()
}
function ActionAssign() {
    if ($("#ComboAgent").val() == "" || $("#ComboAgent").val() == "Select") {
        swal(
            '',
            'Agent is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#AssignEmail").val() == "") {
        swal(
            '',
            'Reason Assign is empty',
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

                var form_data = JSON.stringify({ Access: "0", IvcID: $("#ContentPlaceHolder1_AssignID").val(), Agent: $("#ComboAgent").val(), ReasonAssign: $("#AssignEmail").val(), User: $("#hd_sessionLogin").val() });
                $.ajax({
                    url: "asmx/TrmMailSystem.asmx/AHU_Uidesk_TrxAssignEmail",
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
                                    'Assign Data Has Been Success',
                                    'success'
                                ).then(function () {
                                    $("#modal-assign").modal('hide');
                                    $("#AssignEmail").val("")
                                    location.href = "TrmMailSystem.aspx?"
                                });
                            } else {
                                swal(
                                    '',
                                    'Assign Data Has Been Failed !',
                                    'error'
                                ).then(function () {
                                    $("#modal-assign").modal('hide');
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
function ComboAgentEmail() {
    var TempComboAgent = $('#ComboAgent');
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'" + $("#ContentPlaceHolder1_AssignID").val() + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK123'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "";

            TempComboAgent.empty()
            for (i = 0; i < json.length; i++) {

                result = '<option value="' + json[i].agent_name + '">' + json[i].agent_name + '</option>';
                TempComboAgent.append(result);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function SubmitOrderID() {
    var settings = {
        "url": "https://private-anon-8ec2dfef72-bantudagangapi.apiary-mock.com/order/detail?order_ref_id=240520SRTS1XQ3",
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Cookie": "ak_bmsc=853D4A8F7686CF3B1493C754C71386C6~000000000000000000000000000000~YAAQXO84F5aslWmPAQAA2vxklRevfJkdiiP2BYusxHrLwgQYeAOZG73pAuY/iaERcFLq0BE4xh+UQdNSJjNyJEsDGGTBpfOciVtgChLGpvGCPB2OAx7De8cu52adHcpDssPanj6weed2B+kBID6wWQdAKSRvteNtP0CQzdYzfATDYE1jGvt9dMX1OnHW8Ozm7oGQiE5t3lZl1Q7ItVtjYq00swpfuFM72g7tUIVttdrMqFl9idj9Jfo2sVDqeJJbairucBlGwKyY1mUseNv+zYG0SCbj2lKRPg/7/9imPxMYJGI/f+1RRO4bU4A6R9iDUDMlLiU+/QipcUyIs/PG0eJHWCyAw1jyps130mAl116V2RE9zs/LFhWR9OxSIlc=; bm_sv=04C829BD028A87CD92CD97908506B853~YAAQjuwZuFg5z1CPAQAAiuPLlRcrGwHn6zC6IOD90bvxzRFzEH2qjgvgiCAJq25voNnYqB2mHOr2jx09GcD/rrbPDnoh2lYRqujVq51JX0D1lVs7R9IT828mC8CmbelAFGtO2miCXsOcaHfbknnr8ui4quHC7JuBcqLmrstkZnt9KyrnqRDhliQ+nX5pGh7UgIeRFuy/aiN6BlLWuE8C3hwUmf0n6gpGAWCAwQLjT99I4rZbLan/xJiEgUrqUQar6e6oNuk=~1"
        },
    };

    $.ajax(settings).done(function (response) {
        console.log("response bantu dagang" + response);
    });
}
function SubmitChatID() {
    var jsonText = JSON.stringify();
    $.ajax({
        type: "GET",
        url: "asmx/json/ChatDetail.json",
        //url: "https://cc-api.brilife.co.id/contactserviceapi/wellcomeCall",
        //url: "https://cc-api-dev.brilife.co.id/contactserviceapi/wellcomeCall",
        contentType: "application/json; charset=utf-8",
        data: jsonText,
        dataType: "json",
        success: function (response) {

            var json = response;
            var i, j, k, x;

            console.log(json.code)
            //console.log(json.data.reply_id)
            console.log(json.message)


        }, complete: function () {


        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert("xhr.status " + xhr.status);
            alert(xhr.responseText);
            alert(thrownError);
        }
    });
}