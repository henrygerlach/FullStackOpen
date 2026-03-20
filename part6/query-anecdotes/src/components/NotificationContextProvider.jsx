import { createContext, useReducer } from "react";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SET":
      return action.payload;
    default:
      return state;
  }
};

const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    0,
  );

  const setNotification = (notification, seconds = 5) => {
    notificationDispatch({ type: "SET", payload: notification });
    setTimeout(() => {
      notificationDispatch({ type: "SET", payload: null });
    }, seconds * 1000);
  };

  return (
    <NotificationContext.Provider value={{ notification, setNotification }}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
