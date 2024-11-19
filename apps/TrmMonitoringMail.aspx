<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/apps/Uidesk.Master" CodeBehind="TrmMonitoringMail.aspx.vb" Inherits="ICC.TrmMonitoringMail" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link rel="stylesheet" href="css/vendors_css.css">
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/skin_color.css">
    <script src="js/jquery-1.9.1.min.js"></script>
    <script src="js/sweetalert.min.js"></script>
    <script src="js/TrmMonitoringMail.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="row">
        <div class="col-12">
            <div class="box">
                <div class="box-header with-border">
                    <h4 class="box-title">Data Monitoring Email Response&nbsp;<i class="fa fa-cogs" onclick="FilterDate()" style="cursor: pointer;"></i></h4>
                </div>
                <div class="box-body">
                    <center>
                        <div class="spinner-border text-warning" id="LoaderPageCounting"></div>
                    </center>
                    <div class="table-responsive">
                        <table id="TaskboardMonitoring" class="table mt-0 table-hover no-wrap table-borderless" data-page-size="10">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th style="width: 200px;">Email Service</th>
                                    <th>From</th>
                                    <th>Subject</th>
                                    <th style="width: 170px;">Status</th>
                                    <th style="width: 170px;">Agent</th>
                                    <th style="width: 170px;">Date Create</th>
                                    <th style="width: 50px;">Action</th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>
                <div class="box-footer with-border">
                </div>
            </div>
            <div class="box" id="Div_Conversation">
                <div class="box-body">
                    <div class="timeline" id="DivStart">
                        <span class="timeline-label">
                            <button class="btn btn-success btn-rounded"><i class="fa fa-clock-o"></i></button>
                        </span>
                    </div>
                    <div id="Journeymailconversation"></div>
                    <div class="timeline" id="DivDone">
                        <span class="timeline-label">
                            <button class="btn btn-danger btn-rounded"><i class="fa fa-clock-o"></i></button>
                        </span>
                    </div>
                    <br />
                    <br />
                </div>
            </div>
        </div>
    </div>
    <div class="modal center-right fade" id="modal-center" tabindex="-1" data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog">
            <div class="modal-content" style="width: 650px; margin-left: -50px;">
                <div class="modal-header">
                    <h5 class="modal-title">Filter Monitoring Email</h5>
                    <button type="button" class="close" data-dismiss="modal">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <select id="ComboFrom" class="form-control" style="height: 33px;">
                                    <option value="">Select</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <input type="date" class="form-control" id="startdate" />
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <input type="date" class="form-control" id="enddate" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer modal-footer-uniform">
                    <button type="button" class="btn btn-rounded btn-danger" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-rounded btn-primary float-right" onclick="DataTableEmail()" id="SubmitFilter">Submit</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal modal-center fade" id="modal-assign" tabindex="-1" data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog">
            <div class="modal-content" style="width: 850px; margin-left: -200px;">
                <div class="modal-header">
                    <h5 class="modal-title">Form Assign Email</h5>
                    <button type="button" class="close" data-dismiss="modal">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label>Nama Agent &nbsp;<span class="text-danger">*</span></label>
                                <div class="form-group">
                                    <select id="ComboAgent" class="form-control" style="height: 33px;">
                                        <option value="">Select</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label>Alasan Assign &nbsp;<span class="text-danger">*</span></label>
                                <textarea style="height: 200px;" class="form-control" id="AssignEmail"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer modal-footer-uniform">
                    <button type="button" class="btn btn-rounded btn-danger" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-rounded btn-primary float-right" onclick="ActionAssign()" id="SaveAssign">Submit</button>
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
                    <hr />
                    <div class="row">
                        <div class="col-md-12">
                            <div class="row" id="Div_PreviewReply_Attachment" style="width: 100%; margin-left: 10px;"></div>
                        </div>
                    </div>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <center>
                        <div class="spinner-border text-warning" id="LoaderPageAttachment"></div>
                    </center>
                </div>
                <div class="modal-footer modal-footer-uniform">
                    <button type="button" class="btn btn-rounded btn-danger" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
