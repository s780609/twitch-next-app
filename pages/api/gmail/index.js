// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
var https = require("https");
const nodemailer = require("nodemailer");

export default function handler(req, res) {
  console.log({ requestBody: req.method });

  //res.status(200).json(req.body);

  if (req.method === "POST") {
    if (
      typeof req.body === "object" &&
      req.body.email &&
      req.body.subject &&
      req.body.message
    ) {
      const email = req.body.email;
      const subject = req.email.subject;
      const message = req.body.message;

      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        auth: {
          user: "s780609@gmail.com",
          pass: "lmzxxmpkrqyxlwcl",
        },
      });

      transporter
        .sendMail({
          from: email,
          to: "s780609@gmail.com",
          subject: subject,
          html: message,
        })
        .then((info) => {
          console.log({ info });
        })
        .catch(console.error);
    }
  }
}
