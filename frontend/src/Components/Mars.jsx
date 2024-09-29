import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../style/mars.css'; 

export const Mars = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); 
  const [photosPerPage] = useState(12); 

  useEffect(() => {
    const fetchMarsPhotos = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get('https://nasa-app-explorer-1.onrender.com/mars');
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

  // Get the current photos for the page
  const indexOfLastPhoto = currentPage * photosPerPage;
  const indexOfFirstPhoto = indexOfLastPhoto - photosPerPage;
  const currentPhotos = data.slice(indexOfFirstPhoto, indexOfLastPhoto);

  // Handle page change
  const nextPage = () => {
    if (currentPage < Math.ceil(data.length / photosPerPage)) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  return (
    <div className="mars-container">
      <h1>Mars Rover Photos</h1>
      {loading && <p style={{ color: "white" }}>Loading...</p>}
      {error && <p className="error-message">{error}</p>}
      {!loading && !error && currentPhotos.length === 0 && (
        <p style={{ color: "white" }}>No photos available.</p>
      )}

      <div className="mars-gallery">
        {currentPhotos.map((photo) => (
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

      {!loading && !error && data.length > 0 && (
        <div className="pagination">
          <button className="pagination-button" onClick={prevPage} disabled={currentPage === 1}>
            Previous
          </button>
          <span> Page {currentPage} of {Math.ceil(data.length / photosPerPage)} </span>
          <button className="pagination-button" onClick={nextPage} disabled={currentPage === Math.ceil(data.length / photosPerPage)}>
            Next
          </button>
        </div>
      )}
    </div>
  );
};
