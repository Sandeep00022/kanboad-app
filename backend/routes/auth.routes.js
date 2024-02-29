import express from "express";
import { Logout, google, searchUser } from "../controllers/auth.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/google", google);
router.post("/logout", Logout);
router.get("/", verifyToken, searchUser);

export default router;
