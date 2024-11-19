// JavaScript source code
var idWA = "3";
var noWA = "08170154444";
var apiKeyWA = "qRbkioekrn2xVSUwQWWiBzet03ysIhhUZZD";
var urlDatakelola;
var urlEmail;
var companyToken;
var availableTags;
$(document).ready(function () {

    urlDatakelola = $("#SM_UrlDatakelola").val();
    companyToken = $("#SM_CompanyToken").val();
    if ($("#TrxLoginTypeAngka").val() == "3") {
        $("#escalationto").css("display", "none");
        $("#P_Escalation").append("Re Assign");
        $("#newCall").hide();
        $("#dialCall").hide();
    } else {
        $("#P_Escalation").append("Escalation");
        $("#newCall").show();
        $("#dialCall").show();
    }
    getWS_MasterLoad();
    getWS_DataTicket(getParameterByName('ticketid'));
    getWS_JourneyTicketLoad(getParameterByName('ticketid'));
    console.log("Ticket ID " + getParameterByName('ticketid'));

    $("#TxtSearchingEscalation").on("input", function () {
        var jumlahString = $(this).val().length;
        if (jumlahString >= 3) {
            SearchingEscalation($(this).val());
        } else if (jumlahString == 0) {
            SearchingEscalation($(this).val(""));
        }
    });

    $("#SearchEmailAccount").on("input", function () {
        var jumlahString = $(this).val().length;
        if (jumlahString >= 4) {
            console.log("123 " + $(this).val());
            $("#emailModalSearch").modal('show');
            UIDESK_TrmCustomer($(this).val());
        }
    });
    $("#SearchEmailAccountCC").on("input", function () {
        var jumlahString = $(this).val().length;
        if (jumlahString >= 4) {
            console.log($(this).val());
            $("#emailModalSearchCC").modal('show');
            UIDESK_TrmCustomerCC($(this).val());
        }
    });
    //$("#newDropCall").hide()
    $("#dropcall").addClass("d-none")
    //DisplayAttachmentInboxEmail(1)
    //getTextInfo('202402291855062682308','InboxEmail')

    //$('#ComposeETO').val('shafira.fatimah@kanmogroup.com;shafira.fatimah@kanmogroup.com');
    //$("ComposeETO").tagsinput('items')
    //const example = UseBootstrapTag(document.getElementById('example-methods'));
   
    //SubmitChatID();


    SubmitOrderBantuDagang();
    //SubmitChatBantuDagang();


    let _tag_input_suggestions_data = [];

    // Function to add tags
    function addTagToInput(container, data, email) {
        let tagHTML = `
    <span class="text id ="ComposeETO2" tag label label-info" _value="${data}" style="display: inline-flex; align-items: center; padding: 5px 10px; margin: 2px; background-color: #d9edf7; border-radius: 5px; font-size: 14px;">
        ${email}
        <p class="label remove" data-role="remove" style="margin-left: 10px; cursor: pointer; font-size: 17px; color: #FFFFFF;"> &times;</p>
    
	</span>`;
	
	$('#ComposeETO').val(email);

        $(container).append(tagHTML);

        // Remove tag functionality
        $(container).on("click", ".remove", function () {
            $(this).parent().remove();
        });
    }

    // Function to fetch suggestions from the server
    function runSuggestions(query) {
        $.ajax({
            type: "POST",
            url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
            data: JSON.stringify({ TrxID: query, TrxUserName: $("#hd_sessionLogin").val(), TrxAction: 'DataEmail' }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                var item = JSON.parse(data.d);
                _tag_input_suggestions_data = [];

                // Process and filter the suggestions
                item.forEach(function (entry) {
                    _tag_input_suggestions_data.push({ id: entry.id, Email: entry.Email });
                });

                let filteredSuggestions = _tag_input_suggestions_data.filter(function (entry) {
                    return entry.Email.toLowerCase().includes(query.toLowerCase());
                });

                // Display the filtered suggestions
                displaySuggestions(filteredSuggestions);
            },
            error: function (error) {
                console.error("Error fetching suggestions:", error);
            }
        });
    }

    // Function to display suggestions
    function displaySuggestions(suggestions) {
        let autocompleteDiv = $("#ComposeETO").siblings('.autocomplete-items');
        autocompleteDiv.html('');  // Clear the previous suggestions

        suggestions.forEach(function (suggestion) {
            autocompleteDiv.append('<div style="padding: 8px; color: black; border-bottom: 1px solid #ced4da;">' + suggestion.Email + '</div>');
        });
    }

    // Add event listeners to handle user input and suggestions
    $("#ComposeETO").on("keyup", function (event) {
        let query = $(this).val();

        if (query !== "") {
            runSuggestions(query);  
        } else {
            $(".autocomplete-items").html('');
        }
    });

    $(document).on("click", ".autocomplete-items div", function () {
        let index = $(this).index();
        let data = _tag_input_suggestions_data[index];
        let dataContainer = $("#ComposeETO").siblings('.data');

        addTagToInput(dataContainer, data.id, data.Email);

        $(".autocomplete-items").html('');
    });

    $("#ComposeETO").on("keydown", function (event) {
        if (event.which === 13) {
            let data = $(this).val();
            if (data !== "") {
                let dataContainer = $(this).siblings('.data');
                addTagToInput(dataContainer, data, data);  
                $(this).val('');  
            }
            return false;  
        }
    });

    $("#ComposeETO").on("focusout", function () {
        setTimeout(() => {
            $(".autocomplete-items").html('');  
        }, 200);
    });


    });


function GetDataEmail(emailNya) {
    //alert(emailNya)
    //$('#tampungEmailSementara').empty();
    //$('#tampungEmailSementara').append(emailNya + ";");
    const example1 = UseBootstrapTag(document.getElementById('example-methods'));
    example1.addValue(emailNya);
    //example.addValue(emailNya);
    //document.getElementById('ComposeETO').removeClass()
    //$('ComposeETO').tagsinput('remove', 'some tag');
    //document.getElementById('ComposeETO').val = $('#tampungEmailSementara').text()
    //$('#ComposeETO').val($('#tampungEmailSementara').text());
    //alert("1 " + $('#tampungEmailSementara').text())
    //alert("2 " + $('#ComposeETO').val())
    //$('ComposeETO').tagsinput('add', 'some tag');
    //$('#ComposeETO').text('shafira.fatimah@kanmogroup.com;shafira.fatimah@kanmogroup.com');
    //$('#ComposeETO').tagsinput('add');
    //$('#ComposeETO').val($('#tampungEmailSementara').text());

}
function GetDataEmailCC(emailNya) {
    $('#tampungEmailSementaraCC').append(emailNya + ";");
    $('#ComposeECC').val($('#tampungEmailSementaraCC').text());
}

function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
function getWS_EscalationChannel(value) {

}

function click2Call() {
    let queryString = window.location.search;
    let urlParams = new URLSearchParams(queryString);
    let phonenumber = $('#TxtProfilePhone').val();
    
    //$("#newCall").css('visibility', 'hidden');
    //$("#newWaktuCall").css('visibility', 'visible');
    //$("#newTransferCall").css('visibility', 'visible');
    //$("#newHoldCall").css('visibility', 'visible');
    swal({
        title: "Do you want to call ?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                
                console.log("Dial Call");
                const Http = new XMLHttpRequest();
                const url = "http://localhost:60024/dial/telp="+ $('#TxtProfilePhone').val();
                console.log("url" + url)
                Http.open("GET", url);
                Http.send();

                Http.onreadystatechange = (e) => {
                    console.log(Http.responseText)
                    //$("#newDropCall").show()
                    //$("#clicknewCall").hide()
                    $("#dropcall").removeClass("d-none")
                    $("#dialcall").addClass("d-none")
                    //var drop = ""
                    //drop = '<div id="chat-box-bodyDrop">' +
                    //    '<div id ="chat-circle" class="waves-effect waves-circle btn btn-circle btn-lg btn-danger l-h-70">' +
                    //    '<div id="chat-overlay"></div>' +
                    //    '<span class="mdi mdi-phone-locked font-size-30"></span>' +
                    //    '</div>' +
                    //    '</div>'
                    //$("#chat-box-body").append(drop)
                }

                
            } else {
                window.location.reload();
            }
        }); 
}
function ShowEmailCompose() {
    $("#modal-composeGlobal").modal('show');
    //$('#ComposeETO').val($('#TxtProfileEmail').val());
    $('#ComposeESUBJECT').val("[TicketNumber:" + getParameterByName("ticketid") + "] " + $("#ContentPlaceHolder1_HD_Ticket_EnquiryReason").val() + "");
    $('#ComposeESUBJECT').attr('readonly', 'true');
    //$('#TxtProfilePhone').val(json[i].HP);
}
function clickdropCall() {
    swal({
        title: "Do you want to drop?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {

                console.log("Drop Call");
                const Http = new XMLHttpRequest();
                const url = "http://localhost:60024/drop/telp=" + $('#TxtProfilePhone').val()
                Http.open("GET", url);
                Http.send();

                Http.onreadystatechange = (e) => {
                    console.log(Http.responseText)

                    //$("#newDropCall").hide()
                    //$("#clicknewCall").show()
                    $("#dropcall").addClass("d-none")
                    $("#dialcall").removeClass("d-none")

                }

            }
        });
}

function getWS_DataProfile(value) {
    var selectedValue = value;
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'" + selectedValue + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK53'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, resultSourceEnquiryReason = "";

            for (i = 0; i < json.length; i++) {

                //alert("11")
                //var milisegundos = parseInt(json[i].Birth.replace("/Date(", "").replace(")/", ""));
                //var newDate = new Date(milisegundos).toLocaleDateString("en-GB");
                //var getDateBirth = newDate.split('/');
                //$("#Journey_DateofBirth").val(getDateBirth[2] + "-" + getDateBirth[1] + "-" + getDateBirth[0]);
                //$('#Gender' + json[i].JenisKelamin + '_Journey').prop('checked', true);
                $('#TxtName').val(json[i].Name);
                $('#newNamaCustomer').append(json[i].Name);
                $('#TxtProfileEmail').val(json[i].Email);
                $('#TxtProfilePhone').val(json[i].HP);
                //CKEDITOR.instances.TxtAddress.setData(json[i].Alamat)
                //$('#Journey_PolisNumber').val(json[i].PolisNumber);
                $('#Journey_NIK').val(json[i].NIK);
                //$('#Ticket_Province').val(json[i].Provinsi);
                //$('#Ticket_City').val(json[i].Kota);
                //$('#Ticket_District').val(json[i].Kelurahan);
                //$('#Ticket_Zip_Code').val(json[i].Desa);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function getWS_JourneyTicketLoad(value) {
    var dataJourney = "";
    var iconChannel = "";
    var channelDesc = "";
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'" + value + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK54'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x;
            var DataListInteraction = "";
            for (i = 0; i < json.length; i++) {

                var HeaderTicketNumber = json[i].TicketNumber
                if (json[i].ThreadDescription == null) {
                    var TrxThreadDescription = "";
                } else {
                    var TrxThreadDescription = '<div class="timeline-item">' +
                        '<div class="timeline-point">' +
                        '<i class="fa fa-circle"></i>' +
                        '</div>' +
                        '<div class="timeline-event">' +
                        '<div class="timeline-body">' +
                        '' + json[i].ThreadDescription + '' +
                        '</div>' +
                        '<div class="timeline-footer">' +
                        '<p class="pull-right" style="font-size:12px;">' + json[i].DateThread + '</p>' +
                        '</div>' +
                        '</div>' +
                        '</div>';
                }
                if (json[i].ValueThread == "Outbound Call") {
                    var IconChannel = "Call"
                    var IconChannelSosialMedia = ""
                } else if (json[i].ValueThread == "EMAIL") {
                    var FileHTML = "../FileEmail/INBOX/" + json[i].ThreadID + "/file.html"
                    var IconChannel = json[i].ValueThread
                    var IconChannelSosialMedia = ""
                } else if (json[i].ValueThread == "Whatsapp") {
                    //var FileHTML = "http://10.28.2.222/dev_brilife//apps/template/wa.html?convid=" + json[i].GenesysNumber + ""
                    var IconChannel = json[i].ValueThread
                    //var FileHTMLSosialMedia = "http://10.28.2.222/dev_brilife/apps/template/socialmedia.html?convid=" + json[i].GenesysNumber + ""
                    var FileHTMLSosialMedia = urlDatakelola + "chat/" + json[i].GenesysNumber + "/history?token=" + $("#SM_MultiChatToken").val() + "";
                    var IconChannelSosialMedia = '<a href=' + FileHTMLSosialMedia + ' target="_blank"><span class="timeline-label">' +
                        '<img alt="Profile" src="../images/icon/Information1.png" class="avatar mr-10">' +
                        '</span></a>'

                } else {
                    var FileHTML = ""
                    var IconChannel = json[i].ValueThread
                    var IconChannelSosialMedia = ""
                }
                if (json[i].InteractionID == "" || json[i].InteractionID == null) {
                    var TrxInteractionID = ""
                } else {
                    var TrxInteractionID = "<span class='btn btn-default btn-sm btn-rounded' style='width:100px' onclick=previewInteractionAttachmnent('" + json[i].InteractionID + "')><i class='fa fa-paperclip'></i>&nbsp;Attachment</span>"
                }
                dataJourney += '<a href=' + FileHTML + ' target="_blank"><span class="timeline-label">' +
                    '<img alt="Profile" src="../images/icon/' + IconChannel + '.png" class="avatar mr-10">' +
                    '</span></a>' +
                    '' + IconChannelSosialMedia + '' +
                    '<span class="timeline-label" style="margin-left:80px;">' +
                    '<span class="badge badge-pill badge-primary badge-lg">' + json[i].Account + '</span>' +
                    '</span>' +
                    '' + TrxThreadDescription + '' +
                    '<div class="timeline-item">' +
                    '<div class="timeline-point">' +
                    '<i class="fa fa-circle"></i>' +
                    '</div>' +
                    '<div class="timeline-event">' +
                    '<p class="font-size-16"><img alt="Profile" src="../images/avatar/6.jpg" class="avatar"/>' + json[i].AgentCreate + '</p>' +
                    '<div class="timeline-body">' +
                    '' + json[i].ResponseComplaint + '' +
                    '</div>' +
                    '<div class="timeline-footer">' +
                    '<p class="pull-left" style="font-size:12px;">' + TrxInteractionID + '</p>' +
                    '<p class="pull-right" style="font-size:12px;">' + json[i].DateCreate + '</p></br>' +
                    '</div>' +
                    '</div>' +
                    '</div>';

            }

            $("#P_TicketNumberJourney").append("<i class='fa fa-ticket'></i> " + HeaderTicketNumber);
            $('#Journey_ListOfTicket').append(dataJourney);

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function getWS_MasterLoad() {
    var cmbDataSourceStatus = $('#Journey_Status');
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'" + $("#TrxLoginTypeAngka").val() + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK57'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, resultSourceStatus = "";

            for (i = 0; i < json.length; i++) {

                resultSourceStatus = '<option value="' + json[i].lblStatus + '">' + json[i].lblStatus + '</option>';
                cmbDataSourceStatus.append(resultSourceStatus);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function getWS_DataTicket(value) {
    var selectedValue = value;
    $("#hd_TicketNumber").val(selectedValue);
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'" + $("#hd_TicketNumber").val() + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK55'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, resultSourceEnquiryReason = "";

            for (i = 0; i < json.length; i++) {

                var milisegundos = parseInt(json[i].TglKejadian.replace("/Date(", "").replace(")/", ""));
                var newDate = new Date(milisegundos).toLocaleDateString("en-GB");
                var getDateBirth = newDate.split('/');

                $("#Ticket_FullNameReported").append(json[i].NAMA_PELAPOR);
                $("#Ticket_EmailReported").append(json[i].EMAIL_PELAPOR);
                $("#Ticket_ContactNumberReported").append(json[i].PHONE_PELAPOR);
                $("#Ticket_ContactAccountReported").append(json[i].PHONE_PELAPOR);
                $("#OrderID").val(json[i].NomorRekening)
                $("#Ticket_DateofTransaction").append(getDateBirth[2] + "-" + getDateBirth[1] + "-" + getDateBirth[0]);
                $("#Ticket_ProductType").append(json[i].NamaPenyebab);
                $("#Ticket_ProductName").append(json[i].ProductName);
                $("#Ticket_AgentName").append(json[i].NAME);
                $("#Ticket_UserStatus").append(json[i].StatusName);
                $("#Ticket_Priority").append(json[i].SkalaPrioritas);
                $("#Ticket_UserCategory").append(json[i].JenisNasabah);
                if (json[i].NomorRekening == null || json[i].NomorRekening == "") {
                    $("#Ticket_BankAccount").append("0");
                } else {
                    $("#Ticket_BankAccount").append(json[i].NomorRekening);
                }          
                $("#Ticket_SourceChannel").append(json[i].SumberInformasi);
                $("#Ticket_Brand").append(json[i].Channel_Code);
                $("#Ticket_Category").append(json[i].CategoryName);
                $("#Ticket_Enquiry").append(json[i].SubCategory1Name);
                $("#Ticket_EnquiryDetail").append(json[i].SubCategory2Name);
                $("#Ticket_EnquiryReason").append(json[i].SubCategory3Name);
                $("#ContentPlaceHolder1_HD_Ticket_EnquiryReason").val(json[i].SubCategory3Name);
                if (json[i].lengthComplaint > 300) {
                    $("#Ticket_Complaints").append(json[i].ExtractComplaint + "</br><a href='#' class='badge badge-pill badge-primary' onclick=ScriptFormated('" + $("#hd_TicketNumber").val() + "',1)>Read more</a>");
                } else {
                    $("#Ticket_Complaints").append(json[i].DetailComplaint);
                }
                if (json[i].lengthResponse > 300) {
                    $("#Ticket_NoteAgent").append(json[i].ExtractResponse + "</br><a href='#' class='badge badge-pill badge-primary' onclick=ScriptFormated('" + $("#hd_TicketNumber").val() + "',2)>Read more</a>");
                } else {
                    $("#Ticket_NoteAgent").append(json[i].ResponComplaint);
                }
                $("#Ticket_Status").append(json[i].Status);
                $("#Ticket_Escalation").append(json[i].ORGANIZATION_NAME);
                $('#Ticket_SLA').append("<i class='mdi mdi-timer'>" + json[i].SLA + "</i>");
                $("#Ticket_Layer_Eskalasi").append("Layer " + json[i].Layer);
                $("#hd_Journey_EscalationValue").val(json[i].Divisi)
                $("#ContentPlaceHolder1_TrxLayerEskalasi").val(json[i].Layer)
                

                if (json[i].DispatchType == "1") {
                    $("#P_TypeEscalation").append("Eksternal")
                    $("#Journey_EscalationValue").append("<span class='badge badge-pill badge-primary' style='width:100%;height:33px;font-weight:bold;margin-top:-5px;'><label style='margin-top:5px;'>" + json[i].VendorName + "</label></span>");
                } else if (json[i].DispatchType == "2") {
                    if (json[i].Dispatch_user != "" && json[i].Dispatch_user != null) {
                        $("#P_TypeEscalation").append("Individu");
                        $("#Journey_EscalationValue").append("<span class='badge badge-pill badge-primary' style='width:100%;height:33px;font-weight:bold;margin-top:-5px;'><label style='margin-top:5px;'><a href='#' onclick=detailIndividu() style='color:white;cursor:pointer;'>Detail Individu</a></label></span>");
                    } else {
                        $("#P_TypeEscalation").append("Department");
                        $("#Journey_EscalationValue").append("<span class='badge badge-pill badge-primary' style='width:100%;height:33px;font-weight:bold;margin-top:-5px;'><label style='margin-top:5px;'>" + json[i].ORGANIZATION_NAME + "</label></span>");
                    }
                } else if (json[i].DispatchType == "3") {
                    if (json[i].Dispatch_user != "" && json[i].Dispatch_user != null) {
                        $("#P_TypeEscalation").append("Individu");
                        $("#Journey_EscalationValue").append("<span class='badge badge-pill badge-primary' style='width:100%;height:33px;font-weight:bold;margin-top:-5px;'><label style='margin-top:5px;'><a href='#' onclick=detailIndividu() style='color:white;cursor:pointer;'>Detail Individu</a></label></span>");
                    } else {
                        $("#P_TypeEscalation").append("Department");
                        $("#Journey_EscalationValue").append("<span class='badge badge-pill badge-primary' style='width:100%;height:33px;font-weight:bold;margin-top:-5px;'><label style='margin-top:5px;'>" + json[i].ORGANIZATION_NAME + "</label></span>");
                    }
                } else {
                    if (json[i].TicketPosition == "1") {
                        $("#P_TypeEscalation").append("Department");
                        $("#Journey_EscalationValue").append("<span class='badge badge-pill badge-primary' style='width:100%;height:33px;font-weight:bold;margin-top:-5px;'><label style='margin-top:5px;'>" + json[i].ORGANIZATION_NAME + "</label></span>");
                    } else {
                        $("#P_TypeEscalation").append("Department");
                        $("#Journey_EscalationValue").append("<span class='badge badge-pill badge-primary' style='width:100%;height:33px;font-weight:bold;margin-top:-5px;'><label style='margin-top:5px;'>" + json[i].ORGANIZATION_NAME + "</label></span>");
                    }
                }
                
                $("#P_DetailTicketNumber").append(json[i].TicketNumber);
                $("#P_TicketNumber").append("<i class='fa fa-ticket'></i> " + json[i].TicketNumber);
                $("#P_Complaint").append(json[i].CategoryName);
                $("#P_Reason").append(json[i].SubCategory3Name);

                TrxAttachmentTicket($("#hd_TicketNumber").val());
                TrxAttachmentEmail($("#hd_TicketNumber").val());

                $("#ContentPlaceHolder1_TrxCustomerID").val(json[i].NIK)
                getWS_DataProfile(json[i].NIK);

                //if ($("#TrxLoginTypeAngka").val() != json[i].TicketPosition) {
                //    $("#btnInteraction").css("display", "none")
                //    $("#btnAttachment").css("display", "none")
                //    $("#escalationto").css("display", "none");
                //    $("#ahref_Escalationto").css("display", "none");
                //} else {
                //    $("#btnInteraction").css("display", "block")
                //    $("#btnAttachment").css("display", "block")
                //}

                if ($("#TrxLoginTypeAngka").val() == "3") {
                    $("#escalationto").css("display", "none");
                    $("#ahref_Escalationto").css("display", "none");
                }

                $("#ContentPlaceHolder1_TrxTicketPosition").val(json[i].TicketPosition)
                var TrxTicketPosition = json[i].TicketPosition
                if (TrxTicketPosition == "3") {
                    if ($("#TrxDivisi").val() == json[i].Divisi && json[i].Status != "Closed") {
                        $("#btnInteraction").css("display", "block")
                        $("#btnAttachment").css("display", "block")
                    } else {
                        $("#btnInteraction").css("display", "none")
                        $("#btnAttachment").css("display", "none")
                    }
                    if ($("#TrxLoginTypeAngka").val() == json[i].TicketPosition) {
                        $("#btnInteraction").css("display", "block")
                        $("#btnAttachment").css("display", "block")
                        $("#escalationto").css("display", "none");
                        $("#ahref_Escalationto").css("display", "none");
                    }
                    if ($("#TrxLoginTypeAngka").val() == "1") {
                        $("#btnInteraction").css("display", "block")
                        $("#btnAttachment").css("display", "block")
                        $("#escalationto").css("display", "block");
                        $("#ahref_Escalationto").css("display", "block");
                    }
                }

                //alert(getParameterByName("status"))
                //$("#Journey_Status").find("option:selected").text();
                //$("#Journey_Status").val(getParameterByName("status"));

                $("#Journey_Status").find("option:selected").text();
                $("#Journey_Status").val(getParameterByName("status"));
                var ParamAccess = getParameterByName("access")
                if (ParamAccess == "1" && getParameterByName("status") != "Closed") {
                    $("#divAction").show();
                    $("#btnInteraction").css("display", "block")
                    $("#btnAttachment").css("display", "block")
                    $("#Journey_EscalationChannel").val("No");
                    $('#Journey_EscalationChannel').attr('disabled', true);
                } else if (getParameterByName("status") == "Closed" || getParameterByName("status") == "closed") {                   
                    $("#btnInteraction").css("display", "block");
                    $("#btnAttachment").css("display", "none");

                    $("#Journey_Status").attr('disabled', true);
                    $("#Journey_EscalationChannel").val("No");
                    $('#Journey_EscalationChannel').attr('disabled', true);
                    $("#divAction").show();
                }

                if ($("#TrxLoginTypeAngka").val() == "1") {
                    if (TrxTicketPosition == "3") {
                        $("#Journey_EscalationChannel").val("No");
                        $('#Journey_EscalationChannel').attr('disabled', true);
                    }
                }
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })

    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'" + selectedValue + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK56'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x;
            var DataListInteraction = "";

            $('#Ticket_ListInteraction').empty()
            for (i = 0; i < json.length; i++) {

                if (json[i].Channel == "No") {
                    var TrxChannel = $("#Ticket_SourceChannel").append()
                } else if (json[i].Channel == "Yes") {
                    var TrxChannel = "Walk-IN"
                } else {
                    var TrxChannel = json[i].Channel
                }
                if (json[i].lengthResponse > 2000) {
                    var TrxResponseComplaint = '<p class="font-size-12">' + json[i].ResponseComplaintNonHTML + '</p>';
                    var TrxReadmore = "<a href='#' class='btn btn-flat btn-primary btn-sm' onclick='ScriptFormatedInteraction(" + json[i].ID + ")'><p class='font-size-12'>Read more</p></a>"
                } else {
                    var TrxResponseComplaint = '<p class="font-size-12">' + json[i].ResponseComplaintNonHTML + '</p>';
                    var TrxReadmore = ""
                }
                if (json[i].DispatchTypeName == null) {
                    var TrxDispatchTypeName = "Internal "
                } else {
                    var TrxDispatchTypeName = json[i].DispatchTypeName
                }
                if (json[i].DispatchValueName == null) {
                    var TrxDispatchValueName = "Internal "
                } else {
                    var TrxDispatchValueName = json[i].DispatchValueName
                }
                if (json[i].Channel == "call") {
                    var TrxInteractionID = ""
                    var TrxVoiceRecording = '<p class="pull-right" style="font-size:12px;"><img data-toggle="modal" data-target="#modal-recording" src="../images/icon/voice.png" width="30"></p>';
                    var attachmentid = ""
                    var urlemail = "<a href='#' target='_blank'><img alt='Profile' src='../images/icon/" + TrxChannel + ".png' class=''></a>"
                } else if (json[i].Channel == "EMAIL" || json[i].Channel == "Email") {
                    //var Thr
                    //if (json[i].ThreadID) {

                    //}
                    //var TrxResponseComplaint = "";
                    /* var urlemail = "../FileEmail/INBOX/" + json[i].ThreadID + "/file.html"*/
                    //var TrxResponseComplaint = "";
                    if (json[i].ThreadID > 21) {
                        var TrxResponseComplaint = json[i].ResponseComplaintNonHTML;
                    } else {
                        var TrxResponseComplaint = "-";
                    }
                    var TrxInteractionID = ""
                    var urlemail = '<a href="#" target="_blank" onclick=getTextInfo("' + json[i].ThreadID + '","' + json[i].InteractionChannelType + '")><img alt="Profile" src="../images/icon/' + TrxChannel + '.png" class=""></a>'
                    var TrxVoiceRecording = "";
                    var attachmentid = "";
                    //var attachmentid = "<a href='#'><i class='fa fa-paperclip text-primary' onclick=DisplayAttachmentInboxEmail('" + json[i].EmailID +"')></i></a>"
                    //var attachmentid = "<span class='btn btn-warning btn-sm btn-rounded' style='width:70px' onclick=DisplayAttachmentInboxEmail('" + json[i].EmailID + "')><i class='fa fa-paperclip'></i></span>"
                } else {
                    var TrxVoiceRecording = "";
                    var attachmentid = "";
                    var urlemail = "<a href='#' target='_blank'><img alt='Profile' src='../images/icon/" + TrxChannel + ".png' class=''></a>"
                }
                
                if (json[i].Status == "Open") {
                    var TrxColor = "primary"
                } else if (json[i].Status == "Pending") {
                    var TrxColor = "warning"
                } else if (json[i].Status == "In progress") {
                    var TrxColor = "success"
                } else {
                    var TrxColor = "danger"
                }
                if (json[i].InteractionID == "" || json[i].InteractionID == null) {
                    var TrxInteractionID = ""
                } else {
                    var TrxInteractionID = "<span class='btn btn-default btn-sm btn-rounded' style='width:100px' onclick=previewInteractionAttachmnent('" + json[i].InteractionID + "')><i class='fa fa-paperclip'></i>&nbsp;Attachment</span>"
                }
                if (json[i].InteractionChannelType == 0 || json[i].InteractionChannelType == "Ticket") {
                    var TypeInteraction = "Interaction Ticket"
                    var ColorType = "warning"
                } else if (json[i].InteractionChannelType == "InboxEmail") {
                    var TypeInteraction = "Incoming Email"
                    var ColorType = "success"
                } else if (json[i].InteractionChannelType == "OutboxEmail") {
                    var TypeInteraction = "Follow up Email"
                    var ColorType = "primary"
                }
                DataListInteraction = 
                    '<span class="timeline-label">' +
                    '</span>' +
                    '<div class="timeline-item">' +
                    '<div class="timeline-point">' +
                    '' + urlemail + '' +
                    '' + attachmentid +'' +
                    '</div>' +
                    '<div class="timeline-event">' +
                    '' + TrxVoiceRecording + '' +                   
                    '<p class="font-size-16"><img alt="Profile" src="../images/avatar/6.jpg" class="avatar"/>' + json[i].AgentCreateX + '</p>' +
                    '<div class="timeline-body">' +
                    '' + TrxResponseComplaint + '' +
                    '' + TrxReadmore + '' +                   
                    '<br>' +
                    '<div class="timeline-footer"></br>' +
                '<span class="btn btn-' + ColorType + ' btn-sm btn-rounded">' + TypeInteraction + '</span>&nbsp;' + TrxInteractionID + '' +
                    '<p class="pull-right" style="font-size:12px;">' + json[i].TanggalNya + '</p>' +
                    '</div>' +
                    
                    '</div>' +
                    '</div>';
                $('#Ticket_ListInteraction').append(DataListInteraction);
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}

function getWS_SelectedEscalationType(type, value, typeName, valueName) {
    //alert("hd_Journey_EscalationType " + type)
    //alert("hd_Journey_EscalationValue " + value)
    //alert("P_TypeEscalation " + typeName)
    //alert("Journey_EscalationValue " + valueName)
    $("#modal-ShowEscalation").modal('hide');
    $("#hd_Journey_EscalationType").val(type);
    $("#hd_Journey_EscalationValue").val(value);
    $("#Journey_EscalationValue").empty();
    //$("#Journey_EscalationValue").append(typeName + '-' + valueName);
    $("#P_TypeEscalation").empty();
    $("#P_TypeEscalation").append(typeName);
    $("#Journey_EscalationValue").append("<span class='badge badge-pill badge-primary' style='width:100%;height:33px;font-weight:bold;'><label style='margin-top:5px;'>" + valueName + "</label></span>");
    $("#Journey_EscalationChannel").val("Yes");
}
function post_WS_DataInteraction() {
    var TrxTicketNumber = $("#hd_TicketNumber").val();
    var TrxResponse = CKEDITOR.instances.Journey_Response.getData();
    var TrxStatus = $("#Journey_Status").val();
    var TrxUsername = $("#hd_sessionLogin").val();
    if (getParameterByName('channel') != null) {
        var TrxChannel = getParameterByName('channel');
    } else {
        var TrxChannel = $("#Journey_EscalationChannel").val();
    }
    var TrxThreadID = getParameterByName('threadid');
    var TrxGenesysID = getParameterByName('numberid');
    var TrxEscalasiType = $("#hd_Journey_EscalationType").val();
    var TrxEscalasiValue = $("#hd_Journey_EscalationValue").val();
    var TrxEscalasiText = $("#Journey_EscalationValue").text();

    if ($("#TrxLayerUser").val() == "layer1") {
        if ($("#Journey_EscalationChannel").val() == "Yes") {
            var TrxDispatchToLayer = $("#ContentPlaceHolder1_TrxLayerEskalasi").val()
        } else {
            var TrxDispatchToLayer = $("#hd_EscalationIdentity").val();
        }
    } else {
        var TrxDispatchToLayer = $("#hd_EscalationIdentity").val();
    }
    //alert($("#Journey_EscalationChannel").val())
    //alert(TrxDispatchToLayer)
    //return false
    if (TrxResponse === '') {
        swal("Description is empty");
        $.toast({
            heading: 'Hi ' + $("#hd_sessionLogin").val() + '',
            text: 'Please fill in completely, and check again ya...',
            position: 'top-right',
            loaderBg: '#ff6849',
            icon: 'error',
            hideAfter: 3500

        });
        return false;
    }
    if (TrxStatus === '') {
        swal("Status is empty");
        $.toast({
            heading: 'Hi ' + $("#hd_sessionLogin").val() + '',
            text: 'Please fill in completely, and check again ya...',
            position: 'top-right',
            loaderBg: '#ff6849',
            icon: 'error',
            hideAfter: 3500

        });
        return false;
    }
    if (TrxChannel === '') {
        $.toast({
            heading: 'Hi ' + $("#hd_sessionLogin").val() + '',
            text: 'Please fill in completely, and check again ya...',
            position: 'top-right',
            loaderBg: '#ff6849',
            icon: 'error',
            hideAfter: 3500

        });
        return false;
    }

    if ($("#hd_Journey_EscalationType").val() === '') {
        var TrxEscalasiType = "2";
    } else {
        var TrxEscalasiType = $("#hd_Journey_EscalationType").val();
    }
    if ($("#TxtProfilePhone").val() == "") {
        var PhoneNumber = "-"
    } else {
        var PhoneNumber = $("#TxtProfilePhone").val()
    }
    event.preventDefault();
    var form = document.forms["myForm"];
    swal({
        title: "Do you want to process?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {

                $.ajax({
                    type: "POST",
                    url: "WebServiceTransaction.asmx/Update_TransactionTicket",
                    data: "{ TrxTicketNumber: '" + TrxTicketNumber + "',TrxResponse: '" + TrxResponse + "',TrxStatus: '" + TrxStatus + "',TrxUsername: '" + TrxUsername + "',TrxChannel: '" + TrxChannel + "', TrxThreadID: '" + TrxThreadID + "', TrxGenesysID: '" + TrxGenesysID + "', TrxEscalasiUnit:'" + TrxEscalasiValue + "', DispatchType:'" + TrxEscalasiType + "',TrxDispatchToLayer:'" + TrxDispatchToLayer + "',PhoneNumber:'" + PhoneNumber +"'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (data) {
                        var json = JSON.parse(data.d);
                        var i, x = "";
                        var tblTickets = "";

                        for (i = 0; i < json.length; i++) {

                            if (json[i].Result === 'True') {
                                console.log(json[i].msgSystem)
                                location.href = "1_journey_new.aspx?ticketid=" + getParameterByName("ticketid") + "&status=" + TrxStatus + ""
                                $.toast({
                                    heading: 'Hi lovely agent...',
                                    text: 'Your interaction has been added...',
                                    position: 'top-right',
                                    loaderBg: '#ff6849',
                                    icon: 'success',
                                    hideAfter: 3500,
                                    stack: 6
                                });

                            } else {
                                return false;
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
        })

}
function LoadDataRelatedTicket() {
    var TicketNumber = getParameterByName('ticketid')
    var cmbDataSourceStatus = $('#Journey_Status');
    var storeDataInteractionInternal;
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'" + TicketNumber + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK58'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, resultSourceStatus = "";
            for (i = 0; i < json.length; i++) {

                if (json[i].lengthResponse > 2000) {
                    var TrxResponseComplaint = "<p class='box-text'>'" + json[i].ResponseComplaintNonHTML + "'</br><a href='#' class='btn btn-rounded btn-sm btn-primary' onclick='ScriptFormatedInteraction(" + json[i].ID + ")'>Read more</a></p>"
                } else {
                    var TrxResponseComplaint = json[i].NOTE
                }

                var d = new Date(json[i].DATECREATE);
                var milisegundos = parseInt(json[i].DATECREATE.replace("/Date(", "").replace(")/", ""));
                var newDate = new Date(milisegundos).toLocaleDateString("en-UE");
                var newTime = new Date(milisegundos).toLocaleTimeString("en-UE");

                storeDataInteractionInternal = '<div class="post clearfix"> ' +
                    '<div class="user-block"> ' +
                    '<img class="img-bordered-sm rounded-circle" src="../images/user7-128x128.jpg" alt="user image"> ' +
                    '<span class="username"> ' +
                    '<a href="#">' + json[i].USERCREATE + '</a> ' +
                    '</span> ' +
                    '<span class="description"><p class="font-size-10">' + newDate + newTime + '</p></span> ' +
                    '</div> ' +
                    '<div class="activitytimeline"> ' +
                    '<p class="font-size-12">' + TrxResponseComplaint + '</p> ' +
                    '</div> ' +
                    '</div>'

                $('#Journey_InternalNote').append(storeDataInteractionInternal);
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function TrxAttachmentTicket(TrxTicketNumber) {
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'" + TrxTicketNumber + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK59'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, resultComposeBodyAttachment = "";

            if (json.length != "" || json.length != "0") {

                $('#divAttachmentTicket').empty();
                for (i = 0; i < json.length; i++) {

                    if (json[i].FileType == "doc") {
                        var FileTypes = "word";
                    } else if (json[i].FileType == "pdf") {
                        var FileTypes = "pdf";
                    }
                    else if (json[i].FileType == "xls") {
                        var FileTypes = "excel";
                    }
                    else if (json[i].FileType == "xlsx") {
                        var FileTypes = "excel";
                    }
                    else if (json[i].FileType == "zip") {
                        var FileTypes = "zip";
                    }
                    else if (json[i].FileType == "txt") {
                        var FileTypes = "code";
                    }
                    else if (json[i].FileType == "rar") {
                        var FileTypes = "zip";
                    }
                    else if (json[i].FileType == "png" || json[i].FileType == "PNG" || json[i].FileType == "jpg" || json[i].FileType == "JPG" || json[i].FileType == "gif" || json[i].FileType == "bmp") {
                        var FileTypes = "image";
                    }

                    resultComposeBodyAttachment = '<ul class="mailbox-attachments clearfix">' +
                        '<li>' +
                        '<center style="font-size:10px;"><span class="badge badge-pill badge-default">' + json[i].Usercreate + '</span></center>' +
                        '<span class="mailbox-attachment-icon"><i class="fa fa-file-' + FileTypes + '-o"></i></span>' +
                        '<div class="mailbox-attachment-info">' +
                        '<a href="#" class="mailbox-attachment-name"><i class="fa fa-paperclip"></i>' + json[i].Filename.substring(0, 15) + '</a>' +
                        '<span class="mailbox-attachment-size">' + json[i].FileSize + '' +
                        '<a href=' + json[i].Path + ' target="_blank" class="btn btn-default btn-xs pull-right"><i class="fa fa-cloud-download"></i></a><a href="#" target="_blank" class="btn btn-default btn-xs pull-right" onclick=deleteAttachmentNewInteraction(' + json[i].ID + ')><i class="fa fa-trash-o"></i></a>' +
                        '</span>' +
                        '</div>' +
                        '</li>' +
                        '<ul>'
                    $('#divAttachmentTicket').append(resultComposeBodyAttachment)

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
function TrxAttachmentEmail(TrxTicketNumber) {
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'" + TrxTicketNumber + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK60'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, resultComposeBodyAttachment = "";

            if (json.length != "" || json.length != "0") {

                $('#divAttachmentEmail').empty();
                for (i = 0; i < json.length; i++) {

                    if (json[i].FILETYPE == ".doc" || json[i].FILETYPE == "doc") {
                        var FileTypes = "word";
                    } else if (json[i].FILETYPE == ".pdf" || json[i].FILETYPE == "pdf") {
                        var FileTypes = "pdf";
                    }
                    else if (json[i].FILETYPE == ".xls" || json[i].FILETYPE == "xls") {
                        var FileTypes = "excel";
                    }
                    else if (json[i].FILETYPE == ".xlsx" || json[i].FILETYPE == "xlsx") {
                        var FileTypes = "excel";
                    }
                    else if (json[i].FILETYPE == ".zip" || json[i].FILETYPE == "zip") {
                        var FileTypes = "zip";
                    }
                    else if (json[i].FILETYPE == ".txt" || json[i].FILETYPE == "txt") {
                        var FileTypes = "code";
                    }
                    else if (json[i].FILETYPE == ".rar" || json[i].FILETYPE == "rar") {
                        var FileTypes = "zip";
                    }
                    else if (json[i].FILETYPE == ".png" || json[i].FILETYPE == "png" || json[i].FILETYPE == ".PNG" || json[i].FILETYPE == ".jpeg" || json[i].FILETYPE == ".jpg" || json[i].FILETYPE == "jpg" || json[i].FILETYPE == ".gif" || json[i].FILETYPE == ".bmp") {
                        var FileTypes = "image";
                    }

                    if (json[i].FILESIZE == null) {
                        var TrxFILESIZE = "-";
                    }

                    if (json[i].DIRECTION == "IN") {
                        var TrxFILENAME = '<a href=http://wagent.uidesk.id/omnichannel_dev/FILeEmail/INBOX/' + encodeURI(json[i].URL) + ' target="_blank" class="mailbox-attachment-name"><i class="fa fa-paperclip"></i>' + json[i].FILENAME.substring(0, 15) + '</a>'
                        var TrxDIRECTION = '<a href=http://wagent.uidesk.id/omnichannel_dev/FILeEmail/INBOX/' + encodeURI(json[i].URL) + ' target="_blank" class="btn btn-default btn-xs pull-right"><i class="fa fa-cloud-download"></i></a>'
                    } else if (json[i].DIRECTION == "OUT") {
                        var TrxFILENAME = '<a href=http://wagent.uidesk.id/omnichannel_dev/FILeEmail/OUTBOX/' + encodeURI(json[i].URL) + ' target="_blank" class="mailbox-attachment-name"><i class="fa fa-paperclip"></i>' + json[i].FILENAME.substring(0, 15) + '</a>'
                        var TrxDIRECTION = '<a href=http://wagent.uidesk.id/omnichannel_dev/FILeEmail/OUTBOX/' + encodeURI(json[i].URL) + ' target="_blank" class="btn btn-default btn-xs pull-right"><i class="fa fa-cloud-download"></i></a>'
                    }
                    resultComposeBodyAttachment = '<ul class="mailbox-attachments clearfix">' +
                        '<li>' +
                        '<center style="font-size:10px;"><span class="badge badge-pill badge-default">' + $("#TxtProfileEmail").val() + '</span></center>' +
                        '<span class="mailbox-attachment-icon"><i class="fa fa-file-' + FileTypes + '-o"></i></span>' +
                        '<div class="mailbox-attachment-info">' +
                        '' + TrxFILENAME + '' +
                        '<span class="mailbox-attachment-size">' + TrxFILESIZE + '' +
                        '' + TrxDIRECTION + '' +
                        '</span>' +
                        '</div>' +
                        '</li>' +
                        '<ul>'
                    $('#divAttachmentEmail').append(resultComposeBodyAttachment)

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
function encodeData(s) {
    return encodeURIComponent(s).replace(/\-/g, "%2D").replace(/\_/g, "%5F").replace(/\./g, "%2E").replace(/\!/g, "%21").replace(/\~/g, "%7E").replace(/\*/g, "%2A").replace(/\'/g, "%27").replace(/\(/g, "%28").replace(/\)/g, "%29");
}
function modalEscalation() {
    $('#modal-ShowEscalation').modal('show');
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK61'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, varListOfEscalation = "";

            $('#Journey_ListEscalation').empty();
            for (i = 0; i < json.length; i++) {

                varListOfEscalation = '<div class="col-12 col-lg-3"> ' +
                    '<div class="box ribbon-box"> ' +
                    '<!--<div class="ribbon-two ribbon-two-primary"><span>' + json[i].LEVELUSER + '</span></div>--> ' +
                    '<div class="box-header no-border p-0"> ' +
                    '<a onclick="getWS_SelectedEscalationType(&#39;2&#39;,&#39;' + json[i].ORGANIZATION_ID + '&#39;,&#39;Internal&#39;,&#39;' + json[i].ORGANIZATION_NAME + '&#39;)" style="cursor:pointer;"> ' +
                    '<img class="img-fluid" src="../images/card/4.jpg" alt=""> ' +
                    '</a> ' +
                    '</div> ' +
                    '<div class="box-body"> ' +
                    '<div class="user-contact list-inline text-center"> ' +
                    '<a href="#" class="btn btn-circle btn-success mb-5"><i class="fa fa-whatsapp"></i></a> ' +
                    '<a href="#" class="btn btn-circle mb-5 btn-warning" title=' + json[i].EMAIL + '><i class="fa fa-envelope"></i></a> ' +
                    '</div> ' +
                    '<div class="text-center"> ' +
                    '<h3 class="my-10"><a href="#" style="cursor:none;">' + json[i].ORGANIZATION_NAME + '</a></h3> ' +
                    '<!--<h6 class="user-info mt-0 mb-10 text-fade">' + json[i].EMAIL + '</h6>-->' +
                    '<!--<p class="text-fade w-p85 mx-auto">125 Ipsum Lorem Ave, Suite 458 New York, USA 154875 </p>-->' +
                    '</div> ' +
                    '</div> ' +
                    '</div> ' +
                    '</div>';

                $('#Journey_ListEscalation').append(varListOfEscalation);
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
//* Upload Attachment Ticket *//
$('#filesinteraction').change(function () {
    var filename = $('#filesinteraction').val();
    if (filename.substring(3, 11) == 'fakepath') {
        filename = filename.substring(12);
    } // For Remove fakepath
    $("label[for='file_name'] b").html(filename);
    $("label[for='file_default']").text('Selected File: ');
    if (filename == "") {
        $("label[for='file_default']").text('No File Choosen');
    }
});
$(document).on("change", "input[name='filesinteraction']", function (e) {
    $(".hiddenX").show();

    var files = $(this).prop("files");
    var data = new FormData();

    var request;
    var result;
    var modal = $(this).closest(".modal");
    var itemid = modal.data("itemid");

    for (var i = 0; i < files.length; i++) {

        var filesizing = this.files[0].size / 1024 / 1024
        if (filesizing > 10) {
            swal(
                '',
                'Please upload file less than 10 MB. Thanks!',
                'info'
            ).then(function () {
                $(this).val('');
                return false;
            });
            return false;
        }

        var filename = this.files[0].name
        var fileextension = filename.split('.').pop();
        if (fileextension == "xls" || fileextension == "xlsx" || fileextension == "mp4" || fileextension == "Mp4" || fileextension == "MP4" || fileextension == "doc" || fileextension == "docx" || fileextension == "pdf" || fileextension == "png" || fileextension == "PNG" || fileextension == "jpg" || fileextension == "JPG" || fileextension == "jpeg" || fileextension == "gif" || fileextension == "GIF" || fileextension == "bmp" || fileextension == "BMP" || fileextension == "mov" || fileextension == "MOV" || fileextension == "FLV" || fileextension == "flv" || fileextension == "GPP" || fileextension == "gpp" || fileextension == "We.bM" || fileextension == "MPEG-1" || fileextension == "mpeg-1" || fileextension == "MPEG-2" || fileextension == "mpeg-2" || fileextension == "MPEG4" || fileextension == "mpeg4" || fileextension == "MPG" || fileextension == "mpg" || fileextension == "VI" || fileextension == "vi" || fileextension == "WMV" || fileextension == "wmv" || fileextension == "MPEGPS" || fileextension == "mpegps" || fileextension == "DNxHR" || fileextension == "ProRes" || fileextension == "ineForm" || fileextension == "HEVC" || fileextension == "hevc") {

        } else {
            swal(
                '',
                'File extension not allowed !',
                'info'
            ).then(function () {
                return false;
            });
            return false;
        }

        data.append("id", "617367367613876138");
        data.append("file", files[i]);
        data.append("Username", $("#hd_sessionLogin").val());
        data.append("numberid", getParameterByName('numberid'));
        data.append("customerid", $("#ContentPlaceHolder1_TrxCustomerID").val());

        request = $.ajax({

            type: "POST",
            enctype: 'multipart/form-data',
            url: "WebServiceTransaction.asmx/UploadFileAttachmentTicket",
            data: data,
            // dataType: "json",
            contentType: false,
            processData: false,

        });
        request.done(function (response) {
            $(".hiddenX").hide();
            $("#removeUpload").show();
            // result = response.d;
            $("#txtFileName").val($(response).find("Guid").text() + $(response).find("FileExt").text());
            console.log("Success");
            console.log($(response).find("Guid").text());
            console.log($(response).find("FileExt").text());
            $("#divFooter").css("display", "block");
            TrxAttachmentInteractionTicket($("#hd_sessionLogin").val());

        });
        request.fail(function (response) {
            console.log(response.responseText);
        });
        request.always(function () {

            data.delete(itemid);
            data.delete(files[i]);

        });

    }
});
function TrxAttachmentInteractionTicket(TrxUserName) {
    $('#divfile').css('display', 'block');
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'" + $("#ContentPlaceHolder1_TrxCustomerID").val() + "', TrxUserName: '" + TrxUserName + "', TrxAction: 'UIDESK62'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, resultComposeBodyAttachment = "";

            $('#divAttachmentInteractionTicket').empty();
            for (i = 0; i < json.length; i++) {

                if (json[i].FileType == "doc") {
                    var FileTypes = "word";
                    var color = "primary"
                } else if (json[i].FileType == "pdf") {
                    var FileTypes = "pdf";
                    var color = "danger"
                } else if (json[i].FileType == "docx") {
                    var FileTypes = "word";
                    var color = "primary"
                }
                else if (json[i].FileType == "xls") {
                    var FileTypes = "excel";
                    var color = "success"
                }
                else if (json[i].FileType == "xlsx") {
                    var FileTypes = "excel";
                    var color = "success"
                }
                else if (json[i].FileType == "zip") {
                    var FileTypes = "zip";
                }
                else if (json[i].FileType == "txt") {
                    var FileTypes = "code";
                }
                else if (json[i].FileType == "rar") {
                    var FileTypes = "zip";
                }
                else if (json[i].FileType == "png" || json[i].FileType == "PNG" || json[i].FileType == "jpg" || json[i].FileType == "JPG" || json[i].FileType == "gif" || json[i].FileType == "bmp") {
                    var FileTypes = "image";
                    var color = "warning"
                }

                resultComposeBodyAttachment = '<ul class="mailbox-attachments clearfix">' +
                    '<li>' +
                    '<center style="font-size:10px;"><span class="badge badge-pill badge-default">' + json[i].Usercreate + '</span></center>' +
                    '<span class="mailbox-attachment-icon"><i class="fa fa-file-' + FileTypes + '-o text-' + color +'"></i></span>' +
                    '<div class="mailbox-attachment-info">' +
                    '<a href="#" class="mailbox-attachment-name"><i class="fa fa-paperclip"></i>' + json[i].Filename + '</a>' +
                    '<span class="mailbox-attachment-size">' + json[i].FileSize + '' +
                    '<a href=' + json[i].Path + ' target="_blank" class="btn btn-default btn-xs pull-right"><i class="fa fa-cloud-download"></i></a><a href="#" target="_blank" class="btn btn-default btn-xs pull-right" onclick=deleteAttachmentNewInteraction(' + json[i].ID + ')><i class="fa fa-trash-o"></i></a>' +
                    '</span>' +
                    '</div>' +
                    '</li>' +
                    '<ul>'
                $('#divAttachmentInteractionTicket').append(resultComposeBodyAttachment)

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function deleteAttachmentNewInteraction(TrxID) {
    swal({
        title: "Do you want to process?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                var form_data = JSON.stringify({ TrxID: TrxID });
                $.ajax({
                    url: "WebServiceTransaction.asmx/DeleteAttachmentTicket",
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
                                    'Delete Data Has Been Success',
                                    'success'
                                ).then(function () {
                                    TrxAttachmentInteractionTicket($("#hd_sessionLogin").val());
                                });
                            } else {
                                swal(
                                    '',
                                    'Delete Data Has Been Failed',
                                    'error'
                                ).then(function () {
                                    $("#ModalChannel").modal('hide');
                                    TrxAttachmentInteractionTicket($("#hd_sessionLogin").val());
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
function SearchingEscalation(TrxSearchText) {
    var selectedText = $("#Journey_EscalationType").find("option:selected").text();
    var selectedValue = $("#Journey_EscalationType").val();
    var JourneyEscalationTo = $("#hd_EscalationTo").val();
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrxJourneyEscalation",
        data: "{TrxID:'" + $("#hd_Journey_EscalationValue").val() + "', TrxSearching:'" + TrxSearchText + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK200'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, varListOfEscalation = "";

            $('#Journey_ListEscalation').empty();
            for (i = 0; i < json.length; i++) {

                if (json[i].ORGANIZATION_NAME != null) {
                    var TrxDetail = json[i].ORGANIZATION_NAME
                } else {
                    var TrxDetail = json[i].EMAIL_ADDRESS
                }
                if (json[i].LOGIN == null) {
                    var Trxlogin = "danger"
                } else if (json[i].LOGIN == "1") {
                    var Trxlogin = "success"
                } else {
                    var Trxlogin = "danger"
                }
                varListOfEscalation = '<div class="col-12 col-lg-3"> ' +
                    '<div class="box ribbon-box"> ' +
                    '<div class="ribbon-two ribbon-two-primary"><span>' + json[i].LEVELUSER + '</span></div> ' +
                    '<div class="box-header no-border p-0"> ' +
                    '<img class="img-fluid" src="../images/card/4.jpg" alt=""> ' +
                    '</a> ' +
                    '</div> ' +
                    '<div class="box-body"> ' +
                    '<div class="user-contact list-inline text-center"> ' +
                    '<a href="#" class="btn btn-circle btn-' + Trxlogin + ' mb-5" onclick="selectedIndividual(' + json[i].USERID + ')"></a> ' +
                    '<a href="#" class="btn btn-circle mb-5 btn-warning" title="' + json[i].EMAIL_ADDRESS + '"><i class="fa fa-envelope"></i></a> ' +
                    '</div> ' +
                    '<div class="text-center"> ' +
                    '<h5 class="my-10"><a href="#">' + json[i].USERNAME + '</a></h5> ' +
                    '<h6 class="user-info mt-0 mb-10 text-fade">' + TrxDetail + '</h6>' +
                    '<!--<p class="text-fade w-p85 mx-auto">125 Ipsum Lorem Ave, Suite 458 New York, USA 154875 </p>-->' +
                    '</div> ' +
                    '</div> ' +
                    '</div> ' +
                    '</div>';

                $('#Journey_ListEscalation').append(varListOfEscalation);
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
    if (selectedText != 'NO') {
        $('#modal-ShowEscalation').modal('show');
    } else {
        getWS_SelectedEscalationType(0, 0, 'NO', 'NO');
    }
}
function ScriptFormated(TrxTicketNumber, TrxFormated) {
    $("#modal-description").modal('show')
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'" + TrxTicketNumber + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK63'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x = "";

            for (i = 0; i < json.length; i++) {

                if (TrxFormated == "1") {
                    document.getElementById("Pre_Ticket_Detail").innerHTML = json[i].DetailComplaint;
                } else {
                    document.getElementById("Pre_Ticket_Detail").innerHTML = json[i].ResponComplaint;
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
function ScriptFormatedInteraction(TrxInteractionID) {
    $("#modal-interaction").modal('show')
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'" + TrxInteractionID + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK64'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x = "";

            for (i = 0; i < json.length; i++) {
                document.getElementById("Pre_Ticket_Interaction").innerHTML = json[i].ResponseComplaint;
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function post_WS_TicketReminder() {
    if ($("#Reminder_Ticket").val() == "") {
        $.toast({
            heading: 'Hi ' + $("#hd_sessionLogin").val() + '',
            text: 'Please fill in completely, and check again ya...',
            position: 'top-right',
            loaderBg: '#ff6849',
            icon: 'error',
            hideAfter: 3500

        });
        return false;
    }
    if ($("#Reminder_Date").val() == "") {
        $.toast({
            heading: 'Hi ' + $("#hd_sessionLogin").val() + '',
            text: 'Please fill in completely, and check again ya...',
            position: 'top-right',
            loaderBg: '#ff6849',
            icon: 'error',
            hideAfter: 3500

        });
        return false;
    }
    var TrxDescription = CKEDITOR.instances.Reminder_Description.getData();
    if (TrxDescription == "") {
        $.toast({
            heading: 'Hi ' + $("#hd_sessionLogin").val() + '',
            text: 'Please fill in completely, and check again ya...',
            position: 'top-right',
            loaderBg: '#ff6849',
            icon: 'error',
            hideAfter: 3500

        });
        return false;
    }
    var TrxTicketNumber = getParameterByName("ticketid")
    swal({
        title: "Do you want to process?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                var form_data = JSON.stringify({ TicketNumber: TrxTicketNumber, TrxJudul: $("#Reminder_Ticket").val(), TrxTanggal: $("#Reminder_Date").val(), TrxDescription: encodeData(TrxDescription), TrxUserCreate: $("#hd_sessionLogin").val() });
                $.ajax({
                    url: "WebServiceTransaction.asmx/InsertTransactionTicketReminder",
                    method: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    //data: "{ TrxUsername: '" + TrxUsername + "', TrxCustomerID: '" + TrxCustomerID + "',TxtThreadID: '" + TxtThreadID + "',TxtAccount: '" + TxtAccount + "',TrxPelapor: '" + TrxPelapor + "',TrxPelaporEmail: '" + TrxPelaporEmail + "',TrxPelaporPhone: '" + TrxPelaporPhone + "',TrxPelaporAddress: '" + encodeData(TrxPelaporAddress) + "',TrxKejadian: '" + TrxKejadian + "',TrxPenyebab: '" + TrxPenyebab + "',TrxPenerimaPengaduan: '" + TrxPenerimaPengaduan + "',TrxStatusPelapor: '" + TrxStatusPelapor + "',TrxSkalaPrioritas: '" + TrxSkalaPrioritas + "',TrxJenisNasabah: '" + TrxJenisNasabah + "',TrxNomorRekening: '" + TrxNomorRekening + "',TrxSumberInformasi: '" + TrxSumberInformasi + "',TrxCategory: '" + TrxCategory + "',TrxLevel1: '" + TrxLevel1 + "',TrxLevel2: '" + TrxLevel2 + "',TrxLevel3: '" + TrxLevel3 + "',TrxComplaint: '" + encodeData(TrxComplaint) + "',TrxResponse: '" + encodeData(TrxResponse) + "',TrxChannel: '" + TrxChannel + "',TrxStatus: '" + TrxStatus + "',TrxEskalasi: '" + TrxEskalasi + "',TrxSLA: '" + TrxSLA + "',TrxExtendCategory: '" + TrxExtendCategory + "',TrxLayer: '" + TrxLayer + "',TrxThreadID:'" + TxtThreadID + "', TrxGenesysID:'" + TrxGenesysID + "', TxtContactID:'" + TxtContactID + "'}",
                    data: form_data,
                    success: function () {
                        console.log(form_data)
                        $("#Reminder_Ticket").val("");
                        $("#Reminder_Date").val("");
                        CKEDITOR.instances.Reminder_Description.setData("")
                        TrmTicketReminder();
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
                swal("Done", {
                    icon: "success",
                });
                $("#Reminder_Ticket").val("");
                $("#Reminder_Date").val("");
                CKEDITOR.instances.Reminder_Description.setData("")
                $("#reminder_display").css("display", "block");
                TrmTicketReminder();
                //window.location.reload();
            } else {
                //swal("Your imaginary file is safe!");          
            }
        });
}
function TrmTicketReminder() {
    var TicketNumber = getParameterByName("ticketid")
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'" + TicketNumber + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK65'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, resultReminderListTransaction = "";

            $('#Reminder_ListTransaction').empty();
            if (json.length == 0) {
                $("#reminder_display").css("display", "none");
            }
            else {
                for (i = 0; i < json.length; i++) {
                    var d = new Date(json[i].DateCreate);
                    var milisegundos = parseInt(json[i].DateCreate.replace("/Date(", "").replace(")/", ""));
                    var newDate = new Date(milisegundos).toLocaleDateString("en-UE");
                    var newTime = new Date(milisegundos).toLocaleTimeString("en-UE");

                    resultReminderListTransaction = '<span class="timeline-label">' +
                        '<span class="badge badge-pill badge-primary badge-lg">' + json[i].UserCreate + '</span>' +
                        '</span>' +
                        '<div class="timeline-item">' +
                        '<div class="timeline-point">' +
                        '<i class="fa fa-circle"></i>' +
                        '</div>' +
                        '<div class="timeline-event">' +
                        '<div class="timeline-heading">' +
                        '<h6 class="timeline-title">' + json[i].JudulReminder + '</h6>' +
                        '</div>' +
                        '<div class="timeline-body">' +
                        '<p class="font-size-12">' + json[i].DescriptionReminder + '</p>' +
                        '</div>' +
                        '<div class="timeline-footer">' +
                        '<time class="float-left text-fade" datetime="2017">' + newDate + newTime + '</time>' +
                        '<p class="text-right"><span class="btn btn-success btn-sm btn-rounded">' + json[i].Tanggal + '</span></p>' +
                        '</div>' +
                        '</div>' +
                        '</div>';
                    $('#Reminder_ListTransaction').append(resultReminderListTransaction)
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
function display_setting() {
    TrmTicketReminder();
}
function display_internal() {
    LoadDataRelatedTicket();
}
function previewInteractionAttachmnent(valueid) {
    $("#modal-interaction-attachment").modal('show')
    var TicketNumber = getParameterByName("ticketid")
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrxJourneyEscalation",
        data: "{TrxID:'" + TicketNumber + "', TrxSearching:'" + valueid + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK201'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, resultInteractionAttachment = "";

            $('#InteractionAttachment').empty();
            for (i = 0; i < json.length; i++) {

                if (json[i].FileType == "doc") {
                    var FileTypes = "word";
                } else if (json[i].FileType == "pdf") {
                    var FileTypes = "pdf";
                }
                else if (json[i].FileType == "xls") {
                    var FileTypes = "excel";
                }
                else if (json[i].FileType == "xlsx") {
                    var FileTypes = "excel";
                }
                else if (json[i].FileType == "zip") {
                    var FileTypes = "zip";
                }
                else if (json[i].FileType == "txt") {
                    var FileTypes = "code";
                }
                else if (json[i].FileType == "rar") {
                    var FileTypes = "zip";
                }
                else if (json[i].FileType == "png" || json[i].FileType == "PNG" || json[i].FileType == "jpg" || json[i].FileType == "JPG" || json[i].FileType == "gif" || json[i].FileType == "bmp") {
                    var FileTypes = "image";
                }

                resultInteractionAttachment = '<ul class="mailbox-attachments clearfix">' +
                    '<li>' +
                    '<center style="font-size:10px;margin-top:5px;"><span class="badge badge-pill badge-default">' + json[i].Usercreate + '</span></center>' +
                    '<span class="mailbox-attachment-icon"><i class="fa fa-file-' + FileTypes + '-o"></i></span>' +
                    '<div class="mailbox-attachment-info">' +
                    '<a href="#" class="mailbox-attachment-name"><i class="fa fa-paperclip"></i>' + json[i].Filename + '</a>' +
                    '<span class="mailbox-attachment-size">' + json[i].FileSize + '' +
                    '<a href=' + json[i].Path + ' target="_blank" class="btn btn-default btn-xs pull-right"><i class="fa fa-cloud-download"></i></a><a href="#" target="_blank" class="btn btn-default btn-xs pull-right" onclick=deleteAttachmentInteraction(' + json[i].ID + ',' + json[i].InteractionID + ')><i class="fa fa-trash-o"></i></a>' +
                    '</span>' +
                    '</div>' +
                    '</li>' +
                    '<ul>'
                $('#InteractionAttachment').append(resultInteractionAttachment)

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function deleteAttachmentInteraction(TrxID, InteractionID) {
    swal({
        title: "Do you want to process?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                var form_data = JSON.stringify({ TrxID: TrxID });
                $.ajax({
                    url: "WebServiceTransaction.asmx/DeleteAttachmentTicket",
                    method: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: form_data,
                    success: function (data) {

                        var json = JSON.parse(data.d);
                        var i = "";
                        for (i = 0; i < json.length; i++) {
                            if (json[i].Result == "True") {
                                swal(
                                    '',
                                    'Delete Data Has Been Success',
                                    'success'
                                ).then(function () {
                                    previewInteractionAttachmnent(InteractionID);
                                });
                            } else {
                                swal(
                                    '',
                                    'Delete Data Has Been Failed',
                                    'error'
                                ).then(function () {
                                    previewInteractionAttachmnent(InteractionID);
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
function detailIndividu() {
    var TicketNumber = getParameterByName("ticketid")
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrxJourneyEscalation",
        data: "{TrxID:'" + TicketNumber + "', TrxSearching:'" + TicketNumber + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK202'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x = "", varListOfEscalationIndividu = "";

            $('#Journey_Escalation_Individual').empty();
            for (i = 0; i < json.length; i++) {

                varListOfEscalationIndividu = '<div class="media media-single">' +
                    '<a href="#">' +
                    '<img class="avatar avatar-lg" src="../images/avatar/2.jpg" alt="...">' +
                    '</a>' +
                    '<div class="media-body">' +
                    '<h6><a href="#">' + json[i].TrxUserName + '</a></h6>' +
                    '<small class="text-fader" style="width:200px;">' + json[i].TrxDepartment + '</small>' +
                    '</div>' +
                    '</div>';

                $('#Journey_Escalation_Individual').append(varListOfEscalationIndividu);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
    $('#modal-individual').modal('show');
    $("#BTN_SubmitIndividual").css("display", "none")
}
function get_EscalationStatus(TrxValues) {
    if ($("#Journey_Status").val() == "Closed") {
        $("#Journey_EscalationChannel").val("No");
        $('#Journey_EscalationChannel').attr('disabled', true);
    } else {
        if ($("#ContentPlaceHolder1_TrxTicketPosition").val() == "3") {
            $("#Journey_EscalationChannel").val("No");
            $('#Journey_EscalationChannel').attr('disabled', true);
        } else {
            $("#Journey_EscalationChannel").val("");
            $('#Journey_EscalationChannel').attr('disabled', false);
        } 
    }
}
function get_SelectEscalation(TrxValues) {
    if ($("#Journey_EscalationChannel").val() == "Yes") {
        $('#modal-escalation').modal('show');
    } else {
        
    }
}
function UIDESK_TrmCustomer(custName) {
    var selectedValue = custName;
    var listDataCustomer = $('#Ticket_ListCustomer');
    console.log(custName);
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrxTransactionTicket",
        data: "{TrxID:'" + selectedValue + "', TrxSearching:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK334'}",
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
                    //if (json[i].HP == "" || json[i].HP == null) {
                    //    var PhoneNumber = ""
                    //} else {
                    //    var PhoneNumber = '<small class="text-fader">' + json[i].HP + '</small></br>'
                    //}
                    //if (json[i].PolisNumber == "" || json[i].PolisNumber == null) {
                    //    var PolisNumber = ""
                    //} else {
                    //    var PolisNumber = '<small class="text-fader">' + json[i].PolisNumber + '</small>'
                    //}
                    resultSourceCustomer = '<div class="media media-single" > ' +
                        '<a href="#">' +
                        '<img class="avatar avatar-lg" src="../images/avatar/' + jenisKelamin + '" alt="...">' +
                        '</a>' +
                        '<div class="media-body">' +
                        '<h6><a href="#" onclick="GetDataEmail(\'' + json[i].Email + '\')">' + json[i].Name + '</a></h6>' +
                        '' + Email + '' +
                        '</div>' +
                        '<div class="media-right">' +
                        '<a onclick="GetDataEmail(\'' + json[i].Email + '\')" class="btn btn-block btn-default btn-sm">Get</a>' +
                        '</div>' +
                        '</div>';
                    console.log("json[i].CustomerID " + json[i].Email)
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
function UIDESK_TrmCustomerCC(custName) {
    var selectedValue = custName;
    var listDataCustomer = $('#Ticket_ListCustomerCC');
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrxTransactionTicket",
        data: "{TrxID:'" + selectedValue + "', TrxSearching:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK334'}",
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
                    //if (json[i].HP == "" || json[i].HP == null) {
                    //    var PhoneNumber = ""
                    //} else {
                    //    var PhoneNumber = '<small class="text-fader">' + json[i].HP + '</small></br>'
                    //}
                    //if (json[i].PolisNumber == "" || json[i].PolisNumber == null) {
                    //    var PolisNumber = ""
                    //} else {
                    //    var PolisNumber = '<small class="text-fader">' + json[i].PolisNumber + '</small>'
                    //}
                    resultSourceCustomer = '<div class="media media-single" > ' +
                        '<a href="#">' +
                        '<img class="avatar avatar-lg" src="../images/avatar/' + jenisKelamin + '" alt="...">' +
                        '</a>' +
                        '<div class="media-body">' +
                        '<h6><a href="#" onclick="GetDataEmailCC(\'' + json[i].Email + '\')">' + json[i].Name + '</a></h6>' +
                        '' + Email + '' +
                        '</div>' +
                        '<div class="media-right">' +
                        '<a onclick="GetDataEmailCC(\'' + json[i].Email + '\')" class="btn btn-block btn-default btn-sm">Get</a>' +
                        '</div>' +
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
//* Upload Attachment Compose *//
$('#filescomposefollow').change(function () {
    var filename = $('#filescomposefollow').val();
    if (filename.substring(3, 11) == 'fakepath') {
        filename = filename.substring(12);
    } // For Remove fakepath
    $("label[for='file_name'] b").html(filename);
    $("label[for='file_default']").text('Selected File: ');
    if (filename == "") {
        $("label[for='file_default']").text('No File Choosen');
    }
});
$(document).on("change", "input[name='filescomposefollow']", function (e) {
    $(".hiddenX").show();
    //var valnoWA = "628119970460";//$('#tglKejadian').val();

    $("#LoaderPageCounting").show();

    if ($("#ComposeETO").val() == '') {
        swal("To is empty");
        $("#LoaderPageCounting").hide();
        return false
    }

    if ($("#ComposeESUBJECT").val() == '') {
        swal("Subject is empty");
        $("#LoaderPageCounting").hide();
        return false
    }

    var TrxBodyCompose = CKEDITOR.instances.Compose_Body.getData()
    if (TrxBodyCompose == '') {
        swal("Body is empty");
        $("#LoaderPageCounting").hide();
        return false
    }

    var files = $(this).prop("files");
    var data = new FormData();

    var request;
    var result;
    var modal = $(this).closest(".modal");
    var itemid = modal.data("itemid");

    for (var i = 0; i < files.length; i++) {

        console.log("attachment email followup")
        var filesizing = this.files[0].size / 1024 / 1024
        if (filesizing > 10) {
            swal(
                '',
                'Please upload file less than 10 MB. Thanks!',
                'error'
            ).then(function () {
                $(this).val('');
                return false;
            });
            return false;
        }

        var filename = this.files[0].name
        var fileextension = filename.split('.').pop();
        if (fileextension == "xls" || fileextension == "xlsx" || fileextension == "mp4" || fileextension == "Mp4" || fileextension == "MP4" || fileextension == "doc" || fileextension == "docx" || fileextension == "pdf" || fileextension == "png" || fileextension == "PNG" || fileextension == "jpg" || fileextension == "JPG" || fileextension == "jpeg" || fileextension == "gif" || fileextension == "GIF" || fileextension == "bmp" || fileextension == "BMP" || fileextension == "mov" || fileextension == "MOV" || fileextension == "FLV" || fileextension == "flv" || fileextension == "GPP" || fileextension == "gpp" || fileextension == "We.bM" || fileextension == "MPEG-1" || fileextension == "mpeg-1" || fileextension == "MPEG-2" || fileextension == "mpeg-2" || fileextension == "MPEG4" || fileextension == "mpeg4" || fileextension == "MPG" || fileextension == "mpg" || fileextension == "VI" || fileextension == "vi" || fileextension == "WMV" || fileextension == "wmv" || fileextension == "MPEGPS" || fileextension == "mpegps" || fileextension == "DNxHR" || fileextension == "ProRes" || fileextension == "ineForm" || fileextension == "HEVC" || fileextension == "hevc") {

        } else {
            swal(
                '',
                'File extension not allowed !',
                'error'
            ).then(function () {
                return false;
            });
            return false;
        }
        console.log("attachment email followup" + $("#ContentPlaceHolder1_TrxUserName").val())
        data.append("id", "617367367613876138");
        data.append("file", files[i]);
        data.append("Username", $("#ContentPlaceHolder1_TrxUserName").val());
        data.append("Emailid", $("#ContentPlaceHolder1_TrxEmailID").val());

        request = $.ajax({

            type: "POST",
            enctype: 'multipart/form-data',
            url: "asmx/TrmMailSystem.asmx/UploadFile",
            data: data,
            // dataType: "json",
            contentType: false,
            processData: false,

        });
        request.done(function (response) {
            $(".hiddenX").hide();
            $("#removeUpload").show();
            // result = response.d;
            $("#txtFileName").val($(response).find("Guid").text() + $(response).find("FileExt").text());
            console.log("Success");
            console.log($(response).find("Guid").text());
            console.log($(response).find("FileExt").text());
            //var TrxMessage = 'Your file has been upload'
            //AutoValidasiSuccess($("#hd_sessionLogin").val(), TrxMessage);
            TrmAttachmentEmailComposeFollowup($("#hd_sessionLogin").val());

        });

        request.fail(function (response) {

            console.log(response.responseText);
            //alert(response.responseText);

        });

        request.always(function () {

            data.delete(itemid);
            data.delete(files[i]);

        });

    }
});
function TrmAttachmentEmailComposeFollowup(TrxUserName) {
    var FileOutboxHTML = "../FileEmail/OUTBOX"
    $.ajax({
        type: "POST",
        url: "asmx/TrmMailSystem.asmx/UIDESK_TrmMasterDropdown",
        data: "{TrxID: 'UideskIndonesia', TrxEvent: 'TrmAttachmentEmailCompose', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK100'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, resultComposeBodyAttachment = "";

            $('#Div_Compose_Attachment').empty();
            for (i = 0; i < json.length; i++) {

                if (json[i].FILETYPE == ".doc") {
                    var FileTypes = "word";
                    var FileColors = "primary";
                }
                else if (json[i].FILETYPE == ".docx") {
                    var FileTypes = "word";
                    var FileColors = "primary";
                }
                else if (json[i].FILETYPE == ".pdf" || json[i].FILETYPE == "pdf") {
                    var FileTypes = "pdf";
                    var FileColors = "danger";
                }
                else if (json[i].FILETYPE == ".xls") {
                    var FileTypes = "excel";
                    var FileColors = "success";
                }
                else if (json[i].FILETYPE == ".xlsx") {
                    var FileTypes = "excel";
                    var FileColors = "success";
                }
                else if (json[i].FILETYPE == ".zip") {
                    var FileTypes = "zip";
                    var FileColors = "success"
                }
                else if (json[i].FILETYPE == ".txt") {
                    var FileTypes = "code";
                    var FileColors = "success"
                }
                else if (json[i].FILETYPE == ".rar") {
                    var FileTypes = "zip";
                }
                else if (json[i].FILETYPE == ".mp4" || json[i].FILETYPE == ".Mp4" || json[i].FILETYPE == ".MP4" || json[i].FILETYPE == ".mP4") {
                    var FileTypes = "video";
                    var FileColors = "warning"
                }
                else if (json[i].FILETYPE == ".png" || json[i].FILETYPE == "png" || json[i].FILETYPE == ".PNG" || json[i].FILETYPE == "PNG" || json[i].FILETYPE == ".jpg" || json[i].FILETYPE == "jpg" || json[i].FILETYPE == ".JPG" || json[i].FILETYPE == "JPG" || json[i].FILETYPE == ".jpeg" || json[i].FILETYPE == "jpeg" || json[i].FILETYPE == ".JPEG" || json[i].FILETYPE == "JPEG" || json[i].FILETYPE == ".gif" || json[i].FILETYPE == "gif" || json[i].FILETYPE == ".GIF" || json[i].FILETYPE == "GIF" || json[i].FILETYPE == ".BMP" || json[i].FILETYPE == "BMP" || json[i].FILETYPE == "bmp" || json[i].FILETYPE == ".bmp") {
                    var FileTypes = "image";
                }
                resultComposeBodyAttachment = '<ul class="mailbox-attachments clearfix">' +
                    '<li>' +
                    '<span class="mailbox-attachment-icon"><i class="fa fa-file-' + FileTypes + '-o text-' + FileColors +'"></i></span>' +
                    '<div class="mailbox-attachment-info">' +
                    '<a href="#" class="mailbox-attachment-name"><i class="fa fa-paperclip"></i>' + json[i].FILENAME.substring(0, 10) + '</a>' +
                    '<a href=' + FileOutboxHTML + '/' + json[i].URL + ' target="_blank" class="btn btn-default btn-xs pull-right"><i class="fa fa-cloud-download"></i></a><a href="#" target="_blank" class="btn btn-default btn-xs pull-right" onclick=deleteAttachment(' + json[i].ID + ')><i class="fa fa-trash-o"></i></a>' +
                    '</span>' +
                    '</div>' +
                    '</li>' +
                    '<ul>'
                $('#Div_Compose_Attachment').append(resultComposeBodyAttachment)

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function addresstujuan() {
    //$("#ComposeETO").on("click", function () {
       $("#emailModalSearch").modal('show');
    //});
}
function addresscc() {
    //$("#ComposeECC").on("click", function () {
       $("#emailModalSearchCC").modal('show');
    //});
}
function DisplayAttachmentJourneyEmail() { 
    if ($("#ContentPlaceHolder1_TrxAttachmentType").val() == "InboxEmail") {
        var FolderRoot = "Inbox"
        var QueryRoot = "PreviewAttachmentInboxEmail"
    } else {
        var FolderRoot = "Outbox"
        var QueryRoot = "PreviewAttachmentOutboxEmail"
    }
    $("#modal-preview-file").modal('show');
    var FileInboxHTML = "../FileEmail/" + FolderRoot + ""
    $.ajax({
        type: "POST",
        url: "asmx/TrmMailSystem.asmx/UIDESK_TrmMasterDropdown",
        data: "{TrxID: '" + $("#ContentPlaceHolder1_TrxAttachmentEmailID").val() + "', TrxEvent: '" + QueryRoot +"', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK100'}",
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
    //$("#LoaderPageAttachment").hide();
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
function getTextInfo(ThreadID, Type) {
    //var ValueThreadID = ThreadID
    //var ValueType = Type
    $("#ContentPlaceHolder1_TrxAttachmentEmailID").val(ThreadID)
    $("#ContentPlaceHolder1_TrxAttachmentType").val(Type)
    if (Type === "InboxEmail") {
        var FileRoot = 'Inbox'
    } else if (Type === "OutboxEmail") {
        var FileRoot = 'Outbox'
    } else {
        swal(
            '',
            'File Not Found, Interaction is Ticket',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    var urlfile = "https://kanmo.uidesk.id/crm/FileEmail/Inbox/" + ThreadID + "/file.html"
    console.log(urlfile)
    $.ajax({
        url: "https://kanmo.uidesk.id/crm/FileEmail/" + FileRoot + "/" + ThreadID +"/file.html",
        //url: "https://kanmo.uidesk.id/crm/FileEmail/Inbox/202402291855062682308/file.html",
        success: function (data) {
            //document.getElementById("editorNya").value = data;
            CKEDITOR.instances.editorNya.setData(data)
        }
    });
    $("#modal-preview-interaction").modal('show');
}
function PreviewAttachmentJourneyEmail() {
    $("#modal-preview-file").modal('show');
    DisplayAttachmentJourneyEmail();
}

function SubmitOrderID() {
    cleansingobjectorderid();
    $.ajax({
        type: "POST",
        url: "asmx/BantuDagang.asmx/DataAccessToken",
        data: "{UserName: '" + $("#hd_sessionLogin").val() + "', Token:'" + getParameterByName('ticketid') + "', Action: 'SELECT'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x, result = "";

            for (i = 0; i < json.length; i++) {
                $("#TokenBantuDagang").val(json[i].TrxmsgSystem)
                $("#OrderID").val(json[i].TrxID)
                SubmitOrderBantuDagang(json[i].TrxmsgSystem)
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function SubmitOrderBantuDagang() {
    cleansingobjectorderid();
    $.ajax({
        type: "POST",
        url: "asmx/BantuDagang.asmx/DataAccessToken",
        data: "{UserName: '" + $("#hd_sessionLogin").val() + "', Token:'" + getParameterByName('ticketid') + "', Action: 'SELECT'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x, result = "";

            for (i = 0; i < json.length; i++) {

                if ($("#OrderID").val() != "" || $("#OrderID").val() != null) {
                    var settings = {
                        "url": "https://partner-api.bantudagang.com/order/detail?ref_id=" + json[i].TrxID + "",
                        "method": "GET",
                        "timeout": 0,
                        "headers": {
                            "Authorization": "Bearer " + json[i].TrxmsgSystem + ""
                        },
                    };
                    $.ajax(settings).done(function (response) {
                        console.log("response submit order id:", response);
                        if (response.code === 200 && response.message === "SUCCESS") {
                            let data = response.data;

                            $("#Order_Code").append(data.order_code)
                            $("#Invoice_No").append(data.invoice_no)
                            $("#Store_Code").append(data.store_code)
                            $("#marketplace").append(data.marketplace)
                            var TotalProductValue = new Intl.NumberFormat('id-ID', {
                                style: 'currency',
                                currency: 'IDR'
                            }).format(data.total_product);
                            $("#total_product").append(TotalProductValue)
                            $("#total_qty").append(data.total_qty)

                            $("#store_name").append(data.store.store_name)
                            var dateorder = new Date(data.order_date);
                            var day = ("0" + dateorder.getDate()).slice(-2);
                            var month = ("0" + (dateorder.getMonth() + 1)).slice(-2); // Bulan dimulai dari 0
                            var year = dateorder.getFullYear();
                            var hours = ("0" + dateorder.getHours()).slice(-2);
                            var minutes = ("0" + dateorder.getMinutes()).slice(-2);
                            var seconds = ("0" + dateorder.getSeconds()).slice(-2);
                            //var formattedDate = `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
                            var OrderDateNya = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
                            $("#Order_Date").append(OrderDateNya)
                            if (data.order_status.name == "Pesanan Selesai") {
                                $("#Order_Status").append("<span class='badge badge-pill badge-danger' style='width: 100%;'>" + data.order_status.name + "</span>")
                            } else if (data.order_status.name == "Pesanan Dikirim") {
                                $("#Order_Status").append("<span class='badge badge-pill badge-warning' style='width: 100%;'>" + data.order_status.name + "</span>")
                            } else if (data.order_status.name == "Pesanan Tiba") {
                                $("#Order_Status").append("<span class='badge badge-pill badge-primary' style='width: 100%;'>" + data.order_status.name + "</span>")
                            } else if (data.order_status.name == "Pesanan Dikomplain") {
                                $("#Order_Status").append("<span class='badge badge-pill badge-info' style='width: 100%;'>" + data.order_status.name + "</span>")
                            } else {
                                $("#Order_Status").append("<span class='badge badge-pill badge-success' style='width: 100%;'>" + data.order_status.name + "</span>")
                            }

                            var datepayment = new Date(data.order_date);
                            var day = ("0" + datepayment.getDate()).slice(-2);
                            var month = ("0" + (datepayment.getMonth() + 1)).slice(-2); // Bulan dimulai dari 0
                            var year = datepayment.getFullYear();
                            var hours = ("0" + datepayment.getHours()).slice(-2);
                            var minutes = ("0" + datepayment.getMinutes()).slice(-2);
                            var seconds = ("0" + datepayment.getSeconds()).slice(-2);
                            //var formattedDate = `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
                            var PaymentDateNya = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
                            $("#Payment_Date").append(PaymentDateNya)

                            $("#Is_COD").append(data.is_cod)
                            $("#Is_Dropship").append(data.is_dropship)
                            var SubTotalValue = new Intl.NumberFormat('id-ID', {
                                style: 'currency',
                                currency: 'IDR'
                            }).format(data.total_product);
                            $("#Subtotal").append(SubTotalValue)
                            $("#Destination_Name").append(data.order_shipping.destination_name)
                            $("#Destination_Phone").append(data.order_shipping.destination_phone)
                            $("#Destination_Address").append(data.order_shipping.destination_address)
                            $("#Destination_Province").append(data.order_shipping.destination_province)
                            $("#Destination_City").append(data.order_shipping.destination_city)
                            $("#Destination_Postal_Code").append(data.order_shipping.destination_postal_code)
                            $("#Courier_Service_Name").append(data.order_shipping.courier_service_name)

                            $('#productnames').empty();
                            data.order_products.forEach(function (product, index) {
                                //console.log(`  Product ${index + 1}:`);
                                //console.log("    Product Name:", product.product_name);
                                //console.log("    SKU:", product.sku);
                                //console.log("    Price:", product.price);
                                //console.log("    Quantity:", product.qty);
                                //console.log("    Subtotal:", product.subtotal);
                                //console.log("    Notes:", product.notes);
                                //console.log("    Image URL:", product.image_url);
                                //console.log("    Variant Name:", product.variant_name);
                                var productprice = new Intl.NumberFormat('id-ID', {
                                    style: 'currency',
                                    currency: 'IDR'
                                }).format(product.price);
                                var productsubtotal = new Intl.NumberFormat('id-ID', {
                                    style: 'currency',
                                    currency: 'IDR'
                                }).format(product.subtotal);
                                if (product.image_url == null) {
                                    var urlproductimage = "-"
                                } else {
                                    var urlproductimage = "<img src=" + product.image_url + " style='width:50px;'></image>"
                                }
                                var invoicestatus = "<div class='box'><div class='box-body'><table class='table table-lg table-striped' style='overflow-x: scroll'>" +
                                    "<tr><td>Product Name</td><td>:</td><td style='width:300px;'>" + product.product_name + "</td></tr>" +
                                    "<tr><td>SKU</td><td>:</td><td>" + product.sku + "</td></tr>" +
                                    "<tr><td>Price</td><td>:</td><td>" + productprice + "</td></tr>" +
                                    "<tr><td>Quantity</td><td>:</td><td>" + product.qty + "</td></tr>" +
                                    "<tr><td>Sub Total</td><td>:</td><td>" + productsubtotal + "</td></tr>" +
                                    "<tr><td>Notes</td><td>:</td><td>" + product.notes + "</td></tr>" +
                                    //"<tr><td>image_url</td><td>:</td><td style='width:300px;'>" + productimage + "</td></tr>" +
                                    "<tr><td>Variant Name</td><td>:</td><td>" + product.variant_name + "</td></tr>" +
                                    "<tr><td></td><td></td><td style='width:300px;'>" + urlproductimage + "</td></tr></table></div></div>"

                                $('#productnames').append(invoicestatus);
                            });

                        }

                    }).fail(function (jqXHR, textStatus, errorThrown) {
                        console.error("Request failed: " + textStatus + ", " + errorThrown);
                        console.error("Response Request failed: " + jqXHR.responseText);
                        alert(responseObject.code)
                        var responseObject = JSON.parse(jqXHR.responseText);
                        if (responseObject.code == "404") {
                            swal(
                                '',
                                'Data Order Not Found !',
                                'error'
                            ).then(function () {
                                return false;
                            });
                            return false;
                        } else if (responseObject.code == "401") {
                            //alert(responseObject.code)
                            GenerateToken();
                        }
                    });

                    var apiUrl = "https://partner-api.bantudagang.com/chat/detail?ref_id=" + json[i].TrxID + "";
                    $.ajax({
                        url: apiUrl,
                        method: "GET",
                        headers: {
                            "Authorization": "Bearer " + json[i].TrxmsgSystem + ""
                        }
                    }).done(function (response) {

                        $("#chatView").css("display", "block");
                        try {
                            //console.log("response data chat " + response.data)
                            if (response && response.data && Array.isArray(response.data)) {
                                $('#chatView .chat-box-one2').empty();

                                $('#chatView').empty()
                                response.data.forEach(function (data) {
                                    var chatHTML = generateChatHTML(data);
                                    $('#chatView').append(chatHTML);
                                });

                            } else {
                                console.error("Response data is missing or not in the expected format.");
                            }
                        } catch (error) {
                            console.error("Error:", error);
                        }

                    }).fail(function (jqXHR, textStatus, errorThrown) {
                        //console.error("AJAX request failed:", textStatus, errorThrown);
                        console.error("Response responseText: " + jqXHR.responseText);
                        var responseObject = JSON.parse(jqXHR.responseText);
                        console.error("responseObject code : " + responseObject.code);
                        if (responseObject.code == "404") {
                            $("#chatView").css("display", "none");
                            //swal(
                            //    '',
                            //    'Data Chat Not Found !',
                            //    'error'
                            //).then(function () {
                            //    return false;
                            //});
                            //return false;
                        } else if (responseObject.code == "401") {
                            //GenerateToken();
                        }
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
    //alert($("#OrderID").val())
    //alert($("#TokenBantuDagang").val())
    //return false;
    //if ($("#OrderID").val() != "" || $("#OrderID").val() != null) {
    //    var settings = {
    //        "url": "https://partner-api.bantudagang.com/order/detail?ref_id=" + $("#OrderID").val() + "",
    //        "method": "GET",
    //        "timeout": 0,
    //        "headers": {
    //            "Authorization": "Bearer " + $("#TokenBantuDagang").val() + ""
    //        },
    //    };
    //    $.ajax(settings).done(function (response) {
    //        console.log("response submit order id:", response);
    //        if (response.code === 200 && response.message === "SUCCESS") {
    //            let data = response.data;

    //            $("#Order_Code").append(data.order_code)
    //            $("#Invoice_No").append(data.invoice_no)
    //            $("#Store_Code").append(data.store_code)
    //            $("#marketplace").append(data.marketplace)
    //            var TotalProductValue = new Intl.NumberFormat('id-ID', {
    //                style: 'currency',
    //                currency: 'IDR'
    //            }).format(data.total_product);
    //            $("#total_product").append(TotalProductValue)
    //            $("#total_qty").append(data.total_qty)

    //            $("#store_name").append(data.store.store_name)
    //            var dateorder = new Date(data.order_date);
    //            var day = ("0" + dateorder.getDate()).slice(-2);
    //            var month = ("0" + (dateorder.getMonth() + 1)).slice(-2); // Bulan dimulai dari 0
    //            var year = dateorder.getFullYear();
    //            var hours = ("0" + dateorder.getHours()).slice(-2);
    //            var minutes = ("0" + dateorder.getMinutes()).slice(-2);
    //            var seconds = ("0" + dateorder.getSeconds()).slice(-2);
    //            //var formattedDate = `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
    //            var OrderDateNya = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    //            $("#Order_Date").append(OrderDateNya)
    //            if (data.order_status.name == "Pesanan Selesai") {
    //                $("#Order_Status").append("<span class='badge badge-pill badge-danger' style='width: 100%;'>" + data.order_status.name + "</span>")
    //            } else if (data.order_status.name == "Pesanan Dikirim") {
    //                $("#Order_Status").append("<span class='badge badge-pill badge-warning' style='width: 100%;'>" + data.order_status.name + "</span>")
    //            } else if (data.order_status.name == "Pesanan Tiba") {
    //                $("#Order_Status").append("<span class='badge badge-pill badge-primary' style='width: 100%;'>" + data.order_status.name + "</span>")
    //            } else if (data.order_status.name == "Pesanan Dikomplain") {
    //                $("#Order_Status").append("<span class='badge badge-pill badge-info' style='width: 100%;'>" + data.order_status.name + "</span>")
    //            } else {
    //                $("#Order_Status").append("<span class='badge badge-pill badge-success' style='width: 100%;'>" + data.order_status.name + "</span>")
    //            }

    //            var datepayment = new Date(data.order_date);
    //            var day = ("0" + datepayment.getDate()).slice(-2);
    //            var month = ("0" + (datepayment.getMonth() + 1)).slice(-2); // Bulan dimulai dari 0
    //            var year = datepayment.getFullYear();
    //            var hours = ("0" + datepayment.getHours()).slice(-2);
    //            var minutes = ("0" + datepayment.getMinutes()).slice(-2);
    //            var seconds = ("0" + datepayment.getSeconds()).slice(-2);
    //            //var formattedDate = `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
    //            var PaymentDateNya = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    //            $("#Payment_Date").append(PaymentDateNya)

    //            $("#Is_COD").append(data.is_cod)
    //            $("#Is_Dropship").append(data.is_dropship)
    //            var SubTotalValue = new Intl.NumberFormat('id-ID', {
    //                style: 'currency',
    //                currency: 'IDR'
    //            }).format(data.total_product);
    //            $("#Subtotal").append(SubTotalValue)
    //            $("#Destination_Name").append(data.order_shipping.destination_name)
    //            $("#Destination_Phone").append(data.order_shipping.destination_phone)
    //            $("#Destination_Address").append(data.order_shipping.destination_address)
    //            $("#Destination_Province").append(data.order_shipping.destination_province)
    //            $("#Destination_City").append(data.order_shipping.destination_city)
    //            $("#Destination_Postal_Code").append(data.order_shipping.destination_postal_code)
    //            $("#Courier_Service_Name").append(data.order_shipping.courier_service_name)
             
    //            $('#productnames').empty();
    //            data.order_products.forEach(function (product, index) {
    //                console.log(`  Product ${index + 1}:`);
    //                console.log("    Product Name:", product.product_name);
    //                console.log("    SKU:", product.sku);
    //                console.log("    Price:", product.price);
    //                console.log("    Quantity:", product.qty);
    //                console.log("    Subtotal:", product.subtotal);
    //                console.log("    Notes:", product.notes);
    //                console.log("    Image URL:", product.image_url);
    //                console.log("    Variant Name:", product.variant_name);
    //                var productprice = new Intl.NumberFormat('id-ID', {
    //                    style: 'currency',
    //                    currency: 'IDR'
    //                }).format(product.price);
    //                var productsubtotal = new Intl.NumberFormat('id-ID', {
    //                    style: 'currency',
    //                    currency: 'IDR'
    //                }).format(product.subtotal);
    //                if (product.image_url == null) {
    //                    var urlproductimage = "-"
    //                } else {
    //                    var urlproductimage = "<img src=" + product.image_url + " style='width:50px;'></image>"
    //                }
    //                var invoicestatus = "<div class='box'><div class='box-body'><table class='table table-lg table-striped' style='overflow-x: scroll'>" +
    //                    "<tr><td>Product Name</td><td>:</td><td style='width:300px;'>" + product.product_name + "</td></tr>" +
    //                    "<tr><td>SKU</td><td>:</td><td>" + product.sku + "</td></tr>" +
    //                    "<tr><td>Price</td><td>:</td><td>" + productprice + "</td></tr>" +
    //                    "<tr><td>Quantity</td><td>:</td><td>" + product.qty + "</td></tr>" +
    //                    "<tr><td>Sub Total</td><td>:</td><td>" + productsubtotal + "</td></tr>" +
    //                    "<tr><td>Notes</td><td>:</td><td>" + product.notes + "</td></tr>" +
    //                    //"<tr><td>image_url</td><td>:</td><td style='width:300px;'>" + productimage + "</td></tr>" +
    //                    "<tr><td>Variant Name</td><td>:</td><td>" + product.variant_name + "</td></tr>" +
    //                    "<tr><td></td><td></td><td style='width:300px;'>" + urlproductimage + "</td></tr></table></div></div>"

    //                $('#productnames').append(invoicestatus);
    //            });

    //        }

    //    }).fail(function (jqXHR, textStatus, errorThrown) {
    //        console.error("Request failed: " + textStatus + ", " + errorThrown);
    //        console.error("Response Request failed: " + jqXHR.responseText);
    //        alert(responseObject.code)
    //        var responseObject = JSON.parse(jqXHR.responseText);
    //        if (responseObject.code == "404") {
    //            swal(
    //                '',
    //                'Data Order Not Found !',
    //                'error'
    //            ).then(function () {
    //                return false;
    //            });
    //            return false;
    //        } else if (responseObject.code == "401") {
    //            alert(responseObject.code)
    //            //GenerateToken();
    //        }
    //    });

    //    var apiUrl = "https://partner-api.bantudagang.com/chat/detail?ref_id=" + $("#OrderID").val() + "";
    //    $.ajax({
    //        url: apiUrl,
    //        method: "GET",
    //        headers: {
    //            "Authorization": "Bearer " + $("#TokenBantuDagang").val() + ""
    //        }
    //    }).done(function (response) {

    //        $("#chatView").css("display", "block");
    //        try {
    //            console.log("response data chat " + response.data)
    //            if (response && response.data && Array.isArray(response.data)) {
    //                $('#chatView .chat-box-one2').empty();

    //                $('#chatView').empty()
    //                response.data.forEach(function (data) {
    //                    var chatHTML = generateChatHTML(data);
    //                    $('#chatView').append(chatHTML);
    //                });

    //            } else {
    //                console.error("Response data is missing or not in the expected format.");
    //            }
    //        } catch (error) {
    //            console.error("Error:", error);
    //        }

    //    }).fail(function (jqXHR, textStatus, errorThrown) {
    //        //console.error("AJAX request failed:", textStatus, errorThrown);
    //        console.error("Response responseText: " + jqXHR.responseText);
    //        var responseObject = JSON.parse(jqXHR.responseText);
    //        console.error("responseObject code : " + responseObject.code);
    //        if (responseObject.code == "404") {
    //            $("#chatView").css("display", "none");
    //            //swal(
    //            //    '',
    //            //    'Data Chat Not Found !',
    //            //    'error'
    //            //).then(function () {
    //            //    return false;
    //            //});
    //            //return false;
    //        } else if (responseObject.code == "401") {
    //            //GenerateToken();
    //        }
    //    });
    //}  
}
function SubmitChatID() {
    $.ajax({
        type: "POST",
        url: "asmx/BantuDagang.asmx/DataAccessToken",
        data: "{UserName: '" + $("#hd_sessionLogin").val() + "', Token:'0', Action: 'SELECT'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x, result = "";

            for (i = 0; i < json.length; i++) {
                $("#TokenBantuDagang").val(json[i].TrxmsgSystem)
            }
            SubmitChatBantuDagang($("#TokenBantuDagang").val())
        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
async function SubmitChatBantuDagang() {
    $.ajax({
        type: "POST",
        url: "asmx/BantuDagang.asmx/DataAccessToken",
        data: "{UserName: '" + $("#hd_sessionLogin").val() + "', Token:'" + getParameterByName('ticketid') +"', Action: 'SELECT'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x, result = "";

            for (i = 0; i < json.length; i++) {
                $("#TokenBantuDagang").val(json[i].TrxmsgSystem)
                $("#OrderID").val(json[i].TrxID)
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
    var apiUrl = "https://partner-api.bantudagang.com/chat/detail?ref_id=" + $("#OrderID").val() + "";
    $.ajax({
        url: apiUrl,
        method: "GET",
        headers: {
            "Authorization": "Bearer " + $("#TokenBantuDagang").val() + ""
        }
    }).done(function (response) {

        $("#chatView").css("display", "block");
        try {
            //console.log("response data chat " + response.data)
            if (response && response.data && Array.isArray(response.data)) {
                $('#chatView .chat-box-one2').empty();

                $('#chatView').empty()
                response.data.forEach(function (data) {
                    var chatHTML = generateChatHTML(data);
                    $('#chatView').append(chatHTML);
                });

            } else {
                console.error("Response data is missing or not in the expected format.");
            }
        } catch (error) {
            console.error("Error:", error);
        }

    }).fail(function (jqXHR, textStatus, errorThrown) {
        //console.error("AJAX request failed:", textStatus, errorThrown);
        console.error("Response responseText: " + jqXHR.responseText);
        var responseObject = JSON.parse(jqXHR.responseText);
        console.error("responseObject code : " + responseObject.code);
        if (responseObject.code == "404") {
            $("#chatView").css("display", "none");
            swal(
                '',
                'Data Chat Not Found !',
                'error'
            ).then(function () {
                return false;
            });
            return false;
        } else if (responseObject.code == "401") {
            GenerateToken();
        }
    });
}
function GenerateToken() {
    var settings = {
        "url": "https://partner-api.bantudagang.com/auth/login",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        },
        "data": JSON.stringify({
            "email": "sa-2073-FYGTJ.1716781462@iam.bantudagang.com",
            "password": "LveirQf661OmtSoSG111tNId1IsF2GvA4mScUFdezVwhCitq1Y"
        }),
    };

    $.ajax(settings).done(function (response) {
        if (response.code === 200 && response.message === "SUCCESS") {
            let data = response.data;
            console.log("modul generate token berhasil " + data.accessToken);
            $("#GenerateToken").val(data.accessToken)
        } else {
            console.log("modul generate token gagal " + data.accessToken);
            swal(
                '',
                'Generate Token Failed !',
                'error'
            ).then(function () {
                return false;
            });
            return false;
        }
    });

    $.ajax({
        type: "POST",
        url: "asmx/BantuDagang.asmx/DataAccessToken",
        data: "{UserName: '" + $("#hd_sessionLogin").val() + "', Token:'" + $("#GenerateToken").val() + "', Action: 'INSERT'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x, result = "";

            for (i = 0; i < json.length; i++) {
                $("#TokenBantuDagang").val(json[i].TrxmsgSystem)
            }
            SubmitOrderBantuDagang()
        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function generateChatHTML(data) {
    var message = '';
    var type = data.type;
    var isOpposite = data.is_opposite;
    var marketplaceImage = getMarketplaceImage(data.marketplace);

    if (type === "invoice") {
        //message = generateInvoiceMessage(data.invoice);
        if (data.invoice.product_image == "" || data.invoice.product_image == null) {
            var invoiceproductimage = ""
        } else {
            var invoiceproductimage = "<img src=" + data.invoice.product_image + " style='width:50px;'></img>"
        }
        message = "<table class='table table-lg table-striped' style='overflow-x: scroll;margin-left:-70px;'><tr><td style='width:50px;'>Status</td><td>:</td><td style='width:50px;'>" + data.invoice.status + "</td></tr>" +
            "<tr><td style='width:50px;'>No</td><td>:</td><td style='width:50px;'>" + data.invoice.invoice_no + "</td></tr>" +
            "<tr><td style='width:50px;'>Total</td><td>:</td><td style='width:50px;'>" + data.invoice.total_purchase + "</td></tr>" +
            "<tr><td style='width:50px;'>Payment Date</td><td>:</td><td style='width:50px;'>" + data.invoice.payment_date + "</td></tr>" +
            "<tr><td style='width:50px;'>City</td><td>:</td><td style='width:50px;'>" + data.invoice.city + "</td></tr>" +
            "<tr><td style='width:50px;'>Province</td><td>:</td><td style='width:50px;'>" + data.invoice.province + "</td></tr>" +
            "<tr><td style='width:50px;'>Courier Name</td><td>:</td><td style='width:50px;'>" + data.invoice.courier_name + "</td></tr>" +
            "<tr><td style='width:50px;'>Courier Service_name</td><td>:</td><td style='width:50px;'>" + data.invoice.courier_service_name + "</td></tr>" +
            "<tr><td style='width:50px;'>Courier Ref</td><td>:</td><td style='width:50px;'>" + data.invoice.courier_ref + "</td></tr>" +
            "<tr><td style='width:50px;'>Destination Name</td><td>:</td><td style='width:50px;'>" + data.invoice.destination_name + "</td></tr>" +
            "<tr><td style='width:50px;'>Product Image</td><td>:</td><td style='width:50px;'>" + invoiceproductimage + "</td></tr></table>"
    } else if (type === "product") {
        //message = generateProductMessage(data.product);
        message = "<div class='attachment-block clearfix' style='font-size:10px;'>" +
            "<img class='attachment-img' src=" + data.product.image_url + ">" +
            "<div class='attachment-pushed'>" +
            "<div>" +
            "<div>" +
            "<span>" + data.product.name + "</span>" +
            "</div>" +
            "<div>" + data.product.price + "</div>" +
            "</div>" +
            "</div>" +
            "</div>"
    } else if (type === "text") {
        message = data.msg;
    } else if (type === "sticker" || type === "image" || type === "video") {
        if (data.media_url == null || data.media_url == "") {
            message = "<a href=" + data.msg + " target='_blank'><img class='attachment-img' src='" + data.msg + "'/></a>";
        } else {
            message = "<a href=" + data.media_url + "><img class='attachment-img' src='" + data.media_url + "'/></a>";
        }
    } else if (type === "item_list" || type === "faq_liveagent") {
        message = generateMediaMessage(type, data.msg);
    } else if (type === "voucher") {
        //message = generateMediaMessage(type, data.msg);
        message = data.msg;
    } else if (type === "shopping_cart") {
        //message = generateMediaMessage(type, data.msg);
        message = "<div class='attachment-block clearfix' style='font-size:10px;'>" +
            "<img class='attachment-img' src=" + data.product.name + ">" +
            "<div class='attachment-pushed'>" +
            "<div>" +
            "<div>" +
            "<span>" + data.product.price + "</span>" +
            "</div>" +
            "<div>" + data.product.stock + "</div>" +
            "</div>" +
            "<div><img src=" + data.product.url + " style='width:50px;'></img></div>" +
            "</div>" +
            "</div>" +
            "</div>"
    }

    var floatscr = isOpposite ? "left" : "right";
    var flag = isOpposite ? "Customer" : "Agent";
    var datereplytime = new Date(data.reply_time);
    var day = ("0" + datereplytime.getDate()).slice(-2);
    var month = ("0" + (datereplytime.getMonth() + 1)).slice(-2); // Bulan dimulai dari 0
    var year = datereplytime.getFullYear();
    var hours = ("0" + datereplytime.getHours()).slice(-2);
    var minutes = ("0" + datereplytime.getMinutes()).slice(-2);
    var seconds = ("0" + datereplytime.getSeconds()).slice(-2);
    //var formattedDate = `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
    var TimeChatNya = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    return '<div class="box-body">' +
        '<div class="chat-box-one2">' +
        '<div class="card d-inline-block mb-3 float-' + floatscr + ' mr-2 no-shadow bg-' + (isOpposite ? "lighter" : "primary") + ' max-w-p80">' +
        '<div class="position-absolute pt-1 pr-2 r-0">' +
        '<span class="text-extra-small text-muted" style="font-size:8px;color:white;">' + TimeChatNya + '</span>' +
        '</div>' +
        '<div class="card-body">' +
        '<div class="d-flex flex-row pb-2">' +
        '<a class="d-flex" href="#">' +
        '<img alt="Profile" src="../Images/bd/' + marketplaceImage + '" class="avatar mr-10">' +
        '</a>' +
        '<div class="d-flex flex-grow-1 min-width-zero">' +
        '<div class="m-2 pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between">' +
        '<div class="min-width-zero">' +
        '<p class="mb-0 font-size-16 text-dark">' + flag + '</p>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div class="chat-text-' + (isOpposite ? "left" : "right") + ' pl-55">' +
        '<p class="mb-0 text-semi-muted">' + message + '</p>' +
        '</div>' +
        '</br>' +
        '</div>' +
        '</div>' +
        '<div class="clearfix"></div>' +
        '</div>' +
        '</div>';
}
function getMarketplaceImage(marketplace) {
    var images = {
        "tokopedia": "tokopedia.png",
        "shopee": "shopee.png",
        "lazada": "lazada.png"
    };
    return images[marketplace] || "tokopedia.png";
}
function generateInvoiceMessage(invoiceData) {
    // Generate HTML for invoice message
    var invoicestatus = "<div class='box'><div class='box-body'><table class='table table-lg table-striped'><tr><td>Status</td><td>:</td><td>" + data.invoice.status + "</td></tr>" +
        "<tr><td>No</td><td>:</td><td>" + data.invoice.invoice_no + "</td></tr>" +
        "<tr><td>Total</td><td>:</td><td>" + data.invoice.total_purchase + "</td></tr>" +
        "<tr><td>Payment Date</td><td>:</td><td>" + data.invoice.payment_date + "</td></tr>" +
        "<tr><td>City</td><td>:</td><td>" + data.invoice.city + "</td></tr>" +
        "<tr><td>Province</td><td>:</td><td>" + data.invoice.province + "</td></tr>" +
        "<tr><td>Courier Name</td><td>:</td><td>" + data.invoice.courier_name + "</td></tr>" +
        "<tr><td>Courier Service_name</td><td>:</td><td>" + data.invoice.courier_service_name + "</td></tr>" +
        "<tr><td>Courier Ref</td><td>:</td><td>" + data.invoice.courier_ref + "</td></tr>" +
        "<tr><td>Destination Name</td><td>:</td><td>" + data.invoice.destination_name + "</td></tr>" +
        "<tr><td>Product Image</td><td>:</td><td><img src=" + data.invoice.product_image + " style='width:50px;'></image></td></tr></table></div></div>"
}
function generateProductMessage(productData) {
    // Generate HTML for product message
}
function generateMediaMessage(type, mediaUrl) {
    // Generate HTML for media message
}
function cleansingobjectorderid() {
    $("#Order_Code").empty()
    $("#Invoice_No").empty()
    $("#Store_Code").empty()
    $("#marketplace").empty()
    $("#total_product").empty()
    $("#total_qty").empty()
    $("#Order_Date").empty()
    $("#Payment_Date").empty()
    $("#Is_COD").empty()
    $("#Is_Dropship").empty()
    $("#Subtotal").empty()
    $("#Order_Status").empty()
    $("#store_name").empty()
    $("#Destination_Name").empty()
    $("#Destination_Phone").empty()
    $("#Destination_Address").empty()
    $("#Destination_Province").empty()
    $("#Destination_City").empty()
    $("#Destination_Postal_Code").empty()
    $("#Courier_Service_Name").empty();
    //$('#tableproduct tbody').empty();
    //var tableproduct = $('#tableproduct').DataTable()
    //tableproduct.clear().draw()
}
function SubmitGenerateToken() {
    var settings = {
        "url": "https://partner-api.bantudagang.com/auth/login",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        },
        "data": JSON.stringify({
            "email": "sa-2073-FYGTJ.1716781462@iam.bantudagang.com",
            "password": "LveirQf661OmtSoSG111tNId1IsF2GvA4mScUFdezVwhCitq1Y"
        }),
    };

    $.ajax(settings).done(function (response) {
        if (response.code === 200 && response.message === "SUCCESS") {
            let data = response.data;
            console.log("modul generate token berhasil " + data.accessToken);
            $("#GenerateToken").val(data.accessToken)
        } else {
            console.log("modul generate token gagal " + data.accessToken);
            swal(
                '',
                'Generate Token Failed !',
                'error'
            ).then(function () {
                return false;
            });
            return false;
        }
    });
}


