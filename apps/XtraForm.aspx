<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/apps/Uidesk.Master" CodeBehind="XtraForm.aspx.vb" Inherits="ICC.XtraForm" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="js/jquery-1.9.1.min.js"></script>
    <script src="js/sweetalert.min.js"></script>
    <script src="js/XtraForm.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="content">
        <div class="row">
            <div class="col-lg-12">
                <div class="box">
                    <div class="box-body">
                        <div class="row">
                            <div class="col-md-3">
                                <div class="form-group">
                                    <label>Group Name</label>
                                    <select name="select" id="Ticket_Brand" onchange="getWS_Category(1);" required class="form-control" style="height: 33px;">
                                        <option value="">Select</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="form-group">
                                    <label>Brand Category</label>
                                    <select name="select" id="Ticket_ProductType" required class="form-control" style="height: 33px;" onchange="Get_ProductName(1)">
                                        <option value="">Select</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="form-group">
                                    <label>Brand Name</label>
                                    <select name="select" id="Ticket_ProductName" required class="form-control" style="height: 33px;">
                                        <option value="">Select</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="form-group">
                                    <label>Type</label>
                                    <select name="select" id="Ticket_Category" onchange="getWS_CategoryType(1);" required class="form-control" style="height: 33px;">
                                        <option value="">Select</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-3">
                                <div class="form-group">
                                    <label>Sub Category</label><span class="badge badge-pill badge-primary float-right" style="font-weight: bold; font-size: 12px;" id="Ticket_SLA"><i class="fa fa-clock-o"></i>&nbsp;0 Days</span>
                                    <select name="select" id="Ticket_EnquiryReason" onchange="getWS_SLAReason(1);" required class="form-control" style="height: 33px;">
                                        <option value="">Select</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="form-group">
                                    <label>Category</label>
                                    <select name="select" id="Ticket_Enquiry" onchange="getWS_CategoryTypeDetail(1);" required class="form-control" style="height: 33px;" aria-readonly="true">
                                        <option value="">Select</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="form-group">
                                    <label>Meta</label>
                                    <select name="select" id="Ticket_EnquiryDetail" onchange="getWS_CategoryTypeReason(1);" required class="form-control" style="height: 33px;" aria-readonly="true">
                                        <option value="">Meta</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
