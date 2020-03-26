import { MessageType, DialogType } from "./../../types/types";
import { messagesApi } from "../../utils/api";
import { dialogsActions } from "./index";
import { SET_ITEMS, ADD_MESSAGE, SET_IS_LOADING } from "../reduces/messages";
type SetMessagesActionType = {
  type: typeof SET_ITEMS;
  payload: Array<MessageType>;
};
type SetIsLoadingActionType = {
  type: typeof SET_IS_LOADING;
  payload: boolean;
};
export type UpdateMessagesDataType = {
  dialog: DialogType;
  messages: Array<MessageType>;
};

const actions = {
  setMessages: (items: Array<MessageType>): SetMessagesActionType => ({
    type: SET_ITEMS,
    payload: items
  }),
  fetchMessages: (id: string) => (dispatch: any) => {
    dispatch(actions.setIsLoading(true));
    messagesApi.getAllByDialogId(id).then((data: any) => {
      dispatch(actions.setMessages(data.data));
      dispatch(actions.setIsLoading(false));
    });
  },
  addMessage: (message: MessageType) => (dispatch: any, getState: any) => {
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

  updateUnreadMessages: (data: UpdateMessagesDataType) => async (
    dispatch: any,
    getState: any
  ) => {
    let userId = getState().user.data.user._id;
    let currentDialogId = await getState().dialogs.currentDialogId;

    let author = data.dialog.author._id;
    let partner = data.dialog.partner._id;
    let hasDialog = userId === partner || userId === author;

    if (hasDialog) {
      if (data.dialog && data.dialog._id === currentDialogId) {
        let currentMessages: any = getState().messages.items.filter(
          (message: any) => {
            return (
              message.dialog._id === currentDialogId &&
              message.user._id === userId
            );
          }
        );
        let check: any = currentMessages.some(
          (message: any) => message.readed !== true
        );
        if (check) {
          await dispatch(actions.setMessages(data.messages));
          await dispatch(dialogsActions.updateDialog(data.dialog));
        }
        dispatch(dialogsActions.updateDialog(data.dialog));
      } else {
        dispatch(dialogsActions.updateDialog(data.dialog));
      }
    }
  },
  removeMessageById: (id: string) => async (dispatch: any) => {
    await messagesApi.removeMessageById(id);
  },
  sendMessage: (message: any) => (dispatch: any) => {
    return messagesApi.sendMessage({
      text: message.text,
      currentDialogId: message.currentDialogId,
      attachments: message.attachments
    });
  },
  setIsLoading: (bool: boolean): SetIsLoadingActionType => {
    return { type: SET_IS_LOADING, payload: bool };
  }
};

export default actions;
