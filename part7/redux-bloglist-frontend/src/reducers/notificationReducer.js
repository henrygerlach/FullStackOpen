import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notification: null,
  color: "green",
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    changeNotification(state, action) {
      return action.payload;
    },
  },
});

const { changeNotification } = notificationSlice.actions;

export const setNotification = (notification, color) => {
  return async (dispatch) => {
    dispatch(
      changeNotification({
        notification: notification,
        color: color,
      }),
    );
    setTimeout(() => {
      dispatch(changeNotification(initialState));
    }, 5000);
  };
};

export default notificationSlice.reducer;
