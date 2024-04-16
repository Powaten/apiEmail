const { MailerSend, EmailParams, Sender, Recipient } = require("mailersend");
const createHtml = require("./generateHTMLBody");

const mailerSend = new MailerSend({
  apiKey: process.env.API_KEY2,
});

// async function verifyEmail

async function foxEmailService(req, res) {
  const {
    companyEmail,
    sendersName,
    receiversMail,
    subject,
    trackingId,
    message,
  } = req.body;

  const html = createHtml(message, trackingId);

  // const sentFrom = new Sender(
  //   "services@foxexpresscargotransit.com",
  //   "services department"
  // );
  // const replyTo = new Sender(replyToEmail, "Alen whaten");

  const sentFrom = new Sender(companyEmail, sendersName);

  const recipients = [new Recipient(receiversMail, "")];

  const emailParams = new EmailParams()
    .setFrom(sentFrom)
    .setTo(recipients)
    // .setReplyTo(replyTo)
    .setSubject(subject)
    .setHtml(html);
  // .setText(message);

  // console.log(replyTo, emailParams);

  const response = await mailerSend.email.send(emailParams);

  // console.log( response);

  // res.send(response);
  res.send(true);
}

module.exports = foxEmailService;
