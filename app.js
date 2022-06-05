var express = require("express");
var cors = require("cors");
var app = express();
app.use(express.json());
app.use(cors());

require("dotenv").config();


const API_KEY = process.env.SENDG;
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(API_KEY);

app.post("/", (req, res) => {
  let { Timeline, ProjectType, Budget, Fullname, DevOrDeisgnAndDev, Email, } = req.body;
  const message = {
    to: "jordaneddielinton93@hotmail.co.uk",
    from: "jordaneddielinton93@outlook.com",
    subject: "Jordans Freelance Service",
    text: `Project:${ProjectType}, Project-Type:${DevOrDeisgnAndDev},Budget:${Budget},Fullname:${Fullname},Time line:${Timeline}`,
    html: `
 
    <h2>Full Name:${Fullname}</h2>
    <h2>Email:${Email}</h2>
    <hr>
    <br/>
      <h2>Project:${ProjectType}</h2>
     <br/>
     <hr>
     <h2>Project-Type:${DevOrDeisgnAndDev}</h2>
     <br/>
     <h2>Budget:${Budget}</h2>
     <br/>
     <hr>
     <h2>Time Line:${Timeline}</h2>
     <p>Please note: This email was sent from a notification-only address that can't accept incoming email. Please do not reply to this message, but use my orginal email Jordaneddielinton93@hotmail.co.uk.</p>
     `,
  };

  sgMail
    .send(message)
    .then((response) => console.log("email sent", response))
    .then(() => res.json({ message: "Successfully Sent Email" }))
    .catch((error) => console.log(error));
});

module.exports = app;
