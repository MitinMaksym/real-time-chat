import { notification } from "antd";

const openNotification = ({ type, message, description, duration }) => {
  notification[type]({
    message,
    description,
    duration
  });
};
export default openNotification;
