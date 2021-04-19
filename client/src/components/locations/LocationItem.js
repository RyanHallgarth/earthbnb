import { React } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import StarIcon from "@material-ui/icons/Star";
import { Button } from "@material-ui/core";
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
            <h2>
              <StarIcon className='star' />
              <strong className='strong'>{review_scores_rating}</strong>
            </h2>
          </div>

          <Button
            to={`/location/${id}`}
            component={Link}
            variant='outlined'
            className='more-btn'
          >
            More Details
          </Button>
          <div className='price'>
            <h2>${price}</h2>
            <p>
              <em>per night</em>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

LocationItem.propTypes = {
  location: PropTypes.object.isRequired,
};

export default LocationItem;
