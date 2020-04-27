import { RemoveMessageActionType } from "./messages";
import { AppStateType } from "./../reduces/index";
import { DialogType, MessageType } from "./../../types/types";
import { dialogsApi } from "../../utils/api";
import {
  SET_CURRENT_DIALOG,
  SET_ITEMS,
  UPDATE_DIALOG,
  SET_IS_LOADING,
  ADD_NEW_DIALOG,
} from "../reduces/dialogs";
import { ThunkAction } from "redux-thunk";

export type SetCurrentDialogActionType = {
  type: typeof SET_CURRENT_DIALOG;
  payload: string;
};

export type SetItemsActionType = {
  type: typeof SET_ITEMS;
  payload: Array<DialogType>;
};

export type UpdateDialogActionType = {
  type: typeof UPDATE_DIALOG;
  payload: DialogType;
};

export type CreateDialogDataActionType = {
  partner: string;
  text: string;
};

type SetIsLoadingActionType = {
  type: typeof SET_IS_LOADING;
  payload: boolean;
};
export type AddNewDialogType = {
  type: typeof ADD_NEW_DIALOG;
  payload: DialogType;
};

export type ActionsTypes =
  | SetCurrentDialogActionType
  | SetItemsActionType
  | UpdateDialogActionType
  | SetIsLoadingActionType
  | RemoveMessageActionType
  | AddNewDialogType;

type DialogsThunkType = ThunkAction<
  Promise<void>,
  AppStateType,
  unknown,
  ActionsTypes
>;

const actions = {
  setCurrentDialog: (id: string): SetCurrentDialogActionType => ({
    type: SET_CURRENT_DIALOG,
    payload: id,
  }),
  setItems: (items: Array<DialogType>): SetItemsActionType => ({
    type: SET_ITEMS,
    payload: items,
  }),
  fetchDialogs: (): DialogsThunkType => async (dispatch) => {
    dispatch(actions.setIsLoading(true));
    let dialogs = await dialogsApi.getAll();
    dispatch(actions.setItems(dialogs));
    dispatch(actions.setIsLoading(false));
  },
  updateDialog: (dialog: DialogType): UpdateDialogActionType => {
    console.log("update");
    return { type: UPDATE_DIALOG, payload: dialog };
  },
  addNewDialog: (dialog: DialogType): AddNewDialogType => {
    return { type: ADD_NEW_DIALOG, payload: dialog };
  },

  setIsLoading: (bool: boolean): SetIsLoadingActionType => {
    return { type: SET_IS_LOADING, payload: bool };
  },
};

export default actions;
