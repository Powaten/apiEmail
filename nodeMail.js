const nodeMailer = require("nodemailer");

const nodeMailerSendEmail = async (data) => {
  let allResponse = [];

  const { sender, message, replyToEmail, subject, receiversMail } = data;

  const transport = nodeMailer.createTransport({
    service: "Gmail",
    auth: {
      user: sender.email,
      pass: sender.password,
    },
  });

  const mailOptions = {
    from: `Alena Whaten ${sender.email}`,
    to: receiversMail,
    subject: subject,
    text: message,
    replyTo: replyToEmail ? replyToEmail : "",
  };

  // const res = await transport.sendMail(mailOptions);
  const res = await transport.sendMail(mailOptions);

  // console.log(res);

  return res;
};

module.exports = nodeMailerSendEmail;
