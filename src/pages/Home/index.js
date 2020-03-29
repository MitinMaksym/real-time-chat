import React, { useEffect } from "react";
import { Icon } from "antd";
import { Messages, ChatInput, Status, Sidebar } from "../../containers";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { dialogsActions, userActions } from "../../redux/actions";
import "./Home.scss";

function Home(props) {
  let { setCurrentDialog, signOut, isAuth, fullname } = props;
  let onSignOut = () => {
    let check = window.confirm(
      `${fullname}, вы уверенны что хотите выйти из аккаунта?`
    );
    if (check) {
      signOut();
    }
  };
  useEffect(() => {
    return () => {
      props.history.push("/");
    };
  }, []);
  useEffect(() => {
    let path = props.location.pathname;
    let dialogId = path.split("/").pop();
    if (dialogId.length === 24) {
      setCurrentDialog(dialogId);
    }
  }, [props.location.pathname, setCurrentDialog]);

  return (
    isAuth && (
      <section className="home">
        <div className="chat">
          <Sidebar />
          <div className="chat__dialog">
            <div className="chat__dialog-header">
              <div />
              <Status />
              <div>
                {" "}
                <Icon
                  style={{
                    fontSize: "20px",
                    marginRight: "10px",
                    color: "#389990",
                    cursor: "pointer"
                  }}
                  type="logout"
                  onClick={onSignOut}
                />
              </div>
            </div>
            <Messages />
            <div className="chat__dialog-input">
              <ChatInput />
            </div>
          </div>
        </div>
      </section>
    )
  );
}
export default withRouter(
  connect(
    ({ user }) => ({ isAuth: user.isAuth, fullname: user.data.fullname }),
    {
      ...dialogsActions,
      ...userActions
    }
  )(Home)
);
