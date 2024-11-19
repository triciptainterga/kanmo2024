﻿<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/apps/Uidesk.Master" CodeBehind="1_docalendar.aspx.vb" Inherits="ICC._1_docalendar" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
   
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
     <!-- Content Wrapper. Contains page content -->
  <div class="content">
	  <div class="container-full">
		<!-- Content Header (Page header) -->
		<div class="content-header">
			<div class="d-flex align-items-center">
				<div class="w-p100 d-md-flex align-items-center justify-content-between">
					<h3 class="page-title">Calendar</h3>
					<div class="d-inline-block align-items-center">
						<nav>
							<ol class="breadcrumb">
								<li class="breadcrumb-item"><a href="#"><i class="mdi mdi-home-outline"></i></a></li>
								<li class="breadcrumb-item" aria-current="page">Extra</li>
								<li class="breadcrumb-item active" aria-current="page">Calendar</li>
							</ol>
						</nav>
					</div>
				</div>
				
			</div>
		</div>

		<!-- Main content -->
		<section class="content">

		  <div class="row">
			
			<div class="col-12">
				<div class="box">
					<div class="box-body">
						<div class="row">
							<div class="col-xl-3 col-lg-4 col-12">
								<div class="box no-border no-shadow">
									<div class="box-header with-border">
									  <h4 class="box-title">Draggable Events</h4>
									</div>
									<div class="box-body p-0">
									  <!-- the events -->
									  <div id="external-events">
										<div class="external-event m-15 bg-primary" data-class="bg-primary"><i class="fa fa-hand-o-right"></i>Lunch</div>
										<div class="external-event m-15 bg-warning" data-class="bg-warning"><i class="fa fa-hand-o-right"></i>Go home</div>
										<div class="external-event m-15 bg-info" data-class="bg-info"><i class="fa fa-hand-o-right"></i>Do homework</div>
										<div class="external-event m-15 bg-success" data-class="bg-success"><i class="fa fa-hand-o-right"></i>Work on UI design</div>
										<div class="external-event m-15 bg-danger" data-class="bg-danger"><i class="fa fa-hand-o-right"></i>Sleep tight</div>
									  </div>
									  <div class="event-fc-bt mx-15 my-20">
										<!-- checkbox -->
										<div class="checkbox">
											<input id="drop-remove" type="checkbox">
											<label for="drop-remove">
												Remove after drop
											</label>
										</div>
										<a href="#" data-toggle="modal" data-target="#add-new-events" class="btn btn-rounded btn-success btn-block my-10">
											<i class="ti-plus"></i> Add New Event
										</a>
									  </div>
								   </div>
							  </div>								
							</div>
							<div class="col-xl-9 col-lg-8 col-12">	
								<div id="calendar"></div>
							</div>
						</div>
					</div>
				</div>  
			  </div>  
			  
			</div>
		  <!-- /.row -->

		</section>
		<!-- /.content -->
	  </div>	  
	
  </div>
  <!-- /.content-wrapper -->
	
  
  <!-- BEGIN MODAL -->
	<!-- Modal Add Category -->
	<div class="modal fade none-border" id="add-new-events">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h4 class="modal-title"><strong>Add</strong> a category</h4>
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
				</div>
				<div class="modal-body">
					<form role="form">
						<div class="row">
							<div class="col-md-6">
								<label class="control-label">Category Name</label>
								<input class="form-control form-white" placeholder="Enter name" type="text" id="category-name" name="category-name" />
							</div>
							<div class="col-md-6">
								<label class="control-label">Choose Category Color</label>
								<select class="form-control form-white" data-placeholder="Choose a color..." id="category-color" name="category-color">
									<option value="success">Success</option>
									<option value="danger">Danger</option>
									<option value="info">Info</option>
									<option value="primary">Primary</option>
									<option value="warning">Warning</option>
									<option value="inverse">Inverse</option>
								</select>
							</div>
						</div>
					</form>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-rounded btn-success save-category" data-dismiss="modal">Save</button>
					<button type="button" class="btn btn-rounded btn-danger" data-dismiss="modal">Close</button>
				</div>
			</div>
		</div>
	</div>
	<!-- END MODAL -->
</asp:Content>
