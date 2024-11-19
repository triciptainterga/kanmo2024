<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/apps/Uidesk.Master" CodeBehind="4_Reports_base_trx_new.aspx.vb" Inherits="ICC._4_Reports_base_trx_new" %>

<%@ Register Assembly="DevExpress.Web.v20.1, Version=20.1.4.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a" Namespace="DevExpress.Web" TagPrefix="dx" %>
<%@ Register Assembly="DevExpress.Web.ASPxHtmlEditor.v20.1, Version=20.1.4.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a" Namespace="DevExpress.Web.ASPxHtmlEditor" TagPrefix="dx" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="container-full">
        <div class="content-header">
            <div class="d-flex align-items-center">
                <div class="w-p100 d-md-flex align-items-center justify-content-between">
                    <h3 class="page-title"></h3>
                    <div class="d-inline-block align-items-center">
                        <nav>
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item active" aria-current="page">Report base On Transaction</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
        <section class="content">
            <div class="row" runat="server">
                <div class="col-xl-12 col-lg-12 col-12">
                    <div class="box">
                        <div class="box-body p-15">
                            <div class="row" style="margin-bottom: -15px;">
                                <div class="col-sm-2">
                                    <label>Start Date</label>
                                    <dx:aspxdateedit id="dt_strdate" runat="server" cssclass="form-control input-sm" width="100%" editformatstring="yyyy-MM-dd">
                                        <validationsettings errortextposition="Bottom" errordisplaymode="ImageWithText" validationgroup="SMLvalidationGroup">
                                            <requiredfield isrequired="true" errortext="Must be filled" />
                                        </validationsettings>
                                    </dx:aspxdateedit>
                                </div>
                                <div class="col-sm-2">
                                    <label>End Date</label>
                                    <dx:aspxdateedit id="dt_endate" runat="server" cssclass="form-control input-sm" width="100%" editformatstring="yyyy-MM-dd">
                                        <validationsettings errortextposition="Bottom" errordisplaymode="ImageWithText" validationgroup="SMLvalidationGroup">
                                            <requiredfield isrequired="true" errortext="Must be filled" />
                                        </validationsettings>
                                    </dx:aspxdateedit>
                                </div>
                                <div class="col-sm-2" style="margin-top: 5px;">
                                    <br />
                                    <dx:aspxbutton id="btn_Submit" runat="server" theme="Metropolis" autopostback="False" text="Submit" validationgroup="SMLvalidationGroup"
                                        hoverstyle-backcolor="#EE4D2D" height="30px" width="100%">
                                    </dx:aspxbutton>
                                </div>
                            </div>
                            <hr />
                            <dx:aspxgridview id="ASPxGridView1" clientinstancename="ASPxGridView1" runat="server" font-size="Small"
                                datasourceid="TempBaseTrx" width="100%" styles-header-font-bold="true" theme="MetropolisBlue" styles-header-horizontalalign="Center" styles-cell-horizontalalign="Center">
                                <settingspager>
                                    <allbutton text="All">
                                    </allbutton>
                                    <nextpagebutton text="Next &gt;">
                                    </nextpagebutton>
                                    <prevpagebutton text="&lt; Prev">
                                    </prevpagebutton>
                                    <pagesizeitemsettings visible="true" items="10, 15, 20" showallitem="true" />
                                </settingspager>
                                <settings showfilterrow="true" showfilterrowmenu="false" showgrouppanel="true" showfilterbar="Hidden" enablefiltercontrolpopupmenuscrolling="true"
                                    showverticalscrollbar="false" showfooter="false" showhorizontalscrollbar="true" />
                                <columns>
                                    <dx:gridviewdatatextcolumn caption="No" fieldname="NoUrut" width="40px"></dx:gridviewdatatextcolumn>
                                    <dx:gridviewdatatextcolumn caption="Interaction ID" fieldname="GenesysID" width="250px"></dx:gridviewdatatextcolumn>
                                    <dx:gridviewdatatextcolumn caption="Thread ID" fieldname="ThreadID" width="250px"></dx:gridviewdatatextcolumn>
                                    <dx:gridviewdatatextcolumn caption="Ticket Number" fieldname="TicketNumber" width="250px"></dx:gridviewdatatextcolumn>
                                    <dx:gridviewdatatextcolumn caption="Account" fieldname="AccountInbound" width="250px"></dx:gridviewdatatextcolumn>
                                    <%--<dx:GridViewDataTextColumn Caption="Account ID" FieldName="AccountID" Width="200px"></dx:GridViewDataTextColumn>--%>
                                    <dx:gridviewdatatextcolumn caption="Customer ID" fieldname="NIK" width="250px"></dx:gridviewdatatextcolumn>
                                    <dx:gridviewdatatextcolumn caption="Fulfillment" fieldname="Fulfillment" width="250px"></dx:gridviewdatatextcolumn>
                                    <dx:gridviewdatatextcolumn caption="Group Name" fieldname="AgentGroupName" width="250px"></dx:gridviewdatatextcolumn>
                                    <dx:gridviewdatatextcolumn caption="Brand Category" fieldname="BrandCategory" headerstyle-horizontalalign="left" width="250px"></dx:gridviewdatatextcolumn>
                                    <dx:gridviewdatatextcolumn caption="Brand Name" fieldname="ProductName" headerstyle-horizontalalign="left" width="250px"></dx:gridviewdatatextcolumn>
                                    <dx:gridviewdatatextcolumn caption="Activity" fieldname="JenisNasabah" headerstyle-horizontalalign="left" width="250px"></dx:gridviewdatatextcolumn>
                                    <dx:gridviewdatatextcolumn caption="Type" fieldname="CategoryName" width="200px"></dx:gridviewdatatextcolumn>
                                    <dx:gridviewdatatextcolumn caption="Category" fieldname="Level1" width="200px"></dx:gridviewdatatextcolumn>
                                    <dx:gridviewdatatextcolumn caption="Meta" fieldname="Level2" width="300px" propertiestextedit-encodehtml="false"></dx:gridviewdatatextcolumn>
                                    <dx:gridviewdatatextcolumn caption="Sub Category" fieldname="Level3" width="300px"></dx:gridviewdatatextcolumn>
                                    <dx:gridviewdatatextcolumn caption="Description" fieldname="DescriptionNonHtml" propertiestextedit-encodehtml="false" width="650px"></dx:gridviewdatatextcolumn>
                                    <dx:gridviewdatatextcolumn caption="Source" fieldname="SkalaPrioritas" headerstyle-horizontalalign="left" width="250px"></dx:gridviewdatatextcolumn>
                                    <dx:gridviewdatatextcolumn caption="Escalation Unit" fieldname="EscalationUnit" headerstyle-horizontalalign="left" width="250px"></dx:gridviewdatatextcolumn>
                                    <dx:gridviewdatatextcolumn caption="Ticket Status" fieldname="NewStatus" width="250px"></dx:gridviewdatatextcolumn>
                                    <dx:gridviewdatatextcolumn caption="SLA" fieldname="SLA" headerstyle-horizontalalign="left" width="150px"></dx:gridviewdatatextcolumn>
                                    <dx:gridviewdatatextcolumn caption="Name" fieldname="CustomerName" width="250px"></dx:gridviewdatatextcolumn>
                                    <dx:gridviewdatatextcolumn caption="Email Address" fieldname="Email" width="250px"></dx:gridviewdatatextcolumn>
                                    <dx:gridviewdatatextcolumn caption="Phone Number" fieldname="HP" width="250px"></dx:gridviewdatatextcolumn>
                                    <dx:gridviewdatatextcolumn caption="Account Number" fieldname="NomorRekening" headerstyle-horizontalalign="left" width="150px"></dx:gridviewdatatextcolumn>
                                    <dx:gridviewdatatextcolumn caption="Address" fieldname="AlamatNonHtml" width="250px"></dx:gridviewdatatextcolumn>
                                    <dx:gridviewdatatextcolumn caption="Channel" fieldname="TicketSourceName" width="250px"></dx:gridviewdatatextcolumn>
                                    <dx:GridViewDataTextColumn Caption="Order Number" FieldName="NomorRekening" Width="250px"></dx:GridViewDataTextColumn>
                                    <dx:gridviewdatatextcolumn caption="Created By" fieldname="CreatedByNew" width="250px"></dx:gridviewdatatextcolumn>
                                    <dx:gridviewdatadatecolumn caption="Created Date" fieldname="CreatedDate" width="250px" propertiesdateedit-displayformatstring="yyyy-MM-dd hh:mm:ss"></dx:gridviewdatadatecolumn>
                                    <%-- <dx:GridViewDataTextColumn Caption="Solved By" FieldName="UserSolved" Width="150px"></dx:GridViewDataTextColumn>
                                    <dx:GridViewDataTextColumn Caption="Solved Date" FieldName="DateSolvedDisplay" Width="150px"></dx:GridViewDataTextColumn>--%>
                                    <dx:gridviewdatatextcolumn caption="Closed By" fieldname="ClosedByNew" width="250px"></dx:gridviewdatatextcolumn>
                                    <dx:gridviewdatatextcolumn caption="Closed Date" fieldname="NewDateClosed" width="250px"></dx:gridviewdatatextcolumn>
                                </columns>
                            </dx:aspxgridview>
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
                    <dx:aspxbutton id="btn_Export" runat="server" text="Export" theme="Metropolis" validationgroup="SMLvalidationGroup"
                        hoverstyle-backcolor="#EE4D2D" height="30px" width="100%">
                    </dx:aspxbutton>
                </div>
            </div>
            <hr />
            <dx:aspxgridviewexporter id="ASPxGridViewExporter1" runat="server" gridviewid="ASPxGridView1"></dx:aspxgridviewexporter>
            <asp:SqlDataSource ID="TempBaseTrx" ConnectionString="<%$ ConnectionStrings:DefaultConnection %>" runat="server"></asp:SqlDataSource>
        </section>
    </div>
</asp:Content>


