import { notification } from "antd";
type NotificationPropsType = {
  type: "success" | "error";
  message: string;
  description: string;
  duration: number;
};

type openNotificationType = (props: NotificationPropsType) => void;
const openNotification: openNotificationType = ({
  type,
  message,
  description,
  duration
}) => {
  notification[type]({
    message,
    description,
    duration
  });
};
export default openNotification;
