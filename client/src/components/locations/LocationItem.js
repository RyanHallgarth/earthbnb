import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import StarIcon from "@material-ui/icons/Star";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import "../../LocationItem.css";

const useStyles = makeStyles((theme) => ({
  popover: {
    pointerEvents: "none",
  },
  paper: {
    padding: theme.spacing(1),
  },
}));

const LocationItem = ({
  addFav,
  deleteFav,
  currentUser,
  checked,
  checkFavs,
  location: {
    id,
    name,
    summary,
    thumbnail_url,
    price,
    street,
    review_scores_rating,
    number_of_reviews,
  },
}) => {
  const [favorite, setFavorite] = useState(null);
  const [numReviews, setNumReviews] = useState(number_of_reviews);

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const { favorites } = currentUser;

  const onChange = (event) => {
    setFavorite(event.target.checked);

    if (favorite !== true) {
      addFav(id);
      setNumReviews(number_of_reviews + 1);
      console.log("addFav: " + id);
    } else {
      deleteFav(id);
      setNumReviews(number_of_reviews);
      console.log("deleteFav: " + id);
    }
  };

  // useEffect(() => {
  //   for (let fav of favorites) {
  //     if (fav === id) {
  //       setCheck(true);
  //     } else {
  //       setCheck(false);
  //     }
  //     console.log(fav, id, check);
  //   }
  //   // eslint-disable-next-line
  // }, [check]);

  const noImage =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/480px-No_image_available.svg.png";

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

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
          {currentUser.picture ? (
            <FormControlLabel
              control={
                <Checkbox
                  icon={<FavoriteBorder />}
                  checkedIcon={<Favorite />}
                  name='favorite'
                  onChange={onChange}
                />
              }
              label={numReviews}
            />
          ) : (
            <>
              <Typography
                aria-owns={open ? "mouse-over-popover" : undefined}
                aria-haspopup='true'
                onMouseEnter={handlePopoverOpen}
                onMouseLeave={handlePopoverClose}
              >
                <FavoriteBorderIcon />
              </Typography>
              <Popover
                id='mouse-over-popover'
                className={classes.popover}
                classes={{
                  paper: classes.paper,
                }}
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                onClose={handlePopoverClose}
                disableRestoreFocus
              >
                <Typography>Log in to favorite locations.</Typography>
              </Popover>
            </>
          )}
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
