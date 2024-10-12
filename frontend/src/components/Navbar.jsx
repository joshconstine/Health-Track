import React from 'react';
import './Navbar.css';
import {
  Link
} from "react-router-dom";
const Navbar = () => {
  return (
    <nav className='App-header'>
          <Link class='link' id='homeLink' to="/">Home</Link>
          <Link class='link' to="/patients">Patients</Link>
          <Link class='link' to="/appointments">Appointments</Link>
          <Link class='link' to="/orders">Lab order tracking</Link>
          <Link class='link' to="/InsuranceCarriers">Insurrance Carriers</Link>

    </nav>
  );
};

export default Navbar;