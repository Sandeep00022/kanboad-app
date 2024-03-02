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


/**
 * @swagger
 * /api/task/create:
 *   post:
 *     summary: Create a new task
 *     description: Create a new task for a specific board.
 *     parameters:
 *       - name: title
 *         in: formData
 *         required: true
 *         description: The title of the task
 *         schema:
 *           type: string
 *       - name: description
 *         in: formData
 *         required: true
 *         description: The description of the task
 *         schema:
 *           type: string
 *       - name: dueDate
 *         in: formData
 *         required: true
 *         description: The due date of the task
 *         schema:
 *           type: string
 *           format: date
 *       - name: status
 *         in: formData
 *         required: false
 *         description: The status of the task (e.g., 'pending', 'completed')
 *         schema:
 *           type: string
 *       - name: userId
 *         in: formData
 *         required: true
 *         description: The ID of the user creating the task
 *         schema:
 *           type: string
 *       - name: boardId
 *         in: formData
 *         required: true
 *         description: The ID of the board to which the task belongs
 *         schema:
 *           type: string
 *       - name: assignedUser
 *         in: formData
 *         required: false
 *         description: The ID of the user to whom the task is assigned (optional)
 *         schema:
 *           type: string
 *     responses:
 *       '201':
 *         description: Task created successfully
 *       '400':
 *         description: Bad request - Please provide all required fields
 */

/**
 * @swagger
 * /api/task/{boardId}:
 *   get:
 *     summary: Get all tasks for a board
 *     description: Retrieve all tasks associated with a specific board.
 *     parameters:
 *       - name: boardId
 *         in: path
 *         required: true
 *         description: The ID of the board to retrieve tasks from
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A list of tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The ID of the task
 *         title:
 *           type: string
 *           description: The title of the task
 *         description:
 *           type: string
 *           description: The description of the task
 *         dueDate:
 *           type: string
 *           format: date
 *           description: The due date of the task
 *         status:
 *           type: string
 *           description: The status of the task (e.g., 'pending', 'completed')
 *         userId:
 *           type: string
 *           description: The ID of the user who created the task
 *         boardId:
 *           type: string
 *           description: The ID of the board to which the task belongs
 *         assignedUser:
 *           type: string
 *           description: The ID of the user to whom the task is assigned
 */

/**
 * @swagger
 * /api/task/editTask/{taskId}:
 *   put:
 *     summary: Edit a task
 *     description: Edit the details of a specific task.
 *     parameters:
 *       - name: taskId
 *         in: path
 *         required: true
 *         description: The ID of the task to edit
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       '200':
 *         description: Task edited successfully
 *       '404':
 *         description: Task not found
 */

/**
 * @swagger
 * /api/task/deleteTask/{taskId}:
 *   delete:
 *     summary: Delete a task
 *     description: Delete a specific task.
 *     parameters:
 *       - name: taskId
 *         in: path
 *         required: true
 *         description: The ID of the task to delete
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Task deleted successfully
 *       '404':
 *         description: Task not found
 */
