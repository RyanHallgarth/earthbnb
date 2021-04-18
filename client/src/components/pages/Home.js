import React from "react";
import "../../Home.css";
import Banner from "../layout/Banner";
import Card from "../layout/Card";

const Home = ({ searchLocations }) => {
  return (
    <div className='home'>
      <Banner searchLocations={searchLocations} />

      <div className='home-section'>
        <Card
          src='https://images.unsplash.com/photo-1561753757-d8880c5a3551?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80'
          title='Highest Rated'
          description='Discover the highest quality locations available.'
        />
        <Card
          src='https://images.unsplash.com/photo-1537726235470-8504e3beef77?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80'
          title='Unique stays'
          description='Spaces that are more than just a place to sleep.'
        />
        <Card
          src='https://a0.muscache.com/im/pictures/fdb46962-10c1-45fc-a228-d0b055411448.jpg?im_w=720'
          title='Entire homes'
          description='Comfortable private places, with room for friends or family.'
        />
      </div>
    </div>
  );
};

export default Home;
