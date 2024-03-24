const nodeMailer = require("nodemailer");

const nodeMailerSendEmail = async (data) => {
  let count = 0;
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

  count = count + 1;

  console.log(res, count);

  return res;
};

module.exports = nodeMailerSendEmail;
