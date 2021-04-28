import { React, useState, useEffect } from "react";
import Favorites from "../favorites/Favorites";
import axios from "axios";

const Profile = ({ currentUser, getUser, yee, deleteFav, displayFav }) => {
  const { displayName, email, picture, favorites } = currentUser;

  useEffect(() => {
    getUser();
    displayFav(favorites);
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <img src={picture} alt='' style={{ width: "150px" }} />
      <div>{displayName}</div>
      <div>{email}</div>

      <Favorites yee={yee} deleteFav={deleteFav} favorites={favorites} />
    </div>
  );
};

export default Profile;
