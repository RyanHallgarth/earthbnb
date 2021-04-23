import { React, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
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
  const [favorite, setFavorite] = useState(false);
  const onChange = (e) => {
    setFavorite(!favorite);
  };

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
          {summary ? (
            <p>{summary}</p>
          ) : (
            <p>
              There is currently no summary on file for this location. We can
              only assume the host of this location will add a summary soon.
              Feel free to check this location at a later date for an updated
              summary.
            </p>
          )}
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
          <FormControlLabel
            control={
              <Checkbox
                icon={<FavoriteBorder />}
                checkedIcon={<Favorite />}
                name='favorite'
                onChange={onChange}
              />
            }
            label='Favorite Location'
          />
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
