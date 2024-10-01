import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CSS from '../style/apod.css'; 

export const APOD = () => {
  // State to store the fetched APOD (Astronomy Picture of the Day) data
  const [data, setData] = useState(null);

  // useEffect hook to fetch the APOD data when the component mounts
  useEffect(() => {
    const fetchAPOD = async () => {
      try {
        // Fetch the APOD data from the backend (or NASA API via backend)
        const response = await axios.get('https://nasa-app-backend-dnmd.onrender.com/apod');
        setData(response.data); // Set the fetched data in the state
      } catch (error) {
        // Log any errors encountered during the fetch operation
        console.error('Error fetching APOD:', error);
      }
    };

    // Call the fetchAPOD function on component mount
    fetchAPOD();
  }, []); 

  return (
    <div className="apod-container">
      <h1>Astronomy Picture of the Day</h1>
      
      {/* Display the content if data is available, otherwise show loading message */}
      {data ? (
        <div className="apod-content">
          <h2>{data.title}</h2> 
          {data.media_type === "image" ? (
      <img src={data.url} alt={data.title} className="apod-image" />
    ) : data.media_type === "video" ? (
      <iframe
        src={data.url}
        title={data.title}
        className="apod-video"
        allowFullScreen
      ></iframe>
    ) : null}
          
          <p>{data.explanation}</p> 
          <p>©{data.copyright}</p> {/* Display the copyright information if available */}
        </div>
      ) : (
        <p>Loading...</p> // Show a loading message while data is being fetched
      )}
    </div>
  );
};
