import { useState } from "react";
import PropTypes from "prop-types";
import Visible from "./common/Visible";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

const User = ({ history }) => {
  const [isSignIn, setSignIn] = useState(true);

  return (
    <Visible
      when={isSignIn}
      otherwise={<SignUp setSignIn={setSignIn} history={history} />}
    >
      <SignIn setSignIn={setSignIn} history={history} />
    </Visible>
  );
};

User.propTypes = {
  history: PropTypes.func,
};

User.defaultProps = {
  history: () => {},
};

export default User;
