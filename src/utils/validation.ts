const emailRegex =
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const signUpValidation = (
  name: string,
  email: string,
  password: string
) => {
  if (!name) {
    return {
      errLocation: "name",
      errMessage: "Please enter you name",
    };
  }
  if (!email) {
    return {
      errLocation: "email",
      errMessage: "Please enter you email",
    };
  }
  if (!email.match(emailRegex)) {
    return {
      errLocation: "email",
      errMessage: "Please enter a valid email",
    };
  }
  if (!password) {
    return {
      errLocation: "password",
      errMessage: "Please enter you password",
    };
  }
};
export const loginValidation = (email: string, password: string) => {
  if (!email) {
    return {
      errLocation: "email",
      errMessage: "Please enter you email",
    };
  }
  if (!email.match(emailRegex)) {
    return {
      errLocation: "email",
      errMessage: "Please enter a valid email",
    };
  }
  if (!password) {
    return {
      errLocation: "password",
      errMessage: "Please enter you password",
    };
  }
};
