import React, { useState, useEffect } from "react";

import { Dialogs as BaseDialogs } from "../components";
import { dialogsActions } from "../redux/actions";
import { DialogType } from "../types/types";
import { connect } from "react-redux";
import { AppStateType } from "../redux/reduces";

import socket from "../core/socket";
import { fetchDialogs } from "../redux/actions/dialogs";

type OwnPropsType = {};

type MapStatePropsType = {
  items: Array<DialogType>;
  userId: string;
  currentDialogId: string;
  isLoading: boolean;
};

type MapDispatchPropsType = {
  fetchDialogs: () => void;
  addNewDialog: (dialog: DialogType) => void;
  updateDialog: (dialog: DialogType) => void;
};

type Props = OwnPropsType & MapStatePropsType & MapDispatchPropsType;

const Dialogs: React.FC<Props> = ({
  items,
  isLoading,
  userId,
  fetchDialogs,
  currentDialogId,
  addNewDialog,
  updateDialog,
}) => {
  let [inputValue, setInputValue] = useState("");
  let [filtered, setFiltered] = useState(Array.from(items));

  let onSearch = (value: string) => {
    setInputValue(value);
    setFiltered(
      items.filter((item) => {
        let user = userId === item.author._id ? item.partner : item.author;
        return user.fullname.toLowerCase().indexOf(value) >= 0;
      })
    );
  };

  let onAddNewDialog = (dialog: DialogType) => {
    console.log(dialog);
    addNewDialog(dialog);
  };

  useEffect(() => {
    setFiltered(items);
  }, [items]);

  useEffect(() => {
    fetchDialogs();
    socket.emit("joinUser", { userId });
    socket.on("SERVER:ADD-NEW-DIALOG", onAddNewDialog);
    socket.on("SERVER:UPDATE-DIALOG", updateDialog);

    return () => {
      socket.removeListener("SERVER:ADD-NEW-DIALOG", onAddNewDialog);
      socket.removeListener("SERVER:UPDATE-DIALOG", updateDialog);
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
  userId: state.user.data!._id,
  currentDialogId: state.dialogs.currentDialogId,
});

export default connect<
  MapStatePropsType,
  MapDispatchPropsType,
  OwnPropsType,
  AppStateType
>(mapStateToProps, {
  fetchDialogs: fetchDialogs,
  addNewDialog: dialogsActions.addNewDialog,
  updateDialog: dialogsActions.updateDialog,
})(Dialogs);
