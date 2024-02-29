import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  boards: [],
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
      state.boards =action.payload;
      state.loading = false;
      state.error = null;
    },
    taskInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { taskInFailure, taskInStart, taskInSuccess } = taskSlice.actions;

export default taskSlice.reducer;
