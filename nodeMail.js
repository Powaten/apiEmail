const nodeMailer = require("nodemailer");

const nodeMailerSendEmail = async (data) => {
  const { sender, message, replyToEmail, subject, receiversMail } = data;

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
    text: message,
    replyTo: replyToEmail ? replyToEmail : "",
  };

  const res = await transport.sendMail(mailOptions);

  return res;
};

module.exports = nodeMailerSendEmail;
