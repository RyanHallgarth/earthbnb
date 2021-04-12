import React from "react";
import { Link } from "react-router-dom";
import Login from "../Login";

const Navbar = () => {
  return (
    <div className='navbar'>
      <h1>EarthBnB</h1>
      <ul>
        <li>
          <Link to='/'>Home</Link>
          <Link to='/about'>About</Link>
          <Login />
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
