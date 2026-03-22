export const initialState = {
  notification: null,
  color: "green",
};

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SET":
      return action.payload;
    case "RESET":
      return initialState;
    default:
      return state;
  }
};

export default notificationReducer;
