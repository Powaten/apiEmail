const formData = require("form-data");
const Mailgun = require("mailgun.js");
const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: "api",
  key: "08c2ac0abafe950cbaaf5f66e1687301-0996409b-44140904",
});

function sendEmailNow() {
  mg.messages
    .create("www.loanerbin.com", {
      from: "Excited User <support@loanerbin.com>",
      to: ["ebukagab@gmail.com"],
      subject: "Hello",
      text: "Testing some Mailgun awesomeness!",
      html: "<h1>Testing some Mailgun awesomeness!</h1>",
    })
    .then((msg) => console.log(msg)) // logs response data
    .catch((err) => console.log(err)); // logs any error

  console.log("others");
}

// sendEmailNow();
