export const POST = async (api: string, variables: any) => {
  return await fetch(api, {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(variables),
  })
    .then((res) => res.json())
    .catch((err) => console.error("Error", err));
};
