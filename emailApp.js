const { MailerSend, EmailParams, Sender, Recipient } = require("mailersend");
const nodeMailerSendEmail = require("./nodeMail");

const mailerSend = new MailerSend({
  apiKey: process.env.API_KEY,
});

// async function verifyEmail

async function sendEmailNow(req, res) {
  // const sentFrom = new Sender(
  //   "services@jonzehfoundation.com.ng",
  //   "services department"
  // );

  // const replyTo = new Sender(replyToEmail, "Alen whaten");
  // const recipients = [new Recipient(receiversMail, "")];

  // const emailParams = new EmailParams()
  //   .setFrom(sentFrom)
  //   .setTo(recipients)
  //   .setReplyTo(replyTo)
  //   .setSubject(subject)
  //   .setHtml(`<strong>${message}</strong>`)
  //   .setText(message);

  // const response = await mailerSend.email.send(emailParams);

  const response = await nodeMailerSendEmail(req.body);

  // console.log( response);

  res.send(response);
}

module.exports = sendEmailNow;
