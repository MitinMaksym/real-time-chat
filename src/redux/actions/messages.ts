import { AppStateType } from "./../reduces/index";
import { MessageType, DialogType } from "./../../types/types";
import { messagesApi } from "../../utils/api";
import { dialogsActions } from "./index";
import {
  SET_ITEMS,
  ADD_MESSAGE,
  SET_IS_LOADING,
  REMOVE_MESSAGE
} from "../reduces/messages";
import { ThunkAction } from "redux-thunk";
import { SetItemsActionType, UpdateDialogActionType } from "./dialogs";
export type SetMessagesActionType = {
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

export type RemoveMessageActionType = {
  type: typeof REMOVE_MESSAGE;
  payload: string;
};

type AddMessageActionType = {
  type: typeof ADD_MESSAGE;
  payload: MessageType;
};
export type SendMessageDataActionType = {
  text: string;
  currentDialogId: string;
  attachments: Array<string>;
};

export type ActionsTypes =
  | SetMessagesActionType
  | SetIsLoadingActionType
  | AddMessageActionType
  | RemoveMessageActionType
  | UpdateDialogActionType;

type MessagesThunkType = ThunkAction<
  Promise<void>,
  AppStateType,
  unknown,
  ActionsTypes
>;

const actions = {
  setMessages: (items: Array<MessageType>): SetMessagesActionType => ({
    type: SET_ITEMS,
    payload: items
  }),
  fetchMessages: (id: string): MessagesThunkType => async dispatch => {
    dispatch(actions.setIsLoading(true));
    messagesApi.getAllByDialogId(id).then((data: any) => {
      dispatch(actions.setMessages(data.data));
      dispatch(actions.setIsLoading(false));
    });
  },
  addMessage: (message: MessageType): MessagesThunkType => async (
    dispatch,
    getState: () => AppStateType
  ) => {
    let { dialogs } = getState();
    let state = getState();
    let userId = state.user.data ? state.user.data._id : "";

    if (dialogs.currentDialogId === message.dialog._id) {
      dispatch({ type: ADD_MESSAGE, payload: message });

      if (userId !== message.user._id) {
        messagesApi.getAllByDialogId(message.dialog._id);
        dispatch(dialogsActions.updateDialog(message.dialog));
      }
    }
  },

  updateUnreadMessages: (
    data: UpdateMessagesDataType
  ): MessagesThunkType => async (dispatch, getState: () => AppStateType) => {
    let state = getState();
    let userId: string = state.user.data ? state.user.data._id : "";
    let currentDialogId: string = getState().dialogs.currentDialogId;

    let author: string = data.dialog.author._id;
    let partner: string = data.dialog.partner._id;
    let hasDialog = userId === partner || userId === author;

    if (hasDialog) {
      if (data.dialog && data.dialog._id === currentDialogId) {
        let currentMessages: Array<MessageType> = getState().messages.items.filter(
          (message: MessageType) => {
            return (
              message.dialog._id === currentDialogId &&
              message.user._id === userId
            );
          }
        );
        let check: boolean = currentMessages.some(
          (message: MessageType) => message.readed !== true
        );
        if (check) {
          dispatch(actions.setMessages(data.messages));
          dispatch(dialogsActions.updateDialog(data.dialog));
        }
        dispatch(dialogsActions.updateDialog(data.dialog));
      } else {
        dispatch(dialogsActions.updateDialog(data.dialog));
      }
    }
  },
  removeMessageById: (id: string): MessagesThunkType => async dispatch => {
    await messagesApi.removeMessageById(id);
  },
  sendMessage: (
    message: SendMessageDataActionType
    //@ts-ignore
  ): MessagesThunkType => dispatch => {
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
