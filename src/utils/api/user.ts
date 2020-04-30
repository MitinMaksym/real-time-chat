import { UserDataType } from "./../../types/types";
import { axios } from "../../core";

type StatusType = "success" | "error";

type SignUserInResType = { token: string; status: StatusType };

export type GetUserInfoResType = {
  user: UserDataType;
  status: StatusType;
};

type SignUserUpResType = {
  result: UserDataType;
  status: StatusType;
};

type FindUsersResType = {
  users: Array<UserDataType>;
  status: StatusType;
};
export default {
  signUserIn: async (postData: { email: string; password: string }) => {
    let response = await axios.post<SignUserInResType>("user/login", postData);
    return response.data;
  },

  getUserInfo: async () => {
    let response = await axios.get<GetUserInfoResType>("user/me");

    return response.data;
  },
  signUserUp: async (postData: {
    fullname: string;
    email: string;
    password: string;
  }) => {
    let response = await axios.post<SignUserUpResType>(
      "user/registration",
      postData
    );
    return response.data;
  },
  verifyHash: async (hash: string) => {
    let data = await axios.get<{ message: string; status: StatusType }>(
      `user/verify?hash=${hash}`
    );
    return data.data;
  },
  findUsers: async (query: string) => {
    let data = await axios.get<FindUsersResType>(`user/find?query=${query}`);
    return data.data;
  },
};
