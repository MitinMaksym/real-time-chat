import { DialogType } from "./../../types/types";
import { dialogsApi } from "../../utils/api";
import { InferActionsTypes } from "../store";
import { BaseThunkType } from "../../types/types";
export type ActionsTypes = InferActionsTypes<typeof actions>;

type DialogsThunkType = BaseThunkType<ActionsTypes>;

const actions = {
  setCurrentDialog: (id: string) =>
    ({
      type: "DIALOGS:SET_CURRENT_DIALOG",
      payload: id,
    } as const),
  setItems: (items: Array<DialogType>) =>
    ({
      type: "DIALOGS:SET_ITEMS",
      payload: items,
    } as const),

  updateDialog: (dialog: DialogType) => {
    return { type: "DIALOGS:UPDATE_DIALOG", payload: dialog } as const;
  },
  addNewDialog: (dialog: DialogType) => {
    return { type: "DIALOGS:ADD_NEW_DIALOG", payload: dialog } as const;
  },

  setIsLoading: (bool: boolean) => {
    return { type: "DIALOGS:SET_IS_LOADING", payload: bool } as const;
  },
};
//-------------------------THUNK CREATORS
export const fetchDialogs = (): DialogsThunkType => async (dispatch) => {
  dispatch(actions.setIsLoading(true));
  let dialogs = await dialogsApi.getAll();
  dispatch(actions.setItems(dialogs));
  dispatch(actions.setIsLoading(false));
};
export default actions;
