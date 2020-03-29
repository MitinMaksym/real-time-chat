import { AxiosResponse } from "axios";
import { DialogType } from "./../../types/types";
import { CreateDialogDataActionType } from "./../../redux/actions/dialogs";
import { axios } from "../../core";

type CreateDialogResponseType = {
  dialog: DialogType;
  status: string;
};

type getAllDialogsResponseType = Array<DialogType>;

export default {
  getAll: () =>
    axios
      .get("dialogs")
      .then((res: AxiosResponse<getAllDialogsResponseType>) => {
        return res.data;
      }),

  createDialog: async (data: CreateDialogDataActionType) => {
    let response: AxiosResponse<CreateDialogResponseType> = await axios.post(
      "dialogs",
      {
        partner: data.partner,
        text: data.text
      }
    );
    return response.data;
  }
};
