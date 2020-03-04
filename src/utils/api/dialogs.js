import { axios } from "../../core";

export default {
  getAll: () => {
    return axios.get("dialogs");
  },
  createDialog: async ({ partner, text }) => {
    let data = await axios.post("dialogs", { partner, text });
    return data.data;
  }
};
