import { createSlice } from "@reduxjs/toolkit";

import blogService from "../services/blogs";

const initialState = null;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
    revokeUser(state, action) {
      return initialState;
    },
  },
});

const { setUser } = userSlice.actions;

export const changeUser = (user) => {
  return async (dispatch) => {
    blogService.setToken(user.token);
    dispatch(setUser(user));
  };
};

export const { revokeUser } = userSlice.actions;
export default userSlice.reducer;
