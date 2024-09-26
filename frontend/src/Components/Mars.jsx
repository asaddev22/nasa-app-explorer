import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../style/mars.css'; // Correct CSS import

export const Mars = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMarsPhotos = async () => {
      setLoading(true);  
      try {
        const response = await axios.get('/mars');
        setData(response.data.photos);
      } catch (error) {
        console.error('Error fetching Mars photos:', error);
      } finally {
        setLoading(false);  
      }
    };

    fetchMarsPhotos();
  }, []);

  return (
    <div className="mars-container">
      <h1>Mars Rover Photos</h1>
      {loading ? <p style={{color: "white"}}>Loading...</p> : null}  
      <div className="mars-gallery">
      {data.map((photo) => (
  <div key={photo.id} className="mars-card">
    <img src={photo.img_src} alt={`Mars Rover ${photo.id}`} className="mars-image" />
    <div className="mars-info">
      <h2>Camera: {photo.camera.full_name}</h2>
      <p><strong>Rover Name:</strong> {photo.rover.name}</p>
      <p><strong>Landing Date:</strong> {photo.rover.landing_date}</p>
      <p><strong>Launch Date:</strong> {photo.rover.launch_date}</p>
      <p><strong>Earth Date:</strong> {photo.earth_date}</p>
    </div>
  </div>
))}
      </div>
    </div>
  );
};
