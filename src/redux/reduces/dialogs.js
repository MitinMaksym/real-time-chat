export const SET_ITEMS = "DIALOGS:SET_ITEMS";
export const SET_CURRENT_DIALOG = "DIALOGS:SET_CURRENT_DIALOG";
export const UPDATE_DIALOG = "DIALOGS:UPDATE_DIALOG";
export const SET_IS_LOADING = "DIALOGS:SET_IS_LOADING";

const initialState = {
  items: [],
  currentDialogId: null,
  isLoading: false
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_ITEMS:
      return {
        ...state,
        items: payload
      };

    case SET_CURRENT_DIALOG:
      return {
        ...state,
        currentDialogId: payload
      };
    case UPDATE_DIALOG:
      let newItems = state.items.map(item => {
        if (item._id === payload._id) {
          item = payload;
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
        isLoading: payload
      };

    default:
      return state;
  }
};
