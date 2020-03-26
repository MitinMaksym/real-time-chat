import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import socket from "../core/socket";
import { Dialogs as BaseDialogs } from "../components";
import { dialogsActions } from "../redux/actions";

const Dialogs = ({
  items,
  fetchDialogs,
  isLoading,
  userId,
  currentDialogId,
  updateDialogs
}) => {
  let [inputValue, setInputValue] = useState("");
  let [filtered, setFiltered] = useState(Array.from(items));

  let onUpdateDialogs = (item, operation = "SERVER:CREATE_DIALOG") => {
    updateDialogs({ operation, item });
  };
  let onDeleteMessage = (item, operation = "SERVER:DELETE_MESSAGE") => {
    updateDialogs({ operation, item });
  };
  let onNewMessage = (item, operation = "SERVER:NEW_MESSAGE") => {
    updateDialogs({ operation, item });
  };
  let onSearch = value => {
    setInputValue(value);
    setFiltered(
      items.filter(item => {
        let user = userId === item.author._id ? item.partner : item.author;
        return user.fullname.toLowerCase().indexOf(value) >= 0;
      })
    );
  };

  useEffect(() => {
    setFiltered(items);
  }, [items]);

  useEffect(() => {
    fetchDialogs();

    socket.on("SERVER:CREATE_DIALOG", onUpdateDialogs);
    socket.on("SERVER:DELETE_MESSAGE", onDeleteMessage);
    socket.on("SERVER:NEW_MESSAGE", onNewMessage);

    return () => {
      socket.removeListener("SERVER:CREATE_DIALOG", onUpdateDialogs);

      socket.removeListener("SERVER:NEW_MESSAGE", onNewMessage);

      socket.removeListener("SERVER:DELETE_MESSAGE", onDeleteMessage);
    };
  }, []);

  return (
    <BaseDialogs
      items={filtered}
      onSearch={onSearch}
      inputValue={inputValue}
      isLoading={isLoading}
      userId={userId}
      currentDialogId={currentDialogId}
    />
  );
};

export default connect(
  ({ dialogs, user }) => ({
    items: dialogs.items,
    isLoading: dialogs.isLoading,
    userId: user.data.user._id,
    currentDialogId: dialogs.currentDialogId
  }),
  dialogsActions
)(Dialogs);
