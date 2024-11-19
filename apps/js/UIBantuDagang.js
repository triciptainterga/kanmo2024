$(document).ready(function () {

});
function SubmitOrderID() {
    cleansingobjectorderid();
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
                $("#TokenBD").val(json[i].TrxmsgSystem)
            }
            SubmitOrderBantuDagang($("#TokenBD").val())
        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
 async function SubmitOrderBantuDagang(Token) { 
    var settings = {
        "url": "https://partner-api.bantudagang.com/order/detail?ref_id=" + $("#OrderID").val() + "",
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Authorization": "Bearer " + Token + ""
        },
    };
     $.ajax(settings).done(function (response) {

         $("#DivOrderView").css("display", "block");
         $("#chatView").css("display", "none");
        console.log("response submit order id:", response);
        if (response.code === 200 && response.message === "SUCCESS") {
            let data = response.data;

            console.log("Order Code:", data.order_code);
            console.log("Invoice No:", data.invoice_no);
            console.log("Marketplace Buyer ID:", data.mp_buyer_id);
            console.log("Store Code:", data.store_code);
            console.log("Marketplace:", data.marketplace);
            console.log("Total Product:", data.total_product);
            console.log("Total Quantity:", data.total_qty);
            console.log("Order Date:", data.order_date);
            console.log("Payment Date:", data.payment_date);
            console.log("Is COD:", data.is_cod);
            console.log("Is Dropship:", data.is_dropship);
            console.log("Cancel Reason:", data.cancel_reason);
            console.log("Store Name:", data.store.store_name);

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

            console.log("Order Shipping:");
            console.log("  Courier Name:", data.order_shipping.courier_name);
            console.log("  Courier Service Name:", data.order_shipping.courier_service_name);
            console.log("  Destination Address:", data.order_shipping.destination_address);
            console.log("  Destination City:", data.order_shipping.destination_city);
            console.log("  Destination District:", data.order_shipping.destination_district);
            console.log("  Destination Name:", data.order_shipping.destination_name);
            console.log("  Destination Phone:", data.order_shipping.destination_phone);
            console.log("  Destination Postal Code:", data.order_shipping.destination_postal_code);
            console.log("  Destination Province:", data.order_shipping.destination_province);

            console.log("Order Status:");
            console.log("  Status:", data.order_status.status);
            console.log("  Name:", data.order_status.name);

            console.log("Order Products:");

            $('#productnames').empty();
            data.order_products.forEach(function (product, index) {
                console.log(`  Product ${index + 1}:`);
                console.log("    Product Name:", product.product_name);
                console.log("    SKU:", product.sku);
                console.log("    Price:", product.price);
                console.log("    Quantity:", product.qty);
                console.log("    Subtotal:", product.subtotal);
                console.log("    Notes:", product.notes);
                console.log("    Image URL:", product.image_url);
                console.log("    Variant Name:", product.variant_name);
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
                    "<tr><td></td><td></td><td style='width:300px;'>" + urlproductimage +"</td></tr></table></div></div>"

                $('#productnames').append(invoicestatus);
            });

        } 
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error("Request failed: " + textStatus + ", " + errorThrown);
        console.error("Response Request failed: " + jqXHR.responseText);
        var responseObject = JSON.parse(jqXHR.responseText);
        if (responseObject.code == "404") {
            $("#DivOrderView").css("display", "none");
            swal(
                '',
                'Data Order Not Found !',
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
                $("#TokenBD").val(json[i].TrxmsgSystem)
            }
            SubmitChatBantuDagang($("#TokenBD").val())
        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
async function SubmitChatBantuDagang(Token) {
   
    var apiUrl = "https://partner-api.bantudagang.com/chat/detail?ref_id=" + $("#ChatID").val() + "";
    $.ajax({
        url: apiUrl,
        method: "GET",
        headers: {
            "Authorization": "Bearer " + Token + ""
        }
    }).done(function (response) {

        $("#chatView").css("display", "block");
        $("#DivOrderView").css("display", "none");
        try {
            console.log("response data chat " + response.data)
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
                $("#TokenBD").val(json[i].TrxmsgSystem)
            }
            SubmitOrderID()

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
        message =  "<div class='box'><div class='box-body'><table class='table table-lg table-striped'><tr><td>Status</td><td>:</td><td>" + data.invoice.status + "</td></tr>" +
            "<tr><td>No</td><td>:</td><td>" + data.invoice.invoice_no + "</td></tr>" +
            "<tr><td>Total</td><td>:</td><td>" + data.invoice.total_purchase + "</td></tr>" +
            "<tr><td>Payment Date</td><td>:</td><td>" + data.invoice.payment_date + "</td></tr>" +
            "<tr><td>City</td><td>:</td><td>" + data.invoice.city + "</td></tr>" +
            "<tr><td>Province</td><td>:</td><td>" + data.invoice.province + "</td></tr>" +
            "<tr><td>Courier Name</td><td>:</td><td>" + data.invoice.courier_name + "</td></tr>" +
            "<tr><td>Courier Service_name</td><td>:</td><td>" + data.invoice.courier_service_name + "</td></tr>" +
            "<tr><td>Courier Ref</td><td>:</td><td>" + data.invoice.courier_ref + "</td></tr>" +
            "<tr><td>Destination Name</td><td>:</td><td>" + data.invoice.destination_name + "</td></tr>" +
            "<tr><td>Product Image</td><td>:</td><td>" + invoiceproductimage + "</td></tr></table></div></div>"
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
        '<span class="text-extra-small text-muted" style="font-size:8px;color:white;">' + TimeChatNya +'</span>' +
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
//function SubmitChatID() {
//    $("#chatView").css("display", "block");
//    var settings = {
//        url: "https://partner-api.bantudagang.com/chat/detail?ref_id=" + $("#ChatID").val() + "",
//        //url: "http://localhost/Reseller/apps/asmx/json/ChatDetail.json",
//        method: "GET",
//        timeout: 0,
//        headers: {
//            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZ2VudF9pZCI6NDA1MSwidXNlcl9pZCI6MjA3MywiYWNjb3VudF9pZCI6Mzg3MCwibmFtZSI6IlVJRGVzayIsImVtYWlsIjoic2EtMjA3My1GWUdUSi4xNzE2NzgxNDYyQGlhbS5iYW50dWRhZ2FuZy5jb20iLCJhZ2VudF90eXBlIjoic2VydmljZV9hY2NvdW50Iiwic3RvcmVfcmVzdHJpY3RlZCI6MCwic3RvcmVzIjpbIlRLUEQtNjg1NzY0MyIsIlRLUEQtNzk4NTA2MiIsIlNIUEUtNjQ4NzQ5OTIiLCJTSFBFLTYxNTE2MjA3IiwiTFpEQS0yNTE4OSIsIlRLUEQtODEwMjU0MSIsIlNIUEUtMjgyMDQ5NjIxIiwiVEtQRC0xMTU2MDcwMyIsIlRLUEQtOTk1Nzc5MCIsIlRLUEQtOTI4Njk2NSIsIlRLUEQtNjA5MDk2MiIsIlRLUEQtOTE3MzgwOSIsIlRLUEQtMTMzMTkxMDMiLCJUS1BELTEyMDk1MDY2IiwiVEtQRC0xMzgyNDM3MSIsIlRLUEQtODMyODkzMSIsIlNIUEUtODU0NzM5NjAiLCJUS1BELTEzMTQ3NDE0IiwiU0hQRS05NzI5MTE0NSIsIlRLUEQtODkyMzc4MyIsIlNIUEUtMTE3OTI1Njk0IiwiVEtQRC0zODU5NjAxIiwiU0hQRS0yMjU3MTA2MTYiLCJTSFBFLTIyMTYwMjYxOSIsIlRLUEQtNzE2NjgwMSIsIlNIUEUtMzI1MjQwNTU2IiwiVEtQRC05NzMxNjAzIiwiVEtQRC0xNDQzNjAwNiIsIlNIUEUtMjQyNTg2MDg3IiwiU0hQRS0yNDAyMjk3NjIiLCJUS1BELTExMTM5MDg1IiwiU0hQRS0zMjgyODQ3NDIiLCJTSFBFLTI4MTk0MjU2MyIsIlNIUEUtMzczNTQwNjg3IiwiU0hQRS0yOTQ5MzQyNDAiLCJTSFBFLTQ3NDU1OTQ1NCIsIlNIUEUtMzc0OTI3OTQzIiwiVEtQRC0xNTUwOTM4OCIsIlNIUEUtNDIxNjUzODc1IiwiVEtQRC0xNTY1NTYyMCIsIlNIUEUtNzE5MTg4NDc4IiwiVEtQRC0xNTYwNzgyOCIsIlNIUEUtNzc4MDYzOTA3IiwiU0hQRS05OTYyNTMxNDQiLCJTSFBFLTk3MDEzNTY4MSIsIlNIUEUtODg2MTkyNzA5IiwiTFpEQS00MDExOTU5MjAxOTEiLCJMWkRBLTQwMTE5NTU1Mjg4MiIsIkxaREEtNDAxMTk2MDQ4Mzc2IiwiTFpEQS00MDExOTU5Njg0NzEiLCJMWkRBLTQwMTE5NTYzMjk4NSIsIkxaREEtNDAwNjExNjA2MjA2IiwiVEtQRC0xNjI2NDEwOCIsIlNIUEUtMzIyNjIwNzM3IiwiTFpEQS00MDE3ODA1MjgzNjciLCJMWkRBLTQwMTYyNzAwODc1NyIsIlRLUEQtNDkyNjYxMSIsIlRLUEQtMTEwMjc5MTgiLCJUS1BELTgxNzQ2MTQiLCJTSFBFLTQxOTI1NzE0MSIsIlNIUEUtMTA1ODc0NTAwNiIsIlNIUEUtOTgwMDg4MTUzIiwiTFpEQS00MDE0NTMyNDgwMTAiLCJMWkRBLTQwMDcwNzAzOTY5NiIsIkxaREEtNDAxNjEwMTkyMzgzIiwiTFpEQS00MDE1OTIwMTYwMTQiLCJMWkRBLTQwMTE5NjU0NDI3MSIsIkxaREEtNDAxMTk2NTYwMTYxIiwiTFpEQS00MDA1OTA1MTY0MjAiLCJUS1RLLTc0OTQ3NTM1MDMwMzg1MDc3MzQiLCJUS1BELTE3Mjk5ODEwIiwiU0hQRS0xMjAyMDg2MTk4IiwiTFpEQS00MDE5MDEwODg2MjciLCJUS1RLLTc0OTQ2MDMzNDAzMDM5Mjc0OTEiXSwicHJpdmlsZWdlIjpbXSwibWVtYmVyc2hpcCI6eyJwYWNrYWdlX25hbWUiOiJQUk8iLCJtZW1iZXJzaGlwX2VuZCI6IjIwMjQtMDYtMzBUMTc6MDA6MDAuMDAwWiIsImFjdGl2ZSI6MSwibWF4X3N0b3JlIjo3NiwibWF4X2VtcGxveWVlIjoxNywibWF4X29yZGVyIjotMSwib3JkZXJfbXRkIjowfSwiYWdlbnRfYWxpYXMiOiIiLCJzZXNzaW9uX2VuZCI6IjIwMjQtMDctMjYgMTQ6NTY6NDEiLCJpYXQiOjE3MTY4MjE4MDEsImV4cCI6MTcxNjgyNTQwMX0.j9div1ZZIF7A2UHhXlMPcTxJnnkkpOAJr-R50cR_vl4"
//        },
//    };

//    $.ajax(settings)
//        .done(function (response) {

//            try {
//                // Check if response.chatDetails exists and is an array
                
//                if (response && response.data && Array.isArray(response.data)) {
//                    // Clear existing chat content

//                    console.log("Response: ", response); // Log the entire response object
//                    $('#chatView .chat-box-one2').empty();
//                    var chatHTML = ""
//                    var Header = '<p class="mt-0 px-30 bt-1 py-5 bg-light">' +
//                        '<img src="../images/bd/lazada.png" height="28">' +
//                        '' + response.data.Marketplace + ' | <i class="fa fa-calendar"></i>Last Seen 10:30pm ago' +
//                        '</p>'

//                    console.log("response.data.marketplace " + response.data.marketplace)
//                    // Loop through each chat detail in response.chatDetails
//                    response.data.forEach(function (data) {
//                        // Assuming each chatDetail contains necessary data for generating HTML elements
//                        console.log("Response Data forEach: ", data.msg); // Log the entire response object
//                        console.log("Response Data forEach: ", data.marketplace); // Log the entire response object
//                        // Generate HTML for chat message
                                                                   
//                        if (data.marketplace == "tokopedia") {
//                            var marketplace_image = "tokopedia.png"
//                        } else if (data.marketplace == "shopee"){
//                            var marketplace_image = "shopee.png"
//                        } else if (data.marketplace == "lazada"){
//                            var marketplace_image = "lazada.png"
//                        } else {
//                            var marketplace_image = "tokopedia.png"
//                        }
//                        if (data.type == "invoice") {
//                            var invoicestatus = "<div class='box'><div class='box-body'><table class='table table-lg table-striped'><tr><td>Status</td><td>:</td><td>" + data.invoice.status + "</td></tr>" +
//                                "<tr><td>No</td><td>:</td><td>" + data.invoice.invoice_no + "</td></tr>" +
//                                "<tr><td>Total</td><td>:</td><td>" + data.invoice.total_purchase + "</td></tr>" +
//                                "<tr><td>Payment Date</td><td>:</td><td>" + data.invoice.payment_date + "</td></tr>" +
//                                "<tr><td>City</td><td>:</td><td>" + data.invoice.city + "</td></tr>" +
//                                "<tr><td>Province</td><td>:</td><td>" + data.invoice.province + "</td></tr>" +
//                                "<tr><td>Courier Name</td><td>:</td><td>" + data.invoice.courier_name + "</td></tr>" +
//                                "<tr><td>Courier Service_name</td><td>:</td><td>" + data.invoice.courier_service_name + "</td></tr>" +
//                                "<tr><td>Courier Ref</td><td>:</td><td>" + data.invoice.courier_ref + "</td></tr>" +
//                                "<tr><td>Destination Name</td><td>:</td><td>" + data.invoice.destination_name + "</td></tr>" +
//                                "<tr><td>Product Image</td><td>:</td><td><img src=" + data.invoice.product_image + " style='width:50px;'></image></td></tr></table></div></div>"
//                            var productNya = ""
//                            var MessageData = "" + data.msg + ""
//                        } else if (data.type == "product") {
//                            var invoicestatus = ""
//                            //var productNya = "<table style='font-size:10px;' class='border-warning'><tr><td style='width:150px'>Status</td><td>:</td><td>" + data.product.name + "</td></tr>" +
//                            //    "<tr><td style='width:150px'>No</td><td>:</td><td>" + data.product.price + "</td></tr>" +
//                            //    "<tr><td colspan='3'><img src=" + data.product.image_url + " style='width:50px;'></image></td></tr></table>"
//                            var productNya = "<div class='attachment-block clearfix' style='font-size:10px;'>" +
//                                "<img class='attachment-img' src=" + data.product.image_url + ">" +
//                                "<div class='attachment-pushed'>" +
//                                    "<div>" +
//                                    "<div>" +
//                                "<span>" + data.product.name + "</span>" +
//                                    "</div>" +
//                                "<div>" + data.product.price + "</div>" +
//                                    "</div>" +
//                                    "</div>" +
//                                "</div>"
//                            var MessageData = "" + data.msg + ""
//                        } else if (data.type == "text") {
//                            var invoicestatus = ""
//                            if (data.type == "product") {
//                                //var productNya = "<table style='font-size:10px;' class='border-warning'><tr><td style='width:150px'>Status</td><td>:</td><td>" + data.context_message.product.name + "</td></tr>" +
//                                //    "<tr><td style='width:150px'>No</td><td>:</td><td>" + data.context_message.product.price + "</td></tr>" +
//                                //    "<tr><td style='width:150px'>Payment Date</td><td>:</td><td><img src=" + data.context_message.product.image_url + " style='width:50px;'></image></td></tr></table>"
//                                var productNya = "<div class='attachment-block clearfix' style='font-size:10px;'>" +
//                                    "<img class='attachment-img' src=" + data.context_message.product.image_url + ">" +
//                                    "<div class='attachment-pushed'>" +
//                                    "<div>" +
//                                    "<div>" +
//                                    "<span>" + data.context_message.product.name + "</span>" +
//                                    "</div>" +
//                                    "<div>" + data.context_message.product.price + "</div>" +
//                                    "</div>" +
//                                    "</div>" +
//                                    "</div>"
//                            } else {
//                                var productNya = ""
//                            }
//                            var MessageData = "" + data.msg +""
//                        } else if (data.type == "item_list") {
//                            var invoicestatus = ""
//                            var productNya = ""
//                            var MessageData = "<a href=" + data.media_url + "><img class='attachment-img' src='" + data.media_url + "'/></a>"
//                        } else if (data.type == "faq_liveagent") {
//                            var invoicestatus = ""
//                            var productNya = ""
//                            var MessageData = "<a href=" + data.media_url + "><img class='attachment-img' src='" + data.media_url + "'/></a>"
//                        } else if (data.type == "sticker") {
//                            var invoicestatus = ""
//                            var productNya = ""
//                            var MessageData = "<a href=" + data.media_url + "><img class='attachment-img' src='" + data.media_url + "'/></a>"
//                        } else if (data.type == "image") {
//                            var invoicestatus = ""
//                            var productNya = ""
//                            var MessageData = "<a href=" + data.media_url + "><img class='attachment-img' src='" + data.media_url + "'/></a>"
//                        } else if (data.type == "video") {
//                            var invoicestatus = ""
//                            var productNya = ""
//                            //var MessageData = "<a href=" + data.msg + ">" + data.msg + "</a>"
//                            var MessageData = "<div class='ytp-cued-thumbnail-overlay'><a href=" + data.msg + " target='_blank''><video width='150px' height='50px'><source src='" + data.msg + "' type='video/mp4'></video></a></div>"
//                            //var MessageData = "<div class='attachment-block clearfix' style='font-size:10px;'>" +
//                            //    "<a href=" + data.msg + " target='_blank' class='waves-effect waves-circle btn btn-circle mr-10 btn-outline-secondary bg-warning'><img class='attachment-img' src='" + data.msg + "'/></a>" +
//                            //    "<div class='attachment-pushed'>" +
//                            //    "<div>" +
//                            //    "<div>" +
//                            //    //"<span>" + data.context_message.product.name + "</span>" +
//                            //    "</div>" +
//                            //    //"<div>" + data.context_message.product.price + "</div>" +
//                            //    "</div>" +
//                            //    "</div>" +
//                            //    "</div>"
//                        } else {
//                            var invoicestatus = ""
//                            var productNya = ""
//                            var MessageData = ""
//                        }
//                        if (data.is_opposite == true) {
//                            var floatscr = "left"
//                            var bgscr = "lighter"
//                            var chatscr = "left"
//                            var flag = "Customer"
//                            console.log(data.is_opposite)
//                        } else {
//                            var floatscr = "right"
//                            var bgscr = "primary"
//                            var chatscr = "right"
//                            var flag = "Agent"
//                            console.log(data.is_opposite)
//                        }                       
//                        chatHTML =
//                            '<div class="box-body">' +
//                            '<div class="chat-box-one2">' +
//                            '<div class="card d-inline-block mb-3 float-' + floatscr + ' mr-2 no-shadow bg-' + bgscr +' max-w-p80">' +
//                            '<div class="position-absolute pt-1 pr-2 r-0">' +
//                            '<span class="text-extra-small text-muted">09:25</span>' +
//                            '</div>' +
//                            '<div class="card-body">' +
//                            '<div class="d-flex flex-row pb-2">' +
//                            '<a class="d-flex" href="#">' +
//                            '<img alt="Profile" src="../Images/bd/' + marketplace_image + '" class="avatar mr-10">' +
//                            '</a>' +
//                            '<div class="d-flex flex-grow-1 min-width-zero">' +
//                            '<div class="m-2 pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between">' +
//                            '<div class="min-width-zero">' +
//                            '<p class="mb-0 font-size-16 text-dark">' + flag + '</p>' +
//                            '</div>' +
//                            '</div>' +
//                            '</div>' +
//                            '</div>' +
//                            '<div class="chat-text-'+ chatscr +' pl-55">' +
//                            '<p class="mb-0 text-semi-muted">' + MessageData + '</p>' +
//                            '<p class="mb-0 text-semi-muted">' + productNya + '</p>' +
//                            '</div>' +
//                            '</br>' +
//                            '<p class="mb-0 text-semi-muted">' + invoicestatus + '</p>' +
//                            '</div>' +
//                            '</div>' +
//                            '<div class="clearfix"></div>' +
//                            '</div>' +
//                            '</div>' 
//                        // Append chat HTML to the chat box
//                        $('#chatView').append(chatHTML);
//                        //console.log("chatHTML" + chatHTML)
//                    });
//                    /* $('#chatView').append(Header + "</br>" + chatHTML);*/
//                    console.log("chatHTML" + chatHTML)
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

