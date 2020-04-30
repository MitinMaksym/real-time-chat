import { ActionsTypes } from "./../actions/attachments";
import { AttachmentServerType } from "./../../types/types";
import { AttachmentType } from "../../types/types";

export const SET_ATTACHMENTS = "ATTACHMENTS:SET_ATTACHMENTS";
export const REMOVE_ATTACHMENT = "ATTACHMENTS:REMOVE_ATTACHMENT";
export type InitialStateType = typeof initialState;

const initialState = {
  items: [] as Array<AttachmentServerType | AttachmentType>,
};

export default (
  state = initialState,
  action: ActionsTypes
): InitialStateType => {
  switch (action.type) {
    case "ATTACHMENTS:SET_ATTACHMENTS":
      return {
        ...state,
        items: action.payload,
      };
    case "ATTACHMENTS:REMOVE_ATTACHMENT":
      return {
        ...state,
        items: state.items.filter(
          (item: any) => item.uid !== action.payload.uid
        ),
      };
    default:
      return state;
  }
};
