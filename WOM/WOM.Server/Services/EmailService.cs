using System.Net;
using System.Net.Mail;
using Microsoft.VisualBasic;

public class EmailService{


    private readonly IConfiguration _configuration;

    public EmailService (IConfiguration configuration){
        _configuration = configuration;
    }

    public void SendEmail(string to, string subject, string body){

        var smtpSettings = _configuration.GetSection("Smtp");

        var fromAddress = new MailAddress("dustinbruce50@gmail.com", "Dustin Bruce");
        var toAddress = new MailAddress(to);
        const string fromPassword = "";  

        using var smtp = new SmtpClient{

            Host = smtpSettings["Host"],
            Port = int.Parse(smtpSettings["Port"]),
            EnableSsl = bool.Parse(smtpSettings["EnableSsl"]),
            DeliveryMethod = SmtpDeliveryMethod.Network,
            UseDefaultCredentials = false,
            Credentials = new NetworkCredential(fromAddress.Address, fromPassword)
        };

        using var message = new MailMessage(fromAddress, toAddress){
            Subject = subject,
            Body = body

        };
        {
            smtp.Send(message);
        }

    }

}

    
