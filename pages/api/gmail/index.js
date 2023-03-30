// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
var https = require("https");
const nodemailer = require("nodemailer");

export default function handler(req, res) {
  if (req.method === "POST") {
    if (
      typeof req.body === "object" &&
      req.body.email &&
      req.body.subject &&
      req.body.message
    ) {
      console.log("POST");
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
          subject: `[twitch-next-app] ${subject}`,
          html: message + `<br></br>` + `email sender: ${email}`,
        })
        .then((info) => {
          res.status(200).json(info);
        })
        .catch((error) => {
          res.status(500).json(error);
        });
    }
  }
}
