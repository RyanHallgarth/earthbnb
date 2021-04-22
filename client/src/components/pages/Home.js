import React from "react";
import "../../Home.css";
import Banner from "../layout/Banner";
import Card from "../layout/Card";
import { Link } from "react-router-dom";

const Home = ({
  searchLocations,
  highestRated,
  uniqueStays,
  entirePlace,
  filterSearch,
}) => {
  return (
    <div className='home'>
      <Banner searchLocations={searchLocations} filterSearch={filterSearch} />

      <div className='home-section'>
        <Link onClick={() => highestRated()} to={"/search"}>
          <Card
            src='https://images.unsplash.com/photo-1561753757-d8880c5a3551?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80'
            title='Highest Rated'
            description='Discover the highest quality locations available.'
          />
        </Link>
        <Link onClick={() => uniqueStays()} to={"/search"}>
          <Card
            src='https://images.unsplash.com/photo-1537726235470-8504e3beef77?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80'
            title='Unique stays'
            description='Spaces that are more than just a place to sleep.'
          />
        </Link>
        <Link onClick={() => entirePlace()} to={"/search"}>
          <Card
            src='https://a0.muscache.com/im/pictures/fdb46962-10c1-45fc-a228-d0b055411448.jpg?im_w=720'
            title='Entire homes'
            description='Comfortable private places, with room for friends or family.'
          />
        </Link>
      </div>
    </div>
  );
};

export default Home;
