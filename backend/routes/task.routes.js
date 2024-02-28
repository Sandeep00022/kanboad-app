import express from "express";
import { createTask } from "../controllers/task.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/create", verifyToken, createTask);

export default router;