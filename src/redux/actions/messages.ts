import { MessageType } from "./../../types/types";
import { messagesApi } from "../../utils/api";
import { InferActionsTypes } from "../store";
import { BaseThunkType } from "../../types/types";

export type ActionsTypes = InferActionsTypes<typeof actions>;

type MessagesThunkType = BaseThunkType<ActionsTypes>;

//----------------------ACTIONS CREATORS

const actions = {
  setMessages: (items: Array<MessageType>) =>
    ({
      type: "MESSAGES:SET_ITEMS",
      payload: items,
    } as const),

  addMessage: (message: MessageType) => {
    return { type: "MESSAGES:ADD_MESSAGE", payload: message } as const;
  },

  removeMessageById: (id: string) => {
    return { type: "MESSAGES:REMOVE_MESSAGE", payload: id } as const;
  },

  updateUnreadMessages: () => {
    return {
      type: "MESSAGES:UPDATE_UNREAD_MESSAGES",
    } as const;
  },

  setIsLoading: (bool: boolean) => {
    return { type: "MESSAGES:SET_IS_LOADING", payload: bool } as const;
  },
};

//-------------------------THUNK CREATORS

export const fetchMessages = (id: string): MessagesThunkType => async (
  dispatch
) => {
  dispatch(actions.setIsLoading(true));

  let items = await messagesApi.getAllByDialogId(id);
  dispatch(actions.setMessages(items));
  dispatch(actions.setIsLoading(false));
};
export default actions;
