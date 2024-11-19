$(document).ready(() => {
const session_id = $("#hd_sessionLogin").val();
SubmitCounting(session_id)
SubmitDetail(session_id)

socket.on("event-bri", (header_id, datas) => {
    //console.log(header_id, datas, session_id);
    console.log("socketeventbridesktopnotificaton", header_id, datas, session_id);
  if (header_id == session_id) {
    notifyMe(datas.NotifTitle, datas.NotifBody);
    SubmitCounting(session_id)
    SubmitDetail(session_id)
  }
});

function notifyMe(
  title,
  body,
  icon = "https://www.uidesk.id/wp-content/uploads/2020/06/woke.png"
) {
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

function SubmitCounting(val) {
    $.ajax({
        type: "POST",
        url: "asmx/TrmMailSystem.asmx/DataNotifikasiEmail",
        data: "{UserName:'" + val + "', Action:'count'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "";
            console.log(json);

            for (i = 0; i < json.length; i++) {

                $('#notif_counter').text(json[i].EmailRead)

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function SubmitDetail(val) {
    $.ajax({
        type: "POST",
        url: "asmx/TrmMailSystem.asmx/DataNotifikasiEmail",
        data: "{UserName:'" + val + "', Action:'detail'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $('.notifications-menu ul.menu').html("");

            var json = JSON.parse(data.d);
            var i, x, result = "";
            console.log(json);

            for (i = 0; i < json.length; i++) {
                $('.notifications-menu ul.menu').prepend(`<li>
                                                            <a href="#">
                                                                <i class="fa fa-envelope-open-o text-warning"></i>${json[i].EFROM}
                                                            </a>
                                                        </li>`);

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