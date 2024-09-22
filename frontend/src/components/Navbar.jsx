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
        </ul>

    </nav>
  );
};

export default Navbar;