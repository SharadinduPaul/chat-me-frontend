const base_url: string | undefined = process.env.REACT_APP_API_BASE;

export const Registration = base_url + "/api/user";
export const Login = base_url + "/api/user/login";
