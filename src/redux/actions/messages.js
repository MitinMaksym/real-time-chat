import { messagesApi } from "../../utils/api";
import { dialogsActions } from "./index";
import {
  SET_ITEMS,
  ADD_MESSAGE,
  REMOVE_MESSAGE,
  SET_IS_LOADING
} from "../reduces/messages";

const actions = {
  setMessages: items => ({ type: SET_ITEMS, payload: items }),
  fetchMessages: id => dispatch => {
    dispatch(actions.setIsLoading(true));
    messagesApi.getAllByDialogId(id).then(({ data }) => {
      dispatch(actions.setMessages(data));
      dispatch(actions.setIsLoading(false));
    });
  },
  addMessage: message => (dispatch, getState) => {
    let { dialogs } = getState();
    let userId = getState().user.data.user._id;

    if (dialogs.currentDialogId === message.dialog._id) {
      dispatch({ type: ADD_MESSAGE, payload: message });

      if (userId !== message.user._id) {
        messagesApi.getAllByDialogId(message.dialog._id);
        dispatch(dialogsActions.updateDialog(message.dialog));
      }
    }
  },

  updateUnreadMessages: ({ messages, dialog }) => async (
    dispatch,
    getState
  ) => {
    let userId = getState().user.data.user._id;
    let currentDialogId = await getState().dialogs.currentDialogId;

    let author = dialog.author._id;
    let partner = dialog.partner._id;
    let hasDialog = userId === partner || userId === author;

    if (hasDialog) {
      if (dialog && dialog._id === currentDialogId) {
        let currentMessages = getState().messages.items.filter(message => {
          return (
            message.dialog._id === currentDialogId &&
            message.user._id === userId
          );
        });
        let check = currentMessages.some(message => message.readed !== true);
        if (check) {
          await dispatch(actions.setMessages(messages));
          await dispatch(dialogsActions.updateDialog(dialog));
        }
        dispatch(dialogsActions.updateDialog(dialog));
      } else {
        dispatch(dialogsActions.updateDialog(dialog));
      }
    }
  },
  removeMessageById: id => async dispatch => {
    let data = await messagesApi.removeMessageById(id);
    if (data.status === "success") {
      dispatch({ type: REMOVE_MESSAGE, payload: id });
    }
  },
  sendMessage: ({ text, currentDialogId, attachments }) => dispatch => {
    messagesApi.sendMessage({ text, currentDialogId, attachments });
  },
  setIsLoading: bool => {
    return { type: SET_IS_LOADING, payload: bool };
  }
};

export default actions;
