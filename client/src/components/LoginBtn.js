import React from "react";
import axios from "axios";

const LoginBtn = () => {
  // const login = async () => {
  //   console.log("login fired");
  //   const res = await axios.get("api/auth/login");
  //   return res;
  // };

  // return (
  //   <button renderAs="button" onclick={() => login()}>
  //     <span>Login with Google</span>
  //   </button>
  // );

  async function login() {
    try {
      const response = await axios.get("/api/auth/login");
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

  async function logout() {
    try {
      const response = await axios.get("/api/auth/logout");
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

  async function user() {
    try {
      const response = await axios.get("/api/auth/user");
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <button onClick={login}>login</button>
      <button onClick={logout}>logout</button>
      <button onClick={user}>user</button>
    </div>
  );
};

export default LoginBtn;
