import { UserDataType } from "./../../types/types";
import { AxiosResponse } from "axios";
import { axios } from "../../core";

type SignUserInResType = {
  status: string;
  token: string;
};

type GetUserInfoResType = {
  user: UserDataType;
  status: string;
};

type SignUserUpResType = {
  result: UserDataType;
  status: "succes" | "error";
};

type FindUsersResType = {
  users: Array<UserDataType>;
  status: string;
};
export default {
  signUserIn: (postData: { email: string; password: string }) => {
    return axios
      .post("user/login", postData)
      .then((res: AxiosResponse<SignUserInResType>) => {
        return res.data;
      });
  },

  getUserInfo: () => {
    return axios
      .get("user/me")
      .then((res: AxiosResponse<GetUserInfoResType>) => {
        return res.data;
      });
  },
  signUserUp: (postData: {
    fullname: string;
    email: string;
    password: string;
  }) => {
    return axios
      .post("user/registration", postData)
      .then((res: AxiosResponse<SignUserUpResType>) => {
        return res.data;
      });
  },
  verifyHash: async (hash: string) => {
    let data: AxiosResponse<{
      message: string;
      status: string;
    }> = await axios.get(`user/verify?hash=${hash}`);
    return data.data;
  },
  findUsers: async (query: string) => {
    let data: AxiosResponse<FindUsersResType> = await axios.get(
      `user/find?query=${query}`
    );
    return data.data;
  }
};
