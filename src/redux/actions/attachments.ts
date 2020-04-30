import { InferActionsTypes } from "./../store";
import { AttachmentType } from "../../types/types";

export type ActionsTypes = InferActionsTypes<typeof actions>;
const actions = {
  setAttachments: (files: Array<AttachmentType>) => {
    return {
      type: "ATTACHMENTS:SET_ATTACHMENTS",
      payload: files,
    } as const;
  },
  removeAttachment: (file: AttachmentType) => {
    return {
      type: "ATTACHMENTS:REMOVE_ATTACHMENT",
      payload: file,
    } as const;
  },
};

export default actions;
