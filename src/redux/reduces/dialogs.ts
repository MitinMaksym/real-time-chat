import { DialogType } from "../../types/types";

export const SET_ITEMS = "DIALOGS:SET_ITEMS";
export const SET_CURRENT_DIALOG = "DIALOGS:SET_CURRENT_DIALOG";
export const UPDATE_DIALOG = "DIALOGS:UPDATE_DIALOG";
export const SET_IS_LOADING = "DIALOGS:SET_IS_LOADING";

export type InitialStateType = {
  items: Array<DialogType>;
  currentDialogId: string;
  isLoading: boolean;
};
const initialState: InitialStateType = {
  items: [],
  currentDialogId: "",
  isLoading: false
};

export default (state = initialState, action: any): InitialStateType => {
  switch (action.type) {
    case SET_ITEMS:
      return {
        ...state,
        items: action.payload
      };

    case SET_CURRENT_DIALOG:
      return {
        ...state,
        currentDialogId: action.payload
      };
    case UPDATE_DIALOG:
      let newItems: Array<DialogType> = state.items.map(item => {
        if (item._id === action.payload._id) {
          item = action.payload;
        }
        return item;
      });
      return {
        ...state,
        items: newItems
      };

    case SET_IS_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };

    default:
      return state;
  }
};
