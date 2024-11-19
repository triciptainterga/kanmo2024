$(document).ready(function () {
    //alert("test")
    $("#LoaderPageCounting").hide();
    getWS_2_taskboard();
    getWS_DataTableTaskboard();  
});
function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
function getWS_2_taskboard() {
    var ValUserID = $("#hd_sessionLogin").val();
    var ValLayerID = $("#TrxLoginTypeAngka").val();
    var ValSpv = $("#TrxLayerUser").val();
    var result = "";
    var messageDiv = $('#2_TampungKotakAtas');
    $.ajax({
        type: "POST",
        url: "asmx/ServiceTaskboard.asmx/ws_2_taskboard",
        data: "{UserID: '" + ValUserID + "',LayerID: '" + ValLayerID + "',Spv: '" + ValSpv + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x = "";
            messageDiv.empty();
            for (i = 0; i < json.length; i++) {
                //alert(json[i].JumlahData);
                result = '<div class="col-lg-3 col-6"> ' +
                    '<a class="box box-link-shadow text-center" href="2_taskboard.aspx?status=' + json[i].StatusData + '&mid=' + getParameterByName("mid") + '&smid=' + getParameterByName("smid") + '"> ' +
                    '<div class="box-body"> ' +
                    '<div class="font-size-24">' + json[i].JumlahData + '</div> ' +
                    '<span>' + json[i].StatusData + '</span> ' +
                    '</div> ' +
                    '<div class="box-body ' + json[i].statusColor + '"> ' +
                    '<center> ' +
                    '<span class="mdi ' + json[i].statusIcon + ' font-size-30"></span> ' +
                    '</center> ' +
                    '</div> ' +
                    '</a> ' +
                    '</div>';

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
function getWS_DataTableTaskboard() {
    $("#LoaderPageCounting").show();
    var TrxUserName = $("#hd_sessionLogin").val();
    var TrxLoginTypeAngka = $("#TrxLoginTypeAngka").val();
    var TrxDivisi = $("#TrxDivisi").val();
    var TrxStatus = getParameterByName("status");
    var result = "";
    var myTaskboardTicket = $('#TaskboardTicket').DataTable({
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
    //var myTaskboardTicket = $('#TaskboardTicket').DataTable(
    //    {
    //        "order": [[7, "Desc"]],
    //        "destroy": true,
    //    },
    //);
    //$.fn.dataTable.ext.errMode = 'none';
    $.ajax({
        type: "POST",
        url: "asmx/ServiceTaskboard.asmx/DataTableTaskboard",
        data: "{TrxUserName: '" + TrxUserName + "',TrxLoginTypeAngka: '" + TrxLoginTypeAngka + "',TrxDivisi: '" + TrxDivisi + "',TrxStatus: '" + TrxStatus + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x = "";

            //messageDiv.empty();
            myTaskboardTicket.clear().draw();
            if (json.length == 0) {
                console.log("Data not found " + i);
            } else {
                for (i = 0; i < json.length; i++) {
                    var urlAction = "<div class='dropdown'>" +
                        "<a data-toggle='dropdown' href='#'><i class='ti-more-alt rotate-90 text-black'></i></a>" +
                        "<div class='dropdown-menu dropdown-menu-right'>" +
                        "<a class='dropdown-item' href='#' onclick=OrderID('" + encodeData(json[i].TicketNumber) + "')><i class='fa fa-plus'></i> Order ID</a>" +
                        "<div class='dropdown-divider'></div>" +
                        "<a class='dropdown-item' href='1_journey_new.aspx?ticketid=" + json[i].TicketNumber + "&numberid=0&threadid=0&status=" + json[i].Status + "'><i class='si-arrow-right-circle si'></i> Follow up</a>" +
                        "</div>" +
                        "</div>"
                    //alert(json[i].TrxID);

                    //if (json[i].datecreate == "null") {
                    //var ConverTanggal = "-";
                    //} else {
                    var d = new Date(json[i].datecreate);
                    var milisegundos = parseInt(json[i].datecreate.replace("/Date(", "").replace(")/", ""));
                    var newDate = new Date(milisegundos).toLocaleDateString("en-UE");
                    var newTime = new Date(milisegundos).toLocaleTimeString("en-UE");
                    var ConverTanggal = newDate + ' ' + newTime
                    //}
                    //var urlAction = "<a href='1_journey_new.aspx?ticketid=" + json[i].TicketNumber + "'><i class='si-arrow-right-circle si'></i></a>"
                    if (json[i].Status == "Open") {
                        var TrxParam = "<span class='badge badge-pill badge-primary' style='width: 70px;'>" + json[i].Status + "</span>"
                    } else if (json[i].Status == "Pending") {
                        var TrxParam = "<span class='badge badge-pill badge-warning' style='width: 70px;'>" + json[i].Status + "</span>"
                    } else if (json[i].Status == "In progress") {
                        var TrxParam = "<span class='badge badge-pill badge-success' style='width: 70px;'>" + json[i].Status + "</span>"
                    } else if (json[i].Status == "Closed") {
                        var TrxParam = "<span class='badge badge-pill badge-danger' style='width: 70px;'>" + json[i].Status + "</span>"
                    }
                    if (json[i].TicketPosition == "1") {
                        var TrxPosition = "Layer 1"
                    } else if (json[i].TicketPosition == "2") {
                        var TrxPosition = "Layer 2"
                    } else if (json[i].TicketPosition == "3") {
                        var TrxPosition = "Layer 3"
                    } else if (json[i].TicketPosition == "4") {
                        var TrxPosition = "Eksternal/Vendor"
                    }
                    myTaskboardTicket.row.add([json[i].NumberRow, json[i].TicketNumber, json[i].NamePIC, json[i].CategoryName, json[i].SLA, json[i].UsedDaySLAOK, TrxPosition, json[i].AgentName, json[i].DepartmentName, TrxParam, ConverTanggal, urlAction]).draw(false);

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
}
function encodeData(s) {
    return encodeURIComponent(s).replace(/\-/g, "%2D").replace(/\_/g, "%5F").replace(/\./g, "%2E").replace(/\!/g, "%21").replace(/\~/g, "%7E").replace(/\*/g, "%2A").replace(/\'/g, "%27").replace(/\(/g, "%28").replace(/\)/g, "%29");
}
function showInternalNote(id) {
    $("#InternalNote").val("");
    $("#ContentPlaceHolder1_TrxTicketID").val(id);
    $("#modal-center").modal('show');
    console.log("session : " + $("#hd_sessionLogin").val());
    console.log("TrxTicketNumber : " + id);
}
function ActionInternalNote() {
    var TrxInternalNote = CKEDITOR.instances.InternalNote.getData();
    if (TrxInternalNote == "") {
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
    swal({
        title: "Do you want to process?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {

                var form_data = JSON.stringify({ TrxUserName: $("#hd_sessionLogin").val(), TrxTicketNumber: $("#ContentPlaceHolder1_TrxTicketID").val(), TrxInternalNote: encodeData(TrxInternalNote) });
                console.log("form_data : " + form_data);
                $.ajax({
                    url: "asmx/ServiceTaskboard.asmx/InsertNoteInternal",
                    method: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    //data: "{ TrxUsername: '" + TrxUsername + "', TrxCustomerID: '" + TrxCustomerID + "',TxtThreadID: '" + TxtThreadID + "',TxtAccount: '" + TxtAccount + "',TrxPelapor: '" + TrxPelapor + "',TrxPelaporEmail: '" + TrxPelaporEmail + "',TrxPelaporPhone: '" + TrxPelaporPhone + "',TrxPelaporAddress: '" + encodeData(TrxPelaporAddress) + "',TrxKejadian: '" + TrxKejadian + "',TrxPenyebab: '" + TrxPenyebab + "',TrxPenerimaPengaduan: '" + TrxPenerimaPengaduan + "',TrxStatusPelapor: '" + TrxStatusPelapor + "',TrxSkalaPrioritas: '" + TrxSkalaPrioritas + "',TrxJenisNasabah: '" + TrxJenisNasabah + "',TrxNomorRekening: '" + TrxNomorRekening + "',TrxSumberInformasi: '" + TrxSumberInformasi + "',TrxCategory: '" + TrxCategory + "',TrxLevel1: '" + TrxLevel1 + "',TrxLevel2: '" + TrxLevel2 + "',TrxLevel3: '" + TrxLevel3 + "',TrxComplaint: '" + encodeData(TrxComplaint) + "',TrxResponse: '" + encodeData(TrxResponse) + "',TrxChannel: '" + TrxChannel + "',TrxStatus: '" + TrxStatus + "',TrxEskalasi: '" + TrxEskalasi + "',TrxSLA: '" + TrxSLA + "',TrxExtendCategory: '" + TrxExtendCategory + "',TrxLayer: '" + TrxLayer + "',TrxThreadID:'" + TxtThreadID + "', TrxGenesysID:'" + TrxGenesysID + "', TxtContactID:'" + TxtContactID + "'}",
                    data: form_data,
                    success: function () {
                        console.log("Function ActionInternalNote : " + form_data)
                        var TrxMessage = 'Your data <b>internal note</b> has been save'
                        AutoValidasiSuccess($("#hd_sessionLogin").val(), TrxMessage);
                        $("#modal-center").modal('hide');
                    },
                    error: function (xmlHttpRequest, textStatus, errorThrown) {
                        console.log(xmlHttpRequest.responseText);
                        console.log(textStatus);
                        console.log(errorThrown);
                    },
                    complete: function () {

                    }
                });

                swal("save data has been success", {
                    icon: "success",
                });

            } else {
                //swal("Your imaginary file is safe!");
                $("#modal-center").modal('hide');
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
}
function OrderID(ID) {
    $("#Order_ID").val("");
    $("#modal-order").modal('show');
    $("#ContentPlaceHolder1_TrxTicketID").val(ID);
}
function ActionOrderID() {
    if ($("#Order_ID").val() == "") {
        swal(
            '',
            'Order id is empty',
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

                var form_data = JSON.stringify({
                    TicketNumber: $("#ContentPlaceHolder1_TrxTicketID").val(), OrderID: $("#Order_ID").val(), UserName: $("#hd_sessionLogin").val()
                });
                $.ajax({
                    url: "asmx/ServiceTaskboard.asmx/TicketOrderID",
                    method: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: form_data,
                    success: function (data) {
                        var json = JSON.parse(data.d);
                        var i, x = "";
                        var result = "";

                        for (i = 0; i < json.length; i++) {
                            if (json[i].Result == "True") {
                                swal(
                                    '',
                                    '' + json[i].msgSystem +'',
                                    'success'
                                ).then(function () {
                                    $("#modal-order").modal('hide');
                                });
                            } else {
                                swal(
                                    '',
                                    '' + json[i].msgSystem +'',
                                    'error'
                                ).then(function () {
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
//function SubmitOrderID() {
//    $.ajax({
//        url: 'https://private-anon-8ec2dfef72-bantudagangapi.apiary-mock.com/order/detail?order_ref_id=240520SRTS1XQ3',
//        method: 'GET',
//        dataType: 'text', // Receive the response as text
//        success: function (response) {
//            try {
//                // Use eval() to parse the JSON response
//                var data = eval('(' + response + ')');

//                // Now you can access the data
//                console.log(data.code); // 200
//                console.log(data.message); // "SUCCESS"
//                console.log(data.data.data.marketplace)
//                console.log(data.data.data.order_shipping.destination_name)
//                // Access other properties as needed
//            } catch (error) {
//                console.error('Error parsing JSON:', error);
//            }
//        },
//        error: function (jqXHR, textStatus, errorThrown) {
//            console.error('Error:', textStatus, errorThrown);
//        }
//    });
//}

//function SubmitChatID() {
//    var settings = {
//        url: "https://private-anon-8ec2dfef72-bantudagangapi.apiary-mock.com/chat/detail?ref_id=",
//        method: "GET",
//        timeout: 0,
//    };

//    $.ajax(settings)
//        .done(function (response) {
//            try {
//                console.log("Response:", response); // Log the entire response object

//                // Check if the response contains the expected data structure
//                if (response && Array.isArray(response.data) && response.data.length > 0) {
//                    // Access the first message
//                    var firstMessage = response.data[0].message;
//                    console.log("First message:", firstMessage);

//                    // Access the first reply_id (or any other property)
//                    var reply_id = response.data[0].reply_id;
//                    var marketplace = response.data[0].marketplace;
//                    var is_opposite = response.data[0].is_opposite;
//                    var msg = response.data[0].msg;
//                    var reply_time = response.data[0].reply_time;
//                    var read_status = response.data[0].read_status;
//                    var type = response.data[0].type;
//                    var status = response.data[0].invoice.status;
//                    var invoice_no = response.data[0].invoice.invoice_no;
//                    var total_purchase = response.data[0].invoice.total_purchase;
//                    var payment_date = response.data[0].invoice.payment_date;
//                    var city = response.data[0].invoice.city;
//                    var province = response.data[0].invoice.province;
//                    var courier_name = response.data[0].invoice.courier_name;
//                    var city = response.data[0].invoice.city;
//                    var city = response.data[0].invoice.city;
//                    console.log("First reply_id:", reply_id);
//                    console.log("First marketplace:", marketplace);
//                    console.log("First is_opposite:", is_opposite);
//                    console.log("First msg:", msg);
//                    console.log("First reply_time:", reply_time);
//                    console.log("First read_status:", read_status);
//                    console.log("First type:", type);
//                    console.log("First status:", status);
//                    //console.log("First marketplace:", marketplace);
//                    //console.log("First reply_id:", reply_id);
//                    //console.log("First marketplace:", marketplace);
//                    //console.log("First marketplace:", marketplace);

//                    // You can perform further processing here based on the response data
//                } else {
//                    console.error("Response data is missing or not in the expected format.");
//                }
//            } catch (error) {
//                console.error("Error:", error);
//            }
//        })
//        .fail(function (jqXHR, textStatus, errorThrown) {
//            console.error("AJAX request failed:", textStatus, errorThrown);
//        });
//}
function ResponseSubmitChatID() {
    $.getJSON("asmx/json/ChatDetail.json", function (result) {
        // Iterate over each reply object in the 'data' array
        result.data.forEach(function (reply) {
            // Access common properties
            var replyId = reply.reply_id;
            var marketplace = reply.marketplace;
            var isOpposite = reply.is_opposite;
            var message = reply.msg;
            var replyTime = new Date(reply.reply_time);

            // Print common properties to console or display them as needed
            console.log("Reply ID:", replyId);
            console.log("Marketplace:", marketplace);
            console.log("Is Opposite:", isOpposite);
            console.log("Message:", message);
            console.log("Reply Time:", replyTime);

            // Check the type of reply and access type-specific properties
            if (reply.type === "invoice") {
                var invoiceStatus = reply.invoice.status;
                var invoiceNumber = reply.invoice.invoice_no;
                var totalPurchase = reply.invoice.total_purchase;
                // Access more properties as needed
                console.log("Invoice Status:", invoiceStatus);
                console.log("Invoice Number:", invoiceNumber);
                console.log("Total Purchase:", totalPurchase);
                // Access other properties of the invoice object as needed
            } else if (reply.type === "product") {
                var productName = reply.product.name;
                var productPrice = reply.product.price;
                var imageUrl = reply.product.image_url;
                // Access more properties as needed
                console.log("Product Name:", productName);
                console.log("Product Price:", productPrice);
                console.log("Image URL:", imageUrl);
                // Access other properties of the product object as needed
            } else if (reply.type === "text") {
                // Access properties specific to text type replies
                // For example, context_message
                var contextMessage = reply.context_message;
                // Access more properties as needed
                console.log("Context Message:", contextMessage);
            } else if (reply.type === "sticker") {
                var mediaUrl = reply.media_url;
                // Access more properties as needed
                console.log("Media URL:", mediaUrl);
            } else if (reply.type === "video") {
                // For video type replies, the message contains the URL
                var videoUrl = reply.msg;
                // Access more properties as needed
                console.log("Video URL:", videoUrl);
            }
        });
    });
}
function SubmitChatID() {
    var settings = {
        url: "https://private-anon-8ec2dfef72-bantudagangapi.apiary-mock.com/chat/detail?ref_id=",
        method: "GET",
        timeout: 0,
    };

    $.ajax(settings)
        .done(function (response) {
            try {
                console.log("Response Chat History:", response); // Log the entire response object

                // Check if the response contains the expected data structure
                if (response && Array.isArray(response.data) && response.data.length > 0) {
                    // Iterate over each chat detail
                    response.data.forEach(function (chatDetail) {
                        // Access properties common to all chat types
                        var reply_id = chatDetail.reply_id;
                        var marketplace = chatDetail.marketplace;
                        var is_opposite = chatDetail.is_opposite;
                        var msg = chatDetail.msg;
                        var reply_time = chatDetail.reply_time;
                        var type = chatDetail.type;

                        // Log common properties
                        console.log("Reply ID:", reply_id);
                        console.log("Marketplace:", marketplace);
                        console.log("Is Opposite:", is_opposite);
                        console.log("Message:", msg);
                        console.log("Reply Time:", reply_time);
                        console.log("Type:", type);

                        // Handle specific properties based on message type
                        switch (type) {
                            case "invoice":
                                var invoice_status = chatDetail.invoice.status;
                                var invoice_no = chatDetail.invoice.invoice_no;
                                var total_purchase = chatDetail.invoice.total_purchase;
                                var payment_date = chatDetail.invoice.payment_date;
                                var city = chatDetail.invoice.city;
                                var province = chatDetail.invoice.province;
                                var courier_name = chatDetail.invoice.courier_name;

                                console.log("Invoice Status:", invoice_status);
                                console.log("Invoice No:", invoice_no);
                                console.log("Total Purchase:", total_purchase);
                                console.log("Payment Date:", payment_date);
                                console.log("City:", city);
                                console.log("Province:", province);
                                console.log("Courier Name:", courier_name);
                                break;

                            case "product":
                                var product_name = chatDetail.product.name;
                                var product_price = chatDetail.product.price;
                                var image_url = chatDetail.product.image_url;

                                console.log("Product Name:", product_name);
                                console.log("Product Price:", product_price);
                                console.log("Image URL:", image_url);
                                break;

                            // Add cases for other message types as needed

                            default:
                                // Handle other message types
                                break;
                        }
                    });
                } else {
                    console.error("Response data is missing or not in the expected format.");
                }
            } catch (error) {
                console.error("Error:", error);
            }
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            console.error("AJAX request failed:", textStatus, errorThrown);
        });
}
function SubmitOrderID() {
    $.ajax({
        url: 'https://private-anon-8ec2dfef72-bantudagangapi.apiary-mock.com/order/detail?order_ref_id=240520SRTS1XQ3',
        method: 'GET',
        dataType: 'json', // Expect JSON response
        success: function (response) {
            try {
                // Access properties from the response object
                console.log('Code:', response.code);
                console.log('Message:', response.message);

                // Check if data exists in the response
                if (response.data && response.data.data) {
                    var orderData = response.data.data;

                    // Access properties from the order data
                    console.log('Order Code:', orderData.order_code);
                    console.log('Invoice No:', orderData.invoice_no);
                    console.log('Store Code:', orderData.store_code);
                    console.log('Marketplace:', orderData.marketplace);
                    console.log('Total Product:', orderData.total_product);
                    console.log('Total Quantity:', orderData.total_qty);

                    // Access order status
                    if (orderData.order_status) {
                        console.log('Order Status:', orderData.order_status.name);
                    }

                    // Access store details
                    if (orderData.store) {
                        console.log('Store Name:', orderData.store.store_name);
                    }

                    console.log('Order Date:', orderData.order_date);
                    console.log('Payment Date:', orderData.payment_date);
                    console.log('Is COD:', orderData.is_cod);
                    console.log('Is Dropship:', orderData.is_dropship);

                    // Access shipping details
                    if (orderData.order_shipping) {
                        console.log('Destination Name:', orderData.order_shipping.destination_name);
                        console.log('Destination Phone:', orderData.order_shipping.destination_phone);
                        console.log('Destination Address:', orderData.order_shipping.destination_address);
                        console.log('Destination Province:', orderData.order_shipping.destination_province);
                        console.log('Destination City:', orderData.order_shipping.destination_city);
                        console.log('Destination Postal Code:', orderData.order_shipping.destination_postal_code);
                        console.log('Courier Service Name:', orderData.order_shipping.courier_service_name);
                    }

                    // Access order products
                    if (orderData.order_products && orderData.order_products.length > 0) {
                        orderData.order_products.forEach(function (product) {
                            console.log('Product Name:', product.product_name);
                            console.log('SKU:', product.sku);
                            console.log('Price:', product.price);
                            console.log('Quantity:', product.qty);
                            console.log('Subtotal:', product.subtotal);
                            console.log('Notes:', product.notes);
                            // Access product info if available
                            if (product.product_info) {
                                console.log('Product Image:', product.product_info.image);
                                console.log('Product Variant Name:', product.product_info.variant_name);
                            }
                        });
                    }
                } else {
                    console.error('No order data found.');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error('Error:', textStatus, errorThrown);
        }
    });
}


