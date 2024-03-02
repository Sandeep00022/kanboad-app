import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  boards: [],
  invitedUsers: [],
  recentVisitedBoards: [],
  allTask: [],
  error: null,
  loading: false,
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    taskInStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    taskInSuccess: (state, action) => {
      state.boards = action.payload;
      state.loading = false;
      state.error = null;
    },
    taskInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    assignedUsersSuccess: (state, action) => {
      state.invitedUsers = action.payload;
      state.loading = false;
      state.error = null;
    },
    allTaskSucces: (state, action) => {
      state.allTask = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateTaskSucess: (state, action) => {
      state.allTask = state.allTask.map((task) =>
        task._id === action.payload._id ? { ...action.payload } : task
      );
      state.loading = false;
      state.error = null;
    },
    addTaskSuccess: (state, action) => {
      state.allTask = [action.payload, ...state.allTask];
      state.loading = false;
      state.error = null;
    },
    deleteTaskSuccess: (state, action) => {
      state.allTask = state.allTask.filter(
        (task) => task._id !== action.payload
      );
      state.recentVisitedBoards = state.recentVisitedBoards.filter(
        (task) => task._id !== action.payload
      );
      state.loading = false;
      state.error = null;
    },
    updateBoardSuccess: (state, action) => {
      state.boards = state.boards.map((board) =>
        board._id === action.payload._id ? { ...action.payload } : board
      );
      state.loading = false;
      state.error = null;
    },
    createBoardSuccess: (state, action) => {
      state.boards = [action.payload, ...state.boards];
      state.loading = false;
      state.error = null;
    },
    deleteBoardSuccess: (state, action) => {
      state.boards = state.boards.filter(
        (board) => board._id !== action.payload._id
      );
      state.loading = false;
      state.error = null;
    },
    recentlyVisitedBoardSuccess: (state, action) => {
      state.recentVisitedBoards = state.boards.filter((recentBoard) =>
        action.payload.some((board) => board._id === recentBoard._id)
      );
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  taskInFailure,
  taskInStart,
  taskInSuccess,
  assignedUsersSuccess,
  allTaskSucces,
  updateTaskSucess,
  addTaskSuccess,
  deleteTaskSuccess,
  updateBoardSuccess,
  createBoardSuccess,
  deleteBoardSuccess,
  recentlyVisitedBoardSuccess,
} = taskSlice.actions;

export default taskSlice.reducer;
