<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/apps/Uidesk.Master" CodeBehind="TestAutoComplete.aspx.vb" Inherits="ICC.TestAutoComplete" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
<script src="js/jquery-1.9.1.min.js"></script>
    <script src="js/sweetalert.min.js"></script>
    <script src="js/use-bootstrap-tag-2.2.0/package/dist/use-bootstrap-tag.js"></script>
    <script src="../assets/vendor_components/bootstrap-tagsinput/dist/bootstrap-tagsinput.js"></script>
    <script src="../assets/vendor_components/bootstrap-tagsinput/dist/bootstrap-tagsinput.css"></script>
    <script src="js/1_journey_new.js"></script>
    <script src="js/TrmMailSystem_Journey.js"></script>
    <script src="js/outbound-notification.js"></script>
    <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
      <div class="ui-widget">
  <label for="ComposeETO">Tags: </label>
  <input id="ComposeETO" autocomplete="on">
</div>
</asp:Content>
