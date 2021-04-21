import React from "react";
import LocationOnIcon from "@material-ui/icons/LocationOn";

const Icon = ({ lat, lng }) => {
  return (
    <div className='location-marker'>
      <LocationOnIcon />
    </div>
  );
};

export default Icon;
