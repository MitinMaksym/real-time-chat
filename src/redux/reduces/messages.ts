import { ActionsTypes } from "./../actions/messages";
import { MessageType } from "./../../types/types";
export const SET_ITEMS = "MESSAGES:SET_ITEMS";
export const SET_IS_LOADING = "MESSAGES:SET_IS_LOADING";
export const ADD_MESSAGE = "MESSAGES:ADD_MESSAGE";
export const REMOVE_MESSAGE = "MESSAGES:REMOVE_MESSAGE";
export const UPDATE_UNREAD_MESSAGES = "MESSAGES:UPDATE_UNREAD_MESSAGES";

const initialState = {
  items: [] as Array<MessageType>,
  isLoading: false,
};

export type InitialStateType = typeof initialState;

export default (
  state = initialState,
  action: ActionsTypes
): InitialStateType => {
  switch (action.type) {
    case "MESSAGES:SET_ITEMS":
      return {
        ...state,
        items: action.payload,
      };

    case "MESSAGES:SET_IS_LOADING":
      return {
        ...state,
        isLoading: action.payload,
      };
    case "MESSAGES:ADD_MESSAGE":
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case "MESSAGES:UPDATE_UNREAD_MESSAGES":
      let oldItems = [...state.items];
      let newItems = oldItems.map((item, idx) => {
        if (!item.readed) {
          let newItem = { ...item, readed: true };
          item = newItem;
        }
        return item;
      });
      return {
        ...state,
        items: newItems,
      };
    case "MESSAGES:REMOVE_MESSAGE":
      return {
        ...state,
        items: state.items.filter((message) => message._id !== action.payload),
      };

    default:
      return state;
  }
};
