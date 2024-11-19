Public Class Dashboard_Ticketing
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load

    End Sub

    Private Sub ASPxGridView1_Init(sender As Object, e As EventArgs) Handles ASPxGridView1.Init
        TempBaseTrx.SelectCommand = "EXEC Dashboard_L1_Gridview '" & Session("UserName") & "'"
    End Sub
    Private Sub ASPxGridView1_Load(sender As Object, e As EventArgs) Handles ASPxGridView1.Load
        TempBaseTrx.SelectCommand = "EXEC Dashboard_L1_Gridview '" & Session("UserName") & "'"
    End Sub
End Class