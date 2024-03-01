import Board from "../models/board.model.js";
import { errorHandler } from "../utils/error.js";

export const createBoard = async (req, res, next) => {
  const { title, userId } = req.body;

  try {
    console.log(userId, req.user.id);
    if (userId !== req.user.id) {
      return next(errorHandler(401, "Unauthorized"));
    }

    const board = new Board({
      title,
      createdBy: userId,
      name: req.user.name,
    });

    await board.save();

    res.status(201).json(board);
  } catch (error) {
    next(error);
  }
};

export const getBoards = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const sortDirection = req.query.order === "asc" ? 1 : -1;
    const boards = await Board.find()
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const totalBoards = await Board.countDocuments();

    const now = new Date();

    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthBoards = await Board.countDocuments({
      createAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({
      boards,
      totalBoards,
      lastMonthBoards,
    });
  } catch (error) {
    next(error);
  }
};

export const updateBoard = async (req, res, next) => {
  const { users } = req.body;
  const { boardId, userId } = req.params;

  if (!boardId || !userId) {
    return next(errorHandler(403, "You are not allowed to update this post"));
  }

  try {
    let board = await Board.findById(boardId);

    if (!board) {
      return next(errorHandler(404, "Board not found"));
    }

    // Update title if provided
    if (req.body.title && !users) {
      const updatedBoard = await Board.findByIdAndUpdate(
        boardId,
        { title: req.body.title },
        { new: true } 
      );

      if (!updatedBoard) {
        return next(errorHandler(404, "Board not found"));
      }

      return res.status(200).json(updatedBoard);
    }

    // Update users list
    for (const userId of users) {
      if (!board.users.includes(userId)) {
        board.users.push(userId);
      } else {
        return next(errorHandler(403, "User already invited"));
      }
    }

    board = await board.save();

    await board.populate({
      path: "users",
      select: "_id username email profilePicture",
    });

    return res.status(200).json(board);
  } catch (error) {
    next(error);
  }
};

export const getBoardWithUsers = async (req, res, next) => {
  if (!req.params.boardId || !req.params.userId) {
    return next(errorHandler(403, "You are not allowed to get users details"));
  }
  try {
    const board = await Board.findById(req.params.boardId).populate({
      path: "users",
      select: "_id username email profilePicture",
    });

    res.status(200).json(board);
  } catch (error) {
    next(error);
  }
};
