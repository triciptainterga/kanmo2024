$(document).ready(function () {
    AutoInsertThread();
});
function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
function AutoInsertThread() {
    var TrxUsername = $("#hd_sessionLogin").val();
    var TrxCustomerID = getParameterByName("phone");
    var TrxCallID = getParameterByName("callid");
    //var TrxCallID = $("#ContentPlaceHolder1_CallerID").val()
    if (getParameterByName("phone") == "") {
        swal(
            '',
            'Phone number is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    var TrxNumberid = "Call-" + getParameterByName("callid");
    var TrxThreadID = "-";
    var TrxChannel = "Call";
    var TrxAccount = getParameterByName("phone");
    var TrxSubject = "-";
    var form_data = JSON.stringify({ TrxUsername: TrxUsername, TrxCustomerID: TrxCustomerID, TrxNumberid: TrxNumberid, TrxThreadID: TrxThreadID, TrxChannel: TrxChannel, TrxAccount: TrxAccount, TrxSubject: TrxCustomerID, TrxDescription: "-", callid: TrxCallID });
    console.log("AutoInsertThread : " + form_data)
    $.ajax({
        url: "WebServiceTransaction.asmx/InsertTransactionThread",
        method: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: form_data,
        success: function (data) {
            console.log("Exec ActionInsertThread : " + form_data)
            var json = JSON.parse(data.d);
            var i, x;

            for (i = 0; i < json.length; i++) {
                   $.toast({
                    heading: '<b>Hi ' + $("#hd_sessionLogin").val() + '</b>',
                    text: 'Your data call ' + getParameterByName("phone"),
                    position: 'top-right',
                    loaderBg: '#ff6849',
                    icon: 'success',
                    hideAfter: 3500,
                    stack: 6
                   });
                if (json[i].Result == "True") {
                     //window.location.href = "Tele_TrxTransaksi.aspx?id=null&ph=" + getParameterByName("phone") +"&script=3"
                    window.location.href = "1_doticket.aspx?id=" + json[i].TrxGenerateCustomerID + "&channel=" + TrxChannel + "&n=1&threadid=" + json[i].TrxGenerateThreadID + "&numberid=" + json[i].TrxGenerateNumberID + "&account=" + getParameterByName("phone") + ""
                } else {
                    swal(
                        '',
                        'Caller id already exits',
                        'info'
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
function encodeData(s) {
    return encodeURIComponent(s).replace(/\-/g, "%2D").replace(/\_/g, "%5F").replace(/\./g, "%2E").replace(/\!/g, "%21").replace(/\~/g, "%7E").replace(/\*/g, "%2A").replace(/\'/g, "%27").replace(/\(/g, "%28").replace(/\)/g, "%29");
}