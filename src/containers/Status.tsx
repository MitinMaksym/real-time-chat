import React from "react";
import { connect } from "react-redux";
import { Status as StatusBase } from "../components";
import { DialogType } from "../types/types";
import { AppStateType } from "../redux/reduces";

type ownProps = {};
type MapStatePropsType = {
  currentDialogId: string;
  userId: string;
  dialogs: Array<DialogType>;
};

type MapDispatchPropsType = {};

type Props = ownProps & MapStatePropsType & MapDispatchPropsType;
const Status: React.FC<Props> = ({ currentDialogId, dialogs, userId }) => {
  if (dialogs.length < 1 || !currentDialogId) {
    return null;
  }
  const currentDialogObj: DialogType = dialogs.filter(item => {
    return item._id === currentDialogId;
  })[0];

  if (currentDialogObj) {
    let partner =
      userId === currentDialogObj.author._id
        ? currentDialogObj.partner
        : currentDialogObj.author;

    return <StatusBase online={partner.isOnline} fullname={partner.fullname} />;
  } else {
    return null;
  }
};
export default connect<
  MapStatePropsType,
  MapDispatchPropsType,
  ownProps,
  AppStateType
>(({ dialogs, user }) => ({
  currentDialogId: dialogs.currentDialogId,
  dialogs: dialogs.items,
  userId: user.data ? user.data.user._id : ""
}))(Status);
