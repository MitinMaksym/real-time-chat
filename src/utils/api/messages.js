import { axios } from "../../core";

export default {
  getAllByDialogId: id => {
    return axios.get("messages?dialog=" + id);
  },
  sendMessage: ({ text, currentDialogId, attachments }) => {
    return axios.post("messages", {
      text,
      attachments,
      dialog_id: currentDialogId
    });
  },
  removeMessageById: async id => {
    let data = await axios.delete("messages?id=" + id);
    return data.data;
  }
};
