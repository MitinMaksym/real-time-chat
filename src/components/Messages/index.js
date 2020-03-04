import React from "react";
import propTypes from "prop-types";
import classNames from "classnames";
import find from "lodash/find";

import { Empty, Spin, Modal } from "antd";

import { Message } from "../";

import "./Messages.scss";

const Messages = ({
  items,
  isLoading,
  boxRef,
  currentDialogId,
  userId,
  removeMessageById,
  attachments,
  setImageUrl,
  showImage,
  setShowImage,
  imageUrl,
  dialogsItems,
  isTyping
}) => {
  let currentDialog =
    dialogsItems && find(dialogsItems, { _id: currentDialogId });
  let partner;
  if (currentDialog) {
    partner =
      currentDialog.partner.id === userId
        ? currentDialog.author
        : currentDialog.partner;
  }

  let handleCancel = () => {
    setShowImage(false);
    setImageUrl(null);
  };
  return (
    <div
      className={classNames("chat__dialog-messages", {
        "chat__dialog-messages-attachments": attachments.length
      })}
    >
      <div
        ref={boxRef}
        className={classNames("messages", { "messages--loading": isLoading })}
      >
        {isLoading ? (
          <Spin size="large" tip="Загрузка сообщений..." />
        ) : items && !isLoading && currentDialogId ? (
          items.length > 0 ? (
            items.map(item => {
              return (
                <Message
                  key={item._id}
                  alt="User avatar"
                  text={item.text}
                  date={new Date()}
                  isMe={item.user._id === userId}
                  {...item}
                  isTyping={false}
                  onRemoveMessage={removeMessageById.bind(this, item._id)}
                  setImageUrl={setImageUrl}
                />
              );
            })
          ) : (
            <Empty description="Диалог пуст" />
          )
        ) : (
          <Empty description="Виберите диалог" />
        )}{" "}
        {isTyping && !isLoading && <Message isTyping={true} user={partner} />}
      </div>

      {imageUrl && (
        <Modal visible={showImage} footer={null} onCancel={handleCancel}>
          <img alt="previewImg" style={{ width: "100%" }} src={imageUrl} />
        </Modal>
      )}
    </div>
  );
};

Messages.propTypes = {
  className: propTypes.string
};

export default Messages;
