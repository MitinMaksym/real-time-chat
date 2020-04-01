import { MessageType } from "./../../types/types";
import { AxiosResponse } from "axios";
import { axios } from "../../core";

export default {
  getAllByDialogId: (id: string): Promise<Array<MessageType>> => {
    return axios
      .get("messages?dialog=" + id)
      .then((res: AxiosResponse<Array<MessageType>>) => {
        return res.data;
      });
  },
  sendMessage: async (message: {
    text: string;
    currentDialogId: string;
    attachments: Array<string>;
  }): Promise<void> => {
    axios.post("messages", {
      text: message.text,
      attachments: message.attachments,
      dialog_id: message.currentDialogId
    });
  },
  removeMessageById: async (id: string) => {
    await axios.delete("messages?id=" + id);
  }
};
