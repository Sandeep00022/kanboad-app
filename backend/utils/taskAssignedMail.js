import nodemailer from "nodemailer";
import Mailgen from "mailgen";
import env from "dotenv";
env.config();

export const taskAssignedMail = (assignedPerson, assignedBy, boardId) => {
  let config = {
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    },
  };

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
      title: `New Task Assigned by ${assignedBy} `,
      intro: `To know more about your task <a href="https://kanboad-app-6.onrender.com/dashboard/${boardId}">click here</a>`,
      outro: "Looking forward to see you productive and happy😊",
    },
  };

  let mail = MailGenerator.generate(response);

  let message = {
    from: "Kanban Task",
    to: assignedPerson,
    subject: "Your today's task",
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
