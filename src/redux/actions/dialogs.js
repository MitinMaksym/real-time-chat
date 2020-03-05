import { dialogsApi } from "../../utils/api";
import { openNotification } from "../../utils/helpers";
import {
  SET_CURRENT_DIALOG,
  SET_ITEMS,
  UPDATE_DIALOG,
  SET_IS_LOADING
} from "../reduces/dialogs";
import { REMOVE_MESSAGE } from "../reduces/messages";

const actions = {
  setCurrentDialog: id => ({ type: SET_CURRENT_DIALOG, payload: id }),
  setItems: items => ({ type: SET_ITEMS, payload: items }),
  fetchDialogs: () => async dispatch => {
    dispatch(actions.setIsLoading(true));
    let data = await dialogsApi.getAll();
    dispatch(actions.setItems(data.data));
    dispatch(actions.setIsLoading(false));
  },
  updateDialog: dialog => {
    return { type: UPDATE_DIALOG, payload: dialog };
  },
  updateDialogs: ({ operation = "", item }) => (dispatch, getState) => {
    let state = getState();

    if (operation === "SERVER:CREATE_DIALOG") {
      let oldDialogs = state.dialogs.items;
      let userId = state.user.data.user._id;
      let author = item.author._id;
      let partner = item.partner._id;
      let check = userId === partner || userId === author;
      if (check) {
        dispatch(actions.setItems([...oldDialogs, item]));
      }
    } else if (
      operation === "SERVER:NEW_MESSAGE" ||
      operation === "SERVER:DELETE_MESSAGE"
    ) {
      let dialogs = state.dialogs.items;

      let check = dialogs.some(dialog => {
        return dialog._id === item.dialog._id;
      });
      if (check) {
        dispatch(actions.updateDialog(item.dialog));
        if (operation === "SERVER:DELETE_MESSAGE") {
          dispatch({ type: REMOVE_MESSAGE, payload: item._id });
        }
      }
    }
  },
  createDialog: ({ partner, text }) => async dispatch => {
    try {
      let result = await dialogsApi.createDialog({
        partner,
        text
      });
      return result;
    } catch (err) {
      if (err.response.status === 403) {
        openNotification({
          type: "error",
          message: "Такой диалог уже существует"
        });
      } else {
        openNotification({
          type: "error",
          message: "Ошибка"
        });
      }
    }
  },
  setIsLoading: bool => {
    return { type: SET_IS_LOADING, payload: bool };
  }
};

export default actions;
