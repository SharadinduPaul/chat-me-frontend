const base_url: string | undefined = process.env.REACT_APP_PROD_API_BASE;

//User APIs
export const Registration = base_url + "/api/user";
export const Login = base_url + "/api/user/login";
export const Search = base_url + "/api/user?";

//Chat APIs
export const Chats = base_url + "/api/chat";
export const CreateChat = base_url + "/api/chat";
export const CreateGroup = base_url + "/api/chat/group";
export const RenameGroup = base_url + "/api/chat/rename";
export const DeleteChat = base_url + "/api/chat/delete";
export const AddUserToGroup = base_url + "/api/chat/group-add";
export const RemoveUserFromGroup = base_url + "/api/chat/group-remove";

//Messages APIs
export const AllMessages = base_url + "/api/message/";
export const SendMessage = base_url + "/api/message";
