import express from "express";
import {
  createTask,
  deleteTask,
  editTask,
  getAllTasks,
} from "../controllers/task.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/create", verifyToken, createTask);
router.get("/:boardId", getAllTasks);
router.put("/editTask/:taskId", verifyToken, editTask);
router.delete("/deleteTask/:taskId", verifyToken, deleteTask);

export default router;
