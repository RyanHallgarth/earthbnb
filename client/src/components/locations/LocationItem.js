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
  const noImage =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/480px-No_image_available.svg.png";
  return (
    <div className='search-result card grid-1'>
      {thumbnail_url ? (
        <img src={thumbnail_url} alt='' />
      ) : (
        <img src={noImage} alt='' />
      )}
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
              {review_scores_rating ? (
                <strong className='strong'>{review_scores_rating}</strong>
              ) : (
                <em className='small-em'>No Ratings Yet!</em>
              )}
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
          <FavoriteBorderIcon className='heart' />
          <div className='price'>
            <h2>${price}</h2>

            <em>per night</em>
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
