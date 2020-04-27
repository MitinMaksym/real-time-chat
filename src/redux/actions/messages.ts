import { UPDATE_UNREAD_MESSAGES } from "./../reduces/messages";
import { AppStateType } from "./../reduces/index";
import { MessageType } from "./../../types/types";
import { messagesApi } from "../../utils/api";
import {
  SET_ITEMS,
  ADD_MESSAGE,
  SET_IS_LOADING,
  REMOVE_MESSAGE,
} from "../reduces/messages";
import { ThunkAction } from "redux-thunk";
import { UpdateDialogActionType } from "./dialogs";

export type SetMessagesActionType = {
  type: typeof SET_ITEMS;
  payload: Array<MessageType>;
};

type SetIsLoadingActionType = {
  type: typeof SET_IS_LOADING;
  payload: boolean;
};

export type RemoveMessageActionType = {
  type: typeof REMOVE_MESSAGE;
  payload: string;
};

type AddMessageActionType = {
  type: typeof ADD_MESSAGE;
  payload: MessageType;
};
type UpdateUnreadMessagesType = {
  type: typeof UPDATE_UNREAD_MESSAGES;
};

export type ActionsTypes =
  | SetMessagesActionType
  | SetIsLoadingActionType
  | AddMessageActionType
  | RemoveMessageActionType
  | UpdateDialogActionType
  | UpdateUnreadMessagesType;

type MessagesThunkType = ThunkAction<
  Promise<void>,
  AppStateType,
  unknown,
  ActionsTypes
>;

const actions = {
  setMessages: (items: Array<MessageType>): SetMessagesActionType => ({
    type: SET_ITEMS,
    payload: items,
  }),
  fetchMessages: (id: string): MessagesThunkType => async (dispatch) => {
    dispatch(actions.setIsLoading(true));
    messagesApi.getAllByDialogId(id).then((items) => {
      dispatch(actions.setMessages(items));
      dispatch(actions.setIsLoading(false));
    });
  },
  addMessage: (message: MessageType): AddMessageActionType => {
    return { type: ADD_MESSAGE, payload: message };
  },
  removeMessageById: (id: string): RemoveMessageActionType => {
    return { type: REMOVE_MESSAGE, payload: id };
  },
  updateUnreadMessages: () => {
    return {
      type: UPDATE_UNREAD_MESSAGES,
    };
  },

  setIsLoading: (bool: boolean): SetIsLoadingActionType => {
    return { type: SET_IS_LOADING, payload: bool };
  },
};

export default actions;
