const nodeMailer = require("nodemailer");
const {
  generateEmailVerifyHTML,
} = require("./emailHTML/generateEmailVerifyingHTML");
const {
  generateWelcomeLenderEmailHTML,
  generateWelcomeBorrowerEmailHTML,
} = require("./emailHTML/generateWelcomeEmailHTML");

class EmailSender {
  constructor() {}

  async nodeMailerFunction(messageData) {
    const { sender, receiversMail, subject, message, replyToEmail } =
      messageData;

    console.log(messageData);

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
}

const emailClassSender = new EmailSender();

module.exports = emailClassSender;
