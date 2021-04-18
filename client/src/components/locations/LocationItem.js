import { React } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import StarIcon from "@material-ui/icons/Star";
import "../../LocationItem.css";

const LocationItem = ({
  location: {
    id,
    name,
    summary,
    thumbnail_url,
    price,
    street,
    review_scores_rating,
  },
}) => {
  return (
    <div className='search-result'>
      <img src={thumbnail_url} alt='' />
      <FavoriteBorderIcon className='heart' />
      <div className='info'>
        <div className='info-top'>
          <p>{street}</p>
          <h3>{name}</h3>
          <p>____</p>
          <p>{summary}</p>
        </div>
        <div className='info-bottom'>
          <div className='stars'>
            <StarIcon className='star' />
            <p>
              <strong>{review_scores_rating}</strong>
            </p>
          </div>
          <div className='price'>
            <h2>${price}</h2>
          </div>
        </div>
      </div>
      {/* <div>
        <Link to={`/location/${id}`} className='btn btn-dark btn-sm my-1'>
          More
        </Link>
      </div> */}
    </div>
  );
};

LocationItem.propTypes = {
  location: PropTypes.object.isRequired,
};

export default LocationItem;
