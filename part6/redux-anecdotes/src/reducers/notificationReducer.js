import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    notificationChange(state, action) {
      return action.payload;
    },
  },
});

export const { notificationChange } = notificationSlice.actions;

export const setNotification = (message, seconds = 5) => {
  return (dispatch) => {
    dispatch(notificationChange(message));
    setTimeout(() => {
      dispatch(notificationChange(null));
    }, seconds * 1000);
  };
};

export default notificationSlice.reducer;
