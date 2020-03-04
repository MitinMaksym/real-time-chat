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
          <div className="dialogs__item-info-bottom">
            {lastMessage && lastMessage.text && (
              <p>{<Emoji text={lastMessage.text} />}</p>
            )}
            {lastMessage && (
              <IconReaded
                isMe={userId === lastMessage.user._id}
                isReaded={lastMessage.readed}
              />
            )}
            {lastMessage.user._id !== userId && lastMessage.readed === false && (
              <div className="dialogs__item-info-bottom-count">
                <Icon type="mail" />
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
