import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";

export const google = async (req, res, next) => {
  const { email, name, googlePhotoUrl } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user) {
      const token = jwt.sign(
        {
          id: user._id,
          name:name,
        },
        process.env.JWTSECRET
      );
  console.log(token)
      const { password, ...rest } = user._doc;
      res
        .status(200)
        .cookie("access_token", token, { httpOnly: true })
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
          name:name,
        },
        process.env.JWTSECRET
      );
        
      const { password, ...rest } = newUser._doc;
      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
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
