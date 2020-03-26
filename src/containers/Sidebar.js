import React, { useState } from "react";
import { Sidebar as SidebarBase } from "../components";
import { userApi } from "../utils/api";
import { connect } from "react-redux";
import { dialogsActions } from "../redux/actions";
import { withRouter } from "react-router-dom";

let Sidebar = props => {
  let [visible, setVisible] = useState(false);
  let [isLoading, setIsLoading] = useState(false);
  let [users, setUsers] = useState([]);
  let [newMessageText, setNewMessageText] = useState("");
  let [partner, setPartner] = useState(null);
  let [selectedInputValue, setSelectInputValue] = useState(undefined);
  let showModal = () => {
    setVisible(true);
  };

  let handleOk = async () => {
    setIsLoading(true);
    setNewMessageText("");
    setSelectInputValue(undefined);
    setUsers([]);
    setPartner(null);
    setIsLoading(false);
    setVisible(false);
    setIsLoading(false);
    setVisible(false);
    props.createDialog({ text: newMessageText, partner }).then(data => {
      if (data && data.status === "success") {
        props.history.push(`/dialog/${data.dialog._id}`);
      }
    });
  };

  let handleCancel = () => {
    setVisible(false);
    setSelectInputValue(undefined);
    setPartner(null);
    setUsers([]);
  };

  //------------------SELECT HANDLERS
  function onInputSelect(value) {
    setPartner(value);
  }
  function onInputChange(value) {
    setSelectInputValue(value);
  }

  let onSearch = async val => {
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
  let onAddNewMessage = e => {
    setNewMessageText(e.target.value);
  };
  return (
    <SidebarBase
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
export default withRouter(connect(null, dialogsActions)(Sidebar));
