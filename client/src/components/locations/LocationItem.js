import React from "react";
import PropTypes from "prop-types";

const LocationItem = ({ location: { id, title, description } }) => {
  return (
    <div className='card text-center'>
      <h3>Title: {title}</h3>
      <h3>ID: {id}</h3>
      <p>{description}</p>
    </div>
  );
};

LocationItem.propTypes = {
  location: PropTypes.object.isRequired,
};

export default LocationItem;
