import React from 'react';
import { Link } from "react-router-dom";
import './Navbar.css';

const Navbar = ({ isLoggedIn, handleLogout }) => {
  return (
    <nav className='App-header'>
          <Link className='link' id='homeLink' to="/">Practitioners</Link>
          <Link className='link' to="/patients">Patients</Link>
          <Link className='link' to="/appointments">Appointments</Link>
          <Link className='link' to="/orders">Lab order tracking</Link>
          <Link className='link' to="/InsuranceCarriers">Insurance Carriers</Link>
          <Link className='link' to="/equipment">Equipment Inventory</Link>
          {isLoggedIn ? (
            <Link className="link" to="/Login" onClick={handleLogout}>Logout</Link>
          ) : (
            <Link className='link' to="/Login">Login</Link>
          )}
    </nav>
  );
};

export default Navbar;