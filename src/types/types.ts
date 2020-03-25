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
  avatar?: string;
};
export type DialogType = {
  _id: string;
  author: UserDataType;
  partner: UserDataType;
  createdAt: string;
  updatedAt: string;
  __v: string;
  lastMessage: MessageType;
};

export type AttachmentType = {
  uid: string;
  name: string;
  status: string;
  url: string;
};

export type AttachmentServerType = {
  _id: string;
  filename: string;
  size: number;
  ext: string;
  url: string;
  user: string;
  createdAt: string;
  updatedAt: string;
};

export type MessageType = {
  readed: boolean;
  attachments?: Array<AttachmentServerType>;
  _id: string;
  text: string;
  dialog: DialogType;
  user: UserDataType;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
