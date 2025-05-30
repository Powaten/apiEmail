const express = require("express");
const crypto = require("crypto");
const cors = require("cors");

const sendEmailNow = require("./emailApp");
const foxEmailService = require("./foxEmailService");
const apexEmailService = require("./apexEmailService");
const mailGunEmailServices = require("./mailGunEmailServices");
const loanerBinEmailSender = require("./loanerbin/loanerbinEmailSender");

const app = express();

//jonzehEmail

app.use(cors());

// Body parser, reading data from body into req.body
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

app.get("/home", function (req, res) {
  console.log(req.body);

  res.send("Hello from the server");
});

app.post("/my/webhook/url", function (req, res) {
  //validate event
  const hash = crypto
    .createHmac("sha512", process.env.SECRET_KEY)
    .update(JSON.stringify(req.body))
    .digest("hex");
  if (hash == req.headers["x-paystack-signature"]) {
    // Retrieve the request's body
    const event = req.body;

    console.log(event);
  }
  res.send(200);
});

app.post("/sendMail", sendEmailNow);
app.post("/foxEmail", foxEmailService);
app.post("/apexemail", apexEmailService);

app.post("/api/v1/loanerbin/verify", loanerBinEmailSender.sendVerificationLink);
app.post("/api/v1/loanerbin/welcome", loanerBinEmailSender.sendWelcomeEmail);
app.post(
  "/api/v1/loanerbin/notification",
  loanerBinEmailSender.sendTransactionNotification
);

app.post(
  "/api/v1/loanerbin/grant_campaign",
  loanerBinEmailSender.sendGrantCampaignEmail
);

module.exports = app;
