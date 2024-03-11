import Mailgen from "mailgen";
import nodemailer from "nodemailer";
import env from "dotenv";
import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
env.config();

export const forgotPasswordMail = async ({ email, id }) => {
  console.log(email, id);
  let config = {
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    },
  };

  const token = bcryptjs.hashSync(id.toString(), 10);

  let user = await User.findByIdAndUpdate(id, {
    forgotPasswordToken: token,
    forgotPasswordTokenExpiry: Date.now() + 3600000,
  });

  console.log("user", user);

  let transporter = nodemailer.createTransport(config);

  let MailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Kanban Team",
      link: "https://mailgen.js",
    },
  });

  let response = {
    body: {
      title: `Reset your password `,
      intro: `To update your password <a href="https://kanboad-app-7.onrender.com/updatepassword?${token}">click here</a>`,
      outro: "Looking forward to see you productive and happy😊",
    },
  };

  let mail = MailGenerator.generate(response);

  let message = {
    from: "Kanban Task",
    to: email,
    subject: "Password Reset",
    html: mail,
  };

  transporter
    .sendMail(message)
    .then((info) => {
      console.log("Email sent: ", info.response);
    })
    .catch((error) => {
      console.error("Error sending email: ", error);
    });
};
