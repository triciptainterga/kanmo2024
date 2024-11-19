Imports System.Net
Imports System.Net.Mail
Imports System.Web.Services
Imports System.Configuration
Imports System.Net.Configuration
Imports System.Web.Services.Protocols
Imports System.IO
Imports System.Data
Imports System.Data.SqlClient

Public Class WebForm1
    Inherits System.Web.UI.Page
    Dim sqlcom As SqlCommand
    Dim sqlcon As New SqlConnection(ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString)
    Dim strSql As String
    Dim sqldr As SqlDataReader
    Dim strTime As String = DateTime.Now.ToString("yyyyMMddhhmmssfff")
    Dim strLogTime As String = DateTime.Now.ToString("yyyy")
    Dim TrxEmailForm As String = ConfigurationManager.AppSettings("EmailForm")
    Dim Proses As New ClsConn
    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load

    End Sub
    Public Class chartComplaint
        Public Property dateNya As Date
        Public Property alphaNya As String
    End Class
    Public Sub generateHTMLforEmail(ByVal agentName As String, typeEmail As String, ticketnumber As String)
        Dim bodyEmail As String, emailID As String, signatureEmail As String, subjectEmail As String
        'SP Baru untuk generate data dari Table karena ini corenya sudah ada : [UIDESK_CREATE_HTML_Temp_Email_Customer] 'TICKET_CREATE','20230907070133328'
        bodyEmail = ""
        emailID = ""
        signatureEmail = ""
        subjectEmail = ""

        Dim listTickets As List(Of chartComplaint) = New List(Of chartComplaint)()
        Dim cs As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim strQuery As String = String.Empty
        Try
            strQuery = "exec [UIDESK_CREATE_HTML_Temp_Email_Customer] '" & typeEmail & "','" & ticketnumber & "'"
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
                    ticketnumber = rdr("TicketNumber").ToString()
                    subjectEmail = rdr("EmailSubject").ToString()
                End While

            End Using
        Catch ex As Exception
            'LogError(strLogTime, ex, strQuery)
        Finally
            ' LogSuccess(strLogTime, strQuery)
        End Try



        ''End

        Dim message As String
        'messageOri = "<!DOCTYPE html><html> <head> <title></title> <meta http-equiv=""Content-Type"" content=""text/html; charset=utf-8""> <meta name=""viewport"" content=""width=device-width, initial-scale=1""> <meta http-equiv=""X-UA-Compatible"" content=""IE=edge""> <style type=""text/css""> /* FONTS */ @import url('https://fonts.googleapis.com/css?family=Poppins:100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i'); /* CLIENT-SPECIFIC STYLES */ body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; } table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; } img { -ms-interpolation-mode: bicubic; } /* RESET STYLES */ img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; } table { border-collapse: collapse !important; } body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; } /* iOS BLUE LINKS */ a[x-apple-data-detectors] { color: inherit !important; text-decoration: none !important; font-size: inherit !important; font-family: inherit !important; font-weight: inherit !important; line-height: inherit !important; } /* MOBILE STYLES */ @media screen and (max-width:600px) { h1 { font-size: 32px !important; line-height: 32px !important; } } /* ANDROID CENTER FIX */ div[style*=""margin: 16px 0;""] { margin: 0 !important; } </style> </head> <body style=""background-color: #f3f5f7; margin: 0 !important; padding: 0 !important;""> <!-- HIDDEN PREHEADER TEXT --> <div style=""display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: 'Poppins', sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;""> We're thrilled to have you here! Get ready to dive into your new account.</div> <table border=""0"" cellpadding=""0"" cellspacing=""0"" width=""100%""> <!-- LOGO --> <tr> <td align=""center""> <!--[if (gte mso 9)|(IE)]><table align=""center"" border=""0"" cellspacing=""0"" cellpadding=""0"" width=""600""><tr><td align=""center"" valign=""top"" width=""600""><![endif]--> <table border=""0"" cellpadding=""0"" cellspacing=""0"" width=""100%"" style=""max-width: 600px;""> <tr> <td align=""center"" valign=""top"" style=""padding: 40px 10px 10px 10px;""> <a href=""#"" target=""_blank"" style=""text-decoration: none;""> <span style=""display: block; font-family: 'Poppins', sans-serif; font-size: 36px;color: #727272;"" border=""0"" > <b style=""color: rgba(239,115,68,0.8);"">Kanmo</b> Group </span> </a> </td> </tr> </table> <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]--> </td> </tr> <!-- HERO --> <tr> <td align=""center"" style=""padding: 0px 10px 0px 10px;""> <!--[if (gte mso 9)|(IE)]><table align=""center"" border=""0"" cellspacing=""0"" cellpadding=""0"" width=""600""><tr><td align=""center"" valign=""top"" width=""600""><![endif]--> <table border=""0"" cellpadding=""0"" cellspacing=""0"" width=""100%"" style=""max-width: 600px;""> <tr> <td bgcolor=""#ffffff"" align=""left"" valign=""top"" style=""padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px;""> <h1 style=""font-size: 16px; font-weight: 600; margin: 0; font-family: 'Poppins', sans-serif;"">{Kategori}-{no.tiket}</h1> </td> </tr> </table> <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]--> </td> </tr> <!-- COPY BLOCK --> <tr> <td align=""center"" style=""padding: 0px 10px 0px 10px;""> <!--[if (gte mso 9)|(IE)]><table align=""center"" border=""0"" cellspacing=""0"" cellpadding=""0"" width=""600""><tr><td align=""center"" valign=""top"" width=""600""><![endif]--> <table border=""0"" cellpadding=""0"" cellspacing=""0"" width=""100%"" style=""max-width: 600px;""> <!-- COPY --> <tr> <td bgcolor=""#ffffff"" align=""left"" style=""padding: 20px 30px 20px 30px; color: #666666; font-family: 'Poppins', sans-serif; font-size: 16px; font-weight: 400; line-height: 25px;""> <p>Kepada Yth,</p> <p>Bapak/Ibu {nama_pelanggan}</p> <p>Terima kasih kami ucapkan atas kepercayaan Bapak/Ibu kepada Mothercare. Kami senantiasa berupaya memberikan pelayanan terbaik dan profesional bagi Bapak/Ibu, Pelanggan Mothercare.</p> <p>Bersama ini kami sampaikan nomor Tiket Bapak/Ibu {no.tiket}</p> <p>Demikian disampaikan, apabila ada hal yang lain yang dapat kami bantu mohon menghubungi langsung ke layanan Customer Care kami.</p> <p>&nbsp;</p> <p>Atas perhatian dan kerjasamanya, kami ucapkan terima kasih.</p> </td> </tr> <!-- BULLETPROOF BUTTON --> <!-- COPY --> <tr> <td bgcolor=""#ffffff"" align=""left"" style=""padding: 0px 30px 40px 30px; border-radius: 0px 0px 0px 0px; color: #666666; font-family: 'Poppins', sans-serif; font-size: 14px; font-weight: 400; line-height: 25px;""> <p>Salam,</p><p>CUSTOMER CARE</p><p>KANMO GROUP</p><p>Menara Era, Jl. Senen Raya No.135-137, </p><p>RT.6/RW.1, Senen, Kec. Senen, Kota Jakarta Pusat, </p><p>Daerah Khusus Ibukota Jakarta 10410</p><p>Call Center : (021) 3520729</p> </td> </tr> </table> <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]--> </td> </tr> <!-- FOOTER --> <tr> <td align=""center"" style=""padding: 10px 10px 50px 10px;""> <!--[if (gte mso 9)|(IE)]><table align=""center"" border=""0"" cellspacing=""0"" cellpadding=""0"" width=""600""><tr><td align=""center"" valign=""top"" width=""600""><![endif]--> <table border=""0"" cellpadding=""0"" cellspacing=""0"" width=""100%"" style=""max-width: 600px;""> <tr> <td align=""center"" style=""padding: 30px 30px 30px 30px; color: #333333; font-family: 'Poppins', sans-serif; font-size: 12px; font-weight: 400; line-height: 18px;""> <p style=""margin: 0;"">Copyright © 2023 Kanmo Group. All rights reserved.</p> </td> </tr> </table> <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]--> </td> </tr> </table> </body></html>"
        message = "<!DOCTYPE html><html> <head> <title></title> <meta http-equiv=""Content-Type"" content=""text/html; charset=utf-8""> <meta name=""viewport"" content=""width=device-width, initial-scale=1""> <meta http-equiv=""X-UA-Compatible"" content=""IE=edge""> <style type=""text/css""> /* FONTS */ @import url('https://fonts.googleapis.com/css?family=Poppins:100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i'); /* CLIENT-SPECIFIC STYLES */ body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; } table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; } img { -ms-interpolation-mode: bicubic; } /* RESET STYLES */ img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; } table { border-collapse: collapse !important; } body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; } /* iOS BLUE LINKS */ a[x-apple-data-detectors] { color: inherit !important; text-decoration: none !important; font-size: inherit !important; font-family: inherit !important; font-weight: inherit !important; line-height: inherit !important; } /* MOBILE STYLES */ @media screen and (max-width:600px) { h1 { font-size: 32px !important; line-height: 32px !important; } } /* ANDROID CENTER FIX */ div[style*=""margin: 16px 0;""] { margin: 0 !important; } </style> </head> <body style=""background-color: #f3f5f7; margin: 0 !important; padding: 0 !important;""> <!-- HIDDEN PREHEADER TEXT --> <div style=""display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: 'Poppins', sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;""> We're thrilled to have you here! Get ready to dive into your new account.</div> <table border=""0"" cellpadding=""0"" cellspacing=""0"" width=""100%""> <!-- LOGO --> <tr> <td align=""center""> <!--[if (gte mso 9)|(IE)]><table align=""center"" border=""0"" cellspacing=""0"" cellpadding=""0"" width=""600""><tr><td align=""center"" valign=""top"" width=""600""><![endif]--> <table border=""0"" cellpadding=""0"" cellspacing=""0"" width=""100%"" style=""max-width: 600px;""> <tr> <td align=""center"" valign=""top"" style=""padding: 40px 10px 10px 10px;""> <a href=""#"" target=""_blank"" style=""text-decoration: none;""> <span style=""display: block; font-family: 'Poppins', sans-serif; font-size: 36px;color: #727272;"" border=""0"" > <b style=""color: rgba(239,115,68,0.8);"">Kanmo</b> Group </span> </a> </td> </tr> </table> <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]--> </td> </tr> <!-- HERO --> <tr> <td align=""center"" style=""padding: 0px 10px 0px 10px;""> <!--[if (gte mso 9)|(IE)]><table align=""center"" border=""0"" cellspacing=""0"" cellpadding=""0"" width=""600""><tr><td align=""center"" valign=""top"" width=""600""><![endif]--> <table border=""0"" cellpadding=""0"" cellspacing=""0"" width=""100%"" style=""max-width: 600px;""> <tr> <td bgcolor=""#ffffff"" align=""left"" valign=""top"" style=""padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px;""> <h1 style=""font-size: 16px; font-weight: 600; margin: 0; font-family: 'Poppins', sans-serif;"">" & subjectEmail.ToString() & "</h1> </td> </tr> </table> <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]--> </td> </tr> <!-- COPY BLOCK --> <tr> <td align=""center"" style=""padding: 0px 10px 0px 10px;""> <!--[if (gte mso 9)|(IE)]><table align=""center"" border=""0"" cellspacing=""0"" cellpadding=""0"" width=""600""><tr><td align=""center"" valign=""top"" width=""600""><![endif]--> <table border=""0"" cellpadding=""0"" cellspacing=""0"" width=""100%"" style=""max-width: 600px;""> <!-- COPY --> <tr> <td bgcolor=""#ffffff"" align=""left"" style=""padding: 20px 30px 20px 30px; color: #666666; font-family: 'Poppins', sans-serif; font-size: 16px; font-weight: 400; line-height: 25px;""> " & bodyEmail & " </td> </tr> <!-- BULLETPROOF BUTTON --> <!-- COPY --> <tr> <td bgcolor=""#ffffff"" align=""left"" style=""padding: 0px 30px 40px 30px; border-radius: 0px 0px 0px 0px; color: #666666; font-family: 'Poppins', sans-serif; font-size: 14px; font-weight: 400; line-height: 25px;""> " & signatureEmail & " </td> </tr> </table> <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]--> </td> </tr> <!-- FOOTER --> <tr> <td align=""center"" style=""padding: 10px 10px 50px 10px;""> <!--[if (gte mso 9)|(IE)]><table align=""center"" border=""0"" cellspacing=""0"" cellpadding=""0"" width=""600""><tr><td align=""center"" valign=""top"" width=""600""><![endif]--> <table border=""0"" cellpadding=""0"" cellspacing=""0"" width=""100%"" style=""max-width: 600px;""> <tr> <td align=""center"" style=""padding: 30px 30px 30px 30px; color: #333333; font-family: 'Poppins', sans-serif; font-size: 12px; font-weight: 400; line-height: 18px;""> <p style=""margin: 0;"">Copyright © 2023 Kanmo Group. All rights reserved.</p> </td> </tr> </table> <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]--> </td> </tr> </table> </body></html>"

        Try
            Dim DirectoryX As String = Path.Combine(Server.MapPath("../FileEmail/Outbox/" & emailID))
            If Not System.IO.Directory.Exists(DirectoryX) Then
                System.IO.Directory.CreateDirectory(DirectoryX)
            End If
        Catch exX As Exception
            ''Try catch untuk error create folder
            Dim pathXX As String = HttpContext.Current.Server.MapPath("~/apps/FileOutboundHTML/" & ticketnumber & "/" & agentName & "/err_" & DateTime.Now.ToString("ddMMyyyy") & ".txt")
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
            Dim pathX As String = HttpContext.Current.Server.MapPath("../FileEmail/Outbox/" & emailID & "/file.html")
            Using writer As New StreamWriter(pathX, True)
                writer.WriteLine(message)
                writer.Close()
            End Using
        End Try
    End Sub
    Protected Sub SendEmail(sender As Object, e As System.EventArgs)
        generateHTMLforEmail("Restu", "TICKET_CREATE", "20230907070133328")
    End Sub
End Class