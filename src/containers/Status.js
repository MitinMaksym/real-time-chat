import React from "react";
import { connect } from "react-redux";
import { Status as StatusBase } from "../components";

const Status = ({ currentDialogId, dialogs, userId }) => {
  if (dialogs.length < 1 || !currentDialogId) {
    return null;
  }
  const currentDialogObj = dialogs.filter(item => {
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
export default connect(({ dialogs, user }) => ({
  currentDialogId: dialogs.currentDialogId,
  dialogs: dialogs.items,
  userId: user.data.user._id
}))(Status);
