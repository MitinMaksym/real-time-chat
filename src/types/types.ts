export type UserDataType = {
  _id: string;
  confirmed: boolean;
  last_seen: string;
  email: string;
  fullname: string;
  createdAt: string;
  updatedAt: string;
  confirm_hash: string;
  __v: number;
  isOnline: boolean;
  id: string;
};
export type DialogType = {
  _id: string;
  author: UserDataType;
  partner: UserDataType;
  createdAt: string;
  updatedAt: string;
  __v: string;
  lastMessage: string;
};

export type MessageType = {
  readed: boolean;
  attachments: Array<string>;
  _id: string;
  text: string;
  dialog: DialogType;
  user: UserDataType;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type AttachmentType = {
  uid: string;
  name: string;
  status: string;
  url: string;
};
