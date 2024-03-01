import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.routes.js";
import boardRouter from "./routes/board.routes.js";
import taskRouter from "./routes/task.routes.js";
import connection from "./config/config.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();

const app = express();
app.use(cors({
  origin: 'https://frontend-ruddy-sigma.vercel.app/'
}));
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("welcome to backend");
});

app.use("/api/user", authRouter);
app.use("/api/board", boardRouter);
app.use("/api/task", taskRouter);

const port = process.env.PORT || 8000;
app.listen(port, async () => {
  connection.then(() => {
    console.log("connected to Database");
  });
  console.log(`Server is running on port ${port}`);
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || " Internal Server error";

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
