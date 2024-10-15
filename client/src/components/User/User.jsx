import { useState } from "react";
import PropTypes from "prop-types";
import Visible from "../common/Visible";
import SignIn from "../SignIn";
import SignUp from "../SignUp";

const User = ({ navigate, handleAddToken, handleAddUser }) => {
  const [isSignIn, setSignIn] = useState(true);

  return (
    <Visible
      when={isSignIn}
      otherwise={
        <SignUp
          setSignIn={setSignIn}
          navigate={navigate}
          handleAddUser={handleAddUser}
          handleAddToken={handleAddToken}
        />
      }
    >
      <SignIn
        setSignIn={setSignIn}
        navigate={navigate}
        handleAddUser={handleAddUser}
        handleAddToken={handleAddToken}
      />
    </Visible>
  );
};

User.propTypes = {
  navigate: PropTypes.func,
  handleAddUser: PropTypes.func,
  handleAddToken: PropTypes.func,
};

User.defaultProps = {
  navigate: () => {},
  handleAddUser: () => {},
  handleAddToken: () => {},
};

export default User;
