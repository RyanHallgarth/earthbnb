import { React } from "react";
import LocationItem from "./LocationItem";
import Spinner from "../layout/Spinner";

const Locations = ({ locations, loading }) => {
  if (loading) {
    return <Spinner />;
  } else {
    return (
      <div id='locations'>
        {locations.map((location) => (
          <LocationItem key={location.id} location={location} />
        ))}
      </div>
    );
  }
};

export default Locations;
