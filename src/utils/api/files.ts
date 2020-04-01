import { AxiosResponse } from "axios";
import { AttachmentServerType } from "./../../types/types";
import { axios } from "../../core";

type fileResType = {
  status: string;
  file: AttachmentServerType;
};
export default {
  file: async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    let data: AxiosResponse<fileResType> = await axios.post("files", formData, {
      headers: {
        "content-type": "multipart/form-data"
      }
    });
    return data.data;
  }
};
