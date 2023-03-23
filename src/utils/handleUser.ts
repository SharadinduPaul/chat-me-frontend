const storageKey = "chatmeUserData";

export const saveUser = (user: any) => {
  localStorage.setItem(storageKey, JSON.stringify(user));
};
export const getUser = () => {
  const user = localStorage.getItem(storageKey);
  return JSON.parse(user ?? "{}");
};
export const removeUser = () => {
  localStorage.removeItem(storageKey);
};
