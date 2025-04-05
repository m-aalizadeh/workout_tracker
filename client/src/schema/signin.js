const jsonSchema = {
  title: "Sign Up",
  type: "object",
  required: ["userName", "email", "passwordI", "passwordII"],
  properties: {
    userName: {
      id: "userName",
      type: "string",
      title: "Username",
      pattern: "[a-zA-Z]",
      placeHolder: "Username",
    },
    email: {
      id: "email",
      type: "email",
      title: "Email",
      placeHolder: "Email",
    },
    passwordI: {
      id: "passwordI",
      type: "password",
      title: "Password",
      placeHolder: "Password",
    },
    passwordII: {
      id: "passwordII",
      type: "password",
      title: "Confirmed Password",
      placeHolder: "password",
    },
  },
};
