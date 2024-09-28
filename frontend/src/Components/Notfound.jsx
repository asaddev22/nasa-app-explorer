import React from 'react';
import { useHistory } from 'react-router-dom';
import '../style/notfound.css';  

export const Notfound = () => {
  const history = useHistory();

  const handleGoHome = () => {
    history.push('/');
  };

  return (
    <div className="not-found-container">
      <h1 className="not-found-title">404</h1>
      <h2 className="not-found-subtitle">Oops! The page you're looking for doesn't exist.</h2>
      <p className="not-found-text">
        It seems like you've found a page that doesn't exist. Don't worry, click the button below to return to safety!
      </p>
      <button className="not-found-button" onClick={handleGoHome}>
        Go to Homepage
      </button>
    </div>
  );
};

