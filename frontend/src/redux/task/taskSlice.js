import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  boards: [],
  invitedUsers: [],
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
  },
});

export const { taskInFailure, taskInStart, taskInSuccess, assignedUsersSuccess } = taskSlice.actions;

export default taskSlice.reducer;
