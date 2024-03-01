import express from "express";
import {
  createBoard,
  deleteBoard,
  getBoardWithUsers,
  getBoards,
  updateBoard,
} from "../controllers/board.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/create", verifyToken, createBoard);
router.get("/", getBoards);
router.patch("/update/:boardId/:userId", updateBoard);
router.get("/:boardId/:userId", getBoardWithUsers);
router.patch("/delete/:boardId/:userId", deleteBoard);
export default router;
