import { axios } from "../../core";

export default {
  signUserIn: postData => {
    return axios.post("user/login", postData);
  },

  getUserInfo: () => {
    return axios.get("user/me");
  },
  signUserUp: postData => {
    return axios.post("user/registration", postData);
  },
  verifyHash: async hash => {
    let data = await axios.get(`user/verify?hash=${hash}`);
    return data;
  },
  findUsers: async query => {
    let data = await axios.get(`user/find?query=${query}`);
    return data.data;
  }
};
