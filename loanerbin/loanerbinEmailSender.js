const emailClassSender = require("./emialClassSender");

exports.sendVerificationLink = async (req, res) => {
  const response = await emailClassSender.sendEmailVerifier(req.body);
  res.send(response);
};

exports.sendWelcomeEmail = async (req, res) => {
  const response = await emailClassSender.sendWelcomeEmail(req.body);

  res.send(response);
};

exports.sendTransactionNotification = async (req, res) => {
  const response = await emailClassSender.sendTransactioNotification(req.body);

  res.send(response);
};

exports.sendGrantCampaignEmail = async (req, res) => {
  const response = await emailClassSender.sendGrantCampaignMail(req.body);

  res.send(response);
};
