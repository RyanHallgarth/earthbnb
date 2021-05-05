import { React, useEffect } from "react";
import Favorites from "../favorites/Favorites";
import "../../Profile.css";

const Profile = ({
  currentUser,
  getUser,
  favorites,
  deleteFav,
  displayFav,
  favIdArr,
}) => {
  const { displayName, email, picture, firstName } = currentUser;

  useEffect(() => {
    getUser();
    displayFav(favIdArr);
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <div className='user-container'>
        <h1>Welcome, {firstName}!</h1>
        <img src={picture} alt='' style={{ width: "150px" }} />
        <div>{displayName}</div>
        <div>{email}</div>
      </div>
      <Favorites
        favorites={favorites}
        deleteFav={deleteFav}
        favIdArr={favIdArr}
      />
    </div>
  );
};

export default Profile;
