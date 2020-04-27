import React, { useEffect, useCallback, useState, memo } from "react";

import { Messages as BaseMessages } from "../components";
import { messagesActions } from "../redux/actions";
import { MessageType, AttachmentServerType, DialogType } from "../types/types";
import { messagesApi } from "../utils/api";

import { AppStateType } from "../redux/reduces";

import { connect } from "react-redux";
import { Empty } from "antd";
import io from "socket.io-client";
import userSocket from "../core/socket";

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
  updateUnreadMessages: () => void;
  removeMessageById: (id: string) => void;
};

type Props = OwnPropsType & MapStatePropsType & MapDispatchPropsType;
//const sock = io("http://localhost:3003/");

const Messages: React.FC<Props> = memo(
  ({
    items,
    fetchMessages,
    currentDialogId,
    isLoading,
    addMessage,
    attachments,
    userId,
    dialogsItems,
    updateUnreadMessages,
    removeMessageById,
  }) => {
    let [imageUrl, setImageUrl] = useState("");
    let [showImage, setShowImage] = useState(false);
    const [isTyping, setIsTyping] = useState(false);

    let typingTimeoutId: any = null;
    const toggleIsTyping = (id: string) => {
      if (userId !== id) {
        setIsTyping(true);
        clearInterval(typingTimeoutId);
        typingTimeoutId = setTimeout(() => {
          setIsTyping(false);
        }, 3000);
      }
    };
    const onNewMessage = (message: MessageType) => {
      if (
        message.dialog._id === currentDialogId &&
        message.user._id !== userId
      ) {
        messagesApi.getAllByDialogId(currentDialogId);
      }
      addMessage(message);
    };

    const onUpdateUnreadMsg = ({ user }: { user: string }) => {
      if (userId !== user) {
        console.log("updateUnread");

        updateUnreadMessages();
      }
    };

    const onDeleteMessage = (message: MessageType) => {
      removeMessageById(message._id);
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
      userSocket.emit("joinRoom", currentDialogId);
      userSocket.on("SERVER:NEW-MESSAGE", onNewMessage);
      userSocket.on("SERVER:DIALOGS:TYPING", toggleIsTyping);
      userSocket.on("SERVER:UPDATE-UNREAD-MSG", onUpdateUnreadMsg);

      userSocket.on("SERVER:DELETE_MESSAGE", onDeleteMessage);

      return () => {
        userSocket.removeListener("SERVER:NEW-MESSAGE", onNewMessage);
        userSocket.removeListener("SERVER:DIALOGS:TYPING", toggleIsTyping);
        userSocket.removeListener(
          "SERVER:UPDATE-UNREAD-MSG",
          onUpdateUnreadMsg
        );
        userSocket.removeListener("SERVER:DELETE_MESSAGE", onDeleteMessage);
        userSocket.emit("leaveRoom", currentDialogId);

        console.log("messages unmounting");
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
        attachments={attachments}
        setImageUrl={setImageUrl}
        showImage={showImage}
        setShowImage={setShowImage}
        imageUrl={imageUrl}
        userId={userId}
        dialogsItems={dialogsItems}
        isTyping={isTyping}
        onRemoveMessage={(id: string) => {
          messagesApi.removeMessageById(id);
        }}
      />
    );
  }
);
let mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
    currentDialogId: state.dialogs.currentDialogId,
    isLoading: state.messages.isLoading,
    items: state.messages.items,
    attachments: state.attachments.items,
    userId: state.user.data ? state.user.data._id : "",
    dialogsItems: state.dialogs.items,
  };
};
export default connect<
  MapStatePropsType,
  MapDispatchPropsType,
  OwnPropsType,
  AppStateType
>(mapStateToProps, {
  fetchMessages: messagesActions.fetchMessages,
  addMessage: messagesActions.addMessage,
  updateUnreadMessages: messagesActions.updateUnreadMessages,
  removeMessageById: messagesActions.removeMessageById,
})(Messages);
