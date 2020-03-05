import React from "react";
import classNames from "classnames";
import format from "date-fns/format";
import { Icon } from "antd";
import { IconReaded } from "..";
import isToday from "date-fns/isToday";
import Avatar from "../Avatar";
import { Link } from "react-router-dom";
const Render = require("react-emoji-render");
const Emoji = Render.Emojione;
const getMessageTime = create_at => {
  if (isToday(new Date(create_at))) {
    return format(new Date(create_at), "HH:mm");
  } else {
    return format(new Date(create_at), "dd.MM.yyyy");
  }
};
const renderLastMessage = (message, userId) => {
  let text = "";
  if (!message.text && message.attachments) {
    text = "прикрепленный файл";
  } else {
    text = message.text;
  }
  return (
    <Emoji text={`${message.user._id === userId ? "Вы: " : ""} ${text}`} />
  );
};
export default function DialogItem({
  _id,
  isMe,
  partner,
  lastMessage,
  author,
  currentDialogId,
  userId
}) {
  let user = isMe ? partner : author;
  return (
    <Link to={`/dialog/${_id}`}>
      <div
        className={classNames("dialogs__item", {
          "dialogs__item--online": user.isOnline,
          "dialogs__item--active": currentDialogId === _id
        })}
      >
        <div className="dialogs__item-avatar">
          <Avatar user={user} />
        </div>
        <div className="dialogs__item-info">
          <div className="dialogs__item-info-top">
            <b>{user.fullname}</b>
            {lastMessage && (
              <span>{getMessageTime(new Date(lastMessage.createdAt))}</span>
            )}
          </div>
          {lastMessage && (
            <div className="dialogs__item-info-bottom">
              <p>{renderLastMessage(lastMessage, userId)}</p>

              <IconReaded
                isMe={userId === lastMessage.user._id}
                isReaded={lastMessage.readed}
              />

              {lastMessage.user._id !== userId && lastMessage.readed === false && (
                <div className="dialogs__item-info-bottom-count">
                  <Icon type="mail" />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
