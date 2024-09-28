import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../style/mars.css'; 

export const Mars = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMarsPhotos = async () => {
      setLoading(true);  
      setError(null); // Reset any previous errors
      try {
        const response = await axios.get('https://nasa-app-explorer-1.onrender.com/mars');
        // Filter out duplicate photos by checking the img_src
        const uniquePhotos = response.data.photos.filter(
          (photo, index, self) => index === self.findIndex((p) => p.img_src === photo.img_src)
        );
        setData(uniquePhotos);
      } catch (error) {
        console.error('Error fetching Mars photos:', error);
        setError('Failed to load Mars Rover photos.');
      } finally {
        setLoading(false);  
      }
    };

    fetchMarsPhotos();
  }, []);

  return (
    <div className="mars-container">
      <h1>Mars Rover Photos</h1>
      {loading && <p style={{ color: "white" }}>Loading...</p>}  {/* Show loading message while loading */}
      {error && <p className="error-message">{error}</p>}  {/* Show error message if there's an error */}
      {!loading && !error && data.length === 0 && (
        <p style={{ color: "white" }}>No photos available.</p> 
      )}

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
