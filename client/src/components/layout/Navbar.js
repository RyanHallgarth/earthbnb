import React from "react";
import { Link } from "react-router-dom";
// import Login from "../Login";
// import LoginBtn from "../LoginBtn";

const Navbar = () => {
  return (
    <nav className='navbar bg-primary'>
      <h1>EarthBnB</h1>
      <ul>
        <li>
          <Link to='/'>Home</Link>
          <Link to='/about'>About</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
