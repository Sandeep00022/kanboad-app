import Task from "../models/task.model.js";
import { errorHandler } from "../utils/error.js";

export const createTask = async (req, res, next) => {
  try {
    const {
      title,
      description,
      dueDate,
      status,
      userId,
      boardId,

      assignedUser,
    } = req.body;

    if (!title || !description || !dueDate) {
      return next(errorHandler(400, "Please provide all request fields"));
    }

    const newTask = await Task({
      title,
      boardId,
      createdBy: userId,
      description,
      assignedUser,
      dueDate,
      assignedBy: req.user.name,
      status,
    });
    await newTask.save();
    const populatedTask = await Task.findById(newTask._id).populate({
      path: "assignedUser",
      select: "_id username email profilePicture",
    });
    res.status(201).json(populatedTask);
  } catch (error) {
    next(error);
  }
};

export const getAllTasks = async (req, res, next) => {
  const boardId = req.params.boardId;

  try {
    const startIndex = parseInt(req.query.startIndex, 10) || 0;
    const limit = parseInt(req.query.limit, 10) || 10;
    const sortDirection = req.query.order === "asc" ? 1 : -1;
    const tasks = await Task.find({ boardId: boardId })
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit)
      .populate({
        path: "assignedUser",
        select: "_id username email profilePicture",
      });

    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};

export const editTask = async (req, res, next) => {
  
  try {
    const task = await Task.findById(req.params.taskId);

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.taskId,
      { ...req.body, assignedBy: req.user.name },
      { new: true }
    );

    const populatedTask = await Task.findById(updatedTask._id).populate({
      path: "assignedUser",
      select: "_id username email profilePicture",
    });

    res.status(200).json(populatedTask);
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.taskId);

    const deletedTask = await Task.findByIdAndDelete(req.params.taskId);
    res.status(200).json(deletedTask);
  } catch (error) {
    next(error);
  }
};
