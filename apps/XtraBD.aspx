<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/apps/Uidesk.Master" CodeBehind="XtraBD.aspx.vb" Inherits="ICC.XtraBD" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="js/jquery-1.9.1.min.js"></script>
    <script src="js/sweetalert.min.js"></script>
    
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
   <%-- <div id="chat-box-body" onclick="modalAPI()" title="Searching Data Ticketing">
        <div id="chat-circle" class="waves-effect waves-circle btn btn-circle btn-lg btn-warning l-h-70">
            <div id="chat-overlay"></div>
            <span class="mdi mdi-lan-connect font-size-30"></span>
        </div>
    </div>--%>
    <%--    <div id="chat-circle" class="">
        <img src="../Images/bantudagang.png" width="32px">
    </div>--%>
    <div class="content">
        <div class="row">
            <!--<div class="col-lg-2">
                
                <div class="box bg-white">
                    <div class="box-body">
                        <div class="col-md-12">
                            <div class="text-center bt-0 border-light p-2">
                                <div class="input-group">
                                    <input type="search" id="Ticket_SearchCustomerBD" class="form-control" placeholder="Search" aria-label="Search" aria-describedby="button-addon2">
                                </div>
                            </div>
                            <div class="box-body p-0">
                                <div id="Ticket_ListCustomer" class="scrollable ps-container ps-theme-default ps-active-y" style="overflow: hidden; width: auto; height: 650px;">
                                    <div class="media media-single"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>-->
            <div class="col-12 col-xl-12">
                <div class="row">
                    <div class="col-12">
                        <div class="box bg-white">
                            <div class="box-body">
                                <iframe src="https://app.bantudagang.com/login" style="width: 100%; height: 700px;" frameborder="0" ></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

	<div id="chat-box-body"></div>
	<div id="chat-box-bodyDrop"></div>
	<div id="divdrop"></div>
	 <div class="modal modal-right fade" id="modal-SearchUI" tabindex="-1" data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">
                        <a href="#" class="hover-primary" onclick="SearchingOtherChannel()"><i class="mdi mdi-account-settings-variant" style="font-size: 25px;"></i></a>
                        Ticketing System Integration
                    </h5>
                    <button type="button" id="chat-box-toggle" class="close" data-dismiss="modal">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">                    
                       <%-- <div class="col-md-12">
                            <div class="form-group">
                                <label id="HeaderFilterBD"></label>
                                <input type="text" id="txtSearchTicket" class="form-control" placeholder="Search..." title="Search..." aria-label="Search..." aria-describedby="button-addon2">
                            </div>
							
                        </div>--%>
                         <div class="col-md-12">
                            <div class="form-group">
                                <label id="HeaderFilterBD"></label>
                                <div class="input-group">
                                    <input type="text" class="form-control" placeholder="Search" required="" aria-invalid="false" id="txtSearchTicket">
                                    <span class="input-group-append">
                                        <button class="btn btn-primary btn-sm" type="button" onclick="FuncListDataTicket()">Submit</button>
                                    </span>
                                </div>
                                <%--<input type="search" id="API_FilterValueBD" class="form-control" placeholder="Filter Value" title="Filter Value" disabled aria-label="Search" aria-describedby="button-addon2">--%>
                            </div>
                        </div>
						<div class="col-md-12">
							<div class="box-body p-0">
							  <div class="box">
					
								<div class="box-body p-20" id="listSearchTicket">
								  
								  
								</div>
							  </div>
							</div>
						</div>
                        <div class="col-md-12">
                            <div class="box">

                                <div id="chatView" class="box bg-lightest" style="display: none;">
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


                                <div id="orderView" class="box-body p-0" style="display: none;">

                                    <p class="mt-0 px-30 bt-1 py-5 bg-light">
                                        <img src="../images/bd/lazada.png" height="28">
                                        Mothercare | <i class="fa fa-calendar"></i>Sept 16th, 2018 | <i class="fa fa-navicon"></i>
                                        <a href="#">Sedang Dikemas</a>
                                    </p>
                                    <div class="media">
                                        <img class="align-self-start w-80" src="../images/bd/orderproduk.jpg" alt="Order">
                                        <div class="media-body">
                                            <div>
                                                <div>
                                                    <span>Mothercare Tiger Face Long-Sleeved T-Shirt - Kaos Anak Laki-laki (Kuning)</span>
                                                </div>
                                                <div>Variasi: 5-6 Years</div>
                                                <div>
                                                    x1 
                                                    <input type="checkbox" id="vehicle1" class="minimal" name="vehicle1" value="Bike">
                                                    <label for="vehicle1">&nbsp;</label>
                                                </div>
                                            </div>
                                        </div>
                                        Rp. 125.000,-
                                    </div>
                                    <div class="media">
                                        <img class="align-self-start w-80" src="../images/bd/orderproduk1.jpg" alt="Order">
                                        <div class="media-body">
                                            <div>
                                                <div>
                                                    <span>Mothercare Dino Splat T-Shirt - Kaos Anak Laki-laki (Hijau)</span>
                                                </div>
                                                <div>Variasi: 7-8 Years</div>
                                                <div>
                                                    x1
                                                    <input type="checkbox" id="vehicle1" class="minimal" name="vehicle1" value="Bike">
                                                    <label for="vehicle1">&nbsp;</label>
                                                </div>
                                            </div>
                                        </div>
                                        Rp. 125.000,-
                                    </div>
                                    <p class="mt-0 px-30 bt-1 py-5 bg-light text-right">

                                        <a href="#">Total Pesanan : Rp. 250.000</a>
                                    </p>
                                </div>

                            </div>
                        </div>
                        <!--<div class="col-md-12">
                            <div class="box">
                                <div class="box-body p-0">
                                  
                                  <p class="mt-0 px-30 bt-1 py-5 bg-light">
                                    <img src="../images/bd/tokopedia.png" height="28"> | <i class="fa fa-calendar"></i> Sept 16th, 2018 | <i class="fa fa-navicon"></i>
                                    <a href="#">Sedang Dikemas</a> 
                                  </p>
                                  <div class="media">
                                    <img class="align-self-start w-80" src="../images/bd/orderproduk1.jpg" alt="Order">
                                    <div class="media-body">
                                        <div>
                                            <div>
                                              <span>NIKE CORTEZ PUTIH LIST HIJAU / SNEAKERS CASUAL PRIA WANITA - FREE KAOS KAKI + BOX</span>
                                            </div>
                                            <div>Variasi: 41</div>
                                            <div>x1</div><a class="btn btn-rounded btn-sm btn-bold btn-primary" href="#">Tagging</a>
                                          </div>
                                    </div>
                                  </div>
                                  <p class="mt-0 px-30 bt-1 py-5 bg-light text-right">
                                    
                                    <a href="#">Total Pesanan : Rp. 12.000.000</a>
                                  </p>
                                </div>
                              </div>
                        </div>-->
                    </div>
                    <!--<div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label>Contact Reported</label>
                                <input type="search" id="API_ContactReported" class="form-control" placeholder="Contact Reported" title="Contact Reported" aria-label="Search" aria-describedby="button-addon2">
                            </div>
                        </div>
                    </div>-->
                </div>
                
            </div>
        </div>
    </div>
	<!-- View Modal Data ticket-->
    <div class="modal center-modal fade" id="modal-dataticket" tabindex="-1" aria-hidden="true" style="display: none;">
	  <div class="modal-dialog modal-lg modal-dialog-scrollable">
		<div class="modal-content">
		  <div class="modal-header">
			<h5 class="modal-title">Data Tickets</h5>
			<button type="button" class="close" data-dismiss="modal">
			  <span aria-hidden="true">×</span>
			</button>
		  </div>
		  <div class="modal-body">
			<div class="col-xl-12 col-lg-12">
			  <!-- Box Comment -->
			  <div class="box box-widget">
				<div class="box-header with-border">
				  <div class="user-block">
					<img class="avatar" src="../images/user1-128x128.jpg" alt="User Image">
					<span class="username"><span id="ViewTicketNumber"></span>-<span id="ViewNamaCust"></span></span>
					<span class="description"><span id="ViewStatus"></span>-<span id="ViewChannel"></span>-<span id="ViewWaktu"></span></span>
				  </div>
				  <!-- /.user-block -->              
				  <ul class="box-controls pull-right">				  
					  <li class="dropdown">
                                                      <a data-toggle="dropdown" href="#" aria-expanded="false"><i style="color: black;" class="font-size-18 ti-more-alt rotate-90"></i></a>
                                                      <div class="dropdown-menu dropdown-menu-right" style="will-change: transform;">
                                                        <a class="dropdown-item" href="#" onclick="SendDataToMultichat()"><i class="ti-import"></i> Send To Multichat</a>
                                                        
                                                        <div class="dropdown-divider"></div>
                                                        <a class="dropdown-item" href="#"><i class="ti-settings"></i> Settings</a>
                                                      </div>
                                                    </li>
			      </ul>
				  <!-- /.box-tools -->
				</div>
				<!-- /.box-header -->
				<div class="box-body">
				  <!-- post text -->
				  <p><span id="ViewKeluhanPelanggan"></span></p>

				 
				  <!-- Attachment -->
				  <div class="attachment-block clearfix">
					

					<div class="">
					  
					  <div class="attachment-text">
						<span id="ViewJawabanAgent"></span>
					  </div>
					  <!-- /.attachment-text -->
					</div>
					<!-- /.attachment-pushed -->
				  </div>
				  <!-- /.attachment-block -->

				  <!-- Social sharing buttons -->
				  <span class="pull-right text-muted">All Interaction Agents</span>
				</div>
				<!-- /.box-body -->
				<div class="box-footer box-comments" id="DataListInteraction">
				  
				  <!-- /.box-comment -->
				  
				  <!-- /.box-comment -->
				</div>
				<!-- /.box-footer -->
				
				<!-- /.box-footer -->
			  </div>
			  <!-- /.box -->
			</div>
			<!-- /.col -->
		  </div>
		  <div class="modal-footer modal-footer-uniform">
			<button type="button" class="btn btn-rounded btn-secondary" data-dismiss="modal">Close</button>
			
		  </div>
		</div>
	  </div>
	</div>
    <!--End-->
    <div class="modal modal-right fade" id="modal-SearchAPI" tabindex="-1" data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">
                        <a href="#" class="hover-primary" onclick="SearchingOtherChannel()"><i class="mdi mdi-account-settings-variant" style="font-size: 25px;"></i></a>
                        Form Searching Customer API
                    </h5>
                    <button type="button" id="chat-box-toggle" class="close" data-dismiss="modal">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label>Pilih Filter</label>
                                <select class="form-control" style="height: 33px;" id="ComboFilter" onchange="OnChange_Profile(1);">
                                    <option value="">Select</option>
                                    <option value="1">NIK</option>
                                    <option value="2">Nomor Polis</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label id="HeaderFilter"></label>
                                <input type="search" id="API_FilterValue" class="form-control" placeholder="Filter Value" title="Filter Value" disabled aria-label="Search" aria-describedby="button-addon2">
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label>Contact Reported</label>
                                <input type="search" id="API_ContactReported" class="form-control" placeholder="Contact Reported" title="Contact Reported" aria-label="Search" aria-describedby="button-addon2">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer modal-footer-uniform">
                    <button type="button" class="btn btn-rounded btn-danger" onclick="CloseSearchingAPI()">Close</button>
                    <a class="btn btn-rounded btn-primary float-right" href="#" onclick="Get_ProfileAPI()">Submit</a>
                </div>
            </div>
        </div>
    </div>
	<script src="js/XtraBD.js"></script>
</asp:Content>
