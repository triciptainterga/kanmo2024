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

' To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line.
' <System.Web.Script.Services.ScriptService()> _
<System.Web.Services.WebService(Namespace:="http://tempuri.org/")>
<System.Web.Services.WebServiceBinding(ConformsTo:=WsiProfiles.BasicProfile1_1)>
<Global.Microsoft.VisualBasic.CompilerServices.DesignerGenerated()>
<ScriptService()>
<ToolboxItem(False)>
Public Class _3_Channel_Multichat1
    Inherits System.Web.Services.WebService

    Dim sqlcom As SqlCommand
    Dim sqlcon As New SqlConnection(ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString)
    Dim strSql As String
    Dim sqldr As SqlDataReader
    Dim strTime As String = DateTime.Now.ToString("yyyyMMddhhmmssfff")
    Dim strLogTime As String = DateTime.Now.ToString("yyyy")
    Dim TrxEmailForm As String = ConfigurationManager.AppSettings("EmailForm")
    Dim Proses As New ClsConn

    <WebMethod()>
    Public Function HelloWorld() As String
        Return "Hello World"
    End Function
    Public Class resultInsert
        Public Property Result As String
        Public Property UserID As String
        Public Property NamaNya As String
        Public Property msgSystem As String
        Public Property TicketNumber As String
        Public Property CustomerID As String
    End Class
    Public Class listInboxSocialMedia
        Public Property Result As String
        Public Property IDTable As String
        Public Property HeaderSosmed As String
        Public Property DetailSosmed As String
        Public Property FlagTo As String
        Public Property ProfileID As String
        Public Property ProfileName As String
        Public Property Messages As String
        Public Property DateGetSosmed As String
        Public Property DateCreate As String
        Public Property StatusType As String
        Public Property Active As String
        Public Property Total As String
        Public Property Likes As String

    End Class
    Public Class OutputChartPostSocialMedia
        Public Property Result As String
        Public Property Hashtags As String
        Public Property TotalNya As String
    End Class

    Public Class listPhotoSocialMedia
        Public Property Result As String
        Public Property IDTable As String
        Public Property HeaderSosmed As String
        Public Property DetailSosmed As String
        Public Property FlagTo As String
        Public Property ProfileID As String
        Public Property ProfileName As String
        Public Property Messages As String
        Public Property DateGetSosmed As String
        Public Property DateCreate As String
        Public Property StatusType As String
        Public Property FileURL As String
        Public Property PhotoID As String


    End Class
    Public Class listDataTicket
        Public Property Result As String
        Public Property TicketNumber As String
        Public Property TicketSourceName As String
        Public Property NamaPelanggan As String
        Public Property KeluhanPelanggan As String
        Public Property JawabanAgent As String
        Public Property StatusTicket As String
        Public Property DateTicket As String


    End Class
    <WebMethod()>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function SelectInboxSocialMediaPost(ByVal FlagTo As String, ByVal AgentLogin As String) As String
        Dim listTickets As List(Of listInboxSocialMedia) = New List(Of listInboxSocialMedia)()
        Dim cs As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim strQuery As String = String.Empty
        Try
            strQuery = "exec Sosmed_GetListPost '" & FlagTo & "','" & AgentLogin & "'"
            Using con As SqlConnection = New SqlConnection(cs)
                Dim cmd As SqlCommand
                cmd = New SqlCommand(strQuery, con)
                cmd.CommandType = CommandType.Text
                con.Open()
                Dim rdr As SqlDataReader = cmd.ExecuteReader()

                While rdr.Read()
                    Dim objectTickets As listInboxSocialMedia = New listInboxSocialMedia()
                    objectTickets.Result = "True"
                    objectTickets.IDTable = rdr("ID").ToString()
                    objectTickets.HeaderSosmed = rdr("HeaderSosmed").ToString()
                    objectTickets.FlagTo = rdr("FlagTo").ToString()
                    objectTickets.ProfileID = rdr("ProfileID").ToString()
                    objectTickets.ProfileName = rdr("ProfileName").ToString()
                    objectTickets.Messages = rdr("Messages").ToString()
                    objectTickets.DateGetSosmed = rdr("DateGetSosmedString").ToString()
                    objectTickets.DateCreate = rdr("DateCreate").ToString()
                    objectTickets.StatusType = rdr("StatusType").ToString()
                    objectTickets.Active = rdr("Active").ToString()
                    listTickets.Add(objectTickets)
                End While

            End Using
        Catch ex As Exception
            LogError(strLogTime, ex, strQuery)
        Finally
            LogSuccess(strLogTime, strQuery)
        End Try

        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    <WebMethod()>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function GetDataSearchTicket(ByVal ValueNya As String) As String
        Dim listTickets As List(Of listDataTicket) = New List(Of listDataTicket)()
        Dim cs As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim strQuery As String = String.Empty
        Try
            strQuery = "exec Multichat_GetListTicket '" & ValueNya & "'"
            Using con As SqlConnection = New SqlConnection(cs)
                Dim cmd As SqlCommand
                cmd = New SqlCommand(strQuery, con)
                cmd.CommandType = CommandType.Text
                con.Open()
                Dim rdr As SqlDataReader = cmd.ExecuteReader()

                While rdr.Read()
                    Dim objectTickets As listDataTicket = New listDataTicket()
                    objectTickets.Result = "True"
                    objectTickets.TicketNumber = rdr("TicketNumber").ToString()
                    objectTickets.TicketSourceName = rdr("TicketSourceName").ToString()
                    objectTickets.NamaPelanggan = rdr("NAMA_PELAPOR").ToString()
                    objectTickets.JawabanAgent = rdr("ResponComplaint").ToString()
                    objectTickets.KeluhanPelanggan = rdr("DetailComplaint").ToString()
                    objectTickets.StatusTicket = rdr("Status").ToString()
                    objectTickets.DateTicket = rdr("DateTicket").ToString()
                    'objectTickets.KeluhanPelanggan = rdr("ProfileID").ToString()


                    listTickets.Add(objectTickets)
                End While

            End Using
        Catch ex As Exception
            LogError(strLogTime, ex, strQuery)
        Finally
            LogSuccess(strLogTime, strQuery)
        End Try

        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function

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
End Class