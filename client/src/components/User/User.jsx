import { useState } from "react";
import PropTypes from "prop-types";
import Visible from "../common/Visible";
import SignIn from "../SignIn";
import SignUp from "../SignUp";

const User = ({ navigate, handleAddUser }) => {
  const [isSignIn, setSignIn] = useState(true);

  return (
    <Visible
      when={isSignIn}
      otherwise={
        <SignUp
          setSignIn={setSignIn}
          navigate={navigate}
          handleAddUser={handleAddUser}
        />
      }
    >
      <SignIn
        setSignIn={setSignIn}
        navigate={navigate}
        handleAddUser={handleAddUser}
      />
    </Visible>
  );
};

User.propTypes = {
  navigate: PropTypes.func,
  handleAddUser: PropTypes.func,
};

User.defaultProps = {
  navigate: () => {},
  handleAddUser: () => {},
};

export default User;
