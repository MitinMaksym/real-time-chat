import { filesApi } from "../../utils/api";
import { SET_ATTACHMENTS, REMOVE_ATTACHMENT } from "../reduces/attachments";
import { AttachmentType } from "../../types/types";

type SetAttachmentsActionType = {
  type: typeof SET_ATTACHMENTS;
  payload: Array<AttachmentType>;
};

type RemoveAttachmentActionType = {
  type: typeof REMOVE_ATTACHMENT;
  payload: AttachmentType;
};

const actions = {
  setAttachments: (files: Array<AttachmentType>): SetAttachmentsActionType => {
    return {
      type: SET_ATTACHMENTS,
      payload: files
    };
  },
  removeAttachment: (file: AttachmentType): RemoveAttachmentActionType => {
    return {
      type: REMOVE_ATTACHMENT,
      payload: file
    };
  },
  upload: (file: any) => async (dispatch: any) => {
    let data = await filesApi.file(file);
    if (data && data.status === "success") {
      return data.file;
    }
  }
};

export default actions;
