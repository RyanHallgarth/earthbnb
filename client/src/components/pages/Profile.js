import { React } from "react";

const Profile = ({ currentUser, logOut }) => {
  console.log(currentUser.displayName);

  const { displayName, email, picture, favorites } = currentUser;
  return (
    <div>
      <img src={picture} alt='' style={{ width: "150px" }} />
      <div>{displayName}</div>
      <div>{email}</div>
      <div className='card'>{"favorites: " + favorites}</div>
    </div>
  );
};

export default Profile;
