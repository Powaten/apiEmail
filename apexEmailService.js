const { MailerSend, EmailParams, Sender, Recipient } = require("mailersend");
const createHtml = require("./generateHTMLBodyApex");
const emailClassSender = require("./loanerbin/emialClassSender");

const mailerSend = new MailerSend({
  apiKey: process.env.API_KEY2,
});

// async function verifyEmail

async function apexEmailService(req, res) {
  const {
    toWho,
    sendersName,
    receiversMail,
    subject,
    trackingId,
    message: rawMessage,
  } = req.body;

  const message = createHtml(toWho, rawMessage, trackingId);

  const sender = {
    email: "apexexpresscargotransit@gmail.com",
    password: "rdpg rxzv jrpa vclx",
    name: sendersName,
  };

  const messageData = { sender, receiversMail, subject, message };

  try {
    const response =
      await emailClassSender.nodeMailerSendProfessionalEmail(messageData);

    res.send({
      status: "success",
      data: {
        response,
      },
    });
  } catch (err) {
    res.send({
      status: "error",
      data: {
        message: err.message,
      },
    });
  }

  // res.send(true);
}

module.exports = apexEmailService;
