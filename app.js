const express = require("express");
const crypto = require("crypto");
const cors = require("cors");

const sendEmailNow = require("./emailApp");
const foxEmailService = require("./foxEmailService");

const app = express();

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

module.exports = app;
