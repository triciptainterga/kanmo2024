<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="WebForm1.aspx.vb" Inherits="ICC.WebForm1" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
        <table border="0" cellpadding="0" cellspacing="0">
        <tr>
            <td>To:</td>
            <td><asp:TextBox ID="txtTo" runat="server" /></td>
        </tr>
        <tr>
            <td>Subject:</td>
            <td><asp:TextBox ID="txtSubject" runat="server" /></td>
        </tr>
        <tr>
            <td valign = "top">Body:</td>
            <td><asp:TextBox ID="txtBody" runat="server" TextMode="MultiLine" Height="150" Width="200" /></td>
        </tr>
        <tr>
            <td></td>
            <td><asp:Button ID="btnSend" Text="Send" runat="server" OnClick = "SendEmail" /></td>
        </tr>
    </table>
    </form>
</body>
</html>
