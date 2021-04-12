import React from "react";
import GoogleLogin from "react-google-login";

const clientId = process.env.GOOGLE_CLIENT_ID;

const Login = () => {
  const onSuccess = (res) => {
    console.log(res);
  };

  const onFailure = (res) => {
    console.log(res);
  };

  return (
    <div>
      <GoogleLogin
        clientId={clientId}
        buttonText='Login'
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
};

export default Login;
