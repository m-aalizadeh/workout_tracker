import { useState } from "react";
import PropTypes from "prop-types";
import Visible from "../common/Visible";
import SignIn from "../SignIn";
import SignUp from "../SignUp";

const User = ({ history, handleAddUser }) => {
  const [isSignIn, setSignIn] = useState(true);

  return (
    <Visible
      when={isSignIn}
      otherwise={
        <SignUp
          setSignIn={setSignIn}
          history={history}
          handleAddUser={handleAddUser}
        />
      }
    >
      <SignIn
        setSignIn={setSignIn}
        history={history}
        handleAddUser={handleAddUser}
      />
    </Visible>
  );
};

User.propTypes = {
  history: PropTypes.func,
  handleAddUser: PropTypes.func,
};

User.defaultProps = {
  history: () => {},
  handleAddUser: () => {},
};

export default User;
