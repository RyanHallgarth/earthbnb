import React from "react";
import "../../Header.css";
import { Avatar, Button } from "@material-ui/core";
import LoginBtn from "../LoginBtn";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { useHistory } from "react-router-dom";
import { withRouter } from "react-router-dom";

const Header = ({ currentUser, logOut }) => {
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const profileClose = () => {
    setAnchorEl(null);
    history.push(`/profile/${currentUser.email}`);
  };

  const logOutClose = () => {
    setAnchorEl(null);
    logOut();
  };

  return (
    <div className="header">
      <a href="/">
        <img
          className="header-icon"
          src="https://i.ibb.co/zX4YzNS/header-logo-txt2.png"
          alt=""
        />
      </a>
      <div className="header-right">
        <div className="log">{!currentUser.picture && <LoginBtn />}</div>
        <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <Avatar src={currentUser.picture} className="avatar" />
        </Button>

        {currentUser.picture && (
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={profileClose}>Profile</MenuItem>

            <MenuItem onClick={logOutClose}>Logout</MenuItem>
          </Menu>
        )}
      </div>
    </div>
  );
};

export default withRouter(Header);
