﻿<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/apps/Uidesk.Master" CodeBehind="CVG_Repot_DigitalChannel.aspx.vb" Inherits="ICC.CVG_Repot_DigitalChannel" %>


<%@ Register Assembly="DevExpress.Web.v20.1, Version=20.1.4.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a" Namespace="DevExpress.Web" TagPrefix="dx" %>
<%@ Register Assembly="DevExpress.Web.ASPxHtmlEditor.v20.1, Version=20.1.4.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a" Namespace="DevExpress.Web.ASPxHtmlEditor" TagPrefix="dx" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <section class="content">
        <div class="row">
            <div class="col-12">
                <div class="box">
                    <div class="box-header with-border">
                        <h4 class="box-title">Data Report Interaction</h4>
                    </div>
                    <div class="box-body">
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
                                    HoverStyle-BackColor="#0072C6" Height="33px" Width="100%" HoverStyle-Border-BorderColor="#0072C6">
                                </dx:ASPxButton>
                            </div>
                        </div>
                        <hr />
                        <dx:ASPxGridView ID="ASPxGridView1" ClientInstanceName="ASPxGridView" runat="server" Width="100%" Styles-Header-HorizontalAlign="Center"
                            Theme="MetropolisBlue" DataSourceID="XtraInteraction" Styles-Header-Font-Bold="true" Font-Size="X-Small">
                            <SettingsPager>
                                <AllButton Text="All">
                                </AllButton>
                                <NextPageButton Text="Next &gt;">
                                </NextPageButton>
                                <PrevPageButton Text="&lt; Prev">
                                </PrevPageButton>
                                <PageSizeItemSettings Visible="true" Items="10, 15, 20" ShowAllItem="true" />
                            </SettingsPager>
                            <Settings ShowFilterRow="true" ShowFilterRowMenu="false" ShowGroupPanel="true" ShowVerticalScrollBar="false" ShowHorizontalScrollBar="false" />
                            <Columns>
                                <dx:GridViewDataTextColumn Caption="ID" FieldName="NoUrut" Width="40px" CellStyle-HorizontalAlign="Center"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn Caption="Header ID" FieldName="HeaderID" Width="200px"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn Caption="Description" FieldName="DescriptionNonHtml" Width="200px"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn Caption="Status Data" FieldName="StatusData" Width="200px"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn Caption="Create Name" FieldName="CreateName" Width="200px" CellStyle-HorizontalAlign="Left"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataDateColumn Caption="Create Date" FieldName="CreatedDate" Width="200px" CellStyle-HorizontalAlign="Left" PropertiesDateEdit-DisplayFormatString="yyyy-MM-dd hh:mm:ss"></dx:GridViewDataDateColumn>
                            </Columns>
                        </dx:ASPxGridView>
                        <hr />
                        <div class="row">
                            <div class="col-sm-2">
                                <asp:DropDownList runat="server" ID="ddList" Height="30" CssClass="form-control input-sm">
                                    <asp:ListItem Value="xlsx" Text="Excel" />
                                    <asp:ListItem Value="xls" Text="Excel 97-2003" />
                                    <%--<asp:ListItem Value="pdf" Text="PDF" />--%>
                                    <asp:ListItem Value="rtf" Text="RTF" />
                                    <asp:ListItem Value="csv" Text="CSV" />
                                </asp:DropDownList>
                            </div>
                            <div class="col-sm-2">
                                <dx:ASPxButton ID="btn_Export" runat="server" Text="Export" Theme="Metropolis" ValidationGroup="SMLvalidationGroup"
                                    HoverStyle-BackColor="#0072C6" Height="30px" Width="100%" HoverStyle-Border-BorderColor="#0072C6">
                                </dx:ASPxButton>
                            </div>
                        </div>
                        <dx:ASPxGridViewExporter ID="ASPxGridViewExporter1" runat="server" GridViewID="ASPxGridView1"></dx:ASPxGridViewExporter>
                        <asp:SqlDataSource ID="XtraInteraction" ConnectionString="<%$ ConnectionStrings:DefaultConnection %>" runat="server"></asp:SqlDataSource>
                    </div>
                    <div class="box-footer">
                    </div>
                </div>
            </div>
        </div>
    </section>
</asp:Content>
