import { React } from "react";
import LocationItem from "./LocationItem";

const Locations = ({ locations }) => {
  return (
    <div>
      {locations.map((location) => (
        <LocationItem key={location.id} location={location} />
      ))}
    </div>
  );
};

export default Locations;
