const nodeMailer = require("nodemailer");
const {
  generateEmailVerifyHTML,
} = require("./emailHTML/generateEmailVerifyingHTML");
const {
  generateWelcomeLenderEmailHTML,
  generateWelcomeBorrowerEmailHTML,
} = require("./emailHTML/generateWelcomeEmailHTML");
const {
  generateGrantCampaignHtml,
} = require("./emailHTML/generateGrantCampaignHtml");

class EmailSender {
  constructor() {}

  async nodeMailerFunction(messageData) {
    const { sender, receiversMail, subject, message, replyToEmail } =
      messageData;

    const transport = nodeMailer.createTransport({
      service: "Gmail",
      auth: {
        user: sender.email,
        pass: sender.password,
      },
    });

    const mailOptions = {
      from: `${sender.name} ${sender.email}`,
      to: receiversMail,
      subject: subject,
      html: message,
    };

    const res = await transport.sendMail(mailOptions);

    return res;
  }

  async nodeMailerSendProfessionalEmail(messageData) {
    const { sender, receiversMail, subject, message } = messageData;

    const transport = nodeMailer.createTransport({
      pool: true,
      host: "mail.apexshippingcargo.com",
      port,
      secure: true, // true for port 465, false for other ports
      auth: {
        user: "support@apexshippingcargo.com",
        pass: "Xcyo*;#CCvnc",
      },
      tls: {
        rejectUnauthorized: true,
        // Disable rejection of unauthorized certificates (useful for self-signed)
      },
    });

    const mailOptions = {
      from: `${sender.name} <${"support@apexshippingcargo.com"}>`,
      to: receiversMail,
      subject: subject,
      html: message,
      headers: {
        "Message-ID": `<${Date.now()}@${"apexshippingcargo.com"}>`,
        "X-Mailer": "NodeMailer",
      },
    };

    console.log("hit here");
    const res = await transport.sendMail(mailOptions);

    console.log(res, "second hit here");

    return res;
  }

  async sendEmailVerifier(data) {
    const { sender, receiversMail, subject, link } = data;
    const HTMLMessage = generateEmailVerifyHTML(link);

    const messageData = {
      sender,
      receiversMail,
      subject: "Verify your email",
      message: HTMLMessage,
    };

    const res = await this.nodeMailerFunction(messageData);

    return res;
  }

  async sendWelcomeEmail(data) {
    const { sender, isBorrower, usersFullName, receiversMail, subject } = data;
    const HTMLMessage = isBorrower
      ? generateWelcomeBorrowerEmailHTML(usersFullName)
      : generateWelcomeLenderEmailHTML(usersFullName);

    const messageData = {
      sender,
      receiversMail,
      subject: "Welcome to Loanerbin",
      message: HTMLMessage,
    };

    const res = await this.nodeMailerFunction(messageData);

    return res;
  }

  async sendTransactioNotification(data) {
    const { sender, receiversMail, subject, link } = data;
    const HTMLMessage = generateEmailVerifyHTML(link);

    const messageData = {
      sender,
      receiversMail,
      subject: "Verify your email",
      message: HTMLMessage,
    };

    const res = await this.nodeMailerFunction(messageData);

    return res;
  }

  async sendGrantCampaignMail(request) {
    const mainRes = request.forEach(async (each, i) => {
      const data = {
        receiversMail: each.receiversMail,
        message: generateGrantCampaignHtml({
          receiversName: each.receiversName,
          receiversCountry: each.receiversCountry,
          receiversEmail: each.receiversMail,
        }),
        subject: "Get grants today. Up to $200,000",
        sender: each.sender,
      };

      setTimeout(async () => {
        const res = await this.nodeMailerFunction(data);

        return res;
      }, 5000 * i);
    });
    return "success";
  }
}

const emailClassSender = new EmailSender();

module.exports = emailClassSender;
