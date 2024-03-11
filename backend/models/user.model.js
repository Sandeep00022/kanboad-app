import mongoose from "mongoose";

const userSchmea = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default:"https://www.pngarts.com/files/10/Default-Profile-Picture-PNG-Transparent-Image.png",
    },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
    recentlyVisitedBoards:[
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Board",
      },
    ]
   
},
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchmea);

export default User;
