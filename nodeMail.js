const nodeMailer = require("nodemailer");

const nodeMailerSendEmail = async (data) => {
  try {
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

    console.log(res, "successfull");
    return res;
  } catch (err) {
    console.log(err, err.message);
    return { message: "Something went wrong, try again", errorCode: "300" };
  }
};

module.exports = nodeMailerSendEmail;
