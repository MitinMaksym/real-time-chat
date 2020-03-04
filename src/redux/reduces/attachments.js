export const SET_ATTACHMENTS = "ATTACHMENTS:SET_ATTACHMENTS";
export const REMOVE_ATTACHMENT = "ATTACHMENTS:REMOVE_ATTACHMENT";

const initialState = {
  items: []
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_ATTACHMENTS:
      return {
        ...state,
        items: payload
      };
    case REMOVE_ATTACHMENT:
      return {
        ...state,
        items: state.items.filter(item => item.uid !== payload.uid)
      };
    default:
      return state;
  }
};
