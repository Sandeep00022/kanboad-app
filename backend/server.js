import express from "express";
import cors from "cors";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import authRouter from "./routes/auth.routes.js";
import boardRouter from "./routes/board.routes.js";
import taskRouter from "./routes/task.routes.js";
import connection from "./config/config.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";
dotenv.config({
  origin: "https://kanboad-app-2.onrender.com/",
  credentials: true,
});

const app = express();
const allowedOrigins = [
  "https://kanboad-app-2.onrender.com",
  "https://kanboad-app.onrender.com",
  "https://frontend-gxlhizbxo-sandeep00022.vercel.app/",
];

// Configure CORS options
const corsOptions = {
  origin: function (origin, callback) {
    // Check if the request origin is in the allowedOrigins array
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};

// Enable CORS middleware
app.use(cors(corsOptions));

// Handle preflight requests
app.options("*", cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// swagger doc setup
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Kanban App",
      version: "1.0.0",
      description:
        "This is a Kanban App API documentation. It provides endpoints for managing tasks on a Kanban board.",
    },
    servers: [
      {
        url: "http://localhost:3000/",
      },
    ],
  },
  apis: ["./routes/*routes.js"], // files containing annotations as above
};

const __dirname = path.resolve();

const openapiSpecification = swaggerJsdoc(options);
app.use("/apidocs", swaggerUi.serve, swaggerUi.setup(openapiSpecification));

app.use("/api/user", authRouter);
app.use("/api/board", boardRouter);
app.use("/api/task", taskRouter);

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

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
