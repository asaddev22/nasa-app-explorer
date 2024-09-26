import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../style/navbar.css';  // Import the CSS

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);  // Toggle the menu open and close
  };

  return (
    <nav className="navbar">
      <div className="nav-logo">
        <Link to="/">NASA Explorer</Link>
      </div>
      <div className={`nav-links ${isOpen ? 'open' : ''}`}>
        <li><Link to="/" onClick={toggleMenu}>Home</Link></li>
        <li><Link to="/mars" onClick={toggleMenu}>Explore Mars</Link></li>
        <li><Link to="/apod" onClick={toggleMenu}>APOD</Link></li>
        <li><Link to="/nasa-img" onClick={toggleMenu}>NASA Image Gallery</Link></li>
      </div>
      <div className="nav-hamburger" onClick={toggleMenu}>
        <div className="hamburger-line"></div>
        <div className="hamburger-line"></div>
        <div className="hamburger-line"></div>
      </div>
    </nav>
  );
};

export default Navbar;
