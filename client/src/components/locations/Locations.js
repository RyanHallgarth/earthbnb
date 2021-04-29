import { React } from "react";
import LocationItem from "./LocationItem";
import Spinner from "../layout/Spinner";

const Locations = ({
  locations,
  loading,
  addFav,
  deleteFav,
  currentUser,
  checked,
}) => {
  if (loading) {
    return <Spinner />;
  } else {
    return (
      <div>
        {locations.map((location) => (
          <LocationItem
            key={location.id}
            addFav={addFav}
            deleteFav={deleteFav}
            location={location}
            currentUser={currentUser}
            checked={checked}
          />
        ))}
      </div>
    );
  }
};

export default Locations;
