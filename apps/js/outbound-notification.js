$(document).ready(() => {
    //$("#hd_sessionLogin").val("101010")
    const session_id = $("#Extension").val();
    DropCounting(session_id)

    socket.on("event-bri", (header_id, datas) => {
        console.log("socketeventbrioutboundnotificaton", header_id, datas, session_id);
        if (header_id == session_id) {
            notifyEPIC(datas.NotifTitle, datas.NotifBody);
            $("#dropcall").addClass("d-none")
            $("#dialcall").removeClass("d-none")
            //DropCounting(session_id)
            //SubmitDetail(session_id)
        }
    });

    function notifyEPIC(
        title,
        body,
        icon = "https://www.uidesk.id/wp-content/uploads/2020/06/woke.png"
    ) {
        console.log("notifyEPIC", title, body)
        if (!window.Notification) {
            console.log("Browser does not support notifications.");
        } else {
            // check if permission is already granted
            if (Notification.permission === "granted") {
                // show notification here
                var notify = new Notification(title, {
                    body: body,
                    icon: icon,
                });
            } else {
                // request permission from user
                Notification.requestPermission()
                    .then(function (p) {
                        if (p === "granted") {
                            // show notification here
                            var notify = new Notification(title, {
                                body: body,
                                icon: icon,
                            });
                        } else {
                            console.log("User blocked notifications.");
                        }
                    })
                    .catch(function (err) {
                        console.error(err);
                    });
            }
        }
    }

    function DropCounting(val) {
        $.ajax({
            type: "POST",
            url: "asmx/Out_TrxTaskboard.asmx/SimpanEPIC",
            data: "{UserName:'" + val + "', Telepon:'0', Action:'SELECT'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {

                var json = JSON.parse(data.d);
                var i, x, result = "";

                console.log(json);
                console.log(json.length);

                if (json.length == 0) {
                    console.log("Data not found " + i);
                } else {
                    console.log(json.length);
                    //alert("1")
                    $("#dropcall").addClass("d-none")
                    $("#dialcall").removeClass("d-none")

                    var form_data = JSON.stringify({
                        UserName: val, Telepon: "0", Action: "DELETE"
                    });
                    $.ajax({
                        url: "asmx/Out_TrxTaskboard.asmx/SimpanEPIC",
                        method: "POST",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        data: form_data,
                        success: function () {
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
                
            },
            error: function (xmlHttpRequest, textStatus, errorThrown) {
                console.log(xmlHttpRequest.responseText);
                console.log(textStatus);
                console.log(errorThrown);
            }
        })
    }
});