import { useSelector } from "react-redux";

const Notification = () => {
  const { notification, color } = useSelector((state) => state.notification);

  if (notification === null) {
    return null;
  }

  return (
    <div style={{ color: color }} className="notification">
      {notification}
    </div>
  );
};

export default Notification;
