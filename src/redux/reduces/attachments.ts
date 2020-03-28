import { ActionsTypes } from "./../actions/attachments";
import { AttachmentServerType } from "./../../types/types";
import { AttachmentType } from "../../types/types";

export const SET_ATTACHMENTS = "ATTACHMENTS:SET_ATTACHMENTS";
export const REMOVE_ATTACHMENT = "ATTACHMENTS:REMOVE_ATTACHMENT";
export type InitialStateType = {
  items: Array<AttachmentServerType & AttachmentType>;
};
const initialState: InitialStateType = {
  items: []
};

export default (
  state = initialState,
  action: ActionsTypes
): InitialStateType => {
  switch (action.type) {
    case SET_ATTACHMENTS:
      return {
        ...state,
        items: action.payload
      };
    case REMOVE_ATTACHMENT:
      return {
        ...state,
        items: state.items.filter(
          (item: any) => item.uid !== action.payload.uid
        )
      };
    default:
      return state;
  }
};
