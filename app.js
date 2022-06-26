var express = require("express");
var cors = require("cors");
var app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));

require("dotenv").config();


const API_KEY = process.env.SENDG;
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(API_KEY);

app.post("/", (req, res) => {
  let { Timeline, ProjectType, Budget, Fullname, DevOrDeisgnAndDev, Email, } = req.body;
  const message = {
    to: ["jordaneddielinton93@hotmail.co.uk", Email],
    from: "jordaneddielinton93@outlook.com",
    subject: "Jordans Freelance Service",
    text: `Project:${ProjectType}, Project-Type:${DevOrDeisgnAndDev},Budget:${Budget},Fullname:${Fullname},Time line:${Timeline}`,
    html: `<div
    style="
      position: absolute;
      width: 100%;
      background-color: #23c7a7;
      height: 200px;
      z-index: -1;
    "
  ></div>
  <main
    style="
      margin: auto;
      position: absolute;
      top: 100px;
      left: 0;
      right: 0;
      width: 350px;
      height: 300px;
      background-color: white;
      border: thin solid grey;
      border-radius: 8px;
      padding: 5px;
    "
  >
    <h1 style="color: #23c7a7; text-align: center">Thank you</h1>
    <p style="color: #23c7a7; text-align: center">
      Please be patient, I will be in contact soon to get more details about your project,Thankyou for choosing to work with my business.
    </p>
    <h2 style="text-align: center">Full Name:${Fullname}</h2>
    <h2 style="text-align: center">Email:${Email}</h2>

    <h2 style="text-align: center">Project:${ProjectType}</h2>
    <h2 style="text-align: center">Project-Type:${DevOrDeisgnAndDev}</h2>

    <h2 style="text-align: center">Budget:${Budget}</h2>

    <h2 style="text-align: center">Time Line:${Timeline}</h2>
    <p style="color: red; text-align: center">
      Please note: This email was sent from a notification-only address that
      can't accept incoming email. Please do not reply to this message, but
      use my orginal email Jordaneddielinton93@hotmail.co.uk.
    </p>
  </main>
     `,
  };

  sgMail
    .send(message)
    .then((response) => console.log("email sent", response))
    .then(() => res.json({ message: "Successfully Sent Email" }))
    .catch((error) => console.log(error));
});

module.exports = app;
