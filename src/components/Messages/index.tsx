import React from "react";

import { Empty, Spin, Modal } from "antd";
import { Message } from "..";

import classNames from "classnames";
import find from "lodash/find";

import "./Messages.scss";
import {
  MessageType,
  DialogType,
  UserDataType,
  AttachmentServerType
} from "../../types/types";

type Props = {
  items: Array<MessageType>;
  isLoading: boolean;
  boxRef: (node: HTMLDivElement) => void;
  currentDialogId: string;
  userId: string;
  isTyping: boolean;
  imageUrl: string;
  showImage: boolean;
  dialogsItems: Array<DialogType>;
  attachments: Array<AttachmentServerType>;
  removeMessageById: (id: string) => void;
  setImageUrl: (url: string) => void;
  setShowImage: (value: boolean) => void;
};

const Messages: React.FC<Props> = ({
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
  let currentDialog: DialogType | undefined =
    dialogsItems && find(dialogsItems, { _id: currentDialogId });
  let partner: UserDataType | undefined;
  if (currentDialog) {
    partner =
      currentDialog.partner.id === userId
        ? currentDialog.author
        : currentDialog.partner;
  }

  let handleCancel = () => {
    setShowImage(false);
    setImageUrl("");
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
            items.map((item: MessageType) => {
              return (
                <Message
                  key={item._id}
                  alt="User avatar"
                  text={item.text}
                  date={new Date()}
                  isMe={item.user._id === userId}
                  {...item}
                  isTyping={false}
                  onRemoveMessage={() => {
                    removeMessageById(item._id);
                  }}
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
        {isTyping && partner && !isLoading && (
          <Message isTyping={true} user={partner} />
        )}
      </div>

      {imageUrl && (
        <Modal visible={showImage} footer={null} onCancel={handleCancel}>
          <img alt="previewImg" style={{ width: "100%" }} src={imageUrl} />
        </Modal>
      )}
    </div>
  );
};

export default Messages;
