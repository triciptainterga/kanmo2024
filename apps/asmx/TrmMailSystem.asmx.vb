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
Imports System.Net.Mail
Imports System.Configuration
Imports System.Net.Configuration
Imports System.Web.HttpException
Imports System.Runtime.InteropServices
Imports System.Web.Security.AntiXss

' To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line.
' <System.Web.Script.Services.ScriptService()> _
<System.Web.Services.WebService(Namespace:="http://tempuri.org/")>
<System.Web.Services.WebServiceBinding(ConformsTo:=WsiProfiles.BasicProfile1_1)>
<Global.Microsoft.VisualBasic.CompilerServices.DesignerGenerated()>
<ScriptService()>
<ToolboxItem(False)>
Public Class TrmMailSystem1
    Inherits System.Web.Services.WebService

    Dim sqlcom As SqlCommand
    Dim sqlcon As New SqlConnection(ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString)
    Dim strSql As String
    Dim sqldr As SqlDataReader
    Dim strTime As String = DateTime.Now.ToString("yyyyMMddhhmmssfff")
    Dim strLogTime As String = DateTime.Now.ToString("yyyy")
    Dim TrxEmailForm As String = ConfigurationManager.AppSettings("EmailForm")
    Dim Proses As New ClsConn
    Dim _RootAttachmentInboxEmail As String = "~/FileEmail/INBOX/"
    Dim _RootAttachmentOutboxEmail As String = "~/FileEmail/OUTBOX/"
    Public Class Response
        Public Guid As Guid
        Public Toggle As Boolean
        Public DateNya As String
        Public FileName As String
        Public FileExt As String
        Public FileSizing As String
        Public ResultUpload As String
    End Class
    Public Class listFileUpload
        Public Property Result As String
        Public Property NameNya As String
        Public Property StatusNya As String
        Public Property FileId As Guid
        Public Property FileExt As String
    End Class
    Public Class resultInsert
        Public Property Result As String
        Public Property UserID As String
        Public Property NamaNya As String
        Public Property TrxmsgSystem As String
        Public Property TicketNumber As String
        Public Property TrxID As String
        Public Property TrxTo As String
        Public Property TrxSubject As String
        Public Property TrxCC As String
    End Class
    Public Class listTransactionCustomer
        Public Property Result As String
        Public Property TrxID As String
        Public Property TrxThreadChannel As String
        Public Property TrxIconThreadChannel As String
        Public Property TrxThreadID As String
        Public Property TrxThreadNumberID As String
        Public Property TrxThreadAccount As String
        Public Property TrxThreadContactID As String
        Public Property TrxThreadaAgentID As String
        Public Property TrxThreadSubject As String
        Public Property TrxThreadTicketNumber As String
        Public Property TrxThreadCustomer As String
        Public Property TrxThreadaDateCreate As String
    End Class
    Public Enum StatementTypes
        None = 0
        Procedure = 0
        Alter = 1
        Create = 2
        Delete = 4
        Drop = 8
        Execute = 16
        Insert = 32
        [Select] = 64
        Update = 128
        Union = 256
        Batch = 512
        Merge = 1024 Or Delete Or Insert Or [Select] Or Update
    End Enum
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

        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        js.MaxJsonLength = Int32.MaxValue
        Return js.Serialize(rows)
    End Function
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
    Public Function BigConvertDataTabletoString(ByVal dt As DataTable) As String
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

        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        js.MaxJsonLength = Int32.MaxValue
        Return js.Serialize(rows)
    End Function
    <WebMethod(EnableSession:=True)>
    Public Function UploadFile() As Response
        Dim Response As Response = New Response()
        Dim listTickets As List(Of listFileUpload) = New List(Of listFileUpload)()
        'Dim ItemId As Guid = Guid.Parse(HttpContext.Current.Request.Form("id"))
        Dim TrxUserCreate As String = HttpContext.Current.Request.Form("Username")
        Dim Emailid As String = HttpContext.Current.Request.Form("Emailid").Replace("..", "")
        'Dim idHeader As String = HttpContext.Current.Request.Form("idHeader")
        'Dim idTable As String = HttpContext.Current.Request.Form("idTable")
        Dim Files As HttpFileCollection = HttpContext.Current.Request.Files
        Dim FileName As String = String.Empty
        Dim FileExt As String = String.Empty
        Dim FileSizing As String = String.Empty
        Dim FileId As Guid

        'Dim _TrxEmailID As String
        If Emailid = "" Then
            Emailid = DateTime.Now.ToString("yyyyMMddhhmmss") & New Random().Next(1000000, 9999999)
        Else
        End If
        Dim DirectoryX As String = Path.Combine(Server.MapPath(_RootAttachmentOutboxEmail & "" & Emailid))
        If IsNumeric(Emailid) Then
            Dim SavePath As String = HttpContext.Current.Server.MapPath(_RootAttachmentOutboxEmail & "" & Emailid & "/")
            If Not System.IO.Directory.Exists(DirectoryX) Then
                System.IO.Directory.CreateDirectory(DirectoryX)
                For i As Integer = 0 To Files.Count - 1
                    Dim File As HttpPostedFile = Files(i)
                    FileId = Guid.NewGuid()
                    FileName = File.FileName
                    FileExt = Path.GetExtension(File.FileName)
                    FileSizing = File.ContentLength

                    Dim validFileTypes As String() = {"bmp", "BMP", "gif", "GIF", "png", "PNG", "jpg", "JPG", "jpeg", "doc", "docx", "xls", "xlsx", "pdf", "mp4", "MP4", "Mp4", "mP4", "mov", "MOV", "FLV", "GPP", "We.bM", "MPEG-1", "mpeg-1", "MPEG-2", "mpeg-2", "MPEG4", "mpeg4", "MPG", "mpg", "VI", "vi", "WMV", "wmv", "MPEGPS", "mpeggps", "DNxHR", "ProRes", "ineForm", "HEVC", "hevc"}
                    Dim isValidFile As Boolean = False
                    For j As Integer = 0 To validFileTypes.Length - 1
                        If FileExt = "." & validFileTypes(j) Then

                            Dim FileMod As DateTime = DateTime.Now
                            Dim FileType As String = File.ContentType
                            Dim FileSize As Long = File.ContentLength / 1024 / 1024
                            Dim FilePath As String = _RootAttachmentOutboxEmail & "" & Emailid & "/"
                            If FileSize > 10 Then
                                Response.Guid = FileId
                                Response.FileName = FileName
                                Response.FileExt = FileExt
                                Response.FileSizing = FileSizing
                                Response.ResultUpload = "Please upload file less than 10 MB. Thanks!"
                            Else
                                File.SaveAs(Path.Combine(SavePath, String.Concat(FileId, FileExt)))
                                'File.SaveAs(Path.Combine("c:\\FileBlast\\", String.Concat(FileId, FileExt)))
                            End If

                        Else
                            'Exit Function
                        End If
                    Next

                Next
                Response.Guid = FileId
                Response.FileName = FileName
                Response.FileExt = FileExt
                Response.FileSizing = FileSizing
            Else
                For i As Integer = 0 To Files.Count - 1
                    Dim File As HttpPostedFile = Files(i)
                    FileId = Guid.NewGuid()
                    FileName = File.FileName
                    FileExt = Path.GetExtension(File.FileName)
                    FileSizing = File.ContentLength

                    Dim validFileTypes As String() = {"bmp", "BMP", "gif", "GIF", "png", "PNG", "jpg", "JPG", "jpeg", "doc", "docx", "xls", "xlsx", "pdf", "mp4", "MP4", "Mp4", "mP4", "mov", "MOV", "FLV", "GPP", "We.bM", "MPEG-1", "mpeg-1", "MPEG-2", "mpeg-2", "MPEG4", "mpeg4", "MPG", "mpg", "VI", "vi", "WMV", "wmv", "MPEGPS", "mpeggps", "DNxHR", "ProRes", "ineForm", "HEVC", "hevc"}
                    Dim isValidFile As Boolean = False
                    For j As Integer = 0 To validFileTypes.Length - 1
                        If FileExt = "." & validFileTypes(j) Then

                            Dim FileMod As DateTime = DateTime.Now
                            Dim FileType As String = File.ContentType
                            Dim FileSize As Long = File.ContentLength / 1024 / 1024
                            Dim FilePath As String = _RootAttachmentOutboxEmail & "" & Emailid & "/"
                            If FileSize > 10 Then
                                Response.Guid = FileId
                                Response.FileName = FileName
                                Response.FileExt = FileExt
                                Response.FileSizing = FileSizing
                                Response.ResultUpload = "Please upload file less than 10 MB. Thanks!"
                            Else
                                File.SaveAs(Path.Combine(SavePath, String.Concat(FileId, FileExt)))
                                'File.SaveAs(Path.Combine("c:\\FileBlast\\", String.Concat(FileId, FileExt)))
                            End If

                        Else
                            'Exit Function
                        End If
                    Next

                Next
                Response.Guid = FileId
                Response.FileName = FileName
                Response.FileExt = FileExt
                Response.FileSizing = FileSizing
            End If
        Else

        End If

        'SELECT * FROM OPENROWSET('Microsoft.ACE.OLEDB.12.0', 'Excel 12.0; 
        'HDR=NO; IMEX=1; Database=\\ptmkpwa12dev08.pertamina.com\UploadFile\4ae19bf0-efe5-47ec-bc1a-54035e04e082.xlsx', 'SELECT * FROM [Sheet1$]')

        ''Coba new

        Dim sqlconManual As New SqlConnection(ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString)
        Try
            Dim path As String = HttpContext.Current.Server.MapPath(_RootAttachmentOutboxEmail & "" & Emailid & "/" & String.Concat(FileId, FileExt))
            Dim TrxUrl As String = Emailid & "/" & String.Concat(FileId, FileExt)

            Dim strExec As String = String.Empty
            Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
            Try
                Using con As New SqlConnection(constr)
                    Dim sqlComm As New SqlCommand()
                    sqlComm.Connection = con
                    sqlComm.CommandText = "UIDESK_TrxAttachmentEmail"
                    sqlComm.CommandType = CommandType.StoredProcedure
                    sqlComm.Parameters.AddWithValue("TrxEmailID", Emailid)
                    sqlComm.Parameters.AddWithValue("TrxUrl", TrxUrl)
                    sqlComm.Parameters.AddWithValue("TrxFilename", FileName)
                    sqlComm.Parameters.AddWithValue("TrxFileType", FileExt)
                    sqlComm.Parameters.AddWithValue("TrxFileSize", FileSizing)
                    sqlComm.Parameters.AddWithValue("TrxUserCreate", TrxUserCreate)
                    con.Open()
                    sqlComm.ExecuteNonQuery()
                End Using
                strExec = "exec UIDESK_TrxAttachmentEmail " & "'" & Emailid & "'," & "'" & TrxUrl & "'," & "'" & FileName & "'," & "'" & FileExt & "'," & "'" & FileSizing & "'," & "'" & TrxUserCreate & "'"
                LogSuccess(HttpContext.Current.Session("UserName"), strExec)
            Catch ex As Exception

                strExec = "exec UIDESK_TrxAttachmentEmail " & "'" & Emailid & "'," & "'" & TrxUrl & "'," & "'" & FileName & "'," & "'" & FileExt & "'," & "'" & FileSizing & "'," & "'" & TrxUserCreate & "'"
                LogError(HttpContext.Current.Session("UserName"), ex, strExec)
            Finally

                strExec = "exec UIDESK_TrxAttachmentEmail " & "'" & Emailid & "'," & "'" & TrxUrl & "'," & "'" & FileName & "'," & "'" & FileExt & "'," & "'" & FileSizing & "'," & "'" & TrxUserCreate & "'"
                LogSuccess(HttpContext.Current.Session("UserName"), strExec)
                ''End
            End Try

        Catch __unusedException1__ As Exception

        Finally
            'updateTable("bulkDataUpload", "Usercreate", "" & Username & "", "IDupload='" & String.Concat(FileId) & "'")
        End Try
        Return Response
    End Function
    Public Class CommandTextValidator
        Public Shared Sub ValidateStatement(ByVal commandText As String, ByVal authorizedStatements As StatementTypes)
            'Construct Regular Expression To Find Text Blocks, Statement Breaks & SQL Statement Headers
            Dim regExText As String = "('(''|[^'])*')|(;)|(\b(ALTER|CREATE|DELETE|DROP|EXEC(UTE){0,1}|INSERT( +INTO){0,1}|MERGE|SELECT|UPDATE|UNION( +ALL){0,1})\b)"

            'Remove Authorized Options
            If (authorizedStatements And StatementTypes.Batch) = StatementTypes.Batch Then regExText = regExText.Replace("(;)", String.Empty)
            If (authorizedStatements And StatementTypes.Alter) = StatementTypes.Alter Then regExText = regExText.Replace("ALTER", String.Empty)
            If (authorizedStatements And StatementTypes.Create) = StatementTypes.Create Then regExText = regExText.Replace("CREATE", String.Empty)
            If (authorizedStatements And StatementTypes.Delete) = StatementTypes.Delete Then regExText = regExText.Replace("DELETE", String.Empty)
            If (authorizedStatements And StatementTypes.Delete) = StatementTypes.Delete Then regExText = regExText.Replace("DELETETREE", String.Empty)
            If (authorizedStatements And StatementTypes.Drop) = StatementTypes.Drop Then regExText = regExText.Replace("DROP", String.Empty)
            If (authorizedStatements And StatementTypes.Execute) = StatementTypes.Execute Then regExText = regExText.Replace("EXEC(UTE){0,1}", String.Empty)
            If (authorizedStatements And StatementTypes.Insert) = StatementTypes.Insert Then regExText = regExText.Replace("INSERT( +INTO){0,1}", String.Empty)
            If (authorizedStatements And StatementTypes.Merge) = StatementTypes.Merge Then regExText = regExText.Replace("MERGE", String.Empty)
            If (authorizedStatements And StatementTypes.Select) = StatementTypes.Select Then regExText = regExText.Replace("SELECT", String.Empty)
            If (authorizedStatements And StatementTypes.Union) = StatementTypes.Union Then regExText = regExText.Replace("UNION", String.Empty)
            If (authorizedStatements And StatementTypes.Update) = StatementTypes.Update Then regExText = regExText.Replace("UPDATE", String.Empty)

            'Remove extra separators
            Dim regExOptions As RegexOptions = RegexOptions.IgnoreCase Or RegexOptions.Multiline
            regExText = Regex.Replace(regExText, "\(\|", "(", regExOptions)
            regExText = Regex.Replace(regExText, "\|{2,}", "|", regExOptions)
            regExText = Regex.Replace(regExText, "\|\)", ")", regExOptions)

            'Check for errors
            Dim patternMatchList As MatchCollection = Regex.Matches(commandText, regExText, regExOptions)
            For patternIndex As Integer = patternMatchList.Count - 1 To 0 Step -1
                Dim value As String = patternMatchList.Item(patternIndex).Value.Trim
                If String.IsNullOrWhiteSpace(value) Then
                    'Continue - Not an error.
                ElseIf value.StartsWith("'") AndAlso value.EndsWith("'") Then
                    'Continue - Text Block
                ElseIf value.Trim = ";" Then
                    Throw New System.UnauthorizedAccessException("Batch statements not authorized:" & vbCrLf & commandText)
                Else
                    Throw New System.UnauthorizedAccessException(value.Substring(0, 1).ToUpper & value.Substring(1).ToLower & " statements not authorized:" & vbCrLf & commandText)
                End If
            Next
        End Sub
    End Class
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function GetWhereRecords(ByVal tableType As String, ByVal tableName As String, ByVal paramQuery As String) As String
        Dim connstring As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim dt As DataTable = New DataTable()
        Dim sql As String = ""
        Using conn As SqlConnection = New SqlConnection(connstring)
            conn.Open()
            If tableType = "AllWhereData" Then
                Try
                    CommandTextValidator.ValidateStatement("select * from [" & tableName & "] " & paramQuery & " ", StatementTypes.Select)
                    'System.Diagnostics.Debug.WriteLine("Validation worked. The semicolon and statement are inside a text block.")
                    sql = "select * from [" & tableName & "] " & paramQuery & " "
                    LogSuccess(strLogTime, sql)
                Catch ex As System.Exception
                    LogError(strLogTime, ex, sql)
                    'System.Diagnostics.Debug.WriteLine("Validation failed. The following error was thrown: " & ex.Message)
                End Try
                ' Ori sql = "select * from [" & tableName & "] " & paramQuery & " "
            End If
            Dim ad As SqlDataAdapter = New SqlDataAdapter(sql, conn)
            Dim ds As DataSet = New DataSet()
            ad.Fill(ds)
            dt = ds.Tables(0)
            conn.Close()
        End Using
        Dim tableJson As String = BigConvertDataTabletoString(dt)
        Return tableJson
        'Dim connstring As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        'Dim dt As DataTable = New DataTable()
        'Dim sql As String = ""
        'Using conn As SqlConnection = New SqlConnection(connstring)
        '    conn.Open()
        '    If tableType = "AllWhereData" Then

        '        sql = "select * from [" & tableName & "] " & paramQuery & " "
        '    End If
        '    Dim ad As SqlDataAdapter = New SqlDataAdapter(sql, conn)
        '    Dim ds As DataSet = New DataSet()
        '    ad.Fill(ds)
        '    dt = ds.Tables(0)
        '    conn.Close()
        'End Using
        'Dim tableJson As String = ConvertDataTabletoString(dt)
        'Return tableJson
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function UpdateReadingEmail(ByVal TrxID As String, ByVal TrxUserName As String, ByVal TrxLayerUser As String) As String
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim _TrxSubject As String = String.Empty
        Dim _TrxTo As String = String.Empty
        Dim _TrxCC As String = String.Empty
        Dim _Result As String = String.Empty
        Dim TrxUsernameXSS As String = AntiXssEncoder.HtmlEncode(TrxUserName.Trim, True)
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "UIDESK_TrxEmailReading"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("TrxID", TrxID)
                sqlComm.Parameters.AddWithValue("TrxUserName", TrxUsernameXSS)
                sqlComm.Parameters.AddWithValue("TrxLayerUser", TrxLayerUser)
                con.Open()
                sqldr = sqlComm.ExecuteReader()
                While sqldr.Read()
                    _TrxTo = sqldr("ETO").ToString
                    _TrxSubject = sqldr("ESUBJECT").ToString
                    _TrxCC = sqldr("ECC").ToString
                End While
                sqldr.Close()
                con.Close()
            End Using
        Catch ex As Exception
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "False"
            objectTickets.TrxmsgSystem = ex.Message()
            listTickets.Add(objectTickets)
            strExec = "exec UIDESK_TrxEmailReading '" & TrxID & "','" & TrxUsernameXSS & "','" & TrxLayerUser & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            If _Result = "Success" Then
                objectTickets.Result = "True"
                objectTickets.TrxID = TrxID
                objectTickets.TrxTo = _TrxTo
                objectTickets.TrxSubject = _TrxSubject
                objectTickets.TrxCC = _TrxCC
                objectTickets.TrxmsgSystem = "Data Has Been Read"
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxEmailReading '" & TrxID & "','" & TrxUsernameXSS & "','" & TrxLayerUser & "'"
                LogSuccess(HttpContext.Current.Session("UserName"), strExec)
            Else
                objectTickets.Result = "False"
                objectTickets.TrxID = TrxID
                objectTickets.TrxTo = _TrxTo
                objectTickets.TrxSubject = _TrxSubject
                objectTickets.TrxCC = _TrxCC
                objectTickets.TrxmsgSystem = "Data Note Has Been Read"
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxEmailReading '" & TrxID & "','" & TrxUsernameXSS & "','" & TrxLayerUser & "'"
                LogSuccess(HttpContext.Current.Session("UserName"), strExec)
                LogSuccess(HttpContext.Current.Session("UserName"), "Data Note Has Been Read")
            End If
            ''End
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function InsertComposeEmail(ByVal TrxUserName As String, ByVal TrxEmailFrom As String, ByVal TrxTO As String, ByVal TrxSubject As String, ByVal TrxCC As String,
                                       ByVal TrxBCC As String, ByVal TrxBody As String, ByVal TrxDirection As String, ByVal TrxType As String) As String
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim _Valuenya As String = String.Empty
        Dim _Result As String = String.Empty
        Dim _TrxAutoID As String = DateTime.Now.ToString("yyyyMMddhhmmss")
        Dim _TrxEmailID = _TrxAutoID & New Random().Next(1000000, 9999999)
        Dim TrxUsernameXSS As String = AntiXssEncoder.HtmlEncode(TrxUserName.Trim, True)
        'Dim TrxType As String = "compose_email"
        Dim TrxSubjectXSS As String = AntiXssEncoder.HtmlEncode(TrxSubject.Trim, True)
        Dim bodyEmail As String, emailID As String, signatureEmail As String, subjectEmail As String, catgeoryEmail As String
        Dim messageInternal As String, tambahanBodyEmail As String

        Dim DateTransaction As String, ProductType As String, Activity As String, ProductName As String, Type As String, Category As String, Meta As String, SubCategory As String, Status As String, EscalationUnit As String

        Dim DirectoryX As String = Path.Combine(Server.MapPath(_RootAttachmentOutboxEmail & "" & _TrxEmailID))
        If Not System.IO.Directory.Exists(DirectoryX) Then
            System.IO.Directory.CreateDirectory(DirectoryX)
        Else
        End If

        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "UIDESK_TrxEmailCompose"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("TrxUserName", TrxUsernameXSS)
                sqlComm.Parameters.AddWithValue("TrxEmailFrom", TrxEmailFrom)
                sqlComm.Parameters.AddWithValue("TrxTO", TrxTO)
                sqlComm.Parameters.AddWithValue("TrxSubject", TrxSubjectXSS)
                sqlComm.Parameters.AddWithValue("TrxCC", TrxCC)
                sqlComm.Parameters.AddWithValue("TrxBCC", TrxBCC)
                sqlComm.Parameters.AddWithValue("TrxBody", TrxBody)
                sqlComm.Parameters.AddWithValue("TrxEmailID", _TrxEmailID)
                sqlComm.Parameters.AddWithValue("TrxDirection", TrxDirection)
                sqlComm.Parameters.AddWithValue("TrxType", TrxType)
                con.Open()
                'sqlComm.ExecuteNonQuery()

                Dim rdr As SqlDataReader = sqlComm.ExecuteReader()

                While rdr.Read()
                    emailID = _TrxEmailID
                    bodyEmail = rdr("BodyHTML").ToString()
                    signatureEmail = rdr("EmailSignature").ToString()
                    'TicketNumber = rdr("TicketNumber").ToString()
                    subjectEmail = rdr("EmailSubject").ToString()
                    catgeoryEmail = rdr("CategoryEmail").ToString()
                    DateTransaction = rdr("DateTransaction").ToString()
                    ProductType = rdr("ProductType").ToString()
                    Activity = rdr("Activity").ToString()
                    ProductName = rdr("ProductName").ToString()
                    Type = rdr("TypeTic").ToString()
                    Category = rdr("Category").ToString()
                    Meta = rdr("Meta").ToString()
                    SubCategory = rdr("SubCategory").ToString()
                    Status = rdr("EscalationUnit").ToString()
                    EscalationUnit = rdr("EscalationUnit").ToString()

                    tambahanBodyEmail = "<table style=""font-family: 'Poppins', sans-serif; font-size: 13px; font-weight: 250; line-height: 25px;"" width=""100%""> <thead> <tr> <th colspan=""2"">Data Ticket Information</th> </tr> </thead> <tbody> <tr style=""border-bottom: 1px solid #dddddd;background-color: #ffffff;""> <td>Date of Transaction :</td> <td>" & DateTransaction & "</td> </tr> <tr style=""border-bottom: 1px solid #dddddd;background-color: #f3f3f3;""> <td>Agent Name :</td> <td>" & TrxUserName & "</td> </tr> <tr style=""border-bottom: 1px solid #dddddd;background-color: #f3f3f3;""> <td>Activity :</td> <td>" & Activity & "</td> </tr> <tr style=""border-bottom: 1px solid #dddddd;background-color: #ffffff;""> <td>Product Name :</td> <td>" & ProductName & "</td> </tr> <tr style=""border-bottom: 1px solid #dddddd;background-color: #f3f3f3;""> <td>Type :</td> <td>" & Type & "</td> </tr> <tr style=""border-bottom: 1px solid #dddddd;background-color: #ffffff;""> <td>Category :</td> <td>" & Category & "</td> </tr> <tr style=""border-bottom: 1px solid #dddddd;background-color: #f3f3f3;""> <td>Meta :</td> <td>" & Meta & "</td> </tr> <tr style=""border-bottom: 1px solid #dddddd;background-color: #ffffff;""> <td>Sub Category :</td> <td>" & SubCategory & "</td> </tr> <tr style=""border-bottom: 1px solid #dddddd;background-color: #f3f3f3;""> <td>Status :</td> <td>" & Status & "</td> </tr> <tr style=""border-bottom: 1px solid #dddddd;background-color: #ffffff;""> <td>Escalation Unit :</td> <td>" & EscalationUnit & "</td> </tr> </tbody></table>"

                    If catgeoryEmail = "CUSTOMER" Then
                        'Template Untuk Customer
                        messageInternal = "<!DOCTYPE html><html> <head> <title></title> <meta http-equiv=""Content-Type"" content=""text/html; charset=utf-8""> <meta name=""viewport"" content=""width=device-width, initial-scale=1""> <meta http-equiv=""X-UA-Compatible"" content=""IE=edge""> <style type=""text/css""> /* FONTS */ @import url('https://fonts.googleapis.com/css?family=Poppins:100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i'); /* CLIENT-SPECIFIC STYLES */ body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; } table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; } img { -ms-interpolation-mode: bicubic; } /* RESET STYLES */ img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; } table { border-collapse: collapse !important; } body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; } /* iOS BLUE LINKS */ a[x-apple-data-detectors] { color: inherit !important; text-decoration: none !important; font-size: inherit !important; font-family: inherit !important; font-weight: inherit !important; line-height: inherit !important; } /* MOBILE STYLES */ @media screen and (max-width:600px) { h1 { font-size: 32px !important; line-height: 32px !important; } } /* ANDROID CENTER FIX */ div[style*=""margin: 16px 0;""] { margin: 0 !important; } </style> </head> <body style=""background-color: #f3f5f7; margin: 0 !important; padding: 0 !important;""> <!-- HIDDEN PREHEADER TEXT -->  <table border=""0"" cellpadding=""0"" cellspacing=""0"" width=""100%""> <!-- LOGO --> <tr> <td align=""center""> <!--[if (gte mso 9)|(IE)]><table align=""center"" border=""0"" cellspacing=""0"" cellpadding=""0"" width=""600""><tr><td align=""center"" valign=""top"" width=""600""><![endif]--> <table border=""0"" cellpadding=""0"" cellspacing=""0"" width=""100%"" style=""max-width: 600px;""> <tr> <td align=""center"" valign=""top"" style=""padding: 40px 10px 10px 10px;""> <a href=""#"" target=""_blank"" style=""text-decoration: none;""> <span style=""display: block; font-family: 'Poppins', sans-serif; font-size: 36px;color: #727272;"" border=""0"" > <b style=""color: rgba(239,115,68,0.8);"">Kanmo</b> Group </span> </a> </td> </tr> </table> <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]--> </td> </tr> <!-- HERO --> <tr> <td align=""center"" style=""padding: 0px 10px 0px 10px;""> <!--[if (gte mso 9)|(IE)]><table align=""center"" border=""0"" cellspacing=""0"" cellpadding=""0"" width=""600""><tr><td align=""center"" valign=""top"" width=""600""><![endif]--> <table border=""0"" cellpadding=""0"" cellspacing=""0"" width=""100%"" style=""max-width: 600px;""> <tr> <td bgcolor=""#ffffff"" align=""left"" valign=""top"" style=""padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px;""> <h1 style=""font-size: 16px; font-weight: 600; margin: 0; font-family: 'Poppins', sans-serif;"">" & subjectEmail.ToString() & "</h1> </td> </tr> </table> <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]--> </td> </tr> <!-- COPY BLOCK --> <tr> <td align=""center"" style=""padding: 0px 10px 0px 10px;""> <!--[if (gte mso 9)|(IE)]><table align=""center"" border=""0"" cellspacing=""0"" cellpadding=""0"" width=""600""><tr><td align=""center"" valign=""top"" width=""600""><![endif]--> <table border=""0"" cellpadding=""0"" cellspacing=""0"" width=""100%"" style=""max-width: 600px;""> <!-- COPY --> <tr> <td bgcolor=""#ffffff"" align=""left"" style=""padding: 20px 30px 20px 30px; color: #666666; font-family: 'Poppins', sans-serif; font-size: 16px; font-weight: 400; line-height: 25px;""> " & bodyEmail & " </td> </tr> <!-- BULLETPROOF BUTTON --> <!-- COPY --> <tr> <td bgcolor=""#ffffff"" align=""left"" style=""padding: 0px 30px 40px 30px; border-radius: 0px 0px 0px 0px; color: #666666; font-family: 'Poppins', sans-serif; font-size: 14px; font-weight: 400; line-height: 25px;""> " & signatureEmail & " </td> </tr> </table> <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]--> </td> </tr> <!-- FOOTER --> <tr> <td align=""center"" style=""padding: 10px 10px 50px 10px;""> <!--[if (gte mso 9)|(IE)]><table align=""center"" border=""0"" cellspacing=""0"" cellpadding=""0"" width=""600""><tr><td align=""center"" valign=""top"" width=""600""><![endif]--> <table border=""0"" cellpadding=""0"" cellspacing=""0"" width=""100%"" style=""max-width: 600px;""> <tr> <td align=""center"" style=""padding: 30px 30px 30px 30px; color: #333333; font-family: 'Poppins', sans-serif; font-size: 12px; font-weight: 400; line-height: 18px;""> <p style=""margin: 0;"">Copyright © 2023 Kanmo Group. All rights reserved.</p> </td> </tr> </table> <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]--> </td> </tr> </table> </body></html>"

                    Else
                        'Template Untuk Internal
                        messageInternal = "<!DOCTYPE html><html> <head> <title></title> <meta http-equiv=""Content-Type"" content=""text/html; charset=utf-8""> <meta name=""viewport"" content=""width=device-width, initial-scale=1""> <meta http-equiv=""X-UA-Compatible"" content=""IE=edge""> <style type=""text/css""> /* FONTS */ @import url('https://fonts.googleapis.com/css?family=Poppins:100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i'); /* CLIENT-SPECIFIC STYLES */ body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; } table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; } img { -ms-interpolation-mode: bicubic; } /* RESET STYLES */ img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; } table { border-collapse: collapse !important; } body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; } /* iOS BLUE LINKS */ a[x-apple-data-detectors] { color: inherit !important; text-decoration: none !important; font-size: inherit !important; font-family: inherit !important; font-weight: inherit !important; line-height: inherit !important; } /* MOBILE STYLES */ @media screen and (max-width:600px) { h1 { font-size: 32px !important; line-height: 32px !important; } } /* ANDROID CENTER FIX */ div[style*=""margin: 16px 0;""] { margin: 0 !important; } </style> </head> <body style=""background-color: #f3f5f7; margin: 0 !important; padding: 0 !important;""> <!-- HIDDEN PREHEADER TEXT -->  <table border=""0"" cellpadding=""0"" cellspacing=""0"" width=""100%""> <!-- LOGO --> <tr> <td align=""center""> <!--[if (gte mso 9)|(IE)]><table align=""center"" border=""0"" cellspacing=""0"" cellpadding=""0"" width=""600""><tr><td align=""center"" valign=""top"" width=""600""><![endif]--> <table border=""0"" cellpadding=""0"" cellspacing=""0"" width=""100%"" style=""max-width: 600px;""> <tr> <td align=""center"" valign=""top"" style=""padding: 40px 10px 10px 10px;""> <a href=""#"" target=""_blank"" style=""text-decoration: none;""> <span style=""display: block; font-family: 'Poppins', sans-serif; font-size: 36px;color: #727272;"" border=""0"" > <b style=""color: rgba(239,115,68,0.8);"">Kanmo</b> Group </span> </a> </td> </tr> </table> <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]--> </td> </tr> <!-- HERO --> <tr> <td align=""center"" style=""padding: 0px 10px 0px 10px;""> <!--[if (gte mso 9)|(IE)]><table align=""center"" border=""0"" cellspacing=""0"" cellpadding=""0"" width=""600""><tr><td align=""center"" valign=""top"" width=""600""><![endif]--> <table border=""0"" cellpadding=""0"" cellspacing=""0"" width=""100%"" style=""max-width: 600px;""> <tr> <td bgcolor=""#ffffff"" align=""left"" valign=""top"" style=""padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px;""> <h1 style=""font-size: 16px; font-weight: 600; margin: 0; font-family: 'Poppins', sans-serif;"">" & subjectEmail.ToString() & "</h1> </td> </tr> </table> <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]--> </td> </tr> <!-- COPY BLOCK --> <tr> <td align=""center"" style=""padding: 0px 10px 0px 10px;""> <!--[if (gte mso 9)|(IE)]><table align=""center"" border=""0"" cellspacing=""0"" cellpadding=""0"" width=""600""><tr><td align=""center"" valign=""top"" width=""600""><![endif]--> <table border=""0"" cellpadding=""0"" cellspacing=""0"" width=""100%"" style=""max-width: 600px;""> <!-- COPY --> <tr> <td bgcolor=""#ffffff"" align=""left"" style=""padding: 20px 30px 20px 30px; color: #666666; font-family: 'Poppins', sans-serif; font-size: 16px; font-weight: 400; line-height: 25px;""> " & bodyEmail & " </td> </tr><tr><td>" & tambahanBodyEmail & "</td></tr> <!-- BULLETPROOF BUTTON --> <!-- COPY --> <tr> <td bgcolor=""#ffffff"" align=""left"" style=""padding: 0px 30px 40px 30px; border-radius: 0px 0px 0px 0px; color: #666666; font-family: 'Poppins', sans-serif; font-size: 14px; font-weight: 400; line-height: 25px;""> " & signatureEmail & " </td> </tr> </table> <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]--> </td> </tr> <!-- FOOTER --> <tr> <td align=""center"" style=""padding: 10px 10px 50px 10px;""> <!--[if (gte mso 9)|(IE)]><table align=""center"" border=""0"" cellspacing=""0"" cellpadding=""0"" width=""600""><tr><td align=""center"" valign=""top"" width=""600""><![endif]--> <table border=""0"" cellpadding=""0"" cellspacing=""0"" width=""100%"" style=""max-width: 600px;""> <tr> <td align=""center"" style=""padding: 30px 30px 30px 30px; color: #333333; font-family: 'Poppins', sans-serif; font-size: 12px; font-weight: 400; line-height: 18px;""> <p style=""margin: 0;"">Copyright © 2023 Kanmo Group. All rights reserved.</p> </td> </tr> </table> <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]--> </td> </tr> </table> </body></html>"

                    End If
                    Try
                        Dim DirectoryXX As String = Path.Combine(Server.MapPath("../../FileEmail/Outbox/" & emailID))
                        If Not System.IO.Directory.Exists(DirectoryXX) Then
                            System.IO.Directory.CreateDirectory(DirectoryXX)
                        End If
                    Catch exX As Exception
                        ''Try catch untuk error create folder
                        Dim pathXX As String = HttpContext.Current.Server.MapPath("../apps/FileOutboundHTML/" & _TrxEmailID & "/" & TrxUserName & "/err_" & DateTime.Now.ToString("ddMMyyyy") & ".txt")
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
                        Dim pathX As String = HttpContext.Current.Server.MapPath("../../FileEmail/Outbox/" & _TrxEmailID & "/file.html")
                        'Using writer As New StreamWriter(pathX, True)
                        '    writer.WriteLine(messageInternal)
                        '    writer.Close()
                        'End Using
                        Using writer As New StreamWriter(pathX, True)
                            writer.WriteLine(messageInternal)
                            writer.Close()
                        End Using
                    End Try
                End While

                con.Close()
            End Using
        Catch ex As Exception
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "False"
            objectTickets.TrxmsgSystem = ex.Message()
            listTickets.Add(objectTickets)
            strExec = "exec UIDESK_TrxEmailCompose '" & TrxUsernameXSS & "','" & TrxEmailFrom & "','" & TrxTO & "','" & TrxSubjectXSS & "','" & TrxCC & "','" & TrxBCC & "','" & TrxBody & "','" & _TrxEmailID & "','" & TrxDirection & "','" & TrxType & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "True"
            objectTickets.TrxmsgSystem = "Data Has Been Send"
            listTickets.Add(objectTickets)
            strExec = "exec UIDESK_TrxEmailCompose '" & TrxUsernameXSS & "','" & TrxEmailFrom & "','" & TrxTO & "','" & TrxSubjectXSS & "','" & TrxCC & "','" & TrxBCC & "','" & TrxBody & "','" & _TrxEmailID & "','" & TrxDirection & "','" & TrxType & "'"
            LogSuccess(HttpContext.Current.Session("UserName"), strExec)
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function InsertComposeEmail_Interaction(ByVal TrxUserName As String, ByVal TrxEmailFrom As String, ByVal TrxTO As String, ByVal TrxSubject As String, ByVal TrxCC As String,
                                       ByVal TrxBCC As String, ByVal TrxBody As String, ByVal TrxDirection As String, ByVal TrxType As String, ByVal TicketNumber As String) As String
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim bodyEmail As String, emailID As String, signatureEmail As String, subjectEmail As String, catgeoryEmail As String
        'SP Baru untuk generate data dari Table karena ini corenya sudah ada : [UIDESK_CREATE_HTML_Temp_Email_Customer] 'TICKET_CREATE','20230907070133328'
        bodyEmail = ""
        emailID = ""
        signatureEmail = ""
        subjectEmail = ""
        Dim messageInternal As String, tambahanBodyEmail As String

        Dim DateTransaction As String, ProductType As String, Activity As String, ProductName As String, Type As String, Category As String, Meta As String, SubCategory As String,
        Status As String, EscalationUnit As String, AgentGroup As String
        Dim _Valuenya As String = String.Empty
        Dim _Result As String = String.Empty
        Dim _TrxAutoID As String = DateTime.Now.ToString("yyyyMMddhhmmss")
        Dim _TrxEmailID = _TrxAutoID & New Random().Next(1000000, 9999999)
        Dim ReplyID As String = "ReplyID-" & New Random().Next(100000000, 999999999)
        Dim TrxUsernameXSS As String = AntiXssEncoder.HtmlEncode(TrxUserName.Trim, True)
        'Dim TrxType As String = "compose_email"
        Dim TrxSubjectXSS As String = AntiXssEncoder.HtmlEncode(TrxSubject.Trim, True)
        '@TrxUserName,'@TrxTO,@TrxEmailFrom,'@TrxSubjec,'@TrxCC,'@TrxBody ,'@TrxEmailID ,'@TrxDirection ,'@TrxType ,'@TicketNumber 
        Dim LogoEmail As String = String.Empty
        Dim cs As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim strQuery As String = String.Empty
        Try
            strQuery = "exec [UIDESK_TrxEmailCompose_Interaction] '" & TrxUserName & "','" & TrxTO & "','" & TrxEmailFrom & "','" & TrxSubject.Replace("'", "") & "','" & TrxCC & "','" & TrxBCC & "','" & TrxBody & "','" & _TrxEmailID & "','" & TrxDirection & "','" & TrxType & "','" & TicketNumber & "','" & ReplyID & "'"
            Using con As SqlConnection = New SqlConnection(cs)
                Dim cmd As SqlCommand
                cmd = New SqlCommand(strQuery, con)
                cmd.CommandType = CommandType.Text
                con.Open()
                Dim rdr As SqlDataReader = cmd.ExecuteReader()

                While rdr.Read()
                    emailID = rdr("emailID").ToString()
                    bodyEmail = rdr("BodyHTML").ToString()
                    signatureEmail = rdr("EmailSignature").ToString()
                    TicketNumber = rdr("TicketNumber").ToString()
                    subjectEmail = rdr("EmailSubject").ToString()
                    catgeoryEmail = rdr("CategoryEmail").ToString()
                    DateTransaction = rdr("DateTransaction").ToString()
                    ProductType = rdr("ProductType").ToString()
                    Activity = rdr("Activity").ToString()
                    ProductName = rdr("ProductName").ToString()
                    Type = rdr("TypeTic").ToString()
                    Category = rdr("Category").ToString()
                    Meta = rdr("Meta").ToString()
                    SubCategory = rdr("SubCategory").ToString()
                    Status = rdr("EscalationUnit").ToString()
                    EscalationUnit = rdr("EscalationUnit").ToString()
                    AgentGroup = rdr("AgentGroup").ToString()

                    tambahanBodyEmail = "<table style=""font-family: 'Poppins', sans-serif; font-size: 13px; font-weight: 250; line-height: 25px;"" width=""100%""> <thead> <tr> <th colspan=""2"">Data Ticket Information</th> </tr> </thead> <tbody> <tr style=""border-bottom: 1px solid #dddddd;background-color: #ffffff;""> <td>Date of Transaction :</td> <td>" & DateTransaction & "</td> </tr> <tr style=""border-bottom: 1px solid #dddddd;background-color: #f3f3f3;""> <td>Agent Name :</td> <td>" & TrxUserName & "</td> </tr> <tr style=""border-bottom: 1px solid #dddddd;background-color: #f3f3f3;""> <td>Activity :</td> <td>" & Activity & "</td> </tr> <tr style=""border-bottom: 1px solid #dddddd;background-color: #ffffff;""> <td>Product Name :</td> <td>" & ProductName & "</td> </tr> <tr style=""border-bottom: 1px solid #dddddd;background-color: #f3f3f3;""> <td>Type :</td> <td>" & Type & "</td> </tr> <tr style=""border-bottom: 1px solid #dddddd;background-color: #ffffff;""> <td>Category :</td> <td>" & Category & "</td> </tr> <tr style=""border-bottom: 1px solid #dddddd;background-color: #f3f3f3;""> <td>Meta :</td> <td>" & Meta & "</td> </tr> <tr style=""border-bottom: 1px solid #dddddd;background-color: #ffffff;""> <td>Sub Category :</td> <td>" & SubCategory & "</td> </tr> <tr style=""border-bottom: 1px solid #dddddd;background-color: #f3f3f3;""> <td>Status :</td> <td>" & Status & "</td> </tr> <tr style=""border-bottom: 1px solid #dddddd;background-color: #ffffff;""> <td>Escalation Unit :</td> <td>" & EscalationUnit & "</td> </tr> </tbody></table>"

                    If AgentGroup = "3" Or AgentGroup = "4" Then
                        LogoEmail = "<img src='https://kanmo.uidesk.id/crm/apps/Signature/kanmogroup.png' alt='logo' width='160px'>"
                        'LogoEmail = "<img src='https://kanmogroup.com/images/main/logo-white.png' alt='logo' width='160px'>"
                    Else
                        LogoEmail = "<img src='https://kanmo.uidesk.id/crm/apps/Signature/nespresso.png' alt='logo' width='160px'>"
                    End If

                    If catgeoryEmail = "CUSTOMER" Then
                        'Template Untuk Customer
                        messageInternal = "<!DOCTYPE html><html> <head> <title></title> <meta http-equiv=""Content-Type"" content=""text/html; charset=utf-8""> <meta name=""viewport"" content=""width=device-width, initial-scale=1""> <meta http-equiv=""X-UA-Compatible"" content=""IE=edge""> <style type=""text/css""> /* FONTS */ @import url('https://fonts.googleapis.com/css?family=Poppins:100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i'); /* CLIENT-SPECIFIC STYLES */ body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; } table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; } img { -ms-interpolation-mode: bicubic; } /* RESET STYLES */ img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; } table { border-collapse: collapse !important; } body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; } /* iOS BLUE LINKS */ a[x-apple-data-detectors] { color: inherit !important; text-decoration: none !important; font-size: inherit !important; font-family: inherit !important; font-weight: inherit !important; line-height: inherit !important; } /* MOBILE STYLES */ @media screen and (max-width:600px) { h1 { font-size: 32px !important; line-height: 32px !important; } } /* ANDROID CENTER FIX */ div[style*=""margin: 16px 0;""] { margin: 0 !important; } </style> </head> <body style=""background-color: #f3f5f7; margin: 0 !important; padding: 0 !important;""> <!-- HIDDEN PREHEADER TEXT -->  <table border=""0"" cellpadding=""0"" cellspacing=""0"" width=""100%""> <!-- LOGO --> <tr> <td align=""center""> <!--[if (gte mso 9)|(IE)]><table align=""center"" border=""0"" cellspacing=""0"" cellpadding=""0"" width=""600""><tr><td align=""center"" valign=""top"" width=""600""><![endif]--> <table border=""0"" cellpadding=""0"" cellspacing=""0"" width=""100%"" style=""max-width: 600px;""> <tr> <td align=""center"" valign=""top"" style=""padding: 40px 10px 10px 10px;""> <a href=""#"" target=""_blank"" style=""text-decoration: none;""> " & LogoEmail & " </a> </td> </tr> </table> <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]--> </td> </tr> <!-- HERO --> <tr> <td align=""center"" style=""padding: 0px 10px 0px 10px;""> <!--[if (gte mso 9)|(IE)]><table align=""center"" border=""0"" cellspacing=""0"" cellpadding=""0"" width=""600""><tr><td align=""center"" valign=""top"" width=""600""><![endif]--> <table border=""0"" cellpadding=""0"" cellspacing=""0"" width=""100%"" style=""max-width: 600px;""> <tr> <td bgcolor=""#ffffff"" align=""left"" valign=""top"" style=""padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px;""> <h1 style=""font-size: 16px; font-weight: 600; margin: 0; font-family: 'Poppins', sans-serif;"">" & subjectEmail.ToString() & "</h1> </td> </tr> </table> <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]--> </td> </tr> <!-- COPY BLOCK --> <tr> <td align=""center"" style=""padding: 0px 10px 0px 10px;""> <!--[if (gte mso 9)|(IE)]><table align=""center"" border=""0"" cellspacing=""0"" cellpadding=""0"" width=""600""><tr><td align=""center"" valign=""top"" width=""600""><![endif]--> <table border=""0"" cellpadding=""0"" cellspacing=""0"" width=""100%"" style=""max-width: 600px;""> <!-- COPY --> <tr> <td bgcolor=""#ffffff"" align=""left"" style=""padding: 20px 30px 20px 30px; color: #666666; font-family: 'Poppins', sans-serif; font-size: 16px; font-weight: 400; line-height: 25px;""> " & bodyEmail & " </td> </tr> <!-- BULLETPROOF BUTTON --> <!-- COPY --> <tr> <td bgcolor=""#ffffff"" align=""left"" style=""padding: 0px 30px 40px 30px; border-radius: 0px 0px 0px 0px; color: #666666; font-family: 'Poppins', sans-serif; font-size: 14px; font-weight: 400; line-height: 25px;""> " & signatureEmail & " </td> </tr> </table> <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]--> </td> </tr> <!-- FOOTER --> <tr> <td align=""center"" style=""padding: 10px 10px 50px 10px;""> <!--[if (gte mso 9)|(IE)]><table align=""center"" border=""0"" cellspacing=""0"" cellpadding=""0"" width=""600""><tr><td align=""center"" valign=""top"" width=""600""><![endif]--> <table border=""0"" cellpadding=""0"" cellspacing=""0"" width=""100%"" style=""max-width: 600px;""> <tr> <td align=""center"" style=""padding: 30px 30px 30px 30px; color: #333333; font-family: 'Poppins', sans-serif; font-size: 12px; font-weight: 400; line-height: 18px;""> <p style=""margin: 0;"">Copyright © 2023 Kanmo Group. All rights reserved.</p> </td> </tr> </table> <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]--> </td> </tr> </table> </body></html>"

                    Else
                        'Template Untuk Internal
                        messageInternal = "<!DOCTYPE html><html> <head> <title></title> <meta http-equiv=""Content-Type"" content=""text/html; charset=utf-8""> <meta name=""viewport"" content=""width=device-width, initial-scale=1""> <meta http-equiv=""X-UA-Compatible"" content=""IE=edge""> <style type=""text/css""> /* FONTS */ @import url('https://fonts.googleapis.com/css?family=Poppins:100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i'); /* CLIENT-SPECIFIC STYLES */ body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; } table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; } img { -ms-interpolation-mode: bicubic; } /* RESET STYLES */ img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; } table { border-collapse: collapse !important; } body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; } /* iOS BLUE LINKS */ a[x-apple-data-detectors] { color: inherit !important; text-decoration: none !important; font-size: inherit !important; font-family: inherit !important; font-weight: inherit !important; line-height: inherit !important; } /* MOBILE STYLES */ @media screen and (max-width:600px) { h1 { font-size: 32px !important; line-height: 32px !important; } } /* ANDROID CENTER FIX */ div[style*=""margin: 16px 0;""] { margin: 0 !important; } </style> </head> <body style=""background-color: #f3f5f7; margin: 0 !important; padding: 0 !important;""> <!-- HIDDEN PREHEADER TEXT -->  <table border=""0"" cellpadding=""0"" cellspacing=""0"" width=""100%""> <!-- LOGO --> <tr> <td align=""center""> <!--[if (gte mso 9)|(IE)]><table align=""center"" border=""0"" cellspacing=""0"" cellpadding=""0"" width=""600""><tr><td align=""center"" valign=""top"" width=""600""><![endif]--> <table border=""0"" cellpadding=""0"" cellspacing=""0"" width=""100%"" style=""max-width: 600px;""> <tr> <td align=""center"" valign=""top"" style=""padding: 40px 10px 10px 10px;""> <a href=""#"" target=""_blank"" style=""text-decoration: none;""> " & LogoEmail & " </a> </td> </tr> </table> <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]--> </td> </tr> <!-- HERO --> <tr> <td align=""center"" style=""padding: 0px 10px 0px 10px;""> <!--[if (gte mso 9)|(IE)]><table align=""center"" border=""0"" cellspacing=""0"" cellpadding=""0"" width=""600""><tr><td align=""center"" valign=""top"" width=""600""><![endif]--> <table border=""0"" cellpadding=""0"" cellspacing=""0"" width=""100%"" style=""max-width: 600px;""> <tr> <td bgcolor=""#ffffff"" align=""left"" valign=""top"" style=""padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px;""> <h1 style=""font-size: 16px; font-weight: 600; margin: 0; font-family: 'Poppins', sans-serif;"">" & subjectEmail.ToString() & "</h1> </td> </tr> </table> <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]--> </td> </tr> <!-- COPY BLOCK --> <tr> <td align=""center"" style=""padding: 0px 10px 0px 10px;""> <!--[if (gte mso 9)|(IE)]><table align=""center"" border=""0"" cellspacing=""0"" cellpadding=""0"" width=""600""><tr><td align=""center"" valign=""top"" width=""600""><![endif]--> <table border=""0"" cellpadding=""0"" cellspacing=""0"" width=""100%"" style=""max-width: 600px;""> <!-- COPY --> <tr> <td bgcolor=""#ffffff"" align=""left"" style=""padding: 20px 30px 20px 30px; color: #666666; font-family: 'Poppins', sans-serif; font-size: 16px; font-weight: 400; line-height: 25px;""> " & bodyEmail & " </td> </tr><tr><td>" & tambahanBodyEmail & "</td></tr> <!-- BULLETPROOF BUTTON --> <!-- COPY --> <tr> <td bgcolor=""#ffffff"" align=""left"" style=""padding: 0px 30px 40px 30px; border-radius: 0px 0px 0px 0px; color: #666666; font-family: 'Poppins', sans-serif; font-size: 14px; font-weight: 400; line-height: 25px;""> " & signatureEmail & " </td> </tr> </table> <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]--> </td> </tr> <!-- FOOTER --> <tr> <td align=""center"" style=""padding: 10px 10px 50px 10px;""> <!--[if (gte mso 9)|(IE)]><table align=""center"" border=""0"" cellspacing=""0"" cellpadding=""0"" width=""600""><tr><td align=""center"" valign=""top"" width=""600""><![endif]--> <table border=""0"" cellpadding=""0"" cellspacing=""0"" width=""100%"" style=""max-width: 600px;""> <tr> <td align=""center"" style=""padding: 30px 30px 30px 30px; color: #333333; font-family: 'Poppins', sans-serif; font-size: 12px; font-weight: 400; line-height: 18px;""> <p style=""margin: 0;"">Copyright © 2023 Kanmo Group. All rights reserved.</p> </td> </tr> </table> <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]--> </td> </tr> </table> </body></html>"

                    End If

                    Try
                        Dim DirectoryX As String = Path.Combine(Server.MapPath("../../FileEmail/Outbox/" & emailID))
                        If Not System.IO.Directory.Exists(DirectoryX) Then
                            System.IO.Directory.CreateDirectory(DirectoryX)
                        End If
                    Catch exX As Exception
                        ''Try catch untuk error create folder
                        Dim pathXX As String = HttpContext.Current.Server.MapPath("../apps/FileOutboundHTML/" & TicketNumber & "/" & TrxUserName & "/err_" & DateTime.Now.ToString("ddMMyyyy") & ".txt")
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
                        Dim pathX As String = HttpContext.Current.Server.MapPath("../../FileEmail/Outbox/" & emailID & "/file.html")
                        'Using writer As New StreamWriter(pathX, True)
                        '    writer.WriteLine(messageInternal)
                        '    writer.Close()
                        'End Using
                        Using writer As New StreamWriter(pathX, True)
                            writer.WriteLine(messageInternal)
                            writer.Close()
                        End Using

                        Dim objectTickets As resultInsert = New resultInsert()
                        objectTickets.Result = "True"
                        objectTickets.TrxmsgSystem = "Data Has Been Send"
                        listTickets.Add(objectTickets)
                        'Dim strExec As String = "exec UIDESK_TrxEmailCompose '" & TrxUsernameXSS & "','" & TrxEmailFrom & "','" & TrxTO & "','" & TrxSubjectXSS & "','" & TrxCC & "','" & TrxBody & "','" & _TrxEmailID & "','" & TrxDirection & "','" & TrxType & "'"
                        Dim strExec As String = "exec UIDESK_TrxEmailCompose_Interaction '" & TrxUsernameXSS & "','" & TrxEmailFrom & "','" & TrxTO & "','" & TrxSubjectXSS & "','" & TrxCC & "','" & TrxBCC & "','" & TrxBody & "','" & _TrxEmailID & "','" & TrxDirection & "','" & TrxType & "'"



                        LogSuccess(TrxUserName, strExec)
                    End Try
                End While

            End Using
        Catch ex As Exception
            'LogError(strLogTime, ex, strQuery)
        Finally
            ' LogSuccess(strLogTime, strQuery)
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
        'Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        'Dim strExec As String = String.Empty
        'Dim _Valuenya As String = String.Empty
        'Dim _Result As String = String.Empty
        'Dim _TrxAutoID As String = DateTime.Now.ToString("yyyyMMddhhmmss")
        'Dim _TrxEmailID = _TrxAutoID & New Random().Next(1000000, 9999999)
        'Dim TrxUsernameXSS As String = AntiXssEncoder.HtmlEncode(TrxUserName.Trim, True)
        ''Dim TrxType As String = "compose_email"
        'Dim TrxSubjectXSS As String = AntiXssEncoder.HtmlEncode(TrxSubject.Trim, True)

        'Dim DirectoryX As String = Path.Combine(Server.MapPath(_RootAttachmentOutboxEmail & "" & _TrxEmailID))
        'If Not System.IO.Directory.Exists(DirectoryX) Then
        '    System.IO.Directory.CreateDirectory(DirectoryX)
        'Else
        'End If

        'Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        'Try
        '    Using con As New SqlConnection(constr)
        '        Dim sqlComm As New SqlCommand()
        '        sqlComm.Connection = con
        '        sqlComm.CommandText = "[UIDESK_TrxEmailCompose_Interaction]"
        '        sqlComm.CommandType = CommandType.StoredProcedure
        '        sqlComm.Parameters.AddWithValue("TrxUserName", TrxUsernameXSS)
        '        sqlComm.Parameters.AddWithValue("TrxEmailFrom", TrxEmailFrom)
        '        sqlComm.Parameters.AddWithValue("TrxTO", TrxTO)
        '        sqlComm.Parameters.AddWithValue("TrxSubject", TrxSubjectXSS)
        '        sqlComm.Parameters.AddWithValue("TrxCC", TrxCC)
        '        sqlComm.Parameters.AddWithValue("TrxBody", TrxBody)
        '        sqlComm.Parameters.AddWithValue("TrxEmailID", _TrxEmailID)
        '        sqlComm.Parameters.AddWithValue("TrxDirection", TrxDirection)
        '        sqlComm.Parameters.AddWithValue("TrxType", TrxType)
        '        sqlComm.Parameters.AddWithValue("TicketNumber", TicketNumber)
        '        con.Open()
        '        sqlComm.ExecuteNonQuery()
        '        con.Close()
        '    End Using
        'Catch ex As Exception
        '    Dim objectTickets As resultInsert = New resultInsert()
        '    objectTickets.Result = "False"
        '    objectTickets.TrxmsgSystem = ex.Message()
        '    listTickets.Add(objectTickets)
        '    strExec = "exec UIDESK_TrxEmailCompose '" & TrxUsernameXSS & "','" & TrxEmailFrom & "','" & TrxTO & "','" & TrxSubjectXSS & "','" & TrxCC & "','" & TrxBody & "','" & _TrxEmailID & "','" & TrxDirection & "','" & TrxType & "'"
        '    LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        'Finally
        'Dim objectTickets As resultInsert = New resultInsert()
        'objectTickets.Result = "True"
        'objectTickets.TrxmsgSystem = "Data Has Been Send"
        'listTickets.Add(objectTickets)
        'strExec = "exec UIDESK_TrxEmailCompose '" & TrxUsernameXSS & "','" & TrxEmailFrom & "','" & TrxTO & "','" & TrxSubjectXSS & "','" & TrxCC & "','" & TrxBody & "','" & _TrxEmailID & "','" & TrxDirection & "','" & TrxType & "'"



        'LogSuccess(HttpContext.Current.Session("UserName"), strExec)
        'End Try
        'Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        'Return js.Serialize(listTickets)

    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function UIDESK_TrxEmailDraft(ByVal TrxUserName As String, ByVal TrxEmailFrom As String, ByVal TrxTO As String, ByVal TrxSubject As String, ByVal TrxCC As String,
                                       ByVal TrxBCC As String, ByVal TrxBody As String, ByVal TrxDirection As String, ByVal TrxType As String) As String
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim _Valuenya As String = String.Empty
        Dim _Result As String = String.Empty
        Dim _TrxAutoID As String = DateTime.Now.ToString("yyyyMMddhhmmss")
        Dim _TrxEmailID = _TrxAutoID & New Random().Next(1000000, 9999999)
        Dim TrxUsernameXSS As String = AntiXssEncoder.HtmlEncode(TrxUserName.Trim, True)
        Dim TrxSubjectXSS As String = AntiXssEncoder.HtmlEncode(TrxSubject.Trim, True)

        Dim DirectoryX As String = Path.Combine(Server.MapPath(_RootAttachmentOutboxEmail & "" & _TrxEmailID))
        If Not System.IO.Directory.Exists(DirectoryX) Then
            System.IO.Directory.CreateDirectory(DirectoryX)
        Else
        End If

        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "UIDESK_TrxEmailDraft"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("TrxUserName", TrxUsernameXSS)
                sqlComm.Parameters.AddWithValue("TrxEmailFrom", TrxEmailFrom)
                sqlComm.Parameters.AddWithValue("TrxTO", TrxTO)
                sqlComm.Parameters.AddWithValue("TrxSubject", TrxSubjectXSS)
                sqlComm.Parameters.AddWithValue("TrxCC", TrxCC)
                sqlComm.Parameters.AddWithValue("TrxBCC", TrxBCC)
                sqlComm.Parameters.AddWithValue("TrxBody", TrxBody)
                sqlComm.Parameters.AddWithValue("TrxEmailID", _TrxEmailID)
                sqlComm.Parameters.AddWithValue("TrxDirection", TrxDirection)
                sqlComm.Parameters.AddWithValue("TrxType", TrxType)
                con.Open()
                sqlComm.ExecuteNonQuery()
                con.Close()
            End Using
        Catch ex As Exception
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "False"
            objectTickets.TrxmsgSystem = ex.Message()
            listTickets.Add(objectTickets)
            strExec = "exec UIDESK_TrxEmailDraft '" & TrxUsernameXSS & "','" & TrxEmailFrom & "','" & TrxTO & "','" & TrxSubject & "','" & TrxCC & "','" & TrxBCC & "','" & TrxBody & "','" & _TrxEmailID & "','" & TrxDirection & "','" & TrxType & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "True"
            objectTickets.TrxmsgSystem = "Data Has Been Draft"
            listTickets.Add(objectTickets)
            strExec = "exec UIDESK_TrxEmailDraft '" & TrxUsernameXSS & "','" & TrxEmailFrom & "','" & TrxTO & "','" & TrxSubject & "','" & TrxCC & "','" & TrxBCC & "','" & TrxBody & "','" & _TrxEmailID & "','" & TrxDirection & "','" & TrxType & "'"
            LogSuccess(HttpContext.Current.Session("UserName"), strExec)
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function UIDESK_TrxEmailDraft_Update(ByVal TrxIvcID As String, ByVal TrxUserName As String, ByVal TrxEmailFrom As String, ByVal TrxTO As String, ByVal TrxSubject As String,
                                       ByVal TrxCC As String, ByVal TrxBCC As String, ByVal TrxBody As String, ByVal TrxDirection As String, ByVal TrxType As String) As String
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim _Valuenya As String = String.Empty
        Dim _Result As String = String.Empty
        Dim _TrxAutoID As String = DateTime.Now.ToString("yyyyMMddhhmmss")
        Dim _TrxEmailID = _TrxAutoID & New Random().Next(1000000, 9999999)
        Dim TrxUsernameXSS As String = AntiXssEncoder.HtmlEncode(TrxUserName.Trim, True)
        Dim TrxSubjectXSS As String = AntiXssEncoder.HtmlEncode(TrxSubject.Trim, True)

        Dim DirectoryX As String = Path.Combine(Server.MapPath(_RootAttachmentOutboxEmail & "" & _TrxEmailID))
        If Not System.IO.Directory.Exists(DirectoryX) Then
            System.IO.Directory.CreateDirectory(DirectoryX)
        Else
        End If

        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "UIDESK_TrxEmailDraft_Update"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("TrxIvcID", TrxIvcID)
                sqlComm.Parameters.AddWithValue("TrxUserName", TrxUsernameXSS)
                sqlComm.Parameters.AddWithValue("TrxEmailFrom", TrxEmailFrom)
                sqlComm.Parameters.AddWithValue("TrxTO", TrxTO)
                sqlComm.Parameters.AddWithValue("TrxSubject", TrxSubjectXSS)
                sqlComm.Parameters.AddWithValue("TrxCC", TrxCC)
                sqlComm.Parameters.AddWithValue("TrxBCC", TrxBCC)
                sqlComm.Parameters.AddWithValue("TrxBody", TrxBody)
                sqlComm.Parameters.AddWithValue("TrxEmailID", _TrxEmailID)
                sqlComm.Parameters.AddWithValue("TrxDirection", TrxDirection)
                sqlComm.Parameters.AddWithValue("TrxType", TrxType)
                con.Open()
                sqlComm.ExecuteNonQuery()
                con.Close()
            End Using
        Catch ex As Exception
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "False"
            objectTickets.TrxmsgSystem = ex.Message()
            listTickets.Add(objectTickets)
            strExec = "exec UIDESK_TrxEmailDraft_Update '" & TrxIvcID & "','" & TrxUsernameXSS & "','" & TrxEmailFrom & "','" & TrxTO & "','" & TrxBCC & "','" & TrxSubject & "','" & TrxCC & "','" & TrxBody & "','" & _TrxEmailID & "','" & TrxDirection & "','" & TrxType & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "True"
            objectTickets.TrxmsgSystem = "Data Has Been Update Draft"
            listTickets.Add(objectTickets)
            strExec = "exec UIDESK_TrxEmailDraft_Update '" & TrxIvcID & "','" & TrxUsernameXSS & "','" & TrxEmailFrom & "','" & TrxTO & "','" & TrxBCC & "','" & TrxSubject & "','" & TrxCC & "','" & TrxBody & "','" & _TrxEmailID & "','" & TrxDirection & "','" & TrxType & "'"
            LogSuccess(HttpContext.Current.Session("UserName"), strExec)
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function UIDESK_TrxEmailDraftSending(ByVal TrxDraftID As String, ByVal TrxUserName As String, ByVal TrxEmailFrom As String, ByVal TrxTO As String, ByVal TrxSubject As String,
                                                ByVal TrxCC As String, ByVal TrxBCC As String, ByVal TrxBody As String, ByVal TrxDirection As String, ByVal TrxType As String) As String
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim _Valuenya As String = String.Empty
        Dim _Result As String = String.Empty
        Dim _TrxAutoID As String = DateTime.Now.ToString("yyyyMMddhhmmss")
        Dim _TrxEmailID = _TrxAutoID & New Random().Next(1000000, 9999999)
        Dim TrxUsernameXSS As String = AntiXssEncoder.HtmlEncode(TrxUserName.Trim, True)
        Dim TrxSubjectXSS As String = AntiXssEncoder.HtmlEncode(TrxSubject.Trim, True)

        Dim DirectoryX As String = Path.Combine(Server.MapPath(_RootAttachmentOutboxEmail & "" & _TrxEmailID))
        If Not System.IO.Directory.Exists(DirectoryX) Then
            System.IO.Directory.CreateDirectory(DirectoryX)
        Else
        End If

        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "UIDESK_TrxEmailDraftSending"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("TrxDraftID", TrxDraftID)
                sqlComm.Parameters.AddWithValue("TrxUserName", TrxUsernameXSS)
                sqlComm.Parameters.AddWithValue("TrxEmailFrom", TrxEmailFrom)
                sqlComm.Parameters.AddWithValue("TrxTO", TrxTO)
                sqlComm.Parameters.AddWithValue("TrxSubject", TrxSubjectXSS)
                sqlComm.Parameters.AddWithValue("TrxCC", TrxCC)
                sqlComm.Parameters.AddWithValue("TrxBCC", TrxBCC)
                sqlComm.Parameters.AddWithValue("TrxBody", TrxBody)
                sqlComm.Parameters.AddWithValue("TrxEmailID", _TrxEmailID)
                sqlComm.Parameters.AddWithValue("TrxDirection", TrxDirection)
                sqlComm.Parameters.AddWithValue("TrxType", TrxType)
                con.Open()
                sqlComm.ExecuteNonQuery()
                con.Close()
            End Using
        Catch ex As Exception
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "False"
            objectTickets.TrxmsgSystem = ex.Message()
            listTickets.Add(objectTickets)
            strExec = "exec UIDESK_TrxEmailDraftSending '" & TrxDraftID & "','" & TrxUsernameXSS & "','" & TrxEmailFrom & "','" & TrxTO & "','" & TrxSubject & "','" & TrxCC & "','" & TrxBCC & "','" & TrxBody & "','" & _TrxEmailID & "','" & TrxDirection & "','" & TrxType & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "True"
            objectTickets.TrxmsgSystem = "Data Has Been Send"
            listTickets.Add(objectTickets)
            strExec = "exec UIDESK_TrxEmailDraftSending '" & TrxDraftID & "','" & TrxUsernameXSS & "','" & TrxEmailFrom & "','" & TrxTO & "','" & TrxSubject & "','" & TrxCC & "','" & TrxBCC & "','" & TrxBody & "','" & _TrxEmailID & "','" & TrxDirection & "','" & TrxType & "'"
            LogSuccess(HttpContext.Current.Session("UserName"), strExec)
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function ReplyEmail(ByVal TrxEmailID As String, ByVal TrxUserName As String, ByVal TrxTO As String, ByVal TrxSubject As String, ByVal TrxCC As String,
                               ByVal TrxBody As String, ByVal TrxDirection As String, ByVal TrxLayerUser As String) As String
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim _Valuenya As String = String.Empty
        Dim _Result As String = String.Empty
        Dim TrxUsernameXSS As String = AntiXssEncoder.HtmlEncode(TrxUserName.Trim, True)
        Dim TrxType As String = "reply_email"
        Dim TrxSubjectXSS As String = AntiXssEncoder.HtmlEncode(TrxSubject.Trim, True)
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "UIDESK_TrxEmailReply"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("TrxUserName", TrxUsernameXSS)
                sqlComm.Parameters.AddWithValue("TrxTO", TrxTO)
                sqlComm.Parameters.AddWithValue("TrxSubject", TrxSubjectXSS)
                sqlComm.Parameters.AddWithValue("TrxCC", TrxCC)
                sqlComm.Parameters.AddWithValue("TrxBody", TrxBody)
                sqlComm.Parameters.AddWithValue("TrxEmailID", TrxEmailID)
                sqlComm.Parameters.AddWithValue("TrxDirection", TrxDirection)
                sqlComm.Parameters.AddWithValue("TrxLayerUser", TrxLayerUser)
                sqlComm.Parameters.AddWithValue("TrxType", TrxType)
                con.Open()
                sqlComm.ExecuteNonQuery()
                con.Close()
            End Using
        Catch ex As Exception
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "False"
            objectTickets.TrxmsgSystem = ex.Message()
            listTickets.Add(objectTickets)
            strExec = "exec UIDESK_TrxEmailReply '" & TrxUsernameXSS & "','" & TrxTO & "','" & TrxSubject & "','" & TrxCC & "','" & TrxBody & "','" & TrxEmailID & "','" & TrxDirection & "','" & TrxLayerUser & "','" & TrxType & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "True"
            objectTickets.TrxmsgSystem = "Data Has Been Reply"
            listTickets.Add(objectTickets)
            strExec = "exec UIDESK_TrxEmailReply '" & TrxUsernameXSS & "','" & TrxTO & "','" & TrxSubject & "','" & TrxCC & "','" & TrxBody & "','" & TrxEmailID & "','" & TrxDirection & "','" & TrxLayerUser & "','" & TrxType & "'"
            LogSuccess(HttpContext.Current.Session("UserName"), strExec)
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function

    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function UIDESK_TrxEmailReply_New(ByVal TrxInboxEmailID As String, ByVal TrxGenerateEmailID As String, ByVal TrxUserName As String, ByVal TrxTO As String, ByVal TrxSubject As String,
                                             ByVal TrxCC As String, ByVal TrxBCC As String, ByVal TrxBody As String, ByVal TrxDirection As String, ByVal TrxLayerUser As String) As String
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim _Valuenya As String = String.Empty
        Dim _Result As String = String.Empty

        Dim DirectoryX As String = Path.Combine(Server.MapPath(_RootAttachmentOutboxEmail & "" & TrxGenerateEmailID))
        If Not System.IO.Directory.Exists(DirectoryX) Then
            System.IO.Directory.CreateDirectory(DirectoryX)
        Else
        End If

        Dim TrxType As String = "reply_email"
        Dim TrxUsernameXSS As String = AntiXssEncoder.HtmlEncode(TrxUserName.Trim, True)
        Dim TrxSubjectXSS As String = AntiXssEncoder.HtmlEncode(TrxSubject.Trim, True)
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "UIDESK_TrxEmailReply_New"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("TrxUserName", TrxUsernameXSS)
                sqlComm.Parameters.AddWithValue("TrxTO", TrxTO)
                sqlComm.Parameters.AddWithValue("TrxSubject", TrxSubjectXSS)
                sqlComm.Parameters.AddWithValue("TrxCC", TrxCC)
                sqlComm.Parameters.AddWithValue("TrxBCC", TrxBCC)
                sqlComm.Parameters.AddWithValue("TrxBody", TrxBody)
                sqlComm.Parameters.AddWithValue("TrxInboxEmailID", TrxInboxEmailID)
                sqlComm.Parameters.AddWithValue("TrxGenerateEmailID", TrxGenerateEmailID)
                sqlComm.Parameters.AddWithValue("TrxDirection", TrxDirection)
                sqlComm.Parameters.AddWithValue("TrxLayerUser", TrxLayerUser)
                sqlComm.Parameters.AddWithValue("TrxType", TrxType)
                con.Open()
                sqlComm.ExecuteNonQuery()
                con.Close()
            End Using
        Catch ex As Exception
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "False"
            objectTickets.TrxmsgSystem = ex.Message()
            listTickets.Add(objectTickets)
            strExec = "exec UIDESK_TrxEmailReply_New '" & TrxUsernameXSS & "','" & TrxTO & "','" & TrxSubject & "','" & TrxCC & "','" & TrxBCC & "','" & TrxBody & "','" & TrxInboxEmailID & "','" & TrxGenerateEmailID & "','" & TrxDirection & "','" & TrxLayerUser & "','" & TrxType & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "True"
            objectTickets.TrxmsgSystem = "Data Has Been Reply"
            listTickets.Add(objectTickets)
            strExec = "exec UIDESK_TrxEmailReply_New '" & TrxUsernameXSS & "','" & TrxTO & "','" & TrxSubject & "','" & TrxCC & "','" & TrxBCC & "','" & TrxBody & "','" & TrxInboxEmailID & "','" & TrxGenerateEmailID & "','" & TrxDirection & "','" & TrxLayerUser & "','" & TrxType & "'"
            LogSuccess(HttpContext.Current.Session("UserName"), strExec)
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    '<WebMethod(EnableSession:=True)>
    '<ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    'Public Function UIDESK_TrxEmailReply_New(ByVal TrxInboxEmailID As String, ByVal TrxGenerateEmailID As String, ByVal TrxUserName As String, ByVal TrxTO As String, ByVal TrxSubject As String, ByVal TrxCC As String,
    '                           ByVal TrxBody As String, ByVal TrxDirection As String, ByVal TrxLayerUser As String) As String
    '    Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
    '    Dim strExec As String = String.Empty
    '    Dim _Valuenya As String = String.Empty
    '    Dim _Result As String = String.Empty
    '    Dim _TrxAutoID As String = DateTime.Now.ToString("yyyyMMddhhmmss")
    '    Dim _TrxEmailID = _TrxAutoID & New Random().Next(1000000, 9999999)
    '    Dim TrxUsernameXSS As String = AntiXssEncoder.HtmlEncode(TrxUserName.Trim, True)
    '    'Dim TrxType As String = "compose_email"
    '    Dim TrxSubjectXSS As String = AntiXssEncoder.HtmlEncode(TrxSubject.Trim, True)
    '    Dim bodyEmail As String, emailID As String, signatureEmail As String, subjectEmail As String, catgeoryEmail As String
    '    Dim messageInternal As String, tambahanBodyEmail As String

    '    Dim DateTransaction As String, ProductType As String, Activity As String, ProductName As String, Type As String, Category As String, Meta As String, SubCategory As String, Status As String, EscalationUnit As String


    '    Dim DirectoryPathInboxEmail As String = Path.Combine(Server.MapPath(_RootAttachmentInboxEmail & "" & TrxInboxEmailID))
    '    Dim DirectoryX As String = Path.Combine(Server.MapPath(_RootAttachmentOutboxEmail & "" & TrxGenerateEmailID))
    '    If Not System.IO.Directory.Exists(DirectoryX) Then
    '        System.IO.Directory.CreateDirectory(DirectoryX)
    '    Else
    '    End If

    '    Dim TrxType As String = "reply_email"
    '    'Dim TrxUsernameXSS As String = AntiXssEncoder.HtmlEncode(TrxUserName.Trim, True)
    '    'Dim TrxSubjectXSS As String = AntiXssEncoder.HtmlEncode(TrxSubject.Trim, True)
    '    Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
    '    Try
    '        Using con As New SqlConnection(constr)
    '            Dim sqlComm As New SqlCommand()
    '            sqlComm.Connection = con
    '            'sqlComm.CommandText = "KAN_UIDESK_TrxEmailReply_NEW"
    '            sqlComm.CommandType = CommandType.StoredProcedure
    '            sqlComm.Parameters.AddWithValue("TrxUserName", TrxUsernameXSS)
    '            sqlComm.Parameters.AddWithValue("TrxTO", TrxTO)
    '            sqlComm.Parameters.AddWithValue("TrxSubject", TrxSubjectXSS)
    '            sqlComm.Parameters.AddWithValue("TrxCC", TrxCC)
    '            sqlComm.Parameters.AddWithValue("TrxBody", TrxBody)
    '            sqlComm.Parameters.AddWithValue("TrxInboxEmailID", TrxInboxEmailID)
    '            sqlComm.Parameters.AddWithValue("TrxGenerateEmailID", TrxGenerateEmailID)
    '            sqlComm.Parameters.AddWithValue("TrxDirection", TrxDirection)
    '            sqlComm.Parameters.AddWithValue("TrxLayerUser", TrxLayerUser)
    '            sqlComm.Parameters.AddWithValue("TrxType", TrxType)
    '            con.Open()
    '            'sqlComm.ExecuteNonQuery()
    '            Dim rdr As SqlDataReader = sqlComm.ExecuteReader()

    '            While rdr.Read()
    '                emailID = TrxGenerateEmailID
    '                bodyEmail = rdr("BodyInboxEmailHTML").ToString()
    '                signatureEmail = rdr("EmailSignature").ToString()
    '                'TicketNumber = rdr("TicketNumber").ToString()
    '                subjectEmail = rdr("EmailSubject").ToString()
    '                catgeoryEmail = rdr("CategoryEmail").ToString()
    '                DateTransaction = rdr("DateTransaction").ToString()
    '                ProductType = rdr("ProductType").ToString()
    '                Activity = rdr("Activity").ToString()
    '                ProductName = rdr("ProductName").ToString()
    '                Type = rdr("TypeTic").ToString()
    '                Category = rdr("Category").ToString()
    '                Meta = rdr("Meta").ToString()
    '                SubCategory = rdr("SubCategory").ToString()
    '                Status = rdr("EscalationUnit").ToString()
    '                EscalationUnit = rdr("EscalationUnit").ToString()

    '                tambahanBodyEmail = "<table style=""font-family: 'Poppins', sans-serif; font-size: 13px; font-weight: 250; line-height: 25px;"" width=""100%""> <thead> <tr> <th colspan=""2"">Data Ticket Information</th> </tr> </thead> <tbody> <tr style=""border-bottom: 1px solid #dddddd;background-color: #ffffff;""> <td>Date of Transaction :</td> <td>" & DateTransaction & "</td> </tr> <tr style=""border-bottom: 1px solid #dddddd;background-color: #f3f3f3;""> <td>Agent Name :</td> <td>" & TrxUserName & "</td> </tr> <tr style=""border-bottom: 1px solid #dddddd;background-color: #f3f3f3;""> <td>Activity :</td> <td>" & Activity & "</td> </tr> <tr style=""border-bottom: 1px solid #dddddd;background-color: #ffffff;""> <td>Product Name :</td> <td>" & ProductName & "</td> </tr> <tr style=""border-bottom: 1px solid #dddddd;background-color: #f3f3f3;""> <td>Type :</td> <td>" & Type & "</td> </tr> <tr style=""border-bottom: 1px solid #dddddd;background-color: #ffffff;""> <td>Category :</td> <td>" & Category & "</td> </tr> <tr style=""border-bottom: 1px solid #dddddd;background-color: #f3f3f3;""> <td>Meta :</td> <td>" & Meta & "</td> </tr> <tr style=""border-bottom: 1px solid #dddddd;background-color: #ffffff;""> <td>Sub Category :</td> <td>" & SubCategory & "</td> </tr> <tr style=""border-bottom: 1px solid #dddddd;background-color: #f3f3f3;""> <td>Status :</td> <td>" & Status & "</td> </tr> <tr style=""border-bottom: 1px solid #dddddd;background-color: #ffffff;""> <td>Escalation Unit :</td> <td>" & EscalationUnit & "</td> </tr> </tbody></table>"

    '                If catgeoryEmail = "CUSTOMER" Then
    '                    'Template Untuk Customer
    '                    messageInternal = "<!DOCTYPE html><html> <head> <title></title> <meta http-equiv=""Content-Type"" content=""text/html; charset=utf-8""> <meta name=""viewport"" content=""width=device-width, initial-scale=1""> <meta http-equiv=""X-UA-Compatible"" content=""IE=edge""> <style type=""text/css""> /* FONTS */ @import url('https://fonts.googleapis.com/css?family=Poppins:100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i'); /* CLIENT-SPECIFIC STYLES */ body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; } table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; } img { -ms-interpolation-mode: bicubic; } /* RESET STYLES */ img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; } table { border-collapse: collapse !important; } body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; } /* iOS BLUE LINKS */ a[x-apple-data-detectors] { color: inherit !important; text-decoration: none !important; font-size: inherit !important; font-family: inherit !important; font-weight: inherit !important; line-height: inherit !important; } /* MOBILE STYLES */ @media screen and (max-width:600px) { h1 { font-size: 32px !important; line-height: 32px !important; } } /* ANDROID CENTER FIX */ div[style*=""margin: 16px 0;""] { margin: 0 !important; } </style> </head> <body style=""background-color: #f3f5f7; margin: 0 !important; padding: 0 !important;""> <!-- HIDDEN PREHEADER TEXT -->  <table border=""0"" cellpadding=""0"" cellspacing=""0"" width=""100%""> <!-- LOGO --> <tr> <td align=""center""> <!--[if (gte mso 9)|(IE)]><table align=""center"" border=""0"" cellspacing=""0"" cellpadding=""0"" width=""600""><tr><td align=""center"" valign=""top"" width=""600""><![endif]--> <table border=""0"" cellpadding=""0"" cellspacing=""0"" width=""100%"" style=""max-width: 600px;""> <tr> <td align=""center"" valign=""top"" style=""padding: 40px 10px 10px 10px;""> <a href=""#"" target=""_blank"" style=""text-decoration: none;""> <span style=""display: block; font-family: 'Poppins', sans-serif; font-size: 36px;color: #727272;"" border=""0"" > <b style=""color: rgba(239,115,68,0.8);"">Kanmo</b> Group </span> </a> </td> </tr> </table> <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]--> </td> </tr> <!-- HERO --> <tr> <td align=""center"" style=""padding: 0px 10px 0px 10px;""> <!--[if (gte mso 9)|(IE)]><table align=""center"" border=""0"" cellspacing=""0"" cellpadding=""0"" width=""600""><tr><td align=""center"" valign=""top"" width=""600""><![endif]--> <table border=""0"" cellpadding=""0"" cellspacing=""0"" width=""100%"" style=""max-width: 600px;""> <tr> <td bgcolor=""#ffffff"" align=""left"" valign=""top"" style=""padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px;""> <h1 style=""font-size: 16px; font-weight: 600; margin: 0; font-family: 'Poppins', sans-serif;"">" & subjectEmail.ToString() & "</h1> </td> </tr> </table> <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]--> </td> </tr> <!-- COPY BLOCK --> <tr> <td align=""center"" style=""padding: 0px 10px 0px 10px;""> <!--[if (gte mso 9)|(IE)]><table align=""center"" border=""0"" cellspacing=""0"" cellpadding=""0"" width=""600""><tr><td align=""center"" valign=""top"" width=""600""><![endif]--> <table border=""0"" cellpadding=""0"" cellspacing=""0"" width=""100%"" style=""max-width: 600px;""> <!-- COPY --> <tr> <td bgcolor=""#ffffff"" align=""left"" style=""padding: 20px 30px 20px 30px; color: #666666; font-family: 'Poppins', sans-serif; font-size: 16px; font-weight: 400; line-height: 25px;""> " & bodyEmail & " </td> </tr> <!-- BULLETPROOF BUTTON --> <!-- COPY --> <tr> <td bgcolor=""#ffffff"" align=""left"" style=""padding: 0px 30px 40px 30px; border-radius: 0px 0px 0px 0px; color: #666666; font-family: 'Poppins', sans-serif; font-size: 14px; font-weight: 400; line-height: 25px;""> " & signatureEmail & " </td> </tr> </table> <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]--> </td> </tr> <!-- FOOTER --> <tr> <td align=""center"" style=""padding: 10px 10px 50px 10px;""> <!--[if (gte mso 9)|(IE)]><table align=""center"" border=""0"" cellspacing=""0"" cellpadding=""0"" width=""600""><tr><td align=""center"" valign=""top"" width=""600""><![endif]--> <table border=""0"" cellpadding=""0"" cellspacing=""0"" width=""100%"" style=""max-width: 600px;""> <tr> <td align=""center"" style=""padding: 30px 30px 30px 30px; color: #333333; font-family: 'Poppins', sans-serif; font-size: 12px; font-weight: 400; line-height: 18px;""> <p style=""margin: 0;"">Copyright © 2023 Kanmo Group. All rights reserved.</p> </td> </tr> </table> <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]--> </td> </tr> </table> </body></html>"

    '                Else
    '                    'Template Untuk Internal
    '                    messageInternal = "<!DOCTYPE html><html> <head> <title></title> <meta http-equiv=""Content-Type"" content=""text/html; charset=utf-8""> <meta name=""viewport"" content=""width=device-width, initial-scale=1""> <meta http-equiv=""X-UA-Compatible"" content=""IE=edge""> <style type=""text/css""> /* FONTS */ @import url('https://fonts.googleapis.com/css?family=Poppins:100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i'); /* CLIENT-SPECIFIC STYLES */ body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; } table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; } img { -ms-interpolation-mode: bicubic; } /* RESET STYLES */ img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; } table { border-collapse: collapse !important; } body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; } /* iOS BLUE LINKS */ a[x-apple-data-detectors] { color: inherit !important; text-decoration: none !important; font-size: inherit !important; font-family: inherit !important; font-weight: inherit !important; line-height: inherit !important; } /* MOBILE STYLES */ @media screen and (max-width:600px) { h1 { font-size: 32px !important; line-height: 32px !important; } } /* ANDROID CENTER FIX */ div[style*=""margin: 16px 0;""] { margin: 0 !important; } </style> </head> <body style=""background-color: #f3f5f7; margin: 0 !important; padding: 0 !important;""> <!-- HIDDEN PREHEADER TEXT -->  <table border=""0"" cellpadding=""0"" cellspacing=""0"" width=""100%""> <!-- LOGO --> <tr> <td align=""center""> <!--[if (gte mso 9)|(IE)]><table align=""center"" border=""0"" cellspacing=""0"" cellpadding=""0"" width=""600""><tr><td align=""center"" valign=""top"" width=""600""><![endif]--> <table border=""0"" cellpadding=""0"" cellspacing=""0"" width=""100%"" style=""max-width: 600px;""> <tr> <td align=""center"" valign=""top"" style=""padding: 40px 10px 10px 10px;""> <a href=""#"" target=""_blank"" style=""text-decoration: none;""> <span style=""display: block; font-family: 'Poppins', sans-serif; font-size: 36px;color: #727272;"" border=""0"" > <b style=""color: rgba(239,115,68,0.8);"">Kanmo</b> Group </span> </a> </td> </tr> </table> <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]--> </td> </tr> <!-- HERO --> <tr> <td align=""center"" style=""padding: 0px 10px 0px 10px;""> <!--[if (gte mso 9)|(IE)]><table align=""center"" border=""0"" cellspacing=""0"" cellpadding=""0"" width=""600""><tr><td align=""center"" valign=""top"" width=""600""><![endif]--> <table border=""0"" cellpadding=""0"" cellspacing=""0"" width=""100%"" style=""max-width: 600px;""> <tr> <td bgcolor=""#ffffff"" align=""left"" valign=""top"" style=""padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px;""> <h1 style=""font-size: 16px; font-weight: 600; margin: 0; font-family: 'Poppins', sans-serif;"">" & subjectEmail.ToString() & "</h1> </td> </tr> </table> <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]--> </td> </tr> <!-- COPY BLOCK --> <tr> <td align=""center"" style=""padding: 0px 10px 0px 10px;""> <!--[if (gte mso 9)|(IE)]><table align=""center"" border=""0"" cellspacing=""0"" cellpadding=""0"" width=""600""><tr><td align=""center"" valign=""top"" width=""600""><![endif]--> <table border=""0"" cellpadding=""0"" cellspacing=""0"" width=""100%"" style=""max-width: 600px;""> <!-- COPY --> <tr> <td bgcolor=""#ffffff"" align=""left"" style=""padding: 20px 30px 20px 30px; color: #666666; font-family: 'Poppins', sans-serif; font-size: 16px; font-weight: 400; line-height: 25px;""> " & bodyEmail & " </td> </tr><tr><td>" & tambahanBodyEmail & "</td></tr> <!-- BULLETPROOF BUTTON --> <!-- COPY --> <tr> <td bgcolor=""#ffffff"" align=""left"" style=""padding: 0px 30px 40px 30px; border-radius: 0px 0px 0px 0px; color: #666666; font-family: 'Poppins', sans-serif; font-size: 14px; font-weight: 400; line-height: 25px;""> " & signatureEmail & " </td> </tr> </table> <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]--> </td> </tr> <!-- FOOTER --> <tr> <td align=""center"" style=""padding: 10px 10px 50px 10px;""> <!--[if (gte mso 9)|(IE)]><table align=""center"" border=""0"" cellspacing=""0"" cellpadding=""0"" width=""600""><tr><td align=""center"" valign=""top"" width=""600""><![endif]--> <table border=""0"" cellpadding=""0"" cellspacing=""0"" width=""100%"" style=""max-width: 600px;""> <tr> <td align=""center"" style=""padding: 30px 30px 30px 30px; color: #333333; font-family: 'Poppins', sans-serif; font-size: 12px; font-weight: 400; line-height: 18px;""> <p style=""margin: 0;"">Copyright © 2023 Kanmo Group. All rights reserved.</p> </td> </tr> </table> <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]--> </td> </tr> </table> </body></html>"

    '                End If
    '                Try
    '                    Dim DirectoryXX As String = Path.Combine(Server.MapPath("../../FileEmail/Outbox/" & TrxGenerateEmailID))
    '                    If Not System.IO.Directory.Exists(DirectoryXX) Then
    '                        System.IO.Directory.CreateDirectory(DirectoryXX)
    '                    End If
    '                Catch exX As Exception
    '                    ''Try catch untuk error create folder
    '                    Dim pathXX As String = HttpContext.Current.Server.MapPath("../apps/FileOutboundHTML/" & _TrxEmailID & "/" & TrxUserName & "/err_" & DateTime.Now.ToString("ddMMyyyy") & ".txt")
    '                    Dim messageXX As String = String.Format("Time: {0}", DateTime.Now.ToString("dd/MM/yyyy hh:mm:ss:fff tt"))
    '                    messageXX += Environment.NewLine
    '                    messageXX += "---------------------------Success-------------------------------------------------------"
    '                    messageXX += Environment.NewLine
    '                    messageXX += String.Format("Message: {0}", exX.Message)
    '                    messageXX += Environment.NewLine
    '                    messageXX += String.Format("StackTrace: {0}", exX.StackTrace)
    '                    messageXX += Environment.NewLine
    '                    messageXX += String.Format("Source: {0}", exX.Source)
    '                    messageXX += Environment.NewLine
    '                    messageXX += String.Format("TargetSite: {0}", exX.TargetSite.ToString())
    '                    messageXX += Environment.NewLine
    '                    messageXX += "---------------------------Success-------------------------------------------------------"
    '                    messageXX += Environment.NewLine
    '                    Using writer As New StreamWriter(pathXX, True)
    '                        writer.WriteLine(messageXX)
    '                        writer.Close()
    '                    End Using
    '                Finally
    '                    Dim pathX As String = HttpContext.Current.Server.MapPath("../../FileEmail/Outbox/" & TrxGenerateEmailID & "/file.html")
    '                    'Using writer As New StreamWriter(pathX, True)
    '                    '    writer.WriteLine(messageInternal)
    '                    '    writer.Close()
    '                    'End Using
    '                    Using writer As New StreamWriter(pathX, True)
    '                        writer.WriteLine(messageInternal)
    '                        writer.Close()
    '                    End Using
    '                End Try
    '            End While
    '            con.Close()
    '        End Using
    '    Catch ex As Exception
    '        Dim objectTickets As resultInsert = New resultInsert()
    '        objectTickets.Result = "False"
    '        objectTickets.TrxmsgSystem = ex.Message()
    '        listTickets.Add(objectTickets)
    '        strExec = "exec KAN_UIDESK_TrxEmailReply_NEW '" & TrxUsernameXSS & "','" & TrxTO & "','" & TrxSubject & "','" & TrxCC & "','" & TrxBody & "','" & TrxInboxEmailID & "','" & TrxGenerateEmailID & "','" & TrxDirection & "','" & TrxLayerUser & "','" & TrxType & "'"
    '        LogError(HttpContext.Current.Session("UserName"), ex, strExec)
    '    Finally
    '        Dim objectTickets As resultInsert = New resultInsert()
    '        objectTickets.Result = "True"
    '        objectTickets.TrxmsgSystem = "Data Has Been Reply"
    '        listTickets.Add(objectTickets)
    '        strExec = "exec KAN_UIDESK_TrxEmailReply_NEW '" & TrxUsernameXSS & "','" & TrxTO & "','" & TrxSubject & "','" & TrxCC & "','" & TrxBody & "','" & TrxInboxEmailID & "','" & TrxGenerateEmailID & "','" & TrxDirection & "','" & TrxLayerUser & "','" & TrxType & "'"
    '        LogSuccess(HttpContext.Current.Session("UserName"), strExec)
    '    End Try
    '    Dim js As JavaScriptSerializer = New JavaScriptSerializer()
    '    Return js.Serialize(listTickets)
    'End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function UIDESK_TrxEmailForward(ByVal TrxInboxEmailID As String, ByVal TrxGenerateEmailID As String, ByVal TrxUserName As String, ByVal TrxEmailFrom As String, ByVal TrxTO As String,
                                           ByVal TrxSubject As String, ByVal TrxCC As String, ByVal TrxBCC As String, ByVal TrxBody As String, ByVal TrxDirection As String, ByVal TrxLayerUser As String) As String
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim _Valuenya As String = String.Empty
        Dim _Result As String = String.Empty

        Dim TrxType As String = "forward_email"
        Dim TrxUsernameXSS As String = AntiXssEncoder.HtmlEncode(TrxUserName.Trim, True)
        Dim TrxSubjectXSS As String = AntiXssEncoder.HtmlEncode(TrxSubject.Trim, True)

        Dim DirectoryX As String = Path.Combine(Server.MapPath(_RootAttachmentOutboxEmail & "" & TrxGenerateEmailID))
        If Not System.IO.Directory.Exists(DirectoryX) Then
            System.IO.Directory.CreateDirectory(DirectoryX)
        Else
        End If

        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "UIDESK_TrxEmailForward"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("TrxUserName", TrxUsernameXSS)
                sqlComm.Parameters.AddWithValue("TrxEmailFrom", TrxEmailFrom)
                sqlComm.Parameters.AddWithValue("TrxTO", TrxTO)
                sqlComm.Parameters.AddWithValue("TrxSubject", TrxSubjectXSS)
                sqlComm.Parameters.AddWithValue("TrxCC", TrxCC)
                sqlComm.Parameters.AddWithValue("TrxBCC", TrxBCC)
                sqlComm.Parameters.AddWithValue("TrxBody", TrxBody)
                sqlComm.Parameters.AddWithValue("TrxInboxEmailID", TrxInboxEmailID)
                sqlComm.Parameters.AddWithValue("TrxGenerateEmailID", TrxGenerateEmailID)
                sqlComm.Parameters.AddWithValue("TrxDirection", TrxDirection)
                sqlComm.Parameters.AddWithValue("TrxLayerUser", TrxLayerUser)
                sqlComm.Parameters.AddWithValue("TrxType", TrxType)
                con.Open()
                sqlComm.ExecuteNonQuery()
                con.Close()
            End Using
        Catch ex As Exception
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "False"
            objectTickets.TrxmsgSystem = ex.Message()
            listTickets.Add(objectTickets)
            strExec = "exec UIDESK_TrxEmailForward '" & TrxUsernameXSS & "','" & TrxEmailFrom & "','" & TrxTO & "','" & TrxSubject & "','" & TrxCC & "','" & TrxBCC & "','" & TrxBody & "','" & TrxInboxEmailID & "','" & TrxGenerateEmailID & "','" & TrxDirection & "','" & TrxLayerUser & "','" & TrxType & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "True"
            objectTickets.TrxmsgSystem = "Data Has Been Forward"
            listTickets.Add(objectTickets)
            strExec = "exec UIDESK_TrxEmailForward '" & TrxUsernameXSS & "','" & TrxEmailFrom & "','" & TrxTO & "','" & TrxSubject & "','" & TrxCC & "','" & TrxBCC & "','" & TrxBody & "','" & TrxInboxEmailID & "','" & TrxGenerateEmailID & "','" & TrxDirection & "','" & TrxLayerUser & "','" & TrxType & "'"
            LogSuccess(HttpContext.Current.Session("UserName"), strExec)
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function UpdateEmailSpam(ByVal TrxID As String, ByVal TrxUserName As String, ByVal TrxLayerUser As String) As String
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim TrxUsernameXSS As String = AntiXssEncoder.HtmlEncode(TrxUserName.Trim, True)
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "UIDESK_TrxEmailSpam"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("TrxID", TrxID)
                sqlComm.Parameters.AddWithValue("TrxUserName", TrxUsernameXSS)
                sqlComm.Parameters.AddWithValue("TrxLayerUser", TrxLayerUser)
                con.Open()
                sqlComm.ExecuteNonQuery()
                con.Close()
            End Using
        Catch ex As Exception
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "False"
            objectTickets.TrxmsgSystem = ex.Message()
            listTickets.Add(objectTickets)
            strExec = "exec UIDESK_TrxEmailSpam '" & TrxID & "','" & TrxUsernameXSS & "','" & TrxLayerUser & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "True"
            objectTickets.TrxmsgSystem = "Data Has Been Update"
            listTickets.Add(objectTickets)
            strExec = "exec UIDESK_TrxEmailSpam '" & TrxID & "','" & TrxUsernameXSS & "','" & TrxLayerUser & "'"
            LogSuccess(HttpContext.Current.Session("UserName"), strExec)
            ''End
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function DeleteEmailInbox(ByVal TrxID As String, ByVal TrxUserName As String) As String
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim TrxUserNameXSS As String = AntiXssEncoder.HtmlEncode(TrxUserName.Trim, True)
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "UIDESK_TrxEmailInboxDelete"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("TrxID", TrxID)
                sqlComm.Parameters.AddWithValue("TrxUserName", TrxUserNameXSS)
                con.Open()
                sqlComm.ExecuteNonQuery()
                con.Close()
            End Using
        Catch ex As Exception
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "False"
            objectTickets.TrxmsgSystem = ex.Message()
            listTickets.Add(objectTickets)
            strExec = "exec UIDESK_TrxEmailInboxDelete '" & TrxID & "','" & TrxUserNameXSS & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.TrxmsgSystem = "Data Has Been Delete"
            listTickets.Add(objectTickets)
            strExec = "exec UIDESK_TrxEmailInboxDelete '" & TrxID & "','" & TrxUserNameXSS & "'"
            LogSuccess(HttpContext.Current.Session("UserName"), strExec)
            ''End
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function DeleteEmailOutbox(ByVal TrxID As String, ByVal TrxUserName As String) As String
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim TrxUserNameXSS As String = AntiXssEncoder.HtmlEncode(TrxUserName.Trim, True)
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "UIDESK_TrxEmailOutboxDelete"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("TrxID", TrxID)
                sqlComm.Parameters.AddWithValue("TrxUserName", TrxUserNameXSS)
                con.Open()
                sqlComm.ExecuteNonQuery()
                con.Close()
            End Using
        Catch ex As Exception
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "False"
            objectTickets.TrxmsgSystem = ex.Message()
            listTickets.Add(objectTickets)
            strExec = "exec UIDESK_TrxEmailOutboxDelete '" & TrxID & "','" & TrxUserNameXSS & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.TrxmsgSystem = "Data Has Been Delete"
            listTickets.Add(objectTickets)
            strExec = "exec UIDESK_TrxEmailOutboxDelete '" & TrxID & "','" & TrxUserNameXSS & "'"
            LogSuccess(HttpContext.Current.Session("UserName"), strExec)
            ''End
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function DeleteAttachmentEmail(ByVal TrxID As String, ByVal TrxUserName As String) As String
        Dim _FileNameAttachment As String = String.Empty
        Dim _Type As String = String.Empty
        Dim _Url As String = String.Empty
        Dim _Sfile As String = "SELECT * FROM UIDESK_TrxEmailDetail WHERE ID='" & TrxID & "'"
        Try
            sqldr = Proses.ExecuteReader(_Sfile)
            If sqldr.HasRows Then
                sqldr.Read()
                _Url = sqldr("URL").ToString
                _FileNameAttachment = sqldr("FILENAME").ToString
                _Type = sqldr("DIRECTION").ToString
            Else
            End If
            sqldr.Close()
            LogSuccess(HttpContext.Current.Session("UserName"), _Sfile)
        Catch ex As Exception
            LogError(HttpContext.Current.Session("UserName"), ex, _Sfile)
        End Try

        Dim path As String = String.Empty
        If _Type = "IN" Then
            path = Server.MapPath("~/FileEmail/Inbox/" & _FileNameAttachment)
        Else
            path = Server.MapPath("~/FileEmail/Outbox/" & _Url)
        End If
        Dim file As FileInfo = New FileInfo(path)
        If file.Exists Then
            file.Delete()
        Else
        End If

        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "UIDESK_TrxDeleteEmailAttachment"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("TrxID", TrxID)
                sqlComm.Parameters.AddWithValue("TrxUserName", TrxUserName)
                con.Open()
                sqlComm.ExecuteNonQuery()
                con.Close()
            End Using
        Catch ex As Exception
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "False"
            objectTickets.TrxmsgSystem = ex.Message()
            listTickets.Add(objectTickets)
            strExec = "exec UIDESK_TrxDeleteEmailAttachment '" & TrxID & "','" & TrxUserName & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.TrxmsgSystem = "Data Has Been Delete"
            listTickets.Add(objectTickets)
            strExec = "exec UIDESK_TrxDeleteEmailAttachment '" & TrxID & "','" & TrxUserName & "'"
            LogSuccess(HttpContext.Current.Session("UserName"), strExec)
            ''End
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function DataTransactionEmailCounting(ByVal TrxUserName As String, ByVal TrxLevelUser As String) As String
        Dim connstring As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim dt As DataTable = New DataTable()
        'Dim sql As String = ""
        'Try
        '    Using conn As SqlConnection = New SqlConnection(connstring)
        '        conn.Open()

        '        sql = "exec UIDESK_TrxEmailCounting '" & TrxUserName & "', '" & TrxLevelUser & "', '" & TrxStartDate & " 00:01', '" & TrxEndDate & " 23:59'"

        '        Dim ad As SqlDataAdapter = New SqlDataAdapter(sql, conn)
        '        Dim ds As DataSet = New DataSet()
        '        ad.Fill(ds)
        '        dt = ds.Tables(0)
        '        conn.Close()
        '    End Using
        'Catch ex As Exception
        '    LogError(HttpContext.Current.Session("UserName"), ex, sql)
        'Finally
        '    LogSuccess(HttpContext.Current.Session("UserName"), sql)
        'End Try
        'Dim tableJson As String = ConvertDataTabletoString(dt)
        'Return tableJson
        Dim NameSP = "Exec UIDESK_TrxEmailCounting"
        Dim ExecSP = "" & NameSP & " '" & TrxUserName & "','" & TrxLevelUser & "'"
        Try
            Using conn As SqlConnection = New SqlConnection(connstring)
                conn.Open()
                Dim sqlComm As SqlCommand = New SqlCommand("UIDESK_TrxEmailCounting", conn)
                sqlComm.Parameters.AddWithValue("@TrxUserName", TrxUserName)
                sqlComm.Parameters.AddWithValue("@TrxLevelUser", TrxLevelUser)
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
        Dim tableJson As String = BigConvertDataTabletoString(dt)
        Return tableJson
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function UIDESK_TrxFilterDate(ByVal TrxID As String, ByVal StartDate As String, ByVal EndDate As String, ByVal TrxUserName As String, ByVal TrxAction As String) As String
        Dim DateNow As String = DateTime.Now.ToString("yyyy-MM-dd")
        Dim connstring As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim dt As DataTable = New DataTable()
        'Dim sql As String = ""
        ''exec NEW_Sp_Open 'Agent1','','1','1'
        'Try
        '    Using conn As SqlConnection = New SqlConnection(connstring)
        '        conn.Open()

        '        sql = "select format (CONVERT(Datetime, '" + StartDate + "', 120),'ddd MMM dd yyyy') As StartDate, format (CONVERT(Datetime, '" + EndDate + "', 120),'ddd MMM dd yyyy') As FinishDate"

        '        Dim ad As SqlDataAdapter = New SqlDataAdapter(sql, conn)
        '        Dim ds As DataSet = New DataSet()
        '        ad.Fill(ds)
        '        dt = ds.Tables(0)
        '        conn.Close()
        '    End Using
        'Catch ex As Exception
        '    LogError(HttpContext.Current.Session("UserName"), ex, sql)
        'Finally
        '    LogSuccess(HttpContext.Current.Session("UserName"), sql)
        'End Try
        'Dim tableJson As String = ConvertDataTabletoString(dt)
        'Return tableJson
        Dim NameSP = "Exec UIDESK_TrxFilterDate"
        Dim ExecSP = "" & NameSP & " '" & StartDate & "','" & EndDate & "','" & TrxUserName & "','" & TrxAction & "'"
        Try
            Using conn As SqlConnection = New SqlConnection(connstring)
                conn.Open()
                Dim sqlComm As SqlCommand = New SqlCommand("UIDESK_TrxFilterDate", conn)
                sqlComm.Parameters.AddWithValue("@TrxID", TrxID)
                sqlComm.Parameters.AddWithValue("@TrxStartDate", StartDate)
                sqlComm.Parameters.AddWithValue("@TrxEnddate", EndDate)
                sqlComm.Parameters.AddWithValue("@TrxUserName", TrxUserName)
                sqlComm.Parameters.AddWithValue("@TrxAction", TrxAction)
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
        Dim tableJson As String = BigConvertDataTabletoString(dt)
        Return tableJson
    End Function
    '<WebMethod(EnableSession:=True)>
    '<ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    'Public Function FilterDateToday(ByVal TxValue As String) As String
    '    Dim DateNow As String = DateTime.Now.ToString("yyyy-MM-dd")
    '    Dim connstring As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
    '    Dim dt As DataTable = New DataTable()
    '    Dim sql As String = ""
    '    'exec NEW_Sp_Open 'Agent1','','1','1'
    '    Try
    '        Using conn As SqlConnection = New SqlConnection(connstring)
    '            conn.Open()

    '            sql = "select format (CONVERT(Datetime, GETDATE(), 120),'ddd MMM dd yyyy') As FilterTodays, convert(DATE, GETDATE(), 112) As TodayQuery"

    '            Dim ad As SqlDataAdapter = New SqlDataAdapter(sql, conn)
    '            Dim ds As DataSet = New DataSet()
    '            ad.Fill(ds)
    '            dt = ds.Tables(0)
    '            conn.Close()
    '        End Using
    '    Catch ex As Exception
    '        LogError(HttpContext.Current.Session("UserName"), ex, sql)
    '    Finally
    '        LogSuccess(HttpContext.Current.Session("UserName"), sql)
    '    End Try
    '    Dim tableJson As String = ConvertDataTabletoString(dt)
    '    Return tableJson
    'End Function
    '<WebMethod(EnableSession:=True)>
    '<ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    'Public Function QueryToday(ByVal TxValue As String) As String
    '    Dim DateNow As String = DateTime.Now.ToString("yyyy-MM-dd")
    '    Dim connstring As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
    '    Dim dt As DataTable = New DataTable()
    '    Dim sql As String = ""
    '    'exec NEW_Sp_Open 'Agent1','','1','1'
    '    Try
    '        Using conn As SqlConnection = New SqlConnection(connstring)
    '            conn.Open()

    '            sql = "select format (CONVERT(Datetime, GETDATE(), 120),'yyyy-MM-dd') As QueryToday"

    '            Dim ad As SqlDataAdapter = New SqlDataAdapter(sql, conn)
    '            Dim ds As DataSet = New DataSet()
    '            ad.Fill(ds)
    '            dt = ds.Tables(0)
    '            conn.Close()
    '        End Using
    '    Catch ex As Exception
    '        LogError(HttpContext.Current.Session("UserName"), ex, sql)
    '    Finally
    '        LogSuccess(HttpContext.Current.Session("UserName"), sql)
    '    End Try
    '    Dim tableJson As String = ConvertDataTabletoString(dt)
    '    Return tableJson
    'End Function
    '<WebMethod(EnableSession:=True)>
    '<ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    'Public Function CheckDay(ByVal StartDate As String, ByVal EndDate As String, ByVal TrxUserName As String) As String
    '    Dim DateNow As String = DateTime.Now.ToString("yyyy-MM-dd")
    '    Dim connstring As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
    '    Dim dt As DataTable = New DataTable()
    '    Dim sql As String = ""
    '    'exec NEW_Sp_Open 'Agent1','','1','1'
    '    Try
    '        Using conn As SqlConnection = New SqlConnection(connstring)
    '            conn.Open()

    '            sql = "SELECT DATEDIFF(day, '" + StartDate + "', '" + EndDate + "') AS SummaryDay; "

    '            Dim ad As SqlDataAdapter = New SqlDataAdapter(sql, conn)
    '            Dim ds As DataSet = New DataSet()
    '            ad.Fill(ds)
    '            dt = ds.Tables(0)
    '            conn.Close()
    '        End Using
    '    Catch ex As Exception
    '        LogError(HttpContext.Current.Session("UserName"), ex, sql)
    '    Finally
    '        LogSuccess(HttpContext.Current.Session("UserName"), sql)
    '    End Try
    '    Dim tableJson As String = ConvertDataTabletoString(dt)
    '    Return tableJson
    'End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function CleansingDraftAttachment(ByVal TrxUserName As String) As String
        Dim _FileNameAttachment As String = String.Empty
        Dim _Type As String = String.Empty
        Dim _Url As String = String.Empty
        Dim _TrxID As String = String.Empty
        Dim _Sfile As String = "SELECT * FROM UIDESK_TrxEmailDetail WHERE USERCREATE='" & TrxUserName & "' AND DIRECTION='OUT' AND FLAG='N' AND FLAG_EVENT='0'"
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Try
            sqldr = Proses.ExecuteReader(_Sfile)
            While sqldr.HasRows()
                sqldr.Read()
                _TrxID = sqldr("ID").ToString
                _Url = sqldr("URL").ToString
                _FileNameAttachment = sqldr("FILENAME").ToString
                _Type = sqldr("DIRECTION").ToString


                Dim path As String = String.Empty
                If _Type = "IN" Then
                    path = Server.MapPath("~/FileEmail/Inbox/" & _FileNameAttachment)
                Else
                    path = Server.MapPath("~/FileEmail/Outbox/" & _Url)
                End If
                Dim file As FileInfo = New FileInfo(path)
                If file.Exists Then
                    file.Delete()
                Else
                End If

                Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
                Using con As New SqlConnection(constr)
                    Dim sqlComm As New SqlCommand()
                    sqlComm.Connection = con
                    sqlComm.CommandText = "UIDESK_TrxDeleteEmailAttachment"
                    sqlComm.CommandType = CommandType.StoredProcedure
                    sqlComm.Parameters.AddWithValue("TrxID", _TrxID)
                    sqlComm.Parameters.AddWithValue("TrxUserName", TrxUserName)
                    con.Open()
                    sqlComm.ExecuteNonQuery()
                    con.Close()
                End Using

            End While
            sqldr.Close()
            LogSuccess(HttpContext.Current.Session("UserName"), _Sfile)
        Catch ex As Exception
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "False"
            objectTickets.TrxmsgSystem = ex.Message()
            listTickets.Add(objectTickets)
            strExec = "exec UIDESK_TrxDeleteEmailAttachment '" & _TrxID & "','" & TrxUserName & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.TrxmsgSystem = "Data Has Been Delete"
            listTickets.Add(objectTickets)
            strExec = "exec UIDESK_TrxDeleteEmailAttachment '" & _TrxID & "','" & TrxUserName & "'"
            LogSuccess(HttpContext.Current.Session("UserName"), strExec)
            ''End
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function UIDESK_TrxEmailDraft_Delete(ByVal TrxIvcID As String, ByVal TrxUserName As String) As String
        Dim _FileNameAttachment As String = String.Empty
        Dim _Type As String = String.Empty
        Dim _Url As String = String.Empty
        Dim _TrxID As String = String.Empty
        Dim _Sfile As String = "SELECT * FROM UIDESK_TrxEmailDetail WHERE IVC_ID='" + TrxIvcID + "' AND DIRECTION='DRAFT'"
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Try
            sqldr = Proses.ExecuteReader(_Sfile)
            While sqldr.HasRows()
                sqldr.Read()
                _TrxID = sqldr("ID").ToString
                _Url = sqldr("URL").ToString
                _FileNameAttachment = sqldr("FILENAME").ToString
                _Type = sqldr("DIRECTION").ToString


                Dim path As String = String.Empty
                If _Type = "IN" Then
                    path = Server.MapPath("~/FileEmail/Inbox/" & _FileNameAttachment)
                Else
                    path = Server.MapPath("~/FileEmail/Outbox/" & _Url)
                End If
                Dim file As FileInfo = New FileInfo(path)
                If file.Exists Then
                    file.Delete()
                Else
                End If

                Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
                Using con As New SqlConnection(constr)
                    Dim sqlComm As New SqlCommand()
                    sqlComm.Connection = con
                    sqlComm.CommandText = "UIDESK_TrxEmailDraft_Delete"
                    sqlComm.CommandType = CommandType.StoredProcedure
                    sqlComm.Parameters.AddWithValue("TrxIvcID", TrxIvcID)
                    sqlComm.Parameters.AddWithValue("TrxUserName", TrxUserName)
                    con.Open()
                    sqlComm.ExecuteNonQuery()
                    con.Close()
                End Using

            End While
            sqldr.Close()
            LogSuccess(HttpContext.Current.Session("UserName"), _Sfile)
        Catch ex As Exception
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "False"
            objectTickets.TrxmsgSystem = ex.Message()
            listTickets.Add(objectTickets)
            strExec = "exec UIDESK_TrxEmailDraft_Delete '" & TrxIvcID & "','" & TrxUserName & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.TrxmsgSystem = "Data Has Been Delete"
            listTickets.Add(objectTickets)
            strExec = "exec UIDESK_TrxEmailDraft_Delete '" & TrxIvcID & "','" & TrxUserName & "'"
            LogSuccess(HttpContext.Current.Session("UserName"), strExec)
            ''End
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function UIDESK_TrmMasterDropdown(ByVal TrxID As String, ByVal TrxEvent As String, ByVal TrxUserName As String, ByVal TrxAction As String) As String
        Dim connstring As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim dt As DataTable = New DataTable()

        Dim NameSP = "Exec UIDESK_TrmMasterDropdown"
        Dim ExecSP = "" & NameSP & " '" & TrxID & "','" & TrxEvent & "','" & TrxUserName & "','" & TrxAction & "'"
        Try
            Using conn As SqlConnection = New SqlConnection(connstring)
                conn.Open()
                Dim sqlComm As SqlCommand = New SqlCommand("UIDESK_TrmMasterDropdown", conn)
                sqlComm.Parameters.AddWithValue("@TrxID", TrxID)
                sqlComm.Parameters.AddWithValue("@TrxEvent", TrxEvent)
                sqlComm.Parameters.AddWithValue("@TrxUserName", TrxUserName)
                sqlComm.Parameters.AddWithValue("@TrxAction", TrxAction)
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
        Dim tableJson As String = BigConvertDataTabletoString(dt)
        Return tableJson
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function ValidasikFolderFileHTML(ByVal Url As String, ByVal EmailID As String) As String
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim ResultTrx As String = String.Empty

        Dim PathUrl As String
        If Url = "1" Then
            PathUrl = "~/FileEmail/INBOX/"
        Else
            PathUrl = "~/FileEmail/OUTBOX/"
        End If
        Dim DirectoryX As String = Path.Combine(Server.MapPath(PathUrl & "" & EmailID))
        Dim FileX As String = Path.Combine(Server.MapPath(PathUrl & "" & EmailID & "/file.html"))
        If Not System.IO.Directory.Exists(DirectoryX) Then
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "False"
            listTickets.Add(objectTickets)
            ResultTrx = DirectoryX & " " & EmailID & " File Not Found"
            LogSuccess(HttpContext.Current.Session("UserName"), ResultTrx)
        Else
            If Not System.IO.File.Exists(FileX) Then
                Dim objectTickets As resultInsert = New resultInsert()
                objectTickets.Result = "False"
                listTickets.Add(objectTickets)
                ResultTrx = DirectoryX & " " & EmailID & " File Not Found"
                LogSuccess(HttpContext.Current.Session("UserName"), ResultTrx)
            Else
                Dim objectTickets As resultInsert = New resultInsert()
                objectTickets.Result = "True"
                listTickets.Add(objectTickets)
                ResultTrx = DirectoryX & " " & EmailID & " File Already Exits"
                LogSuccess(HttpContext.Current.Session("UserName"), ResultTrx)
            End If
        End If
        'If Not System.IO.Directory.Exists(DirectoryX) Then
        '    'System.IO.Directory.CreateDirectory(DirectoryX)
        '    Dim objectTickets As resultInsert = New resultInsert()
        '    objectTickets.Result = "False"
        '    listTickets.Add(objectTickets)
        '    ResultTrx = DirectoryX & "" & EmailID & " File Not Found"
        '    LogSuccess(HttpContext.Current.Session("UserName"), ResultTrx)
        'Else
        '    Dim objectTickets As resultInsert = New resultInsert()
        '    objectTickets.Result = "True"
        '    listTickets.Add(objectTickets)
        '    ResultTrx = DirectoryX & "" & EmailID & " File Already Exits"
        '    LogSuccess(HttpContext.Current.Session("UserName"), ResultTrx)
        'End If

        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function V2_DashboardSummaryData(ByVal UserName As String, ByVal XStartDate As String, ByVal XEndDate As String) As String
        Dim connstring As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim dt As DataTable = New DataTable()
        Dim sql As String = ""
        Try
            Using conn As SqlConnection = New SqlConnection(connstring)
                conn.Open()

                sql = "exec V2_UIDESK_QueryDataBoxCalls '" & UserName & "','" & XStartDate & "','" & XEndDate & "'"

                Dim ad As SqlDataAdapter = New SqlDataAdapter(sql, conn)
                Dim ds As DataSet = New DataSet()
                ad.Fill(ds)
                dt = ds.Tables(0)
                conn.Close()
            End Using
        Catch ex As Exception
            LogError(HttpContext.Current.Session("UserName"), ex, sql)
        Finally
            LogSuccess(HttpContext.Current.Session("UserName"), sql)
        End Try
        Dim tableJson As String = BigConvertDataTabletoString(dt)
        Return tableJson
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function V2_DashboardSummaryCall(ByVal UserName As String, ByVal XStartDate As String, ByVal XEndDate As String) As String
        Dim connstring As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim dt As DataTable = New DataTable()
        Dim sql As String = ""
        Try
            Using conn As SqlConnection = New SqlConnection(connstring)
                conn.Open()

                sql = "exec V2_UIDESK_QuerySummaryCalls '" & UserName & "','" & XStartDate & "','" & XEndDate & "'"

                Dim ad As SqlDataAdapter = New SqlDataAdapter(sql, conn)
                Dim ds As DataSet = New DataSet()
                ad.Fill(ds)
                dt = ds.Tables(0)
                conn.Close()
            End Using
        Catch ex As Exception
            LogError(HttpContext.Current.Session("UserName"), ex, sql)
        Finally
            LogSuccess(HttpContext.Current.Session("UserName"), sql)
        End Try
        Dim tableJson As String = BigConvertDataTabletoString(dt)
        Return tableJson
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function V2_DashboardDurationCall(ByVal UserName As String, ByVal XStartDate As String, ByVal XEndDate As String) As String
        Dim connstring As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim dt As DataTable = New DataTable()
        Dim sql As String = ""
        Try
            Using conn As SqlConnection = New SqlConnection(connstring)
                conn.Open()

                sql = "exec V2_UIDESK_TableDashboard_OutboundDuration '" & UserName & "','" & XStartDate & "','" & XEndDate & "'"

                Dim ad As SqlDataAdapter = New SqlDataAdapter(sql, conn)
                Dim ds As DataSet = New DataSet()
                ad.Fill(ds)
                dt = ds.Tables(0)
                conn.Close()
            End Using
        Catch ex As Exception
            LogError(HttpContext.Current.Session("UserName"), ex, sql)
        Finally
            LogSuccess(HttpContext.Current.Session("UserName"), sql)
        End Try
        Dim tableJson As String = BigConvertDataTabletoString(dt)
        Return tableJson
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function V2_Dashboard_Email_Summary(ByVal UserName As String, ByVal Account As String, ByVal XStartDate As String, ByVal XEndDate As String) As String
        Dim connstring As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim dt As DataTable = New DataTable()
        Dim sql As String = ""
        Try
            Using conn As SqlConnection = New SqlConnection(connstring)
                conn.Open()

                sql = "exec V2_Dashboard_Email_Summary '" & UserName & "','" & Account & "','" & XStartDate & "','" & XEndDate & "'"

                Dim ad As SqlDataAdapter = New SqlDataAdapter(sql, conn)
                Dim ds As DataSet = New DataSet()
                ad.Fill(ds)
                dt = ds.Tables(0)
                conn.Close()
            End Using
        Catch ex As Exception
            LogError(HttpContext.Current.Session("UserName"), ex, sql)
        Finally
            LogSuccess(HttpContext.Current.Session("UserName"), sql)
        End Try
        Dim tableJson As String = BigConvertDataTabletoString(dt)
        Return tableJson
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function V2_UIDESK_SummaryAgentMail(ByVal UserName As String, ByVal Account As String, ByVal XStartDate As String, ByVal XEndDate As String) As String
        Dim connstring As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim dt As DataTable = New DataTable()
        Dim sql As String = ""
        Try
            Using conn As SqlConnection = New SqlConnection(connstring)
                conn.Open()

                sql = "exec V2_UIDESK_SummaryAgentMail '" & UserName & "','" & Account & "','" & XStartDate & "','" & XEndDate & "'"

                Dim ad As SqlDataAdapter = New SqlDataAdapter(sql, conn)
                Dim ds As DataSet = New DataSet()
                ad.Fill(ds)
                dt = ds.Tables(0)
                conn.Close()
            End Using
        Catch ex As Exception
            LogError(HttpContext.Current.Session("UserName"), ex, sql)
        Finally
            LogSuccess(HttpContext.Current.Session("UserName"), sql)
        End Try
        Dim tableJson As String = BigConvertDataTabletoString(dt)
        Return tableJson
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function V2_UIDESK_QiwingMail(ByVal UserName As String, ByVal Account As String, ByVal XStartDate As String, ByVal XEndDate As String) As String
        Dim connstring As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim dt As DataTable = New DataTable()
        Dim sql As String = ""
        Try
            Using conn As SqlConnection = New SqlConnection(connstring)
                conn.Open()

                sql = "exec V2_UIDESK_QiwingMail '" & UserName & "','" & Account & "','" & XStartDate & "','" & XEndDate & "'"

                Dim ad As SqlDataAdapter = New SqlDataAdapter(sql, conn)
                Dim ds As DataSet = New DataSet()
                ad.Fill(ds)
                dt = ds.Tables(0)
                conn.Close()
            End Using
        Catch ex As Exception
            LogError(HttpContext.Current.Session("UserName"), ex, sql)
        Finally
            LogSuccess(HttpContext.Current.Session("UserName"), sql)
        End Try
        Dim tableJson As String = BigConvertDataTabletoString(dt)
        Return tableJson
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function UIDESK_TrmMasterCombo(ByVal TrxID As String, ByVal TrxUserName As String, ByVal TrxAction As String) As String
        Dim connstring As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim dt As DataTable = New DataTable()

        Dim NameSP = "Exec UIDESK_TrmDropdown"
        Dim ExecSP = "" & NameSP & " '" & TrxID & "','" & TrxUserName & "','" & TrxAction & "'"
        Try
            Using conn As SqlConnection = New SqlConnection(connstring)
                conn.Open()
                Dim sqlComm As SqlCommand = New SqlCommand("UIDESK_TrmDropdown", conn)
                sqlComm.Parameters.AddWithValue("@TrxID", TrxID)
                sqlComm.Parameters.AddWithValue("@TrxUserName", TrxUserName)
                sqlComm.Parameters.AddWithValue("@TrxAction", TrxAction)
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
        Dim tableJson As String = BigConvertDataTabletoString(dt)
        Return tableJson
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function DataFilterEmail(ByVal ID As String, ByVal JumlahFilter As String, ByVal UserName As String, ByVal Action As String) As String
        If Action = "TABLE" Or Action = "SELECT" Then
            Dim connstring As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
            Dim dt As DataTable = New DataTable()
            Dim NameSP = "Exec UIDESK_TrxJumlahFilter"
            Dim ExecSP = "" & NameSP & " '" & ID & "','" & JumlahFilter & "','" & UserName & "','" & Action & "'"
            Try
                Using conn As SqlConnection = New SqlConnection(connstring)
                    conn.Open()
                    Dim sqlComm As SqlCommand = New SqlCommand("UIDESK_TrxJumlahFilter", conn)
                    sqlComm.Parameters.AddWithValue("@ID", ID)
                    sqlComm.Parameters.AddWithValue("@JumlahFilter", JumlahFilter)
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
            Dim tableJson As String = BigConvertDataTabletoString(dt)
            Return tableJson
        Else
            Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
            Dim strExec As String = String.Empty
            Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
            Try
                Using con As New SqlConnection(constr)
                    Dim sqlComm As New SqlCommand()
                    sqlComm.Connection = con
                    sqlComm.CommandText = "UIDESK_TrxJumlahFilter"
                    sqlComm.CommandType = CommandType.StoredProcedure
                    sqlComm.Parameters.AddWithValue("ID", ID)
                    sqlComm.Parameters.AddWithValue("JumlahFilter", JumlahFilter)
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
                strExec = "exec UIDESK_TrxJumlahFilter '" & ID & "','" & JumlahFilter & "','" & UserName & "','" & Action & "'"
                LogError(HttpContext.Current.Session("UserName"), ex, strExec)
            Finally
                Dim objectTickets As resultInsert = New resultInsert()
                objectTickets.Result = "True"
                objectTickets.TrxmsgSystem = "Data Has Been Save"
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxJumlahFilter '" & ID & "','" & JumlahFilter & "','" & UserName & "','" & Action & "'"
                LogSuccess(HttpContext.Current.Session("UserName"), strExec)
            End Try
            Dim js As JavaScriptSerializer = New JavaScriptSerializer()
            Return js.Serialize(listTickets)
        End If
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function JamOperasionalEmail(ByVal ID As String, ByVal StartTime As String, ByVal EndTime As String, ByVal UserName As String, ByVal Action As String) As String
        If Action = "TABLE" Or Action = "SELECT" Then
            Dim connstring As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
            Dim dt As DataTable = New DataTable()
            Dim NameSP = "Exec UIDESK_TrxOfficeHour"
            Dim ExecSP = "" & NameSP & " '" & ID & "','" & StartTime & "','" & EndTime & "','" & UserName & "','" & Action & "'"
            Try
                Using conn As SqlConnection = New SqlConnection(connstring)
                    conn.Open()
                    Dim sqlComm As SqlCommand = New SqlCommand("UIDESK_TrxOfficeHour", conn)
                    sqlComm.Parameters.AddWithValue("@ID", ID)
                    sqlComm.Parameters.AddWithValue("@StartTime", StartTime)
                    sqlComm.Parameters.AddWithValue("@EndTime", EndTime)
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
            Dim tableJson As String = BigConvertDataTabletoString(dt)
            Return tableJson
        Else
            Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
            Dim strExec As String = String.Empty
            Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
            Try
                Using con As New SqlConnection(constr)
                    Dim sqlComm As New SqlCommand()
                    sqlComm.Connection = con
                    sqlComm.CommandText = "UIDESK_TrxOfficeHour"
                    sqlComm.CommandType = CommandType.StoredProcedure
                    sqlComm.Parameters.AddWithValue("ID", ID)
                    sqlComm.Parameters.AddWithValue("StartTime", StartTime)
                    sqlComm.Parameters.AddWithValue("EndTime", EndTime)
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
                strExec = "exec UIDESK_TrxOfficeHour '" & ID & "','" & StartTime & "','" & EndTime & "','" & UserName & "','" & Action & "'"
                LogError(HttpContext.Current.Session("UserName"), ex, strExec)
            Finally
                Dim objectTickets As resultInsert = New resultInsert()
                objectTickets.Result = "True"
                objectTickets.TrxmsgSystem = "Data Has Been Update"
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxOfficeHour '" & ID & "','" & StartTime & "','" & EndTime & "','" & UserName & "','" & Action & "'"
                LogSuccess(HttpContext.Current.Session("UserName"), strExec)
            End Try
            Dim js As JavaScriptSerializer = New JavaScriptSerializer()
            Return js.Serialize(listTickets)
        End If
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function DataNotifikasiEmail(ByVal UserName As String, ByVal Action As String) As String
        Dim connstring As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim dt As DataTable = New DataTable()
        Dim NameSP = "Exec UIDESK_TrxEmailNotifikasi"
        Dim ExecSP = "" & NameSP & " '" & UserName & "'"
        Try
            Using conn As SqlConnection = New SqlConnection(connstring)
                conn.Open()
                Dim sqlComm As SqlCommand = New SqlCommand("UIDESK_TrxEmailNotifikasi", conn)
                sqlComm.Parameters.AddWithValue("UserName", UserName)
                sqlComm.Parameters.AddWithValue("Action", Action)
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
        Dim tableJson As String = BigConvertDataTabletoString(dt)
        Return tableJson
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function AHU_Uidesk_TrxAssignEmail(ByVal Access As String, ByVal IvcID As String, ByVal Agent As String, ByVal ReasonAssign As String, ByVal User As String) As String
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "AHU_Uidesk_TrxAssignEmail"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("Access", Access)
                sqlComm.Parameters.AddWithValue("IvcID", IvcID)
                sqlComm.Parameters.AddWithValue("Agent", Agent)
                sqlComm.Parameters.AddWithValue("ReasonAssign", ReasonAssign)
                sqlComm.Parameters.AddWithValue("User", User)
                con.Open()
                sqlComm.ExecuteNonQuery()
                con.Close()
            End Using
        Catch ex As Exception
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "False"
            objectTickets.TrxmsgSystem = ex.Message()
            listTickets.Add(objectTickets)
            strExec = "exec AHU_Uidesk_TrxAssignEmail '" & Access & "','" & IvcID & "','" & Agent & "','" & ReasonAssign & "','" & User & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "True"
            objectTickets.TrxmsgSystem = "Data Has Been Save"
            listTickets.Add(objectTickets)
            strExec = "exec AHU_Uidesk_TrxAssignEmail '" & Access & "','" & IvcID & "','" & Agent & "','" & ReasonAssign & "','" & User & "'"
            LogSuccess(HttpContext.Current.Session("UserName"), strExec)
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
End Class