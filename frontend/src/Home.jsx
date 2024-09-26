import React from 'react';
import { Link } from 'react-router-dom';
import './style/home.css';  // Import the CSS for Home page

export const Home = () => {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1 className="home-logo">NASA Explorer</h1>
      </header>
      <div className="home-content">
        <p className="home-intro">Explore the Universe with NASA's Data</p>
        <div className="home-buttons">
          <Link to="/mars" className="home-btn">Explore Mars</Link>
          <Link to="/apod" className="home-btn">APOD</Link>
          <Link to="/nasa-img" className="home-btn">NASA Image Gallery</Link>
        </div>
      </div>
      {/* Twinkling stars layer */}
      <div className="stars"></div>
      <div className="twinkling"></div>
    </div>
  );
};

