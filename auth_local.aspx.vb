Imports System
Imports System.Web.UI
Imports System.Data.SqlClient
Imports Microsoft.VisualBasic
Public Class auth_local
    Inherits System.Web.UI.Page

    Public AddCookiess As String = ConfigurationManager.AppSettings.Item("AddCookiess")

    Dim Proses As New ClsConn
    Dim sqldr, readLDAP, _reading As SqlDataReader
    Dim sql As String
    Dim valuesatu As Integer = 1
    Dim valuedua As Integer = 2
    Dim valuetiga As Integer = 3
    Dim ValueEmpat As Integer = 4
    Dim valueLima As Integer = 5
    Dim valueTest As Integer = 10

    Dim valueDispatchLayer2 As Integer = 2
    Dim valueDispatchLayer3 As Integer = 3
    Dim valueReassignLayer1 As Integer = 1

    Dim leveluser As String
    Dim value As String
    Dim CountLDAP As String = String.Empty
    Dim Con As New SqlConnection(ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString)
    Dim sqlcon As New SqlConnection(ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString)
    Dim sqlconaux As New SqlConnection(ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString)
    Dim com, sqlcom, sqlcomaux As SqlCommand

    Dim connString As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
    Dim recLDAP As Integer
    Dim recCount As Integer
    Dim _ClassFunction As New WebServiceTransaction
    Dim strLogTime As String = DateTime.Now.ToString("yyyy")
    Dim _ClassAux As New TrmAux
    Dim VariabelCookiesUsername As New HttpCookie("CookiesUserName")
    Dim strCounting As String = String.Empty
    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load

    End Sub

    Private Sub Login_ButtonSubmit_ServerClick(sender As Object, e As EventArgs) Handles Login_ButtonSubmit.ServerClick
        Try
            Using conn As New SqlConnection(connString)
                conn.Open()
                strCounting = "Select COUNT (UserID) as userID from msUser where UserName=@uservalue"
                Dim cmd As SqlCommand = New SqlCommand(strCounting, conn)
                Dim uservalue As SqlParameter = New SqlParameter("@uservalue", SqlDbType.VarChar, 150)
                uservalue.Value = Login_Username.Value
                cmd.Parameters.Add(uservalue)
                recLDAP = cmd.ExecuteScalar()
                If recLDAP = 1 Then
                    _ClassFunction.LogSuccess(strLogTime, strCounting)
                    AccessLogin(Login_Username.Value, Login_Password.Value)
                Else
                    _ClassFunction.LogSuccess(Session("UserName"), strCounting)
                End If
            End Using
        Catch ex As Exception
            _ClassFunction.LogError(Session("UserName"), ex, strCounting)
            Response.Write(ex.Message)
        End Try
    End Sub
    Function AccessLogin(ByVal UserName As String, ByVal Password As String)
        Dim Login_True As String = ""
        sql = "exec SP_LOGIN_APPLIKASI  '" & UserName & "','" & Password & "'"
        'sql = "EXEC SP_LOGIN_APPLIKASI  '" & username & "','" & _ClassFunction.Encrypt(password) & "'"
        Try
            sqldr = Proses.ExecuteReader(sql)
            If sqldr.HasRows Then
                sqldr.Read()
                leveluser = sqldr("LAYER").ToString
                Session("UserName") = sqldr("UserName").ToString
                Session("lblUserName") = sqldr("UserName").ToString
                Session("UnitKerja") = sqldr("UNITKERJA").ToString
                Session("Org") = sqldr("ORGANIZATION_NAME").ToString
                Session("NameKaryawan") = sqldr("NAME").ToString
                Session("LoginType") = sqldr("LAYER").ToString
                Session("lvluser") = sqldr("LevelUser").ToString
                Session("channel_code") = sqldr("CHANNEL_CODE").ToString
                Session("organization") = sqldr("ORGANIZATION").ToString
                Session("orgSupervisor") = sqldr("ORGANIZATION").ToString
                Session("lokasiPengaduan") = ""
                Session("sessionchat") = sqldr("CHAT").ToString
                Session("unitkerjaagent") = sqldr("IdGrup").ToString
                Session("ROLE") = sqldr("LEVELUSER").ToString
                Session("LEVELUSERID") = sqldr("ROLE_ID").ToString
                Session("LoginTypeAngka") = sqldr("NumberNya").ToString
                Session("_LoginState") = sqldr("LoginState").ToString
                Session("NamaGrup") = sqldr("NamaGrup").ToString
                Session("EscalationIdentity") = sqldr("EscalationIdentity").ToString
                Session("EscalationTo") = sqldr("EscalationTo").ToString
                Session("LevelUserID") = sqldr("LevelUserID").ToString
                Session("EmailAddress") = sqldr("EMAIL_ADDRESS").ToString
                Session("Foto") = sqldr("URL").ToString
                Session("Extension") = sqldr("PBXUSER").ToString

                VariabelCookiesUsername.Values("CookiesUserName") = sqldr("UserName").ToString
                VariabelCookiesUsername.Expires = DateTime.Now.AddDays(AddCookiess)
                Response.Cookies.Add(VariabelCookiesUsername)
                Login_True = "YesExist"
            End If
            sqldr.Close()
            _ClassFunction.LogSuccess(Session("UserName"), sql)
        Catch ex As Exception
            _ClassFunction.LogError(Session("UserName"), ex, sql)
            Response.Write(ex.Message)
        End Try

        Dim strSosmed As String = "select * from UIDESK_SOCIAL_ACCOUNT where AccountID='" & Request.QueryString("id") & "'"
        Try
            sqldr = Proses.ExecuteReader(strSosmed)
            If sqldr.HasRows Then
                sqldr.Read()
                Session("token") = sqldr("AccountToken").ToString
                Session("accountid") = sqldr("AccountID").ToString
                Session("accountname") = sqldr("AccountName").ToString
                Session("accounturl") = sqldr("AccountURL").ToString
                Session("webhookurl") = sqldr("Webhook").ToString
            Else
            End If
            sqldr.Close()
            _ClassFunction.LogSuccess(Session("UserName"), strSosmed)
        Catch ex As Exception
            _ClassFunction.LogError(Session("UserName"), ex, strSosmed)
            Response.Write(ex.Message)
        End Try

        Dim strAux As String = "SELECT TOP 1 * FROM UIDESK_TrxAux WHERE AuxUserName='" & Session("username") & "' ORDER BY ID DESC"
        Try
            sqldr = Proses.ExecuteReader(strAux)
            If sqldr.HasRows Then
                sqldr.Read()
                If sqldr("AuxID").ToString <> "9" Then
                    _ClassAux.InsertAgentAux("9", Session("UserName"))
                    _ClassAux.InsertLoginActivity("9", Session("UserName"), "Insert")
                Else
                    _ClassAux.InsertLoginActivity("9", Session("UserName"), "Insert")
                End If
            Else
                _ClassAux.InsertLoginActivity("9", Session("UserName"), "Insert")
            End If
            sqldr.Close()
            _ClassFunction.LogSuccess(Session("UserName"), strAux)
        Catch ex As Exception
            _ClassFunction.LogError(Session("UserName"), ex, strAux)
            Response.Write(ex.Message)
        End Try

        If Request.QueryString("") <> "" Then
            _ClassAux.InsertLoginActivity("9", Session("UserName"), "Update")
        Else
        End If
        If Login_True = "YesExist" Then
            Response.Redirect("apps/2_taskboard.aspx?status=open")
        Else
            Login_NotifErr.Visible = True
        End If
    End Function

End Class