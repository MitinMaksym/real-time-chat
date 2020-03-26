import React, { useState } from "react";

import { Sidebar as SidebarBase } from "../components";
import { userApi } from "../utils/api";
import { dialogsActions } from "../redux/actions";
import { CreateDialogDataActionType } from "../redux/actions/dialogs";
import { AppStateType } from "../redux/reduces";
import { DialogType } from "../types/types";

import { withRouter, RouteComponentProps } from "react-router-dom";
import { connect } from "react-redux";

type OwnPropsType = {};

type MapStatePropsType = {
  userId: string;
};

type MapDispatchPropsType = {
  createDialog: (data: CreateDialogDataActionType) => Promise<any>;
};

type Props = OwnPropsType &
  MapDispatchPropsType &
  MapStatePropsType &
  RouteComponentProps;

let Sidebar: React.FC<Props> = props => {
  let [visible, setVisible] = useState(false);
  let [isLoading, setIsLoading] = useState(false);
  let [users, setUsers] = useState([]);
  let [newMessageText, setNewMessageText] = useState<string>("");
  let [partner, setPartner] = useState<string>("");
  let [selectedInputValue, setSelectInputValue] = useState("");
  let showModal = () => {
    setVisible(true);
  };

  let handleOk = async () => {
    setIsLoading(true);
    setNewMessageText("");
    setSelectInputValue("");
    setUsers([]);
    setPartner("");
    setIsLoading(false);
    setVisible(false);
    setIsLoading(false);
    setVisible(false);
    props
      .createDialog({ text: newMessageText, partner })
      .then((data: { status: string; dialog: DialogType }) => {
        console.log(data);
        if (data && data.status === "success") {
          props.history.push(`/dialog/${data.dialog._id}`);
        }
      });
  };

  let handleCancel = () => {
    setVisible(false);
    setSelectInputValue("");
    setPartner("");
    setUsers([]);
  };

  //------------------SELECT HANDLERS
  function onInputSelect(value: string) {
    setPartner(value);
  }
  function onInputChange(value: string) {
    setSelectInputValue(value);
  }

  let onSearch = async (val: string) => {
    try {
      let data = await userApi.findUsers(val);
      if (data.status === "success") {
        setUsers(data.users);
      }
    } catch (err) {
      console.error(err);
    }
  };

  //-------------------NEW MESSAGE FORM HANDLERS
  let onAddNewMessage = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewMessageText(e.target.value);
  };
  return (
    <SidebarBase
      modalText=""
      userId={props.userId}
      isLoading={isLoading}
      visible={visible}
      showModal={showModal}
      handleCancel={handleCancel}
      handleOk={handleOk}
      onInputSelect={onInputSelect}
      users={users}
      onSearch={onSearch}
      onAddNewMessage={onAddNewMessage}
      partner={partner}
      newMessageText={newMessageText}
      selectedInputValue={selectedInputValue}
      onInputChange={onInputChange}
    />
  );
};

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
    userId: state.user.data ? state.user.data.user._id : ""
  };
};

let mapDispatchToProps = (dispatch: any): MapDispatchPropsType => {
  return {
    createDialog: (data: CreateDialogDataActionType) =>
      dispatch(dialogsActions.createDialog(data))
  };
};
export default withRouter(
  connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(
    mapStateToProps,
    mapDispatchToProps
  )(Sidebar)
);
