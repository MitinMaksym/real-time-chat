import { DialogType } from "./../../types/types";
import { ActionsTypes } from "./../actions/dialogs";

const initialState = {
  items: [] as Array<DialogType>,
  currentDialogId: "",
  isLoading: false,
};

export type InitialStateType = typeof initialState;

export default (
  state = initialState,
  action: ActionsTypes
): InitialStateType => {
  switch (action.type) {
    case "DIALOGS:SET_ITEMS":
      return {
        ...state,
        items: action.payload,
      };
    case "DIALOGS:ADD_NEW_DIALOG":
      return {
        ...state,
        items: [...state.items, action.payload],
      };

    case "DIALOGS:SET_CURRENT_DIALOG":
      return {
        ...state,
        currentDialogId: action.payload,
      };
    case "DIALOGS:UPDATE_DIALOG":
      let newItems: Array<DialogType> = state.items.map((item) => {
        if (item._id === action.payload._id) {
          item = action.payload;
        }
        return item;
      });
      return {
        ...state,
        items: newItems,
      };

    case "DIALOGS:SET_IS_LOADING":
      return {
        ...state,
        isLoading: action.payload,
      };

    default:
      return state;
  }
};
