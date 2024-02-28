import Task from "../models/task.model.js";
import { errorHandler } from "../utils/error.js";

export const createTask = async (req, res, next) => {
  if (req.body.userId !== req.user.id) {
    return next(errorHandler(403, "You are not allowed to create tasks"));
  }
  try {
    const { title, description, dueDate, status, userId, boardId } = req.body;

    if (!title || !description || !dueDate || !status) {
      return next(errorHandler(400, "Please provide all request fields"));
    }

    const newTask = await Task({
      title,
      boardId: req.body.boardId,
      userId: req.body.userId,
      description,
      dueDate,
      status,
    });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    next(error);
  }
};
