<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/apps/Uidesk.Master" CodeBehind="1_journey_new.aspx.vb" Inherits="ICC._1_journey_new" %>

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

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/tag-it/2.0/css/jquery.tagit.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/tag-it/2.0/css/tagit.ui-zendesk.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/tag-it/2.0/js/tag-it.min.js"></script>






    <style>
        .bootstrap-tagsinput {
            width: 100% !important;
            border-radius: 5px !important;
            border-color: #688cb4 !important;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <asp:HiddenField ID="TrxCustomerID" runat="server" />
    <asp:HiddenField ID="TrxLayerEskalasi" runat="server" />
    <asp:HiddenField ID="HD_Ticket_EnquiryReason" runat="server" />
    <asp:HiddenField ID="TrxEmailID" runat="server" />
    <asp:HiddenField ID="TrxGenerateEmailID" runat="server" />
    <asp:HiddenField ID="TrxUserName" runat="server" />
    <asp:HiddenField ID="TrxTicketPosition" runat="server" />
    <asp:HiddenField ID="TrxAttachmentEmailID" runat="server" />
    <asp:HiddenField ID="TrxAttachmentType" runat="server" />
    <asp:HiddenField ID="TokenBantuDagang" ClientIDMode="Static" runat="server" />
    <asp:HiddenField ID="OrderID" ClientIDMode="Static" runat="server" />
    <asp:HiddenField ID="GenerateToken" ClientIDMode="Static" runat="server" />
    <div class="container-full">
        <!-- Main content -->
        <section class="content">
            <div class="row">
                <div class="col-lg-3 col-12">
                    <div class="box bg-lightest" id="chat-bx">
                        <div>
                            <div class="box-body box-profile">
                                <%--<h4 class="box-title text-info"><i class="ti-user mr-15"></i>Profile</h4>
                                <hr />--%>
                                <div class="box-header no-border">
                                    <h4 class="box-title">Information Profile
                                    </h4>
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label>Full Name</label>
                                            <input class="form-control input-lg" type="text" placeholder="Name" id="TxtName" name="TxtName">
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label>Phone Number</label>
                                            <input class="form-control input-lg" type="text" placeholder="Phone Number" id="TxtProfilePhone" name="TxtProfilePhone" title="Phone Number">
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label>Email Address</label>
                                            <input class="form-control input-lg" type="text" placeholder="Email Address" id="TxtProfileEmail" name="TxtProfileEmail" title="Email Address">
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label>Member ID</label>
                                            <input class="form-control input-lg" type="text" placeholder="NIK" id="Journey_NIK" name="Journey_NIK" title="NIK">
                                        </div>
                                    </div>
                                </div>
                                <div class="row" style="display: none;">
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label>Gender </label>
                                            <div class="c-inputs-stacked">
                                                <input name="Gender" type="radio" id="GenderMale_Journey" value="Male">
                                                <label for="GenderMale_Journey" class="block">Male</label>
                                                <input name="Gender" type="radio" id="GenderFemale_Journey" value="Female">
                                                <label for="GenderFemale_Journey" class="block">Female</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row" style="display: none;">
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label>Polis Number</label>
                                            <input class="form-control input-lg" type="text" placeholder="Polis Number" id="Journey_PolisNumber" name="Journey_PolisNumber" title="Polis Number">
                                        </div>
                                    </div>
                                </div>
                                <div class="row" style="display: none;">
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label>Date of Birth</label>
                                            <input type="date" class="form-control" placeholder="Date of Birth" id="Journey_DateofBirth" name="Journey_DateofBirth" title="Date of Birth">
                                        </div>
                                    </div>
                                </div>
                                <div class="row" style="display: none;">
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label>Address</label>
                                            <textarea id="TxtAddress" name="TxtAddress" class="form-control"></textarea>
                                        </div>
                                    </div>
                                </div>
                                <div class="row" style="display: none;">
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label>Province</label>
                                            <input type="text" id="Ticket_Province" readonly="readonly" class="form-control" placeholder="Province">
                                        </div>
                                    </div>
                                </div>
                                <div class="row" style="display: none;">
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label>City</label>
                                            <input type="text" id="Ticket_City" readonly="readonly" class="form-control" placeholder="City">
                                        </div>
                                    </div>
                                </div>
                                <div class="row" style="display: none;">
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label>District</label>
                                            <input type="text" id="Ticket_District" readonly="readonly" class="form-control" placeholder="District">
                                        </div>
                                    </div>
                                </div>
                                <div class="row" style="display: none;">
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label>Subdistrict</label>
                                            <input type="text" id="Ticket_Zip_Code" readonly="readonly" class="form-control" placeholder="Subdistrict">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="box-footer">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-9 col-12">
                    <div class="row">
                        <div class="col-lg-8 col-12">
                            <div class="box">
                                <div class="box-header">
                                    <div class="media align-items-top p-0">
                                        <a class="avatar avatar-lg status-success mx-0" href="#">
                                            <img src="../images/avatar/2.jpg" class="rounded-circle" alt="...">
                                        </a>
                                        <div class="d-lg-flex d-block justify-content-between align-items-center w-p100">
                                            <div class="media-body mb-lg-0 mb-20">
                                                <p class="font-size-16">
                                                    <a class="hover-primary" href="#"><strong><span id="newNamaCustomer"></span></strong></a>
                                                </p>
                                                <%--<label id="P_DetailTicketNumber"></label>--%>
                                                <p class="hover-primary" id="P_DetailTicketNumber" style="font-weight: bold; color: #475f7b;"></p>
                                            </div>
                                            <div>
                                                <ul class="list-inline mb-0 font-size-18">
                                                    <%--  <li class="list-inline-item" id="newWaktuCall">
                                                        <p class="font-size-24" id="newLastInteraction">00:01</p>
                                                    </li>
                                                    <li class="list-inline-item" id="newTransferCall"><a href="#" class="hover-primary">
                                                        <img src="../Images/icon/transfer.png" width="24"></li>
                                                    <li class="list-inline-item" id="newHoldCall"><a href="#" class="hover-primary">
                                                        <img src="../Images/icon/hold.png" width="24"></li>--%>
                                                    <li class="list-inline-item" id="newCall"><a href="#" class="hover-primary" onclick="ShowEmailCompose()">
                                                        <img src="../Images/icon/email.png" width="24"></a></li>
                                                    <li class="list-inline-item" id="dropcall"><a href="#" class="hover-primary" onclick="clickdropCall()">
                                                        <img src="../Images/icon/drop.png" width="24"></li>
                                                    <li class="list-inline-item" id="dialcall"><a href="#" class="hover-primary" onclick="click2Call()">
                                                        <img src="../Images/icon/call.png" width="24"></a></li>
                                                    <%-- <li class="list-inline-item"><a href="#" class="hover-primary" onclick="click2Call()">
                                                        <img src="../Images/icon/menu.png" width="24"></a></li>--%>
                                                </ul>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div class="box-body mb-30">
                                    <div class="chat-box-one">
                                        <div class="form-group" style="transform: scale(0.8);">
                                            <div class="timeline timeline-single-column timeline-single-full-column" style="margin-left: -12px; margin-top: -20px;" id="Div1">
                                                <span class="timeline-label">
                                                    <button class="btn btn-success btn-rounded"><i class="fa fa-clock-o"></i></button>
                                                </span>
                                                <span class="timeline-label">
                                                    <button class="btn btn-danger btn-rounded" style="cursor: pointer; margin-left: 100px;">
                                                        <p class="font-weight-bold" id="P_TicketNumber"></p>
                                                    </button>
                                                </span>
                                                <div id="Ticket_ListInteraction"></div>
                                                <span class="timeline-label">
                                                    <button class="btn btn-danger btn-rounded"><i class="fa fa-clock-o"></i></button>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="box-footer">
                                    <div class="row">
                                        <div class="col-lg-12">
                                            <input class="form-control b-0 py-10" id="Journey_Response" name="Journey_Response" type="text" placeholder="Say something...">
                                        </div>

                                    </div>
                                    <br />
                                    <div class="row" id="divAction">
                                        <div class="col-lg-4">
                                            <div class="form-group">
                                                <%--<p class="font-weight-normal">Status</p>--%>
                                                <select name="select" id="Journey_Status" required class="form-control" style="height: 33px;" onchange="get_EscalationStatus(1)">
                                                    <option value="">Select</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-lg-4">
                                            <div class="form-group">
                                                <p class="font-weight-normal" id="P_Escalation" style="display: none;"></p>
                                                <select name="select" id="Journey_EscalationChannel" required class="form-control" style="height: 33px;" onchange="get_SelectEscalation(1)">
                                                    <option value="">Select Escalation</option>
                                                    <option value="Yes">Yes</option>
                                                    <option value="No">No</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-lg-4">
                                            <div class="d-md-flex d-block justify-content-between align-items-center">
                                                <div class="d-flex justify-content-between align-items-center mt-md-0 mt-30">
                                                    <div class="btn btn-rounded btn-outline-secondary btn-file waves-effect waves-circle btn btn-circle mr-10 btn-outline-secondary" id="btnAttachment">
                                                        <i class="mdi mdi-link"></i>
                                                        <input type="file" name="filesinteraction">
                                                    </div>
                                                    <a class="waves-effect waves-circle btn btn-circle btn-primary" onclick="post_WS_DataInteraction()" id="btnInteraction">
                                                        <i class="mdi mdi-send"></i>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row" id="divfile" style="display: none;">
                                        <div class="p-20">
                                            <div class="row" id="divAttachmentInteractionTicket" style="width: 100%; margin-left: -5px; margin-top: -20px; margin-bottom: -20px"></div>
                                        </div>
                                    </div>
                                    <hr />
                                </div>
                                <div class="box-footer">
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4 col-12">
                            <div class="box">
                                <div class="box-header no-border">
                                    <h4 class="box-title">Detail Ticket Information
                                    </h4>
                                    <%--<p class="font-weight-bold" id="P_DetailTicketNumber"></p>--%>
                                </div>
                                <div class="box-body px-0 pt-0">
                                    <div style="height: 550px; overflow-x: hidden; overflow-y: scroll">
                                        <div class="media-list media-list-hover">
                                            <div class="position-relative p-20">
                                                <!-- drag handle -->
                                                <div class="row">
                                                    <div class="col-md-12">
                                                        <div class="form-group">
                                                            <label class="text-primary">Full Name Reported</label>
                                                            <p class="font-weight-normal" id="Ticket_FullNameReported"></p>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-12">
                                                        <div class="form-group">
                                                            <label class="text-primary">Email  Reported</label>
                                                            <p class="font-weight-normal" id="Ticket_EmailReported"></p>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-12">
                                                        <div class="form-group">
                                                            <label class="text-primary">Contact Number Reported</label>
                                                            <p class="font-weight-normal" id="Ticket_ContactNumberReported"></p>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-12">
                                                        <div class="form-group">
                                                            <label class="text-primary">Contact Account Reported</label>
                                                            <p class="font-weight-normal" id="Ticket_ContactAccountReported"></p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-md-12">
                                                        <div class="form-group">
                                                            <label class="text-primary">Date of Transaction</label>
                                                            <p class="font-weight-normal" id="Ticket_DateofTransaction"></p>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-12">
                                                        <div class="form-group">
                                                            <label class="text-primary">Agent Name</label>
                                                            <p class="font-weight-normal" id="Ticket_AgentName"></p>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-12">
                                                        <div class="form-group">
                                                            <label class="text-primary">Order ID</label>
                                                            <p class="font-weight-normal" id="Ticket_BankAccount"></p>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-12">
                                                        <div class="form-group">
                                                            <label class="text-primary">Channel</label>
                                                            <p class="font-weight-normal" id="Ticket_SourceChannel"></p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-md-12">
                                                        <div class="form-group">
                                                            <label class="text-primary">Fulfillment</label>
                                                            <p class="font-weight-normal" id="Ticket_UserStatus"></p>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-12">
                                                        <div class="form-group">
                                                            <label class="text-primary">Activity</label>
                                                            <p class="font-weight-normal" id="Ticket_UserCategory"></p>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-12">
                                                        <div class="form-group">
                                                            <label class="text-primary">Group Name</label>
                                                            <p class="font-weight-normal" id="Ticket_Brand"></p>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-12">
                                                        <div class="form-group">
                                                            <label class="text-primary">Brand Category</label>
                                                            <p class="font-weight-normal" id="Ticket_ProductType"></p>
                                                        </div>
                                                    </div>

                                                </div>
                                                <div class="row">
                                                    <div class="col-md-12">
                                                        <div class="form-group">
                                                            <label class="text-primary">Brand Name</label>
                                                            <p class="font-weight-normal" id="Ticket_ProductName"></p>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-12">
                                                        <div class="form-group">
                                                            <label class="text-primary">Type</label>
                                                            <p class="font-weight-normal" id="Ticket_Category"></p>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-12">
                                                        <div class="form-group">
                                                            <label class="text-primary">Category</label>
                                                            <p class="font-weight-normal" id="Ticket_Enquiry"></p>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-12">
                                                        <div class="form-group">
                                                            <label class="text-primary">Meta</label>
                                                            <p class="font-weight-normal" id="Ticket_EnquiryDetail"></p>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-12">
                                                        <div class="form-group">
                                                            <label class="text-primary">Sub Category</label>
                                                            <p class="font-weight-normal" id="Ticket_EnquiryReason"></p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <%--         <div class="col-md-3">
                                                        <div class="form-group">
                                                            <label class="text-primary">Type of Complaint</label>
                                                            <p class="font-weight-normal" id="Ticket_ComplaintType"></p>
                                                        </div>
                                                    </div>--%>
                                                    <div class="col-md-12">
                                                        <div class="form-group">
                                                            <label class="text-primary">Escalation Ticket</label>
                                                            <p class="font-weight-normal" id="Ticket_Layer_Eskalasi"></p>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-12">
                                                        <div class="form-group">
                                                            <label class="text-primary">Escalation Unit</label>
                                                            <p class="font-weight-normal" id="Ticket_Escalation"></p>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-12">
                                                        <div class="form-group">
                                                            <label class="text-primary">Source</label>
                                                            <p class="font-weight-normal" id="Ticket_Priority"></p>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-12">
                                                        <div class="form-group">
                                                            <label class="text-primary">SLA</label>
                                                            <p class="font-weight-normal" id="Ticket_SLA"></p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-md-12">
                                                        <div class="form-group">
                                                            <label class="text-primary">Status</label>
                                                            <p class="font-weight-normal" id="Ticket_Status"></p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-md-12">
                                                        <div class="form-group">
                                                            <label class="text-primary">Customer Complaints</label>
                                                            <p class="font-size-12" id="Ticket_Complaints"></p>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-12">
                                                        <div class="form-group">
                                                            <label class="text-primary">Last Agent Response</label>
                                                            <p class="font-size-12" id="Ticket_NoteAgent"></p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row" id="divAttachmentTicket" style="width: 100%; margin-left: 5px;"></div>
                                                <br />
                                                <div class="row" id="divAttachmentEmail" style="width: 100%; margin-left: 5px;"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="box-header no-border">
                                    <h4 class="box-title">Product Detail
                                    </h4>
                                </div>
                                <div class="box-body px-0 pt-0" style="height: 1200px;">
                                    <div style="height: 1100px;">
                                        <div id="orderView" class="box-body p-0">
                                            <p class="mt-0 px-30 bt-1 py-5 bg-light">
                                                <%--<img src="../images/bd/lazada.png" height="28">--%>
                                                <label class="mb-0 font-size-16" id="store_name"></label>
                                                | <i class="fa fa-calendar"></i>
                                                <label class="mb-0 font-size-16" id="Order_Date"></label>
                                                | <%--<i class="fa fa-navicon"></i>--%>
                                                <a href="#">
                                                    <label class="mb-0 font-size-16" id="Order_Status"></label>
                                                </a>
                                            </p>
                                            <div class="media" style="height: 550px; overflow-y: scroll;">
                                                <div class="media-body">
                                                    <div>
                                                        <table style="width: 100%;">
                                                            <tr>
                                                                <td style="width: 200px;">Order Code</td>
                                                                <td style="width: 10px;">:</td>
                                                                <td><span id="Order_Code"></span></td>
                                                            </tr>
                                                            <tr>
                                                                <td style="width: 200px;">Invoice No</td>
                                                                <td style="width: 10px;">:</td>
                                                                <td><span id="Invoice_No"></span></td>
                                                            </tr>
                                                            <tr>
                                                                <td style="width: 200px;">Marketplace</td>
                                                                <td style="width: 10px;">:</td>
                                                                <td><span id="marketplace"></span></td>
                                                            </tr>
                                                            <tr>
                                                                <td style="width: 200px;">Total Product</td>
                                                                <td style="width: 10px;">:</td>
                                                                <td><span id="total_product"></span></td>
                                                            </tr>
                                                            <tr>
                                                                <td style="width: 200px;">Total qty</td>
                                                                <td style="width: 10px;">:</td>
                                                                <td><span id="total_qty"></span></td>
                                                            </tr>
                                                            <tr>
                                                                <td style="width: 200px;">Payment Date</td>
                                                                <td style="width: 10px;">:</td>
                                                                <td><span id="Payment_Date"></span></td>
                                                            </tr>
                                                            <tr>
                                                                <td style="width: 200px;">Is COD</td>
                                                                <td style="width: 10px;">:</td>
                                                                <td><span id="Is_COD"></span></td>
                                                            </tr>
                                                            <tr>
                                                                <td style="width: 200px;">Is Dropship</td>
                                                                <td style="width: 10px;">:</td>
                                                                <td><span id="Is_Dropship"></span></td>
                                                            </tr>
                                                            <tr>
                                                                <td style="width: 200px;">Destination Name</td>
                                                                <td style="width: 10px;">:</td>
                                                                <td><span id="Destination_Name"></span></td>
                                                            </tr>
                                                            <tr>
                                                                <td style="width: 200px;">Destination Phone</td>
                                                                <td style="width: 10px;">:</td>
                                                                <td><span id="Destination_Phone"></span></td>
                                                            </tr>
                                                            <tr>
                                                                <td style="width: 200px;">Destination Address</td>
                                                                <td style="width: 10px;">:</td>
                                                                <td><span id="Destination_Address"></span></td>
                                                            </tr>
                                                            <tr>
                                                                <td style="width: 200px;">Destination Province</td>
                                                                <td style="width: 10px;">:</td>
                                                                <td><span id="Destination_Province"></span></td>
                                                            </tr>
                                                            <tr>
                                                                <td style="width: 200px;">Destination City</td>
                                                                <td style="width: 10px;">:</td>
                                                                <td><span id="Destination_City"></span></td>
                                                            </tr>
                                                            <tr>
                                                                <td style="width: 200px;">Destination Postal Code</td>
                                                                <td style="width: 10px;">:</td>
                                                                <td><span id="Destination_Postal_Code"></span></td>
                                                            </tr>
                                                            <tr>
                                                                <td style="width: 200px;">Courier Service Name</td>
                                                                <td style="width: 10px;">:</td>
                                                                <td><span id="Courier_Service_Name"></span></td>
                                                            </tr>
                                                        </table>
                                                        <hr />
                                                        <div id="productnames"></div>
                                                        <div>
                                                        </div>
                                                    </div>
                                                    <p class="mt-0 px-30 bt-1 py-5 bg-light text-right">
                                                        <a href="#">Total Pesanan : <span id="Subtotal"></span></a>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <hr />
                                        <div id="chatView" style="height: 550px; overflow-x: hidden; overflow-y: scroll">
                                        </div>
                                    </div>
                                </div>
                                <%--           <div class="box-header no-border">
                                    <h4 class="box-title">Chat History
                                    </h4>
                                </div>--%>
                                <%--  <div class="box-body px-0 pt-0">
                                    <div style="height:700px;">
                                        
                                    </div>
                                </div>--%>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- /.content -->
        <div class="modal modal-info fade" id="modal-escalation">
            <div class="modal-dialog">
                <div class="modal-content bg-info">
                    <div class="modal-header">
                        <h4 class="modal-title">Escalation Layer</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span></button>
                    </div>
                    <div class="modal-body">

                        <div class="media bg-white mb-20">
                            <span class="status-success">
                                <img src="../images/card/2.jpg" width="128p" alt="...">
                            </span>
                            <br />

                            <div class="media-body">
                                <p id="Journey_EscalationValue"></p>
                                <p id="P_TypeEscalation"></p>

                                <div class="d-inline-block mt-10">

                                    <a class="btn default btn-outline image-popup-vertical-fit" href="#" onclick="modalEscalation()" id="ahref_Escalationto"><i class="fa fa-pencil" id="escalationto"></i></a>
                                    <a class="btn default btn-outline" href="1_Journey.aspx?ticketid=<%=Server.UrlEncode(Request.QueryString("ticketid"))%>"><i class="fa fa-refresh"></i></a>
                                </div>
                            </div>
                        </div>



                    </div>

                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.modal-dialog -->
        </div>
        <!-- /.modal -->
    </div>
    <!-- /.Popup Data -->
    <div class="modal fade bs-example-modal-lg" role="dialog" id="modal-ShowEscalation" tabindex="-1" data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog modal-lg">
            <div class="modal-content" style="width: 1200px; margin-left: -100px;">
                <div class="modal-header">
                    <%--  <button type="button" class="close" data-dismiss="modal">
                        <span aria-hidden="true">&times;</span>
                    </button>--%>
                    <div class="col-md-3" style="margin-top: 10px;">
                        <%-- <div class="form-group">
                            <select name="select" id="Journey_EscalationType" onchange="getWS_EscalationData(1);" required class="form-control" style="height: 33px;">
                                <option value="">Select Escalation Type</option>
                            </select>
                        </div>--%>
                    </div>
                    <div class="col-md-6"></div>
                    <div class="col-md-3" style="margin-top: 10px;">
                        <%--<h5 class="modal-title" id="Journey_TittlePopup_Escalation" style="visibility:hidden;">Data Escalation Ticket</h5>--%>
                        <div class="box-controls pull-right">
                            <div class="lookup lookup-circle lookup-right">
                                <input type="text" id="TxtSearchingEscalation" placeholder="Search">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-body">
                    <div class="scrollable ps-container ps-theme-default ps-active-y" style="overflow: hidden; width: auto; height: 520px;">
                        <div class="row" id="Journey_ListEscalation">
                        </div>
                    </div>
                </div>
                <div class="modal-footer modal-footer-uniform">
                    <button type="button" class="btn btn-rounded btn-secondary float-right" data-dismiss="modal">Close</button>
                    <%--<button type="button" class="btn btn-rounded btn-primary float-right">Save changes</button>--%>
                </div>
            </div>
        </div>
    </div>
    <div class="modal center-modal fade" id="modal-description" tabindex="-1" data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog">
            <div class="modal-content" style="width: 1100px; margin-left: -300px; height: 650px">
                <div class="modal-header">
                    <h5 class="modal-title">Detail Description</h5>
                    <button type="button" class="close" data-dismiss="modal">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="scrollable ps-container ps-theme-default ps-active-y" style="overflow: hidden; width: auto; height: 500px;">
                        <pre id="Pre_Ticket_Detail"></pre>
                    </div>
                </div>
                <div class="modal-footer modal-footer-uniform">
                    <button type="button" class="btn btn-rounded btn-secondary float-right" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
    <!--End-->
    <div class="modal center-modal fade" id="modal-interaction" tabindex="-1" data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog">
            <div class="modal-content" style="width: 1100px; margin-left: -300px; height: 650px">
                <div class="modal-header">
                    <h5 class="modal-title">Detail Description</h5>
                    <button type="button" class="close" data-dismiss="modal">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="scrollable ps-container ps-theme-default ps-active-y" style="overflow: hidden; width: auto; height: 500px;">
                        <pre id="Pre_Ticket_Interaction"></pre>
                    </div>
                </div>
                <div class="modal-footer modal-footer-uniform">
                    <button type="button" class="btn btn-rounded btn-secondary float-right" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal modal-right fade" id="modal-individual" tabindex="-1" data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <%--<h5 class="modal-title">Individu Selected</h5>--%>
                    <h4 class="box-title text-info"><i class="ti-user mr-15"></i>Individu Selected</h4>
                    <button type="button" class="close" data-dismiss="modal">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <div class="scrollable ps-container ps-theme-default ps-active-y" style="overflow: hidden; width: auto; height: 400px;">
                            <div class="media-list media-list-hover media-list-divided inner-user-div" id="Journey_Escalation_Individual" style="height: 450px;">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer modal-footer-uniform">
                    <a href="#" class="btn btn-rounded btn-success btn-outline pull-left" onclick="submitIndividual()" id="BTN_SubmitIndividual">
                        <i class="ti-save-alt"></i>&nbsp;Submit
                    </a>
                </div>
            </div>
        </div>
    </div>
    <div class="modal modal-left fade" id="modal-interaction-attachment" tabindex="-1" data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <%--<h5 class="modal-title">Attachment Interaction Ticket</h5>--%>
                    <h4 class="box-title text-info"><i class="ti-clip mr-15"></i>Attachment Interaction</h4>
                    <button type="button" class="close" data-dismiss="modal">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="p-20">
                    <div class="row" id="InteractionAttachment" style="width: 100%; margin-left: 15px;"></div>
                </div>
            </div>
        </div>
    </div>
    <div class="modal center-modal fade" id="modal-center-email" tabindex="-1" data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog">
            <div class="modal-content" style="width: 1100px; margin-left: -300px;">
                <div class="modal-header">
                    <h5 class="modal-title">Detail Transaction</h5>
                    <button type="button" class="close" data-dismiss="modal">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <iframe id="framefile_html" title="description" style="width: 100%; height: 500px;"></iframe>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer modal-footer-uniform">
                    <button type="button" class="btn btn-rounded btn-danger float-right" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>

    <!--Modal Email Global-->
    <div class="modal center-modal fade show" id="modal-composeGlobal" tabindex="-1" aria-modal="true" data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog">
            <div class="modal-content" style="width: 1300px; height: 720px; margin-left: -400px;">
                <div class="modal-header">
                    <a href="#" onclick="PreviewAttachment();"><span class="badge badge-pill badge-primary float-right" style="font-weight: bold; font-size: 14px;"><i class="fa fa-paperclip"></i></span></a>&nbsp;
                    <h5 class="modal-title">Form Compose Email</h5>
                    &nbsp;&nbsp;
                    <button type="button" class="close" data-dismiss="modal">
                        <span aria-hidden="true">×</span>
                    </button>
                    <%--        <button type="button" class="close" data-dismiss="modal">
                        <span aria-hidden="true">×</span>
                    </button>--%>
                </div>
                <div class="modal-body">
                    <div style="overflow-y: scroll; overflow-x: hidden; height: 550px;">
                        <div class="row">
                            <div class="col-md-1" style="text-align: right;">
                                <label style="text-align: right;">From</label>
                            </div>
                            <div class="col-md-11">
                                <div class="form-group">
                                    <select id="ComboFrom" class="form-control" style="height: 33px;" onchange="ChangeComboSignature('1')">
                                        <option value="">Select</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-1" style="text-align: right;">
                                <label>Format</label>
                            </div>
                            <div class="col-md-11">
                                <div class="form-group">
                                    <select id="FormatTypeCompose" class="form-control" style="height: 33px;" onchange="OnchangeFormatTypeCompose('1')">
                                        <option value="">Select</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-1" style="text-align: right;">
                                <label class="text-right"><a href="#" onclick="addresstujuan()">To</a><span class="text-danger">*</span></label>
                            </div>
                            <div class="col-md-11">
                                <div class="form-group">
                                    <div class="controls" style="display: flex; flex-direction: column; position: relative;">
                                        <div class="data" style="display: flex; flex-wrap: wrap; margin-bottom: 5px;"></div>
                                        <input type="text" id="ComposeETO" class="form-control" placeholder="To:" name="ComposeETO" style="width: 100%; font-size: 14px; box-sizing: border-box;">
                                        <div class="autocomplete autocomplete-items" 
                                             style="position: absolute; top: 100%; width: 100%; border: 1px solid #ccc; background: #fff; max-height: 200px; overflow-y: auto;"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <%--data-role="tagsinput"--%>
                        <div class="row">
                            <div class="col-md-1" style="text-align: right;">
                                <label class="text-right"><a href="#" onclick="addresscc()">Cc</a></label>
                            </div>
                            <div class="col-md-11">
                                <div class="form-group">
                                    <div class="controls" style="display: flex; flex-direction: column; position: relative;">
                                        <div class="data" style="display: flex; flex-wrap: wrap; margin-bottom: 5px;"></div>
                                        <input type="text" id="ComposeECC" class="form-control" placeholder="To:" name="ComposeECC" style="width: 100%; font-size: 14px; box-sizing: border-box;">
                                        <div class="autocomplete autocomplete-items" 
                                             style="position: absolute; top: 100%; width: 100%; border: 1px solid #ccc; background: #fff; max-height: 200px; overflow-y: auto;"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-1" style="text-align: right;">
                                <label>Bcc</label>
                            </div>
                            <div class="col-md-11">
                                <div class="form-group">
                                    <div class="controls">
                                        <input type="text" class="form-control" id="ComposeBCC" name="ComposeBCC" data-role="tagsinput" data-validation-regex-regex="((\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*)*([;])*)*" data-validation-regex-message="Format Email Address Invalid">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-1" style="text-align: right;">
                                <label>Subject <span class="text-danger">*</span></label>
                            </div>
                            <div class="col-md-11">
                                <div class="form-group">
                                    <div class="controls">
                                        <input class="form-control" placeholder="Subject:" type="text" id="ComposeESUBJECT" name="ComposeESUBJECT()">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <textarea id="Compose_Body" name="Compose_Body" class="form-control"></textarea>
                        </div>
                        <div class="box-footer" id="divFooter">
                            <div class="row" id="Div_Compose_Attachment" style="width: 100%;"></div>
                        </div>
                        <div id="divAppendemail"></div>
                    </div>
                </div>
                <div class="box-footer">
                    <div class="pull-right">
                        <%--  <a href="#" class="btn btn-rounded btn-warning btn-outline mr-1" onclick="Draft_ActionButton()"><i class="fa fa-pencil"></i>&nbsp;Draft</a>
                        <a href="#" class="btn btn-rounded btn-success btn-outline pull-right" onclick="Compose_ActionButton()"><i class="fa fa-envelope-o"></i>&nbsp;Send</a>--%>
                        <div class="dropdown">
                            <button class="btn btn-primary btn-outline btn-rounded dropdown-toggle" type="button" data-toggle="dropdown" id="ButtonAction"><i class="fa fa-plus"></i>&nbsp;Action</button>
                            <div class="dropdown-menu">
                                <a class="dropdown-item" href="#" onclick="Compose_ActionButton()" id="ComposeActionButton"><i class="fa fa-send"></i>Send</a>
                                <%--  <a class="dropdown-item" href="#" onclick="DraftSend_ActionButton()" id="DraftSendActionButton"><i class="fa fa-send"></i>Send</a>
                                <a class="dropdown-item" href="#" onclick="DraftEvent()" id="DraftActionButton"><i class="fa fa-file-text"></i>Draft</a>--%>
                                <a class="dropdown-item" href="#" onclick="CloseEvent()"><i class="fa fa-times-circle"></i>Close</a>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="btn btn-primary btn-outline btn-rounded btn-file">
                            <i class="fa fa-paperclip"></i>&nbsp;Attachment					 
                                <input type="file" name="filescomposefollow">
                        </div>
                    </div>
                </div>
                <!-- /.box-footer -->
            </div>
        </div>
    </div>

    <!-- Control Side Bar Recording-->
    <!-- Control Sidebar -->
    <div class="modal modal-left fade" data-backdrop="false" id="modal-recording" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Recording File</h5>
                    <button type="button" class="close" data-dismiss="modal">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <p>
                        <audio controls="">
                            <source src="https://pbx.uidesk.id/stream.php?file=/var/spool/asterisk/monitor/2023/10/11/exten-102023-102025-20231011-135657-1697007417.2617.wav" type="audio/wav">' +
                            
                            Your browser does not support the audio element.
                        </audio>

                        <!--<img onclick="btnRequestTranscript(' + json[i].RecordingID + ')" src="https://cdn-icons-png.flaticon.com/512/1599/1599234.png" width="42">-->
                        <p><small id="balikanVTT"></small></p>

                    </p>
                </div>
                <div class="modal-footer modal-footer-uniform">
                    <button type="button" class="btn btn-rounded btn-secondary" data-dismiss="modal">Close</button>

                </div>
            </div>
        </div>
    </div>
    <!-- /.control-sidebar -->
    <!-- End Control-->
    <div class="modal fade" id="emailModalSearch" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content" style="height: 500px;">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Search Email</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="box-body p-0">
                        <div class="controls">
                            <input type="text" class="form-control" id="SearchEmailAccount" name="SearchEmailAccount" placeholder="To:" data-validation-regex-regex="((\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*)*([;])*)*" data-validation-regex-message="Format Email Address Invalid">
                        </div>
                        <div id="tampungEmailSementara" style="display: none;"></div>
                    </div>
                    <div class="box-body p-0">
                        <div id="Ticket_ListCustomer" class="scrollable ps-container ps-theme-default ps-active-y" style="overflow: hidden; width: auto; height: 300px;">
                            <div class="media media-single">No data found... </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>

                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="emailModalSearchCC" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content" style="height: 500px;">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabelCC">Search Email</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="box-body p-0">
                        <div class="controls">
                            <input type="text" class="form-control" id="SearchEmailAccountCC" name="SearchEmailAccountCC" placeholder="CC:" data-validation-regex-regex="((\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*)*([;])*)*" data-validation-regex-message="Format Email Address Invalid">
                        </div>
                        <div id="tampungEmailSementaraCC" style="display: none;"></div>
                    </div>
                    <div class="box-body p-0">
                        <div id="Ticket_ListCustomerCC" class="scrollable ps-container ps-theme-default ps-active-y" style="overflow: hidden; width: auto; height: 300px;">
                            <div class="media media-single">No data found... </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>

                </div>
            </div>
        </div>
    </div>

    <div class="modal center-modal fade show" id="modal-preview" tabindex="-1" aria-modal="true" data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog">
            <div class="modal-content" style="width: 1300px; height: 720px; margin-left: -400px;">
                <div class="modal-header">
                    <a href="#" onclick="PreviewAttachment();"><span class="badge badge-pill badge-primary float-right" style="font-weight: bold; font-size: 14px;"><i class="fa fa-paperclip"></i></span></a>&nbsp;
                    <h5 class="modal-title">
                        <label id="LabelFormPreviewEmail" class="label" style="color: black; font-size: large;">Preview Email</label>
                    </h5>
                    <button type="button" class="close" data-dismiss="modal">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body">
                    <iframe id="Preview_FrameHTML" title="description" style="width: 100%; height: 600px;" frameborder="0"></iframe>
                </div>
            </div>
        </div>
    </div>
    <div class="modal center-modal fade show" id="modal-preview-interaction" tabindex="-1" aria-modal="true" data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog">
            <div class="modal-content" style="width: 1100px; height: 720px; margin-left: -300px;">
                <div class="modal-header">
                    <a href="#" onclick="PreviewAttachmentJourneyEmail();"><span class="badge badge-pill badge-primary float-right" style="font-weight: bold; font-size: 14px;"><i class="fa fa-paperclip"></i></span></a>&nbsp;
                    Preview Email
                    <button type="button" class="close" data-dismiss="modal">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="text-area">
                        <textarea cols="120" rows="10" id="editorNya" name="text"></textarea>
                    </div>

                </div>
            </div>
        </div>
    </div>
    <div class="modal modal-right fade" id="modal-preview-file" tabindex="-1" data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Data Attachment Email</h5>
                    <button type="button" class="close" data-dismiss="modal">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-12">
                            <%--<a href="#" onclick="clickvideo('202402011349277121057/lapis.mp4')">click video x</a>--%>
                            <div class="row" id="Div_PreviewInbox_Attachment" style="width: 100%; margin-left: 10px;"></div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer modal-footer-uniform">
                    <button type="button" class="btn btn-rounded btn-danger" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
    <script src="js/ckeditor/ckeditor.js"></script>

    <script>
        var HeigheditorNya = CKEDITOR.replace('editorNya');
        HeigheditorNya.config.height = 550;

        CKEDITOR.replace('Reminder_Description');
        CKEDITOR.replace('Journey_Response');
        CKEDITOR.config.height = 400;
        CKEDITOR.config.width = '100%';
        CKEDITOR.config.toolbar = 'Full';
        CKEDITOR.config.toolbar_Full =
            [
                //{ name: 'snddocument', items: ['Source', '-', 'Save', 'NewPage', 'DocProps', 'Preview', 'Print', '-', 'Templates'] },
                //{ name: 'clipboard', items: ['Undo', 'Redo'] },
                //{ name: 'editing', items: ['Find', 'Replace', '-', 'SelectAll', '-', 'SpellChecker', 'Scayt'] },

                { name: 'basicstyles', items: ['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'RemoveFormat'] },
                {
                    name: 'paragraph', items: ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', 'CreateDiv',
                        '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-', 'BidiLtr', 'BidiRtl']
                }
            ];

        var TrmTxtAddress = CKEDITOR.replace('TxtAddress');
        TrmTxtAddress.config.height = 150;
        TrmTxtAddress.config.toolbar = 'Basic';
        TrmTxtAddress.config.toolbar_Basic =
            [
                ['Bold', 'Italic', '-', 'NumberedList', 'BulletedList', '-', 'Link', 'Unlink', '-', 'About']
            ];



    </script>
    <script>
        //$.get('https://kanmo.uidesk.id/crm/FileEmail/Inbox/202402281449365265625/file.html')
        //.done(response =>
        //{
        //CKEDITOR.instances.editorNya.setData("https://kanmo.uidesk.id/crm/FileEmail/Inbox/202402281449365265625/file.html");
        //})
        //.fail(/** process error here **/);
        CKEDITOR.replace('editorNya', {
            fullPage: true,
            allowedContent: true,
            extraPlugins: 'wysiwygarea',
        })
    </script>
</asp:Content>
