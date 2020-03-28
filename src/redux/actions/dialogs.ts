import { RemoveMessageActionType } from "./messages";
import { Dispatch } from "redux";
import { AppStateType } from "./../reduces/index";
import { DialogType, MessageType } from "./../../types/types";
import { dialogsApi } from "../../utils/api";
import { openNotification } from "../../utils/helpers";
import {
  SET_CURRENT_DIALOG,
  SET_ITEMS,
  UPDATE_DIALOG,
  SET_IS_LOADING
} from "../reduces/dialogs";
import { REMOVE_MESSAGE } from "../reduces/messages";
import { ThunkAction } from "redux-thunk";
import { Action } from "redux";

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

export type ActionsTypes =
  | SetCurrentDialogActionType
  | SetItemsActionType
  | UpdateDialogActionType
  | SetIsLoadingActionType
  | RemoveMessageActionType;

type DialogsThunkType = ThunkAction<
  Promise<void>,
  AppStateType,
  unknown,
  ActionsTypes
>;

const actions = {
  setCurrentDialog: (id: string): SetCurrentDialogActionType => ({
    type: SET_CURRENT_DIALOG,
    payload: id
  }),
  setItems: (items: Array<DialogType>): SetItemsActionType => ({
    type: SET_ITEMS,
    payload: items
  }),
  fetchDialogs: (): DialogsThunkType => async dispatch => {
    dispatch(actions.setIsLoading(true));
    let data = await dialogsApi.getAll();
    dispatch(actions.setItems(data.data));
    dispatch(actions.setIsLoading(false));
  },
  updateDialog: (dialog: DialogType): UpdateDialogActionType => {
    return { type: UPDATE_DIALOG, payload: dialog };
  },
  updateDialogs: (data: {
    item: DialogType & MessageType;
    operation: string;
  }) => async (
    dispatch: Dispatch<ActionsTypes>,
    getState: () => AppStateType
  ) => {
    let state = getState();

    if (data.operation === "SERVER:CREATE_DIALOG") {
      let oldDialogs = state.dialogs.items;
      let userId: string = state.user.data ? state.user.data.user._id : "";
      let authorId: string = data.item.author._id;
      let partner: string = data.item.partner._id;
      let check: boolean = userId === partner || userId === authorId;
      if (check) {
        dispatch(actions.setItems([...oldDialogs, data.item]));
      }
    } else if (
      data.operation === "SERVER:NEW_MESSAGE" ||
      data.operation === "SERVER:DELETE_MESSAGE"
    ) {
      let dialogs = state.dialogs.items;

      let check = dialogs.some((dialog: DialogType) => {
        return dialog._id === data.item.dialog._id;
      });
      if (check) {
        dispatch(actions.updateDialog(data.item.dialog));
        if (data.operation === "SERVER:DELETE_MESSAGE") {
          dispatch({ type: REMOVE_MESSAGE, payload: data.item._id });
        }
      }
    }
  },
  createDialog: (data: CreateDialogDataActionType): DialogsThunkType => async (
    dispatch
  ): Promise<any> => {
    try {
      let result: {
        dialog: DialogType;
        status: string;
      } = await dialogsApi.createDialog({
        partner: data.partner,
        text: data.text
      });
      return result;
    } catch (err) {
      if (err.response.status === 403) {
        openNotification({
          type: "error",
          message: "Такой диалог уже существует",
          description: "",
          duration: 1
        });
      } else {
        openNotification({
          type: "error",
          message: "Ошибка",
          description: "",
          duration: 1
        });
      }
    }
  },
  setIsLoading: (bool: boolean): SetIsLoadingActionType => {
    return { type: SET_IS_LOADING, payload: bool };
  }
};

export default actions;
