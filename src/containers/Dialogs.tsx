import React, { useState, useEffect, Dispatch } from "react";

import socket from "../core/socket";
import { Dialogs as BaseDialogs } from "../components";
import { dialogsActions } from "../redux/actions";
import { DialogType, MessageType } from "../types/types";

import { connect } from "react-redux";
import { AppStateType } from "../redux/reduces";

type OwnPropsType = {};

type MapStatePropsType = {
  items: Array<DialogType>;
  userId: string;
  currentDialogId: string;
  isLoading: boolean;
};

type MapDispatchPropsType = {
  fetchDialogs: () => void;
  updateDialogs: (data: {
    operation: string;
    item: DialogType & MessageType;
  }) => void;
};

type Props = OwnPropsType & MapStatePropsType & MapDispatchPropsType;

const Dialogs: React.FC<Props> = ({
  items,
  isLoading,
  userId,
  fetchDialogs,
  currentDialogId,
  updateDialogs
}) => {
  let [inputValue, setInputValue] = useState("");
  let [filtered, setFiltered] = useState(Array.from(items));

  let onUpdateDialogs = (
    item: DialogType & MessageType,
    operation = "SERVER:CREATE_DIALOG"
  ) => {
    updateDialogs({ operation, item });
  };
  let onDeleteMessage = (
    item: DialogType & MessageType,
    operation = "SERVER:DELETE_MESSAGE"
  ) => {
    updateDialogs({ operation, item });
  };
  let onNewMessage = (
    item: DialogType & MessageType,
    operation = "SERVER:NEW_MESSAGE"
  ) => {
    updateDialogs({ operation, item });
  };
  let onSearch = (value: string) => {
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
let mapStateToProps = (state: AppStateType): MapStatePropsType => ({
  items: state.dialogs.items,
  isLoading: state.dialogs.isLoading,
  userId: state.user.data ? state.user.data._id : "",
  currentDialogId: state.dialogs.currentDialogId
});

let mapDispatchToProps = (dispatch: any) => {
  return {
    fetchDialogs: () => dispatch(dialogsActions.fetchDialogs()),
    updateDialogs: (data: {
      item: DialogType & MessageType;
      operation: string;
    }) => dispatch(dialogsActions.updateDialogs(data))
  };
};

export default connect<
  MapStatePropsType,
  MapDispatchPropsType,
  OwnPropsType,
  AppStateType
>(
  mapStateToProps,
  mapDispatchToProps
)(Dialogs);
