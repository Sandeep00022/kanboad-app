import Board from "../models/board.model.js";
import { errorHandler } from "../utils/error.js";

export const createBoard = async (req, res, next) => {
  const { title, userId } = req.body;
  console.log(userId, req.user);
  try {
    
    console.log(userId, req.user.id);
    if (userId !== req.user.id) {
      return next(errorHandler(401, "Unauthorized"));
    }

    const board = new Board({
      title,
      createdBy: userId,
    });

    await board.save();

    res.status(201).json(board);
  } catch (error) {
    next(error);
  }
};
