import { UserContext } from "./context";
import { getUser } from "./handleUser";

export const POST = async (api: string, variables: any, token: string = "") => {
  return await fetch(api, {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    },
    body: JSON.stringify(variables)
  })
    .then((res) => res.json())
    .catch((err) => console.error("Error", err));
};

export const PUT = async (api: string, variables: any, token: string = "") => {
  return await fetch(api, {
    method: "put",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    },
    body: JSON.stringify(variables)
  })
    .then((res) => res.json())
    .catch((err) => console.error("Error", err));
};

export const GET = async (api: string, token: string = "") => {
  return await fetch(api, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    }
  })
    .then((res) => res.json())
    .catch((err) => console.error("Error", err));
};
