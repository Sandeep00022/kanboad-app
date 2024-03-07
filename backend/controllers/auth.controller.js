import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";

export const google = async (req, res, next) => {
  const { email, name, googlePhotoUrl } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user) {
      const token = jwt.sign(
        {
          id: user._id,
          name: name,
          email: email,
        },
        process.env.JWTSECRET
      );

      const { password, ...rest } = user._doc;
      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
          sameSite: "none",
          path: "/",
          secure: true,
        })
        .json(rest);
    } else {
      const generatePassword =
        Math.random().toString(35).slice(-8) +
        Math.random().toString(36).slice(-8);

      const hashedPasword = bcryptjs.hashSync(generatePassword, 10);
      const newUser = new User({
        username:
          name.toLowerCase().split(" ").join("") +
          Math.random().toString(9).slice(-4),
        email,
        password: hashedPasword,
        profilePicture: googlePhotoUrl,
      });

      await newUser.save();
      const token = jwt.sign(
        {
          id: newUser._id,
          name: name,
          email: email,
        },
        process.env.JWTSECRET
      );

      const { password, ...rest } = newUser._doc;
      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
          sameSite: "none",
          secure: true,
          path: "/",
        })
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};

export const Logout = (req, res, next) => {
  try {
    res
      .clearCookie("access_token")
      .status(200)
      .json("User has been signed out");
  } catch (error) {
    next(error);
  }
};

export const searchUser = async (req, res, next) => {
  try {
    const keyword = req.query.search
      ? {
          $or: [
            { username: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } },
          ],
        }
      : {};

    const users = await User.find({ ...keyword, _id: { $ne: req.user._id } });
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

export const AddRecentVisitedBoards = async (req, res, next) => {
  try {
    const { boardId, userId } = req.params;
    const currentUser = await User.findById(userId);

    if (currentUser) {
      let allVisitedBoards = currentUser.recentlyVisitedBoards;

      const index = allVisitedBoards.indexOf(boardId);

      if (index !== -1) {
        // Remove the existing boardId to add it again to update its position
        allVisitedBoards.splice(index, 1);
      }

      // Add the new boardId to the beginning of the array
      allVisitedBoards.unshift(boardId);

      // Keep only the first 3 boards in the array
      if (allVisitedBoards.length > 3) {
        allVisitedBoards = allVisitedBoards.slice(0, 3);
      }

      // Update the recentlyVisitedBoards field in the user document
      currentUser.recentlyVisitedBoards = allVisitedBoards;
      await currentUser.populate({
        path: "recentlyVisitedBoards",
        select: "_id title createdBy",
      });
      // Save the updated user object
      await currentUser.save();

      res.status(200).json(currentUser);
    } else {
      next(errorHandler(403, "User  not found"));
    }
  } catch (error) {
    next(error);
  }
};
