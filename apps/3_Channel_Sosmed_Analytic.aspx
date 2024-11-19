<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/apps/Uidesk.Master" CodeBehind="3_Channel_Sosmed_Analytic.aspx.vb" Inherits="ICC._3_Channel_Sosmed_Analytic" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <%--<script src="https://code.jquery.com/jquery-1.9.1.min.js"></script>--%>
    <script src="js/3_Channel_Sosmed_Analytic.js"></script>
    <script src="../assets/vendor_components/c3/d3.min.js"></script>
    <script src="../assets/vendor_components/c3/c3.min.js"></script>
    <script src="js/jquery-1.9.1.min.js"></script>
    <script src="js/sweetalert.min.js"></script>
    <script src="js/pages/c3-data.js"></script>

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <!-- Content Wrapper. Contains page content -->
     <div class="row">
        <div class="col-md-12">
            <div class="form-group">
                <iframe id="iframe_channel" title="description" style="width: 100%; height: 700px;" frameborder="0" src="https://wistarasakha.grafana.net/public-dashboards/9caa9184ce2a4e0e9566532f2531605d?orgId=1"></iframe>
            </div>
        </div>
    </div>
    <!-- /.content-wrapper -->
</asp:Content>
