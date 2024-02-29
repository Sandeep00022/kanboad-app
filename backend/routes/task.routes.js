import express from "express";
import { createTask, editTask, getAllTasks } from "../controllers/task.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/create", verifyToken, createTask);
router.get("/:boardId",getAllTasks);
router.put("/editTask/:taskId",verifyToken, editTask)

export default router;