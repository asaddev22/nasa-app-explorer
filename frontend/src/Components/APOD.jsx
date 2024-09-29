import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CSS from '../style/apod.css'; 

export const APOD = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchAPOD = async () => {
      try {
        const response = await axios.get('https://nasa-app-explorer-1.onrender.com/apod');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching APOD:', error);
      }
    };
    fetchAPOD();
  }, []);

  return (
    <div className="apod-container">
      <h1>Astronomy Picture of the Day</h1>
      {data ? (
        <div className="apod-content">
          <h2>{data.title}</h2>
          <img src={data.url} alt={data.title} className="apod-image" />
          <p>{data.explanation}</p>
          <p>©{data.copyright}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
