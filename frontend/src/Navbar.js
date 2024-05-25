import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Import the CSS file for Navbar styling

const Navbar = () => {
  return (
    <div className="navbar-container">
        <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link to="/" className="navbar-link">Home</Link>
        </li>
        <li className="navbar-item">
          <Link to="/Maternal Health" className="navbar-link">Maternal Health</Link>
        </li>
        <li className="navbar-item">
          <Link to="/services" className="navbar-link">Services</Link>
        </li>
        <li className="navbar-item">
          <Link to="/contact" className="navbar-link">Contact</Link>
        </li>
      </ul>
    </nav>
  </div>
  );
};

export default Navbar;
