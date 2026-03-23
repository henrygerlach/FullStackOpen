import { Alert } from "react-bootstrap";
import { useSelector } from "react-redux";

const Notification = () => {
  const { notification, color } = useSelector((state) => state.notification);

  if (notification === null) {
    return null;
  }

  const variant = color === "red" ? "danger" : "success";

  return (
    <Alert variant={variant} className="notification mb-4 border-0 shadow-sm">
      {notification}
    </Alert>
  );
};

export default Notification;
