$(document).ready(function () {
    $("#LoaderPageCounting").hide();
    ComboFromEmail()
    $("#Div_Conversation").hide();
    //DataTableTaskboard();
});
function FilterDate() {
    $("#modal-center").modal('show');
}
function DataTableEmail() {
    $("#LoaderPageCounting").show();
    var myTaskboardTicket = $('#TaskboardMonitoring').DataTable({
        "processing": true,
        "order": [[0, "desc"]],
        "columnDefs": [
            //hide the second & fourth column
            { 'visible': false, 'targets': [0] }
        ],
        "language": {
            processing: '<i class="spinner-border text-warning"></i><span>Loading...</span> '
        },
        //"serverSide": true,
    });
    $.fn.dataTable.ext.errMode = 'none';
    $.ajax({
        type: "POST",
        url: "asmx/TrmMonitoringMail.asmx/DataTableTaskboard",
        data: "{ID:'0', UserName: '" + $("#hd_sessionLogin").val() + "', Account: '" + $('#ComboFrom').val() + "', StartDate: '" + $('#startdate').val() + "', EndDate: '" + $('#enddate').val() + "', Action:'TABLE'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x = "";

            myTaskboardTicket.clear().draw();
            if (json.length == 0) {
                console.log("Data not found " + i);
            } else {
                for (i = 0; i < json.length; i++) {

                    var d = new Date(json[i].Email_Date);
                    var milisegundos = parseInt(json[i].Email_Date.replace("/Date(", "").replace(")/", ""));
                    var newDate = new Date(milisegundos).toLocaleDateString("en-UE");
                    var newTime = new Date(milisegundos).toLocaleTimeString("en-UE");
                    var ConverTanggal = newDate + ' ' + newTime
                    //}
                    //var urlAction = "<a href='1_journey_new.aspx?ticketid=" + json[i].TicketNumber + "'><i class='si-arrow-right-circle si'></i></a>"
                    //if (json[i].FLAGING_EMAIL_REPLY == "1") {
                    //    var Status = "<span class='badge badge-pill badge-success' style='width: 90px;'>Response</span>"
                    //} else {
                    //    var Status = "<span class='badge badge-pill badge-danger' style='width: 90px;'>Not Response</span>"
                    //}
                    if (json[i].FLAG_HANDLING == "1") {
                        if (json[i].TicketNumber != '') {
                            ResponseStatus = "<span class='badge badge-pill badge-success' style='width: 100px;'>Response &nbsp;&nbsp;<i class='fa fa-ticket'></i>"
                        } else {
                            ResponseStatus = "<span class='badge badge-pill badge-success' style='width: 90px;'>Response</span>"
                        }
                        //var urlAction = "<div class='dropdown'>" +
                        //    "<a data-toggle='dropdown' href='#'><i class='ti-more-alt rotate-90 text-black'></i></a>" +
                        //    "<div class='dropdown-menu dropdown-menu-right'>" +
                        //    "<a class='dropdown-item' href='#' onclick=Assign('" + json[i].IVC_ID + "')><i class='fa fa-share-alt'></i> Assign</a>" +
                        //    //"<div class='dropdown-divider'></div>" +
                        //    //"<a class='dropdown-item' href='1_journey_new.aspx?ticketid=" + json[i].TicketNumber + "&numberid=0&threadid=0&status=" + json[i].Status + "'><i class='si-arrow-right-circle si'></i> Follow up</a>" +
                        //    //"</div>" +
                        //    "</div>"
                        var urlAction = ""
                    } else {
                        ResponseStatus = "<span class='badge badge-pill badge-danger' style='width: 90px;'>Not Response</span>"
                        var urlAction = "<div class='dropdown'>" +
                            "<a data-toggle='dropdown' href='#'><i class='ti-more-alt rotate-90 text-black'></i></a>" +
                            "<div class='dropdown-menu dropdown-menu-right'>" +
                            "<a class='dropdown-item' href='#' onclick=Assign('" + json[i].IVC_ID + "')><i class='fa fa-share-alt'></i> Assign</a>" +
                            "<a class='dropdown-item' href='#' onclick=PreviewTableInbox('" + json[i].EMAIL_ID + "')><i class='si-arrow-right-circle si'></i> Preview</a>" +
                            "<a class='dropdown-item' href='#' onclick=EmailConversation('" + json[i].RefID + "')><i class='fa fa-commenting'></i> Conversation</a>" +
                            //"<div class='dropdown-divider'></div>" +
                            //"<a class='dropdown-item' href='1_journey_new.aspx?ticketid=" + json[i].TicketNumber + "&numberid=0&threadid=0&status=" + json[i].Status + "'><i class='si-arrow-right-circle si'></i> Follow up</a>" +
                            //"</div>" +
                            "</div>"
                    }
                    myTaskboardTicket.row.add([json[i].IVC_ID, json[i].account, json[i].EFROM, json[i].ESUBJECT, ResponseStatus, json[i].agent, ConverTanggal, urlAction]).draw(false);

                }

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        },
        complete: function () {
            $("#LoaderPageCounting").hide();
        }
    })

    $("#modal-center").modal('hide');
}
function ComboFromEmail() {
    if ($("#TrxLayerUser").val() == "Admin") {
        var Code = "UIDESK116"
    } else if ($("#TrxLayerUser").val() == "layer2") {
        var Code = "UIDESK116"
    } else {
        var Code = "UIDESK116"
    }
    var ComboFrom = $('#ComboFrom');
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'4', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: '" + Code + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, ResultFrom = "";

            for (i = 0; i < json.length; i++) {

                if ($("#TrxLayerUser").val() == "layer2" || $("#TrxLayerUser").val() == "layer1" || $("#TrxLayerUser").val() == "Admin") {
                    ResultFrom = '<option value="' + json[i].product_campaign + '">' + json[i].product_campaign + '</option>';
                } else {
                    ResultFrom = '<option value="' + json[i].product_campaign + '">' + json[i].product_campaign + '</option>';
                }
                ComboFrom.append(ResultFrom);
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function Assign(IvcID) {
    $("#ContentPlaceHolder1_AssignID").val(IvcID);
    $("#modal-assign").modal('show');
}
function ActionAssign() {
    if ($("#ComboAgent").val() == "" || $("#ComboAgent").val() == "Select") {
        swal(
            '',
            'Agent empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#AssignEmail").val() == "") {
        swal(
            '',
            'Reason Assign empty',
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

                var form_data = JSON.stringify({ Access: "1", IvcID: $("#ContentPlaceHolder1_AssignID").val(), Agent: $("#ComboAgent").val(), ReasonAssign: $("#AssignEmail").val(), User: $("#hd_sessionLogin").val() });
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
                                    'Assign Data Has Been Failed',
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
function PreviewTableInbox(PreviewID) {
    var FileInboxHTML = "../FileEmail/INBOX"
    var FileOutboxHTML = "../FileEmail/OUTBOX"
    var UrlType = "1";
    $.ajax({
        type: "POST",
        url: "asmx/TrmMailSystem.asmx/ValidasikFolderFileHTML",
        data: "{Url: '" + UrlType + "', EmailID: '" + PreviewID + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x;

            for (i = 0; i < json.length; i++) {

                if (json[i].Result == "True") {

                    $("#modal-preview").modal('show');
                    document.getElementById("Preview_FrameHTML").src = "" + FileInboxHTML + "/" + PreviewID + "/file.html"
                    PreviewAttachmentInboxEmail(PreviewID)

                } else {
                    swal(
                        '',
                        'Data Not Found',
                        'info'
                    ).then(function () {
                        return false;
                    });
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
function PreviewAttachmentInboxEmail(TrxEmailID) {
    $("#LoaderPageAttachment").hide();
    var FileInboxHTML = "../FileEmail/INBOX"
    $.ajax({
        type: "POST",
        url: "asmx/TrmMailSystem.asmx/UIDESK_TrmMasterDropdown",
        data: "{TrxID: '" + TrxEmailID + "', TrxEvent: 'PreviewAttachmentInboxEmail', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK100'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, ResultPreviewInboxAttachment = "";

            $('#Div_PreviewInbox_Attachment').empty();
            for (i = 0; i < json.length; i++) {
                if (json[i].FILETYPE == "doc") {
                    var FileTypes = "word";
                    var PlayStream = ''
                }
                else if (json[i].FILETYPE == "docx") {
                    var FileTypes = "word";
                }
                else if (json[i].FILETYPE == "pdf" || json[i].FILETYPE == "pdf") {
                    var FileTypes = "pdf";
                    var PlayStream = ''
                }
                else if (json[i].FILETYPE == "xls") {
                    var FileTypes = "excel";
                    var PlayStream = ''
                }
                else if (json[i].FILETYPE == "xlsx") {
                    var FileTypes = "excel";
                    var PlayStream = ''
                }
                else if (json[i].FILETYPE == "zip") {
                    var FileTypes = "zip";
                }
                else if (json[i].FILETYPE == "txt") {
                    var FileTypes = "code";
                }
                else if (json[i].FILETYPE == "rar") {
                    var FileTypes = "zip";
                }
                else if (json[i].FILETYPE == "mp4" || json[i].FILETYPE == "mp3" || json[i].FILETYPE == "avi") {
                    var FileTypes = "video";
                    var PlayStream = '<div class="media-right" style="margin-left:7px;margin-top:5px;">' +
                        '<a href="#" class="btn btn-default btn-xs pull-left" onclick=clickvideo(' + json[i].ID + ')><i class="fa fa-play"></i></a>' +
                        '</div>'
                }
                else if (json[i].FILETYPE == ".png" || json[i].FILETYPE == "png" || json[i].FILETYPE == ".PNG" || json[i].FILETYPE == "PNG" || json[i].FILETYPE == ".jpg" || json[i].FILETYPE == "jpg" || json[i].FILETYPE == ".JPG" || json[i].FILETYPE == "JPG" || json[i].FILETYPE == ".jpeg" || json[i].FILETYPE == "jpeg" || json[i].FILETYPE == ".JPEG" || json[i].FILETYPE == "JPEG" || json[i].FILETYPE == ".gif" || json[i].FILETYPE == "gif" || json[i].FILETYPE == ".GIF" || json[i].FILETYPE == "GIF" || json[i].FILETYPE == ".BMP" || json[i].FILETYPE == "BMP" || json[i].FILETYPE == "bmp" || json[i].FILETYPE == ".bmp") {
                    var FileTypes = "image";
                    var PlayStream = ''
                } else {
                    var FileTypes = "word";
                    var PlayStream = ''
                }
                ResultPreviewInboxAttachment = '<ul class="mailbox-attachments clearfix">' +
                    '<li>' +
                    '' + PlayStream + '' +
                    '<span class="mailbox-attachment-icon"><i class="fa fa-file-' + FileTypes + '-o text-success"></i></span>' +
                    '<div class="mailbox-attachment-info">' +
                    '<a href="#" class="mailbox-attachment-name"><i class="fa fa-paperclip"></i>' + json[i].FILENAME.substring(0, 10) + '</a>' +
                    '<a href=' + FileInboxHTML + '/' + json[i].URL + ' target="_blank" class="btn btn-default btn-xs pull-right"><i class="fa fa-cloud-download"></i></a><a href="#" target="_blank" class="btn btn-default btn-xs pull-right" onclick=deleteAttachment(' + json[i].ID + ')><i class="fa fa-trash-o"></i></a>' +
                    '</span>' +
                    '</div>' +
                    '</li>' +
                    '<ul>'
                $('#Div_PreviewInbox_Attachment').append(ResultPreviewInboxAttachment)
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
    $("#LoaderPageAttachment").hide();
}
function EmailConversation(RefID) {
    $("#Div_Conversation").show();
    var FileInboxHTML = "../FileEmail/Inbox"
    var FileOutboxHTML = "../FileEmail/Outbox"
    var filenameimage = "";
    var result = "";
    var result_in = ""
    var messageDiv = $('#Journeymailconversation');
    $.ajax({
        type: "POST",
        url: "asmx/TrmMailConversation.asmx/UIDESK_TrxEmailConversation",
        data: "{RefID: '" + RefID + "', UserName: '" + $("#hd_sessionLogin").val() + "', Action: 'SELECT'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: async function (data) {
            var json = JSON.parse(data.d);
            var i = 0;

            messageDiv.empty();
            for (i = 0; i < json.length; i++) {
                if (json[i].DIRECTION == "IN") {

                    let imagein = ""
                    await $.ajax({
                        type: "POST",
                        url: "asmx/TrmMailConversation.asmx/UIDESK_TrxEmailAttachment",
                        data: "{RefID: '" + RefID + "', EmailID: '" + json[i].EMAIL_ID + "', Direction: 'IN', UserName: '" + $("#hd_sessionLogin").val() + "'}",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (data) {
                            var json = JSON.parse(data.d);
                            var j = 0;

                            for (j = 0; j < json.length; j++) {

                                imagein += "" +
                                    "<li>" +
                                    "<span class='mailbox-attachment-icon'><i class='fa fa-file-pdf-o'></i></span>" +
                                    "<div class='mailbox-attachment-info'>" +
                                    "<a href='#' class='mailbox-attachment-name'><i class='fa fa-paperclip'></i>" + json[j].FILENAME + "</a>" +
                                    "<span class='mailbox-attachment-size'>5,215 KB" +
                                    "<a href='" + FileInboxHTML + "/" + json[j].URL + "' class='btn btn-default btn-xs pull-right' target='_blank'><i class='fa fa-cloud-download'></i></a>" +
                                    "</span>" +
                                    "</div>" +
                                    "</li>"

                            }
                            console.log(imagein)
                        },
                        error: function (xmlHttpRequest, textStatus, errorThrown) {
                            console.log(xmlHttpRequest.responseText);
                            console.log(textStatus);
                            console.log(errorThrown);
                        }
                    });

                    result = "<div class='timeline'> " +
                        "<div class='timeline-item timeline-item-left'>" +
                        "<div class='timeline-point timeline-point-blank'></div> " +
                        "<div class='timeline-event timeline-event-default'>" +
                        "<div class='timeline-heading'>" +
                        "<h4 class='timeline-title'><img alt='Profile' src='../images/avatar/6.jpg' class='avatar'></h4>" +
                        "</div>" +
                        "<div class='timeline-body'>" +
                        "<p>" +
                        "" + json[i].EBODY_HTML + "" +
                        "</p> " +
                        "</div>" +
                        "<div class='timeline-footer'>" +
                        "<ul class='mailbox-attachments clearfix' >" +
                        "" + imagein + "" +
                        "</ul>" +
                        "</div>"

                } else {

                    let imageout = ""
                    await $.ajax({
                        type: "POST",
                        url: "asmx/TrmMailConversation.asmx/UIDESK_TrxEmailAttachment",
                        data: "{RefID: '" + RefID + "', EmailID: '" + json[i].EMAIL_ID + "', Direction: 'OUT', UserName: '" + $("#hd_sessionLogin").val() + "'}",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (data) {
                            var json = JSON.parse(data.d);
                            var j = 0;

                            for (j = 0; j < json.length; j++) {

                                imageout += "" +
                                    "<li>" +
                                    "<span class='mailbox-attachment-icon'><i class='fa fa-file-pdf-o'></i></span>" +
                                    "<div class='mailbox-attachment-info'>" +
                                    "<a href='#' class='mailbox-attachment-name'><i class='fa fa-paperclip'></i>" + json[j].FILENAME + "</a>" +
                                    "<span class='mailbox-attachment-size'>5,215 KB" +
                                    "<a href='" + FileOutboxHTML + "/" + json[j].URL + "' class='btn btn-default btn-xs pull-right' target='_blank'><i class='fa fa-cloud-download'></i></a>" +
                                    "</span>" +
                                    "</div>" +
                                    "</li>"

                            }
                            console.log(imageout)
                        },
                        error: function (xmlHttpRequest, textStatus, errorThrown) {
                            console.log(xmlHttpRequest.responseText);
                            console.log(textStatus);
                            console.log(errorThrown);
                        }
                    });

                    result = "<div class='timeline'> " +
                        "<div class='timeline-item timeline-item-right'>" +
                        "<div class='timeline-point timeline-point-blank'></div> " +
                        "<div class='timeline-event timeline-event-default'>" +
                        "<div class='timeline-heading'>" +
                        "<h4 class='timeline-title'><img alt='Profile' src='../images/avatar/6.jpg' class='avatar'></h4>" +
                        "</div>" +
                        "<div class='timeline-body'>" +
                        "<p>" +
                        "" + json[i].EBODY_HTML + "" +
                        "</p> " +
                        "</div>" +
                        "<div class='timeline-footer'>" +
                        "<ul class='mailbox-attachments clearfix' >" +
                        "" + imageout + "" +
                        "</ul>" +
                        "</div>"

                }
                messageDiv.append(result);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}