import React, { useEffect, useCallback, useState } from "react";

import socket from "../core/socket";
import { Messages as BaseMessages } from "../components";
import { messagesActions } from "../redux/actions";
import { MessageType, AttachmentServerType, DialogType } from "../types/types";
import { UpdateMessagesDataType } from "../redux/actions/messages";
import { AppStateType } from "../redux/reduces";

import { connect } from "react-redux";
import { Empty } from "antd";

type OwnPropsType = {};
type MapStatePropsType = {
  currentDialogId: string;
  isLoading: boolean;
  items: Array<MessageType>;
  attachments: Array<AttachmentServerType>;
  userId: string;
  dialogsItems: Array<DialogType>;
};

type MapDispatchPropsType = {
  fetchMessages: (id: string) => void;
  addMessage: (message: MessageType) => void;
  removeMessageById: (id: string) => void;
  updateUnreadMessages: (data: UpdateMessagesDataType) => void;
};

type Props = OwnPropsType & MapStatePropsType & MapDispatchPropsType;
const Messages: React.FC<Props> = ({
  items,
  fetchMessages,
  currentDialogId,
  isLoading,
  addMessage,
  removeMessageById,
  updateUnreadMessages,
  attachments,
  userId,
  dialogsItems
}) => {
  let [imageUrl, setImageUrl] = useState("");
  let [showImage, setShowImage] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  let typingTimeoutId: any = null;
  const toggleIsTyping = (data: any) => {
    if (data.dialogId === currentDialogId) {
      setIsTyping(true);
      clearInterval(typingTimeoutId);
      typingTimeoutId = setTimeout(() => {
        setIsTyping(false);
      }, 3000);
    }
  };
  const onNewMessage = (message: MessageType) => {
    addMessage(message);
  };
  const updateUnread = (data: UpdateMessagesDataType) => {
    updateUnreadMessages(data);
  };
  const messagesRef = useCallback(
    (node: HTMLDivElement) => {
      setTimeout(() => {
        if (node !== null) {
          node.scrollTo(0, 99999);
        }
      });
    },
    [items]
  );

  useEffect(() => {
    if (imageUrl) {
      setShowImage(true);
    }
  }, [imageUrl]);

  useEffect(() => {
    if (currentDialogId) {
      fetchMessages(currentDialogId);
    }
    socket.on("SERVER:NEW_MESSAGE", onNewMessage);
    socket.on("SERVER:UPDATE_UNREADED_MESSAGES", updateUnread);
    socket.on("DIALOGS:TYPING", toggleIsTyping);
    socket.on("SERVER:DELETE_MESSAGE", (msg: string) => {});

    return () => {
      socket.removeListener("SERVER:NEW_MESSAGE", onNewMessage);
      socket.removeListener("SERVER:UPDATE_UNREADED_MESSAGES", updateUnread);
      socket.removeListener("DIALOGS:TYPING", toggleIsTyping);
    };
  }, [currentDialogId]);

  if (!currentDialogId) {
    return <Empty description="Виберите диалог" />;
  }

  return (
    <BaseMessages
      boxRef={messagesRef}
      items={items}
      isLoading={isLoading}
      currentDialogId={currentDialogId}
      removeMessageById={removeMessageById}
      attachments={attachments}
      setImageUrl={setImageUrl}
      showImage={showImage}
      setShowImage={setShowImage}
      imageUrl={imageUrl}
      userId={userId}
      dialogsItems={dialogsItems}
      isTyping={isTyping}
    />
  );
};
let mapDispatchToProps = (state: AppStateType): MapStatePropsType => {
  return {
    currentDialogId: state.dialogs.currentDialogId,
    isLoading: state.messages.isLoading,
    items: state.messages.items,
    attachments: state.attachments.items,
    userId: state.user.data?.user._id ? state.user.data?.user._id : "",
    dialogsItems: state.dialogs.items
  };
};
export default connect<
  MapStatePropsType,
  MapDispatchPropsType,
  OwnPropsType,
  AppStateType
>(mapDispatchToProps, {
  fetchMessages: messagesActions.fetchMessages,
  addMessage: messagesActions.addMessage,
  removeMessageById: messagesActions.removeMessageById,
  updateUnreadMessages: messagesActions.updateUnreadMessages
})(Messages);
