import { React, useEffect } from "react";
import { Link } from "react-router-dom";

const Location = ({ location, match, getLocation }) => {
  useEffect(() => {
    getLocation(match.params.id);
  }, []);

  const {
    name,
    summary,
    medium_url,
    street,
    city,
    state,
    room_type,
    accomodates,
    bathrooms,
    bedrooms,
    amenities,
    review_scores_rating,
  } = location;

  return (
    <div>
      <Link to='/' className='btn btn-light'>
        Back to Search
      </Link>
      <h1>Individual details page</h1>
      <p>for location with ID number of {match.params.id}</p>
    </div>
  );
};

export default Location;
