import { React, useState, useEffect } from "react";
import Favorites from "../favorites/Favorites";

const Profile = ({
  currentUser,
  getUser,
  favorites,
  deleteFav,
  displayFav,
  favIdArr,
}) => {
  const { displayName, email, picture } = currentUser;

  useEffect(() => {
    getUser();
    displayFav(favIdArr);
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <img src={picture} alt='' style={{ width: "150px" }} />
      <div>{displayName}</div>
      <div>{email}</div>

      <Favorites
        favorites={favorites}
        deleteFav={deleteFav}
        favIdArr={favIdArr}
      />
    </div>
  );
};

export default Profile;
