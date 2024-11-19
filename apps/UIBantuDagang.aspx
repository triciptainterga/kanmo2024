<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/apps/Uidesk.Master" CodeBehind="UIBantuDagang.aspx.vb" Inherits="ICC.UIBantuDagang" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="js/UIBantuDagang.js"></script>
    <script src="js/sweetalert.min.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <%-- <img class="attachment-img" src="https://deo.shopeemobile.com/shopee/shopee-sticker-live-id/packs/sticker_id_choki/0001@1x.png" />
    <video width="320" height="240" controls>
        <source src="https://down-tx-sg.vod.susercontent.com/api/v4/11110133/mms/id-11110133-6ke1b-lv8ocpe0lqgcac.default.mp4" type="video/mp4">
    </video>--%>
    <%--    <div class="box">
        <div class="box-header">
            <h4 class="box-title">Table row <strong>borders</strong></h4>
        </div>
        <div class="box-body">
            <p>You can use <a href="#" target="_blank">border utility classes</a> on <code>&lt;tr&gt;</code> elements.</p>
            <table class="table table-lg table-striped">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Class name</th>
                        <th>Column heading</th>
                        <th>Column heading</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="bt-3 border-primary">
                        <th scope="row">1</th>
                        <td>.bt-3</td>
                        <td>Column content</td>
                        <td>Column content</td>
                    </tr>
                    <tr class="bl-3 border-info">
                        <th scope="row">2</th>
                        <td>.bl-3</td>
                        <td>Column content</td>
                        <td>Column content</td>
                    </tr>
                    <tr class="br-3 border-danger">
                        <th scope="row">3</th>
                        <td>.br-3</td>
                        <td>Column content</td>
                        <td>Column content</td>
                    </tr>
                    <tr class="bb-3 border-purple">
                        <th scope="row">4</th>
                        <td>.bb-3</td>
                        <td>Column content</td>
                        <td>Column content</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>--%>
    <div class="content">
        <asp:HiddenField ID="TokenBD" ClientIDMode="Static" runat="server" />
        <div class="row">
        </div>
        <div class="row">
            <div class="col-lg-2">
                <div class="row">
                    <div class="col-md-12">
                        <label>Input Order ID</label>
                        <input type="text" class="form-control" id="OrderID" />
                    </div>
                </div>
                <br />
                <div class="row">
                    <div class="col-md-12">
                        <%--                        <button type="submit" class="btn btn-rounded btn-success btn-outline float-right" id="SubmitOrderID" onclick="SubmitOrderID()">
                            <i class="ti-save-alt"></i>&nbsp;Submit Order ID
                        </button>--%>
                        <%--<button type="button" class="btn btn-rounded btn-primary float-right" onclick="SubmitOrderID()" id="SubmitOrderID">Submit OrderID</button>--%>
                        <%--<button onclick="SubmitOrderID()" class="form-control">Submit Order ID</button>--%>
                        <%--<a href="#" onclick="GenerateToken()">Generate Token</a>--%>
                        <a href="#" onclick="SubmitOrderID()" class="btn btn-rounded btn-primary float-right">Submit Order ID</a>
                    </div>
                </div>
            </div>
            <div class="col-lg-4">
                <div class="box" id="DivOrderView" style="display: none;">
                    <div class="box-body">
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
                            <div class="media">
                                <%--<img class="align-self-start w-80" src="../images/bd/orderproduk.jpg" alt="Order">--%>
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
                                        <%--<div>
                                                    <span id="Invoice_No"></span>
                                                </div>
                                                <div>
                                                    <span id="Store_Code"></span>
                                                </div>
                                                <div>
                                                    <span id="marketplace"></span>
                                                </div>
                                                <div>
                                                    <span id="total_product"></span>
                                                </div>
                                                <div>
                                                    <span id="total_qty"></span>
                                                </div>
                                                <div>
                                                    <span id="Payment_Date"></span>
                                                </div>
                                                <div>
                                                    <span id="Is_COD"></span>
                                                </div>
                                                <div>
                                                    <span id="Is_Dropship"></span>
                                                </div>
                                                <div>
                                                    <span id="Destination_Name"></span>
                                                </div>
                                                 <div>
                                                    <span id="Destination_Phone"></span>
                                                </div>
                                                <div>
                                                    <span id="Destination_Address"></span>
                                                </div>
                                                <div>
                                                    <span id="Destination_Province"></span>
                                                </div>
                                                <div>
                                                    <span id="Destination_City"></span>
                                                </div>
                                                <div>
                                                    <span id="Destination_Postal_Code"></span>
                                                </div>
                                                <div>
                                                    <span id="Courier_Service_Name"></span>
                                                </div>
                                                <div>
                                                    <span id="Product_Name"></span>
                                                </div>
                                                <div>
                                                    <span id="SKU"></span>
                                                </div>
                                                <div>
                                                    <span id="Price"></span>
                                                </div>
                                                  <div>
                                                    <span id="Quantity"></span>
                                                </div>
                                                   <div>
                                                    <span id="Subtotal"></span>
                                                </div>
                                                 <div>
                                                    <span id="Notes"></span>
                                                </div>--%>
                                    </div>
                                </div>
                                <%--Rp. 125.000,---%>
                            </div>
                            <p class="mt-0 px-30 bt-1 py-5 bg-light text-right">
                                <a href="#">Total Pesanan : <span id="Subtotal"></span></a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-2">
                <div class="row">
                    <div class="col-md-12">
                        <label>Input Order ID</label>
                        <input type="text" class="form-control" id="ChatID" />
                    </div>
                </div>
                <br />
                <div class="row">
                    <div class="col-md-12">
                        <a href="#" onclick="SubmitChatID()" class="btn btn-rounded btn-primary float-right">Submit History Chat</a>
                    </div>
                </div>
            </div>
            <div class="col-lg-4">
                <div id="chatView" class="box bg-lightest" style="height: 800px; overflow-x: hidden; overflow-y: scroll; display: none;">
                </div>
            </div>
        </div>
        <%--<hr />
        <div class="row">
            <div class="col-lg-2">
                <div class="row">
                    <div class="col-md-12">
                        <a href="#" onclick="SubmitOrderID()">Submit Order ID</a>
                    </div>
                </div>
            </div>
            <div class="col-lg-4">
                <div id="chatViewReal">
                    <p class="mt-0 px-30 bt-1 py-5 bg-light">
                        <img src="../images/bd/lazada.png" height="28">
                        Theron Trump | <i class="fa fa-calendar"></i>Last Seen 10:30pm ago
                    </p>
                    <div class="box-body">
                        <center>3 Jul 2023</center>
                        <div class="chat-box-one2">
                            <div class="card d-inline-block mb-3 float-left mr-2 no-shadow bg-lighter max-w-p80">
                                <div class="position-absolute pt-1 pr-2 r-0">
                                    <span class="text-extra-small text-muted">09:25</span>
                                </div>
                                <div class="card-body">
                                    <div class="d-flex flex-row pb-2">
                                        <a class="d-flex" href="#">
                                            <img alt="Profile" src="../images/avatar/1.jpg" class="avatar mr-10">
                                        </a>
                                        <div class="d-flex flex-grow-1 min-width-zero">
                                            <div class="m-2 pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between">
                                                <div class="min-width-zero">
                                                    <p class="mb-0 font-size-16 text-dark">Theron Trump</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="chat-text-left pl-55">
                                        <p class="mb-0 text-semi-muted">Pagi ka?</p>
                                    </div>
                                </div>
                            </div>
                            <div class="clearfix"></div>
                            <div class="card d-inline-block mb-3 float-left mr-2 no-shadow bg-lighter max-w-p80">
                                <div class="position-absolute pt-1 pr-2 r-0">
                                    <span class="text-extra-small text-muted">09:28</span>
                                </div>
                                <div class="card-body">
                                    <div class="d-flex flex-row pb-2">
                                        <a class="d-flex" href="#">
                                            <img alt="Profile" src="../images/avatar/1.jpg" class="avatar mr-10">
                                        </a>
                                        <div class="d-flex flex-grow-1 min-width-zero">
                                            <div class="m-2 pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between">
                                                <div class="min-width-zero">
                                                    <p class="mb-0 font-size-16 text-dark">Theron Trump</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="chat-text-left pl-55">
                                        <p class="mb-0 text-semi-muted">tolong bisa bantu untuk cek donk.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="clearfix"></div>
                            <div class="card d-inline-block mb-3 float-right mr-2 bg-primary max-w-p80">
                                <div class="position-absolute pt-1 pl-2 l-0">
                                    <span class="text-extra-small">09:41</span>
                                </div>
                                <div class="card-body">
                                    <div class="d-flex flex-row pb-2">
                                        <div class="d-flex flex-grow-1 justify-content-end">
                                            <div class="m-2 pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between">
                                                <div>
                                                    <p class="mb-0 font-size-16">Mothercare</p>
                                                </div>
                                            </div>
                                        </div>
                                        <a class="d-flex" href="#">
                                            <img alt="Profile" src="https://play-lh.googleusercontent.com/YR9e3YQ20SoNpFkblXqwHFEl2dlN_KeB1stXWXykMPEOVeJeCRkEHoXa_YM6IVEH3iK2=w240-h480-rw" class="avatar ml-10">
                                        </a>
                                    </div>
                                    <div class="chat-text-left pr-50">
                                        <p class="mb-0 text-semi-muted">Selamat pagi ada yang bisa dibantu?</p>
                                    </div>
                                </div>
                            </div>
                            <div class="clearfix"></div>
                            <div class="card d-inline-block mb-3 float-right mr-2 bg-primary max-w-p80">
                                <div class="position-absolute pt-1 pl-2 l-0">
                                    <span class="text-extra-small">09:41</span>
                                </div>
                                <div class="card-body">
                                    <div class="d-flex flex-row pb-2">
                                        <div class="d-flex flex-grow-1 justify-content-end">
                                            <div class="m-2 pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between">
                                                <div>
                                                    <p class="mb-0 font-size-16">Mothercare</p>
                                                </div>
                                            </div>
                                        </div>
                                        <a class="d-flex" href="#">
                                            <img alt="Profile" src="https://play-lh.googleusercontent.com/YR9e3YQ20SoNpFkblXqwHFEl2dlN_KeB1stXWXykMPEOVeJeCRkEHoXa_YM6IVEH3iK2=w240-h480-rw" class="avatar ml-10">
                                        </a>
                                    </div>
                                    <div class="chat-text-left pr-50">
                                        <p class="mb-0 text-semi-muted">Baik akan kami cek nanti kami infokan kembali yah.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="clearfix"></div>
                            <div class="card d-inline-block mb-3 float-left mr-2 no-shadow bg-lighter max-w-p80">
                                <div class="position-absolute pt-1 pr-2 r-0">
                                    <span class="text-extra-small text-muted">09:25</span>
                                </div>
                                <div class="card-body">
                                    <div class="d-flex flex-row pb-2">
                                        <a class="d-flex" href="#">
                                            <img alt="Profile" src="../images/avatar/1.jpg" class="avatar mr-10">
                                        </a>
                                        <div class="d-flex flex-grow-1 min-width-zero">
                                            <div class="m-2 pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between">
                                                <div class="min-width-zero">
                                                    <p class="mb-0 font-size-16 text-dark">Theron Trump</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="chat-text-left pl-55">
                                        <p class="mb-0 text-semi-muted">Baiklah Terimakasih saya tunggu yah.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <center>4 Jul 2023</center>
                        <div class="chat-box-one2">
                            <div class="card d-inline-block mb-3 float-left mr-2 no-shadow bg-lighter max-w-p80">
                                <div class="position-absolute pt-1 pr-2 r-0">
                                    <span class="text-extra-small text-muted">09:25</span>
                                </div>
                                <div class="card-body">
                                    <div class="d-flex flex-row pb-2">
                                        <a class="d-flex" href="#">
                                            <img alt="Profile" src="../images/avatar/1.jpg" class="avatar mr-10">
                                        </a>
                                        <div class="d-flex flex-grow-1 min-width-zero">
                                            <div class="m-2 pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between">
                                                <div class="min-width-zero">
                                                    <p class="mb-0 font-size-16 text-dark">Theron Trump</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="chat-text-left pl-55">
                                        <p class="mb-0 text-semi-muted">Barang sudah kami terima yah.</p>
                                        <div class="attachment-block clearfix">
                                            <img class="attachment-img" src="../images/bd/orderproduk.jpg" alt="Attachment Image">

                                            <div class="attachment-pushed">
                                                <div>
                                                    <div>
                                                        <span>Mothercare Tiger Face Long-Sleeved T-Shirt - Kaos Anak Laki-laki (Kuning)</span>
                                                    </div>
                                                    <div>Variasi: 5-6 Years</div>

                                                </div>
                                                <!-- /.attachment-text -->
                                            </div>
                                            <!-- /.attachment-pushed -->
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="clearfix"></div>
                            <div class="card d-inline-block mb-3 float-left mr-2 no-shadow bg-lighter max-w-p80">
                                <div class="position-absolute pt-1 pr-2 r-0">
                                    <span class="text-extra-small text-muted">09:28</span>
                                </div>
                                <div class="card-body">
                                    <div class="d-flex flex-row pb-2">
                                        <a class="d-flex" href="#">
                                            <img alt="Profile" src="../images/avatar/1.jpg" class="avatar mr-10">
                                        </a>
                                        <div class="d-flex flex-grow-1 min-width-zero">
                                            <div class="m-2 pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between">
                                                <div class="min-width-zero">
                                                    <p class="mb-0 font-size-16 text-dark">Theron Trump</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="chat-text-left pl-55">
                                        <p class="mb-0 text-semi-muted">Semua bagus dan tidak ada kendala apapun</p>
                                    </div>
                                </div>
                            </div>
                            <div class="clearfix"></div>
                            <div class="card d-inline-block mb-3 float-right mr-2 bg-primary max-w-p80">
                                <div class="position-absolute pt-1 pl-2 l-0">
                                    <span class="text-extra-small">09:41</span>
                                </div>
                                <div class="card-body">
                                    <div class="d-flex flex-row pb-2">
                                        <div class="d-flex flex-grow-1 justify-content-end">
                                            <div class="m-2 pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between">
                                                <div>
                                                    <p class="mb-0 font-size-16">Mothercare</p>
                                                </div>
                                            </div>
                                        </div>
                                        <a class="d-flex" href="#">
                                            <img alt="Profile" src="https://play-lh.googleusercontent.com/YR9e3YQ20SoNpFkblXqwHFEl2dlN_KeB1stXWXykMPEOVeJeCRkEHoXa_YM6IVEH3iK2=w240-h480-rw" class="avatar ml-10">
                                        </a>
                                    </div>
                                    <div class="chat-text-left pr-50">
                                        <p class="mb-0 text-semi-muted">Selamat siang kk.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="clearfix"></div>
                            <div class="card d-inline-block mb-3 float-right mr-2 bg-primary max-w-p80">
                                <div class="position-absolute pt-1 pl-2 l-0">
                                    <span class="text-extra-small">09:41</span>
                                </div>
                                <div class="card-body">
                                    <div class="d-flex flex-row pb-2">
                                        <div class="d-flex flex-grow-1 justify-content-end">
                                            <div class="m-2 pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between">
                                                <div>
                                                    <p class="mb-0 font-size-16">Mothercare</p>
                                                </div>
                                            </div>
                                        </div>
                                        <a class="d-flex" href="#">
                                            <img alt="Profile" src="https://play-lh.googleusercontent.com/YR9e3YQ20SoNpFkblXqwHFEl2dlN_KeB1stXWXykMPEOVeJeCRkEHoXa_YM6IVEH3iK2=w240-h480-rw" class="avatar ml-10">
                                        </a>
                                    </div>
                                    <div class="chat-text-left pr-50">
                                        <p class="mb-0 text-semi-muted">Baik terimakasih kk atas konfirmasinya.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="clearfix"></div>
                            <div class="card d-inline-block mb-3 float-left mr-2 no-shadow bg-lighter max-w-p80">
                                <div class="position-absolute pt-1 pr-2 r-0">
                                    <span class="text-extra-small text-muted">09:25</span>
                                </div>
                                <div class="card-body">
                                    <div class="d-flex flex-row pb-2">
                                        <a class="d-flex" href="#">
                                            <img alt="Profile" src="../images/avatar/1.jpg" class="avatar mr-10">
                                        </a>
                                        <div class="d-flex flex-grow-1 min-width-zero">
                                            <div class="m-2 pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between">
                                                <div class="min-width-zero">
                                                    <p class="mb-0 font-size-16 text-dark">Theron Trump</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="chat-text-left pl-55">
                                        <p class="mb-0 text-semi-muted">Oke sama-sama?</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>--%>
        <hr />
        <div class="row" style="display: none;">
            <div class="col-lg-2">
                <div class="row">
                    <div class="col-md-12">
                        <%--<a href="#" onclick="GenerateToken()">Generate Token</a>--%>
                        <a href="#" onclick="SubmitGenerateToken()" class="btn btn-rounded btn-primary float-right">Generate Token</a>
                    </div>
                </div>
            </div>
            <div class="col-lg-10">
                <div class="row">
                    <div class="col-md-12">
                        <input type="text" class="form-control" id="GenerateToken" />
                    </div>
                </div>
            </div>
        </div>
        <hr />
    </div>
</asp:Content>
