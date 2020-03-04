import { axios } from "../../core";

export default {
  file: async file => {
    const formData = new FormData();
    formData.append("file", file);
    let data = await axios.post("files", formData, {
      headers: {
        "content-type": "multipart/form-data"
      }
    });
    return data.data;
  }
};
// fileUpload(file){
//   const url = 'http://example.com/file-upload';
//   const formData = new FormData();

//   formData.append('file',file)
//   const config = {
