import React from "react";
import axios from "axios";

const LoginBtn = () => {
  const googleLogin = async () => {
    const res = await axios.get("http://localhost:8080/api/auth/login");

    console.log(res);
  };

  return <button onClick={googleLogin}>Login with Google</button>;
};

export default LoginBtn;
