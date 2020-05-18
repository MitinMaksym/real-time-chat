import { DialogType } from "./../../types/types";
import { axios } from "../../core";

type CreateDialogResType = {
  dialog: DialogType;
  status: string;
};

export default {
  getAll: () =>
    axios.get<Array<DialogType>>("dialogs").then((res) => {
      return res.data;
    }),

  createDialog: async (data: { partner: string; text: string }) => {
    let response = await axios.post<CreateDialogResType>("dialogs", {
      partner: data.partner,
      text: data.text,
    });
    return response.data;
  },
};
