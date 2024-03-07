import express from "express";
import {
  AddRecentVisitedBoards,
  Logout,
  google,
  searchUser,
} from "../controllers/auth.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/google", google);
router.post("/logout", Logout);
router.get("/", verifyToken, searchUser);
router.patch("/recentboards/:userId/:boardId", AddRecentVisitedBoards);
export default router;


/**
 * @swagger
 * /api/user/google:
 *   post:
 *     summary: Login with Google OAuth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email of the user
 *               name:
 *                 type: string
 *                 description: The name of the user
 *               googlePhotoUrl:
 *                 type: string
 *                 description: The URL of the user's Google profile photo
 *     responses:
 *       '200':
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: The ID of the user
 *                 username:
 *                   type: string
 *                   description: The username of the user
 *                 email:
 *                   type: string
 *                   description: The email of the user
 *                 profilePicture:
 *                   type: string
 *                   description: The URL of the user's profile picture
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: The date and time when the user was created
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   description: The date and time when the user was last updated
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The ID of the user
 *         username:
 *           type: string
 *           description: The username of the user
 *         email:
 *           type: string
 *           description: The email address of the user
 *         password:
 *           type: string
 *           description: The password of the user
 *         profilePicture:
 *           type: string
 *           description: The profile picture URL of the user
 *         recentlyVisitedBoards:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Board'
 *           description: An array of recently visited board IDs
 */

/**
 * @swagger
 * /api/user/logout:
 *   post:
 *     summary: Logout
 *     responses:
 *       '200':
 *         description: User logged out successfully
 */

/**
 * @swagger
 * /api/user:
 *   get:
 *     summary: Authenticate person can Search for users
 *     parameters:
 *       - name: search
 *         in: query
 *         description: Keyword to search for users
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful search
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *
 */

/**
 * @openapi
 * /api/user/recentboards/{userId}/{boardId}:
 *   patch:
 *     summary: Add recent boards for a user
 *     parameters:
 *       - name: userId
 *         in: path
 *         description: ID of the user
 *         required: true
 *         schema:
 *           type: string
 *       - name: boardId
 *         in: path
 *         description: ID of the board
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Boards updated successfully
 *       # Add other response codes as needed
 */

