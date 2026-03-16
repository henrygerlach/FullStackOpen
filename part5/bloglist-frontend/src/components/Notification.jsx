const Notification = ({ notification, color }) => {
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
