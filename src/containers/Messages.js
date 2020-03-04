import React, { useEffect, useCallback, useState } from "react";
import { connect } from "react-redux";
import socket from "../core/socket";
import { Empty } from "antd";

import { Messages as BaseMessages } from "../components";
import { messagesActions } from "../redux/actions";

const Messages = ({
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
  let [imageUrl, setImageUrl] = useState(null);
  let [showImage, setShowImage] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  let typingTimeoutId = null;

  const toggleIsTyping = data => {
    if (data.dialogId === currentDialogId) {
      setIsTyping(true);
      clearInterval(typingTimeoutId);
      typingTimeoutId = setTimeout(() => {
        setIsTyping(false);
      }, 3000);
    }
  };
  const onNewMessage = message => {
    addMessage(message);
  };
  const updateUnread = messages => {
    updateUnreadMessages(messages);
  };
  const messagesRef = useCallback(
    node => {
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
    if (currentDialogId !== null) {
      fetchMessages(currentDialogId);
    }
    socket.on("SERVER:NEW_MESSAGE", onNewMessage);
    socket.on("SERVER:UPDATE_UNREADED_MESSAGES", updateUnread);
    socket.on("DIALOGS:TYPING", toggleIsTyping);

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

export default connect(
  ({ dialogs, messages, attachments, user }) => ({
    userId: user.data.user._id,

    items: messages.items,
    dialogsItems: dialogs.items,
    currentDialogId: dialogs.currentDialogId,
    isLoading: messages.isLoading,
    attachments: attachments.items
  }),
  messagesActions
)(Messages);
