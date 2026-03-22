const userReducer = (state, action) => {
  switch (action.type) {
    case "SET":
      return action.payload;
    default:
      return null;
  }
};

export default userReducer;
