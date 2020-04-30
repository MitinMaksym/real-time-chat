import { AxiosResponse } from "axios";
import { AttachmentServerType } from "./../../types/types";
import { axios } from "../../core";

type FileResType = {
  status: string;
  file: AttachmentServerType;
};
export default {
  upload: async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    let data = await axios.post<FileResType>("files", formData, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    return data.data;
  },
};
