export const SET_ITEMS = "MESSAGES:SET_ITEMS";
export const SET_IS_LOADING = "MESSAGES:SET_IS_LOADING";
export const ADD_MESSAGE = "MESSAGES:ADD_MESSAGE";
export const REMOVE_MESSAGE = "MESSAGES:REMOVE_MESSAGE";

const initialState = {
  items: [],
  isLoading: false
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_ITEMS:
      return {
        ...state,
        items: payload
      };

    case SET_IS_LOADING:
      return {
        ...state,
        isLoading: payload
      };
    case ADD_MESSAGE:
      return {
        ...state,
        items: [...state.items, payload]
      };
    case REMOVE_MESSAGE:
      return {
        ...state,
        items: state.items.filter(message => message._id !== payload)
      };

    default:
      return state;
  }
};
