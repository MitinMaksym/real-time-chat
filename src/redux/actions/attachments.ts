import { AttachmentServerType } from "./../../types/types";
import { AppStateType } from "./../reduces/index";
import { ThunkAction } from "redux-thunk";
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

type UploadResponseDataType = {
  status: string;
  file: AttachmentServerType;
};

export type ActionsTypes =
  | SetAttachmentsActionType
  | RemoveAttachmentActionType;

const actions = {
  setAttachments: (files: Array<AttachmentType>): SetAttachmentsActionType => {
    return {
      type: SET_ATTACHMENTS,
      payload: files,
    };
  },
  removeAttachment: (file: AttachmentType): RemoveAttachmentActionType => {
    return {
      type: REMOVE_ATTACHMENT,
      payload: file,
    };
  },

  upload: async (file: File): Promise<UploadResponseDataType> => {
    let data: UploadResponseDataType = await filesApi.file(file);
    return data;
  },
};

export default actions;
