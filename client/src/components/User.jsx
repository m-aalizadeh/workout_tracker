import { useState } from "react";
import Visible from "./common/Visible";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

const User = () => {
  const [isSignIn, setSignIn] = useState(true);

  return (
    <Visible when={isSignIn} otherwise={<SignUp setSignIn={setSignIn} />}>
      <SignIn setSignIn={setSignIn} />
    </Visible>
  );
};

export default User;
