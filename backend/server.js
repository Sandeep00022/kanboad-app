import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.routes.js";
import connection from "./config/config.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("welcome to backend");
});

app.use("/api/user", authRouter);

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
