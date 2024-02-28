import express from "express";
import { createBoard, getBoards } from "../controllers/board.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/create", verifyToken, createBoard);
router.get("/", getBoards);

export default router;
