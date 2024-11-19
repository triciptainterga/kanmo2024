<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/apps/Uidesk.Master" CodeBehind="TrmMultiChannel.aspx.vb" Inherits="ICC.TrmMultiChannel" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="js/jquery-1.9.1.min.js"></script>
    <script src="js/sweetalert.min.js"></script>
    <script src="js/TrmMultiChannel.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="row">
        <div class="col-md-12">
            <div class="form-group">
                <!--<iframe id="iframe_channel" title="description" style="width: 100%; height: 700px;" src="https://multichannel.qiscus.com/web/uzuvi-96cwg3nvzlmid6c/inbox"></iframe>-->
            <iframe id="iframe_channel" title="description" style="width: 100%; height: 700px;" frameborder="0" src="https://datakelola.com/home?adminEmail=century@gmail.com&adminPassword=Century123!"></iframe>
			</div>
        </div>
    </div>
</asp:Content>
