import { React } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const LocationItem = ({ location: { id, name, description } }) => {
  return (
    // <div className='card text-center'>
    //   <h3>Title: {title}</h3>
    //   <h3>ID: {id}</h3>
    //   <p>{description}</p>
    // </div>

    <div class="card mb-3 col-md-12">
      <div class="card-body">
        <h5 class="card-title">{name}</h5>
        <p class="card-text">{description}</p>
        <div>
          <Link to={`/location/${id}`} className="btn btn-dark btn-sm my-1">
            More
          </Link>
        </div>
      </div>
    </div>
  );
};

LocationItem.propTypes = {
  location: PropTypes.object.isRequired,
};

export default LocationItem;
