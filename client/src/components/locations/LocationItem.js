import { React } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "../../LocationItem.css";

const LocationItem = ({ location: { id, name, description } }) => {
  return (
    <div className='search-result'>
      <h5>{name}</h5>
      <p>{description}</p>
      <div>
        <Link to={`/location/${id}`} className='btn btn-dark btn-sm my-1'>
          More
        </Link>
      </div>
    </div>
  );
};

LocationItem.propTypes = {
  location: PropTypes.object.isRequired,
};

export default LocationItem;
