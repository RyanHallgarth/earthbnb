import { React, useState } from "react";
import "../../Banner.css";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import Search from "./Search";

const Banner = ({ searchLocations }) => {
  const [showSearch, setShowSearch] = useState(false);
  return (
    <div className='banner'>
      <div className='banner-search'>
        {showSearch && <Search searchLocations={searchLocations} />}
        <Button
          onClick={() => setShowSearch(!showSearch)}
          variant='outlined'
          className='banner-searchButton'
        >
          {showSearch ? "Hide Search" : "Search"}
        </Button>
      </div>
      <div className='banner-info'>
        <h1>
          Escape <span id='green'>Reality</span>
        </h1>
        <h5>
          Plan a getaway and assume a new identity. Never come back. We won't
          tell anyone.
        </h5>
        <Button
          onClick={() => searchLocations()}
          component={Link}
          to={"/search"}
          variant='outlined'
          className='banner-btn'
        >
          Explore Seattle
        </Button>
      </div>
    </div>
  );
};

export default Banner;
