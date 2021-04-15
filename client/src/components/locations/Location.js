import React from "react";
import { Link } from "react-router-dom";

const Location = ({ match }) => {
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
