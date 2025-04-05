const intialValue = { user: {} };

const userReducer = (state = intialValue, action) => {
  switch (action.type) {
    case "ADD_USER":
      return {
        ...state,
        user: action.payload,
      };
    case "DELETE_USER":
      return { ...state, user: {} };
    case "ADD_TOKEN":
      return {
        ...state,
        token: action.payload,
      };
    case "DELETE_TOKEN":
      return { ...state, token: "" };
    default:
      return state;
  }
};

export default userReducer;
