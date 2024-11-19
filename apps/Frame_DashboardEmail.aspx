<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/apps/Uidesk.Master" CodeBehind="Frame_DashboardEmail.aspx.vb" Inherits="ICC.Frame_DashboardEmail" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
     <script src="js/jquery-1.9.1.min.js"></script>
    <script src="WB/main/js/DashboardMail.js"></script>
	<script>
		$(document).ready(function () {
			getDataPrimary()
		});
	</script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <body onload="getData()">
    </body>
    <iframe id="FrameDashboardMail" title="description" style="width: 100%; height: 1000px;"></iframe>
</asp:Content>

