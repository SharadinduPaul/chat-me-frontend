export interface ChatModel {
  _id: string;
  createdAt: string;
  updatedAt: string;
  chatName: string;
  isGroupChat: boolean;
  groupAdmin?: string;
  latestMessage: MessageModel;
  readBy: UserModal[];
  users: UserModal[];
}

export interface MessageModel {
  _id: string;
  createdAt: string;
  updatedAt: string;
  chat: string;
  content: string;
  sender: UserModal;
}
export interface UserModal {
  _id?: string;
  createdAt?: string;
  updatedAt?: string;
  email?: string;
  emailVerificationHash?: string;
  isVerified?: boolean;
  name?: string;
  pic?: string;
  signInMethod?: string;
  token?: string;
}
