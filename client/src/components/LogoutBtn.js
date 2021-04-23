import React from "react";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

const LogoutBtn = ({ logOut }) => {
  return (
    <div style={style}>
      <ExitToAppIcon
        onClick={logOut}
        style={{ cursor: "pointer", color: "gray" }}
      />
      Logout
    </div>
  );
};

const style = {
  display: "flex",
  flexDirection: "row",
};

export default LogoutBtn;
