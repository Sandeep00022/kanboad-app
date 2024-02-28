import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    boardId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Board",
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    description: {
      type: String,
      required:true,
    },
    assignedUser: {
      type: String,
    },
    status: {
      type: String,
      enum: ["Unassigned", "In Development", "Pending Review", "Done"],
      default: "Unassigned",
    },
    dueDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);

export default Task;
