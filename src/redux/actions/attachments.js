import { filesApi } from "../../utils/api";
import { SET_ATTACHMENTS, REMOVE_ATTACHMENT } from "../reduces/attachments";

const actions = {
  setAttachments: files => {
    return {
      type: SET_ATTACHMENTS,
      payload: files
    };
  },
  removeAttachment: file => {
    return {
      type: REMOVE_ATTACHMENT,
      payload: file
    };
  },
  upload: file => async dispatch => {
    let data = await filesApi.file(file);
    if (data && data.status === "success") {
      return data.file;
    }
  }
};

export default actions;
