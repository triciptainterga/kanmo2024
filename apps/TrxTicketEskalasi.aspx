<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/apps/Uidesk.Master" CodeBehind="TrxTicketEskalasi.aspx.vb" Inherits="ICC.TrxTicketEskalasi" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link rel="stylesheet" href="css/vendors_css.css">
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/skin_color.css">
    <script src="js/jquery-1.9.1.min.js"></script>
    <script src="js/sweetalert.min.js"></script>
    <script src="js/TrxTicketEskalasi.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="row">
        <div class="col-12">
            <div class="box">
                <div class="box-header with-border">
                    <h4 class="box-title">Data Taskboar Ticket Department</h4>
                    <%--&nbsp;<i class="fa fa-cogs" onclick="FilterDate()" style="cursor: pointer;"></i>--%>
                </div>
                <div class="box-body">
                    <center>
                        <div class="spinner-border text-warning" id="LoaderPageCounting"></div>
                    </center>
                    <div class="table-responsive">
                        <table id="TaskboardTicketing" class="table mt-0 table-hover no-wrap table-borderless" data-page-size="10">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Ticket Number</th>
                                    <th style="width: 200px;">Name</th>
                                    <th>Kategori</th>
                                    <th>Department</th>
                                    <th>SLA</th>
                                    <th>Agent</th>
                                    <th>Status</th>
                                    <th style="width: 170px;">Date Create</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>
                <div class="box-footer with-border">
                </div>
            </div>
        </div>
    </div>
</asp:Content>
