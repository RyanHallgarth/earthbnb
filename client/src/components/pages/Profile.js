import { React } from "react";
import axios from "axios";

const Profile = ({ currentUser }) => {
  const { displayName, email, picture, favorites } = currentUser;

  const callArray = favorites.map(
    (favorite) => `/api/v1/listings/listing/${favorite}`
  );

  const buildObj = () => {
    const res = callArray.map((call) =>
      axios.get(call).then((res) => {
        console.log(res.data);
      })
    );
  };

  return (
    <div>
      <img src={picture} alt='' style={{ width: "150px" }} />
      <div>{displayName}</div>
      <div>{email}</div>

      {favorites}
    </div>
  );
};

export default Profile;
