const addUser = (data) => ({
  type: "ADD_USER",
  payload: data,
});

const deleteUser = () => ({ type: "DELETE_USER" });

const addToken = (data) => ({
  type: "ADD_TOKEN",
  payload: data,
});

const deleteToken = () => ({ type: "DELETE_TOKEN" });

export const handleAddUser = (payload) => (dispatch) => {
  dispatch(addUser(payload));
};

export const handleDeleteUser = () => (dispatch) => {
  dispatch(deleteUser());
};

export const handleAddToken = (payload) => (dispatch) => {
  dispatch(addToken(payload));
};

export const handleDeleteToken = () => (dispatch) => {
  dispatch(deleteToken());
};
