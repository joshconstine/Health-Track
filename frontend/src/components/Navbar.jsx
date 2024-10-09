import React from 'react';
import {
  Link
} from "react-router-dom";
const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/appointments">Appointments</Link>
        </li>
        <li>
          <Link to="/patients">Patients</Link>
        </li>
        <li>
          <Link to="/orders">Lab order tracking</Link>
        </li>
        <li>
          <Link to="/InsuranceCarriers">Insurrance Carriers</Link>
        </li>
      </ul>

    </nav>
  );
};

export default Navbar;