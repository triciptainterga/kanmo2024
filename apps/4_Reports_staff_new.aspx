<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/apps/Uidesk.Master" CodeBehind="4_Reports_staff_new.aspx.vb" Inherits="ICC._4_Reports_staff_new" %>

<%@ Register Assembly="DevExpress.Web.v20.1, Version=20.1.4.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a" Namespace="DevExpress.Web" TagPrefix="dx" %>
<%@ Register Assembly="DevExpress.Web.ASPxHtmlEditor.v20.1, Version=20.1.4.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a" Namespace="DevExpress.Web.ASPxHtmlEditor" TagPrefix="dx" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="container-full">
        <!-- Content Header (Page header) -->
        <div class="content-header">
            <br />
            <div class="d-flex align-items-center">
                <div class="w-p100 d-md-flex align-items-center justify-content-between">
                    <h3 class="page-title"></h3>
                    <div class="d-inline-block align-items-center">
                        <nav>
                            <ol class="breadcrumb">
<%--                                <li class="breadcrumb-item"><a href="#"><i class="mdi mdi-home-outline"></i></a></li>
                                <li class="breadcrumb-item" aria-current="page">Page</li>--%>
                                <li class="breadcrumb-item active" aria-current="page"><b>Report base on Staff</b></li>
                            </ol>
                        </nav>
                    </div>
                </div>

            </div>
        </div>
        <!-- Main content -->
        <section class="content">
            <div class="row" runat="server">
                <div class="col-xl-12 col-lg-12 col-12">
                    <div class="box">
                        <div class="box-body p-15">
                            <!-- New Template #RestuCode 2020-12-07 20:30 -->
                            <div class="row" style="margin-bottom: -15px;">
                                <div class="col-sm-2">
                                    <label>Start Date</label>
                                    <dx:ASPxDateEdit ID="dt_strdate" runat="server" CssClass="form-control input-sm" Width="100%" EditFormatString="yyyy-MM-dd">
                                        <ValidationSettings ErrorTextPosition="Bottom" ErrorDisplayMode="ImageWithText" ValidationGroup="SMLvalidationGroup">
                                            <RequiredField IsRequired="true" ErrorText="Must be filled" />
                                        </ValidationSettings>
                                    </dx:ASPxDateEdit>
                                </div>
                                <div class="col-sm-2">
                                    <label>End Date</label>
                                    <dx:ASPxDateEdit ID="dt_endate" runat="server" CssClass="form-control input-sm" Width="100%" EditFormatString="yyyy-MM-dd">
                                        <ValidationSettings ErrorTextPosition="Bottom" ErrorDisplayMode="ImageWithText" ValidationGroup="SMLvalidationGroup">
                                            <RequiredField IsRequired="true" ErrorText="Must be filled" />
                                        </ValidationSettings>
                                    </dx:ASPxDateEdit>
                                </div>
                                <div class="col-sm-2" style="margin-top: 5px;">
                                    <br />
                                    <dx:ASPxButton ID="btn_Submit" runat="server" Theme="Metropolis" AutoPostBack="False" Text="Submit" ValidationGroup="SMLvalidationGroup"
                                        HoverStyle-BackColor="#EE4D2D" Height="30px" Width="100%">
                                    </dx:ASPxButton>
                                </div>
                            </div>
                            <hr />
                            <dx:ASPxGridView ID="ASPxGridView1" ClientInstanceName="ASPxGridView1" DataSourceID="tempTrxStaff" runat="server" Width="100%" 
                                Font-Size="Small" Styles-Header-Font-Bold="true" Theme="MetropolisBlue">
                                <SettingsPager>
                                    <AllButton Text="All">
                                    </AllButton>
                                    <NextPageButton Text="Next &gt;">
                                    </NextPageButton>
                                    <PrevPageButton Text="&lt; Prev">
                                    </PrevPageButton>
                                    <PageSizeItemSettings Visible="true" Items="10, 15, 20" ShowAllItem="true" />
                                </SettingsPager>
                                <Settings ShowFilterRow="true" ShowFilterRowMenu="false" ShowGroupPanel="true" ShowVerticalScrollBar="false" ShowHorizontalScrollBar="true" />
                                <Columns>
                                    <dx:GridViewDataTextColumn Caption="No" FieldName="No" Width="40px" CellStyle-HorizontalAlign="Center"></dx:GridViewDataTextColumn>
                                    <dx:GridViewDataTextColumn Caption="Agent Name" FieldName="AgentName" Width="150px"></dx:GridViewDataTextColumn>
                                    <dx:GridViewDataTextColumn Caption="Login ID" FieldName="LoginID" Width="150px"></dx:GridViewDataTextColumn>
                                    <dx:GridViewDataTextColumn Caption="Interaction ID" FieldName="GenesysID" Width="250px"></dx:GridViewDataTextColumn>
                                    <dx:GridViewDataTextColumn Caption="Thread ID" FieldName="ThreadID" Width="150px"></dx:GridViewDataTextColumn>
                                    <dx:GridViewDataTextColumn Caption="Ticket Number" FieldName="TicketNumber" Width="150px"></dx:GridViewDataTextColumn>
                                    <dx:GridViewDataTextColumn Caption="Account" FieldName="AccountInbound" Width="150px"></dx:GridViewDataTextColumn>
                                    <%--<dx:GridViewDataTextColumn Caption="Account ID" FieldName="AccountID" Width="150px"></dx:GridViewDataTextColumn>--%>
                                    <dx:GridViewDataTextColumn Caption="Customer ID" FieldName="NIK" Width="150px"></dx:GridViewDataTextColumn>
                                    <dx:GridViewDataTextColumn Caption="Customer Name" FieldName="CustomerName" Width="150px"></dx:GridViewDataTextColumn>
                                    <dx:GridViewDataTextColumn Caption="Phone Number" FieldName="PhoneNumber" Width="150px"></dx:GridViewDataTextColumn>
                                    <dx:GridViewDataTextColumn Caption="Department" FieldName="Channel_Code" Width="150px"></dx:GridViewDataTextColumn>
                                    <dx:GridViewDataTextColumn Caption="Type" FieldName="CategoryName" Width="150px"></dx:GridViewDataTextColumn>
                                    <dx:GridViewDataTextColumn Caption="Category" FieldName="Level1" Width="150px"></dx:GridViewDataTextColumn>
                                    <dx:GridViewDataTextColumn Caption="Meta" FieldName="Level2" Width="300px"></dx:GridViewDataTextColumn>
                                    <dx:GridViewDataTextColumn Caption="Sub Category" FieldName="Level3" Width="300px"></dx:GridViewDataTextColumn>
                                    <dx:GridViewDataTextColumn Caption="Description" PropertiesTextEdit-EncodeHtml="false" FieldName="DescriptionNonHtml" Width="150px"></dx:GridViewDataTextColumn>
                                    <dx:GridViewDataTextColumn Caption="Ticket Status" FieldName="TicketStatus"></dx:GridViewDataTextColumn>
                                    <dx:GridViewDataTextColumn Caption="Group Name" FieldName="AgentGroupName" Width="150px"></dx:GridViewDataTextColumn>
                                    <%--<dx:GridViewDataTextColumn Caption="Site Name" FieldName="SiteName" Width="150px"></dx:GridViewDataTextColumn>--%>
                                    <dx:GridViewDataTextColumn Caption="Created By" FieldName="CreatedByNew" Width="150px"></dx:GridViewDataTextColumn>
                                    <dx:GridViewDataDateColumn Caption="Created Date" FieldName="CreatedDate" Width="150px" PropertiesDateEdit-DisplayFormatString="yyyy-MM-dd hh:mm:ss"></dx:GridViewDataDateColumn>
                                   <%-- <dx:GridViewDataTextColumn Caption="Solved By" FieldName="UserSolved" Width="150px"></dx:GridViewDataTextColumn>
                                    <dx:GridViewDataDateColumn Caption="Solved Date" FieldName="SolvedDate" Width="150px" PropertiesDateEdit-DisplayFormatString="yyyy-MM-dd hh:mm:ss"></dx:GridViewDataDateColumn>--%>
                                    <dx:GridViewDataTextColumn Caption="Closed By" FieldName="ClosedByNew" Width="150px"></dx:GridViewDataTextColumn>
                                    <dx:GridViewDataDateColumn Caption="Closed Date" FieldName="ClosedDate" Width="150px" PropertiesDateEdit-DisplayFormatString="yyyy-MM-dd hh:mm:ss"></dx:GridViewDataDateColumn>
                                </Columns>
                            </dx:ASPxGridView>
                            <!--End-->
                        </div>
                    </div>
                </div>
            </div>
            <hr />
            <div class="row">
                <div class="col-sm-2">
                    <asp:DropDownList runat="server" ID="ddList" Height="30" CssClass="form-control input-sm">
                        <asp:ListItem Value="xlsx" Text="Excel" />
                        <asp:ListItem Value="xls" Text="Excel 97-2003" />
                        <asp:ListItem Value="pdf" Text="PDF" />
                        <asp:ListItem Value="rtf" Text="RTF" />
                        <asp:ListItem Value="csv" Text="CSV" />
                    </asp:DropDownList>
                </div>
                <div class="col-sm-2">
                    <dx:ASPxButton ID="btn_Export" runat="server" Text="Export" Theme="Metropolis" ValidationGroup="SMLvalidationGroup"
                        HoverStyle-BackColor="#EE4D2D" Height="30px" Width="100%">
                    </dx:ASPxButton>
                </div>
            </div>
            <hr />
            <dx:ASPxGridViewExporter ID="ASPxGridViewExporter1" runat="server" GridViewID="ASPxGridView1"></dx:ASPxGridViewExporter>
            <asp:SqlDataSource ID="tempTrxStaff" ConnectionString="<%$ ConnectionStrings:DefaultConnection %>" runat="server"></asp:SqlDataSource>
        </section>
        <!-- /.content -->
    </div>
</asp:Content>
