import { Alert } from "react-bootstrap";
import { useNotificationState } from "../context/notificationContext";

const Notification = () => {
  const notificationState = useNotificationState();
  let type = "info"

  switch(notificationState.notificationType) {
    case "error":
      type = "danger"
      break;
    default:
      type = notificationState.notificationType
  }

  if (notificationState.message) {
    return (
      <Alert variant={type}>{notificationState.message}</Alert>
    );
  }
};

export default Notification;
