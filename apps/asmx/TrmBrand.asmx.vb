Imports System.ComponentModel
Imports System.Web
Imports System.Web.Services
Imports System.Web.Script.Services
Imports System.Web.Services.Protocols
Imports System.Web.Script.Serialization
Imports System.Data
Imports System.Data.SqlClient
Imports System.Net
Imports System.IO
Imports System.Xml
Imports System.Data.OleDb
Imports System.Data.Common
Imports System.Net.WebClient
Imports System.Web.Security.AntiXss
' To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line.
' <System.Web.Script.Services.ScriptService()> _
<System.Web.Services.WebService(Namespace:="http://tempuri.org/")>
<System.Web.Services.WebServiceBinding(ConformsTo:=WsiProfiles.BasicProfile1_1)>
<Global.Microsoft.VisualBasic.CompilerServices.DesignerGenerated()>
<ScriptService()>
<ToolboxItem(False)>
Public Class TrmBrand1
    Inherits System.Web.Services.WebService

    Dim sqlcom As SqlCommand
    Dim sqlcon As New SqlConnection(ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString)
    Dim strSql As String
    Dim sqldr As SqlDataReader
    Dim strTime As String = DateTime.Now.ToString("yyyyMMddhhmmssfff")
    Dim strLogTime As String = DateTime.Now.ToString("yyyy")
    Dim Proses As New ClsConn
    Public Class resultInsert
        Public Property TrxID As String
        Public Property Result As String
        Public Property UserID As String
        Public Property NamaNya As String
        Public Property msgSystem As String
        Public Property TicketNumber As String
        Public Property CustomerID As String
        Public Property TrxmsgSystem As String
    End Class
    Public Function ConvertDataTabletoString(ByVal dt As DataTable) As String
        Dim serializer As System.Web.Script.Serialization.JavaScriptSerializer = New System.Web.Script.Serialization.JavaScriptSerializer()
        Dim rows As List(Of Dictionary(Of String, Object)) = New List(Of Dictionary(Of String, Object))()
        Dim row As Dictionary(Of String, Object)

        For Each dr As DataRow In dt.Rows
            row = New Dictionary(Of String, Object)()

            For Each col As DataColumn In dt.Columns
                row.Add(col.ColumnName, dr(col))
            Next

            rows.Add(row)
        Next

        Return serializer.Serialize(rows)
    End Function
    <WebMethod>
    Public Sub LogSuccess(ByVal agentName As String, strValue As String)
        Dim message As String = String.Format("Time: {0}", DateTime.Now.ToString("dd/MM/yyyy hh:mm:ss:fff tt"))
        message += Environment.NewLine
        message += "---------------------------Success-------------------------------------------------------"
        message += Environment.NewLine
        message += String.Format("Message: {0}", strValue)
        message += Environment.NewLine
        message += "---------------------------Success-------------------------------------------------------"
        message += Environment.NewLine

        Try
            Dim DirectoryX As String = Path.Combine(Server.MapPath("~/apps/ErrorLog/" & agentName & "/" & DateTime.Now.ToString("ddMMyyyy")))
            If Not System.IO.Directory.Exists(DirectoryX) Then
                System.IO.Directory.CreateDirectory(DirectoryX)
            End If
        Catch exX As Exception
            ''Try catch untuk error create folder
            Dim pathXX As String = HttpContext.Current.Server.MapPath("~/apps/ErrorLog/" & agentName & "/" & DateTime.Now.ToString("ddMMyyyy") & ".txt")
            Dim messageXX As String = String.Format("Time: {0}", DateTime.Now.ToString("dd/MM/yyyy hh:mm:ss:fff tt"))
            messageXX += Environment.NewLine
            messageXX += "---------------------------Success-------------------------------------------------------"
            messageXX += Environment.NewLine
            messageXX += String.Format("Message: {0}", exX.Message)
            messageXX += Environment.NewLine
            messageXX += String.Format("StackTrace: {0}", exX.StackTrace)
            messageXX += Environment.NewLine
            messageXX += String.Format("Source: {0}", exX.Source)
            messageXX += Environment.NewLine
            messageXX += String.Format("TargetSite: {0}", exX.TargetSite.ToString())
            messageXX += Environment.NewLine
            messageXX += "---------------------------Success-------------------------------------------------------"
            messageXX += Environment.NewLine
            Using writer As New StreamWriter(pathXX, True)
                writer.WriteLine(messageXX)
                writer.Close()
            End Using
        Finally
            Dim pathX As String = HttpContext.Current.Server.MapPath("~/apps/ErrorLog/" & agentName & "/" & DateTime.Now.ToString("ddMMyyyy") & "/" & DateTime.Now.ToString("ddMMyyyy") & ".txt")
            Using writer As New StreamWriter(pathX, True)
                writer.WriteLine(message)
                writer.Close()
            End Using
        End Try
    End Sub
    Public Sub LogError(ByVal agentName As String, ex As Exception, strUser As String)
        Dim message As String = String.Format("Time: {0}", DateTime.Now.ToString("dd/MM/yyyy hh:mm:ss:fff tt"))
        message += Environment.NewLine
        message += "---------------------------Failed-------------------------------------------------------"
        message += Environment.NewLine
        message += String.Format("Message: {0}", strUser)
        message += Environment.NewLine
        message += String.Format("Message: {0}", ex.Message)
        message += Environment.NewLine
        message += String.Format("StackTrace: {0}", ex.StackTrace)
        message += Environment.NewLine
        message += String.Format("Source: {0}", ex.Source)
        message += Environment.NewLine
        message += String.Format("TargetSite: {0}", ex.TargetSite.ToString())
        message += Environment.NewLine
        message += "---------------------------Failed-------------------------------------------------------"
        message += Environment.NewLine

        Try
            Dim DirectoryX As String = Path.Combine(Server.MapPath("~/apps/ErrorLog/" & agentName & "/" & DateTime.Now.ToString("ddMMyyyy")))
            If Not System.IO.Directory.Exists(DirectoryX) Then
                System.IO.Directory.CreateDirectory(DirectoryX)
            End If
        Catch exX As Exception
            ''Try catch untuk error create folder
            Dim pathXX As String = HttpContext.Current.Server.MapPath("~/apps/ErrorLog/" & agentName & "/" & DateTime.Now.ToString("ddMMyyyy") & ".txt")
            Dim messageXX As String = String.Format("Time: {0}", DateTime.Now.ToString("dd/MM/yyyy hh:mm:ss:fff tt"))
            messageXX += Environment.NewLine
            messageXX += "---------------------------Failed-----------------------------------------------"
            messageXX += Environment.NewLine
            messageXX += String.Format("Message: {0}", strUser)
            messageXX += Environment.NewLine
            messageXX += String.Format("Message: {0}", exX.Message)
            messageXX += Environment.NewLine
            messageXX += String.Format("StackTrace: {0}", exX.StackTrace)
            messageXX += Environment.NewLine
            messageXX += String.Format("Source: {0}", exX.Source)
            messageXX += Environment.NewLine
            messageXX += String.Format("TargetSite: {0}", exX.TargetSite.ToString())
            messageXX += Environment.NewLine
            messageXX += "---------------------------Failed------------------------------------------------"
            messageXX += Environment.NewLine
            Using writer As New StreamWriter(pathXX, True)
                writer.WriteLine(messageXX)
                writer.Close()
            End Using
        Finally
            Dim pathX As String = HttpContext.Current.Server.MapPath("~/apps/ErrorLog/" & agentName & "/" & DateTime.Now.ToString("ddMMyyyy") & "/" & DateTime.Now.ToString("ddMMyyyy") & ".txt")
            Using writer As New StreamWriter(pathX, True)
                writer.WriteLine(message)
                writer.Close()
            End Using
        End Try
    End Sub
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function Uidesk_TrxBrandName(ByVal ID As String, ByVal BrandID As String, ByVal BrandName As String, ByVal BrandStatus As String, ByVal UserName As String, ByVal Action As String) As String
        Dim connstring As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim dt As DataTable = New DataTable()
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim TransaksiID As String = String.Empty
        If Action = "TABLE" Or Action = "SELECT" Then
            If Action = "TABLE" Then
                TransaksiID = "0"
            Else
                TransaksiID = ID
            End If
            Dim NameSP = "Exec Uidesk_TrxBrandName"
            Dim ExecSP = "" & NameSP & " '0','0','0','0','" & UserName & "','" & Action & "'"
            Try
                Using conn As SqlConnection = New SqlConnection(connstring)
                    conn.Open()
                    Dim sqlComm As SqlCommand = New SqlCommand("Uidesk_TrxBrandName", conn)
                    sqlComm.Parameters.AddWithValue("@ID", TransaksiID)
                    sqlComm.Parameters.AddWithValue("@BrandID", "0")
                    sqlComm.Parameters.AddWithValue("@BrandName", "0")
                    sqlComm.Parameters.AddWithValue("@BrandStatus", "0")
                    sqlComm.Parameters.AddWithValue("@UserName", UserName)
                    sqlComm.Parameters.AddWithValue("@Action", Action)
                    sqlComm.CommandType = CommandType.StoredProcedure
                    Dim da As SqlDataAdapter = New SqlDataAdapter()
                    Dim ds As DataSet = New DataSet()
                    da.SelectCommand = sqlComm
                    da.Fill(ds)
                    dt = ds.Tables(0)
                    conn.Close()
                End Using
            Catch ex As Exception
                LogError(HttpContext.Current.Session("UserName"), ex, ExecSP)
            Finally
                LogSuccess(HttpContext.Current.Session("UserName"), ExecSP)
            End Try
            Dim tableJson As String = ConvertDataTabletoString(dt)
            Return tableJson
        Else
            Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
            Try
                Using con As New SqlConnection(constr)
                    Dim sqlComm As New SqlCommand()
                    sqlComm.Connection = con
                    sqlComm.CommandText = "Uidesk_TrxBrandName"
                    sqlComm.CommandType = CommandType.StoredProcedure
                    sqlComm.Parameters.AddWithValue("ID", ID)
                    sqlComm.Parameters.AddWithValue("BrandID", BrandID)
                    sqlComm.Parameters.AddWithValue("BrandName", BrandName)
                    sqlComm.Parameters.AddWithValue("BrandStatus", BrandStatus)
                    sqlComm.Parameters.AddWithValue("UserName", UserName)
                    sqlComm.Parameters.AddWithValue("Action", Action)
                    con.Open()
                    sqlComm.ExecuteNonQuery()
                    con.Close()
                End Using
            Catch ex As Exception
                Dim objectTickets As resultInsert = New resultInsert()
                objectTickets.Result = "False"
                objectTickets.TrxmsgSystem = ex.Message()
                listTickets.Add(objectTickets)
                strExec = "exec Uidesk_TrxBrandName '" & ID & "','" & BrandID & "','" & BrandName & "','" & BrandStatus & "','" & UserName & "','" & Action & "'"
                LogError(HttpContext.Current.Session("UserName"), ex, strExec)
            Finally
                Dim objectTickets As resultInsert = New resultInsert()
                objectTickets.Result = "True"
                objectTickets.TrxmsgSystem = "Data Has Been Save"
                listTickets.Add(objectTickets)
                strExec = "exec Uidesk_TrxBrandName '" & ID & "','" & BrandID & "','" & BrandName & "','" & BrandStatus & "','" & UserName & "','" & Action & "'"
                LogSuccess(HttpContext.Current.Session("UserName"), strExec)
            End Try
            Dim js As JavaScriptSerializer = New JavaScriptSerializer()
            Return js.Serialize(listTickets)
        End If
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function MasterAuxReason(ByVal TrxID As String, ByVal TrxAuxReason As String, ByVal TrxAuxStatus As String, ByVal TrxUserName As String, ByVal TrxAction As String) As String
        Dim TrxAuxReasonXSS As String = AntiXssEncoder.HtmlEncode(TrxAuxReason.Trim, True)
        Dim TrxUserNameXSS As String = AntiXssEncoder.HtmlEncode(TrxUserName.Trim, True)
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "UIDESK_TrmDataAux"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("TrxID", TrxID)
                sqlComm.Parameters.AddWithValue("TrxAuxReason", TrxAuxReasonXSS)
                sqlComm.Parameters.AddWithValue("TrxAuxStatus", TrxAuxStatus)
                sqlComm.Parameters.AddWithValue("TrxUserName", TrxUserNameXSS)
                sqlComm.Parameters.AddWithValue("TrxAction", TrxAction)
                con.Open()
                sqlComm.ExecuteNonQuery()
                con.Close()
            End Using
        Catch ex As Exception
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "False"
            objectTickets.TrxmsgSystem = ex.Message()
            listTickets.Add(objectTickets)
            strExec = "exec UIDESK_TrmDataAux '" & TrxID & "','" & TrxAuxReasonXSS & "','" & TrxAuxStatus & "','" & TrxUserNameXSS & "','" & TrxAction & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.TrxmsgSystem = "Data Has Been Save"
            listTickets.Add(objectTickets)
            strExec = "exec UIDESK_TrmDataAux '" & TrxID & "','" & TrxAuxReasonXSS & "','" & TrxAuxStatus & "','" & TrxUserNameXSS & "','" & TrxAction & "'"
            LogSuccess(HttpContext.Current.Session("UserName"), strExec)
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
End Class