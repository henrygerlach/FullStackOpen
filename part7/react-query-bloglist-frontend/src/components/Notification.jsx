const Notification = ({ notification }) => {
  if (notification.notification === null) {
    return null;
  }

  return (
    <div style={{ color: notification.color }} className="notification">
      {notification.notification}
    </div>
  );
};

export default Notification;
