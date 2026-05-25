import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Closes mobile menu when a link is clicked
  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Brand Logo */}
        <NavLink to="/" className="navbar-logo" onClick={closeMenu}>
          Portfolio<span className="logo-dot">.</span>Dev
        </NavLink>

        {/* Hamburger Icon for Mobile */}
        <div className={`menu-icon ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>

        {/* Navigation Links */}
        <ul className={`nav-menu ${isOpen ? 'active' : ''}`}>
          <li className="nav-item">
            <NavLink 
              to="/" 
              className={({ isActive }) => "nav-links" + (isActive ? " active-link" : "")}
              onClick={closeMenu}
              end
            >
              About
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink 
              to="/projects" 
              className={({ isActive }) => "nav-links" + (isActive ? " active-link" : "")}
              onClick={closeMenu}
            >
              Projects
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink 
              to="/contact" 
              className={({ isActive }) => "nav-links" + (isActive ? " active-link" : "")}
              onClick={closeMenu}
            >
              Contact
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;