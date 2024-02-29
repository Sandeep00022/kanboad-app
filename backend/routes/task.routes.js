import express from "express";
import { createTask, getAllTasks } from "../controllers/task.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/create", verifyToken, createTask);
router.get("/:boardId",getAllTasks)

export default router;