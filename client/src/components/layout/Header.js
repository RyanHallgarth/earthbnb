import React from "react";
import "../../Header.css";
import { Avatar } from "@material-ui/core";
import Login from "../Login";

const Header = () => {
  return (
    <div className='header'>
      <img
        className='header-icon'
        src='https://i.ibb.co/zX4YzNS/header-logo-txt2.png'
        alt=''
      />

      <div className='header-right'>
        <Login />
        <Avatar style={{ marginLeft: "10px" }} />
      </div>
    </div>
  );
};

export default Header;
