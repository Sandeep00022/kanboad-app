import express from "express";
import { AddRecentVisitedBoards, Logout, google, searchUser } from "../controllers/auth.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/google", google);
router.post("/logout", Logout);
router.get("/", verifyToken, searchUser);
router.patch("/recentboards/:userId/:boardId",AddRecentVisitedBoards )
export default router;
