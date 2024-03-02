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
router.delete("/delete/:boardId/:userId", deleteBoard);
export default router;

/**
 * @swagger
 * /api/board/create:
 *   post:
 *     summary: Create a new board
 *     description: Create a new board with the specified title for the given user.
 *     parameters:
 *       - name: title
 *         in: formData
 *         required: true
 *         description: The title of the new board
 *         schema:
 *           type: string
 *       - name: userId
 *         in: formData
 *         required: true
 *         description: The ID of the user creating the board
 *         schema:
 *           type: string
 *     responses:
 *       '201':
 *         description: Board created successfully
 *       '401':
 *         description: Unauthorized - user ID does not match request user ID
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Board:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The ID of the board
 *         title:
 *           type: string
 *           description: The title of the board
 *         users:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/User'
 *           description: An array of user IDs associated with the board
 *         createdBy:
 *           type: string
 *           description: The ID of the user who created the board
 *         name:
 *           type: string
 *           description: The name of the board
 *       required:
 *         - title
 *         - createdBy
 *         - name
 */

/**
 * @swagger
 * /api/board:
 *   get:
 *     summary: Get all boards
 *     description: Retrieve a list of all boards.
 *     responses:
 *       '200':
 *         description: A list of boards
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Board'
 */

/**
 * @swagger
 * /api/board/update/{boardId}/{userId}:
 *   patch:
 *     summary: Update a board
 *     description: Update the title or add users to a board.
 *     parameters:
 *       - name: boardId
 *         in: path
 *         required: true
 *         description: The ID of the board to update
 *         schema:
 *           type: string
 *       - name: userId
 *         in: path
 *         required: true
 *         description: The ID of the user performing the update
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The new title of the board (optional)
 *               users:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: An array of user IDs to add to the board (optional)
 *     responses:
 *       '200':
 *         description: Board updated successfully
 *       '403':
 *         description: Forbidden - User not allowed to update the board
 *       '404':
 *         description: Board not found
 */

/**
 * @swagger
 * /api/board/{boardId}/{userId}:
 *   get:
 *     summary: Get board details
 *     description: Retrieve details of a specific board, including its users.
 *     parameters:
 *       - name: boardId
 *         in: path
 *         required: true
 *         description: The ID of the board to retrieve
 *         schema:
 *           type: string
 *       - name: userId
 *         in: path
 *         required: true
 *         description: The ID of the user performing the request
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Board details retrieved successfully
 *       '403':
 *         description: Forbidden - User not allowed to get board details
 *       '404':
 *         description: Board not found
 */

/**
 * @swagger
 * /api/board/delete/{boardId}/{userId}:
 *   delete:
 *     summary: Delete a board
 *     description: Delete a specific board.
 *     parameters:
 *       - name: boardId
 *         in: path
 *         required: true
 *         description: The ID of the board to delete
 *         schema:
 *           type: string
 *       - name: userId
 *         in: path
 *         required: true
 *         description: The ID of the user performing the deletion
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Board deleted successfully
 *       '403':
 *         description: Forbidden - User not allowed to delete the board
 *       '404':
 *         description: Board not found
 */
