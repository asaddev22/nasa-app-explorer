import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../style/mars.css';

export const Mars = () => {
  const [data, setData] = useState([]);
  
  const [loading, setLoading] = useState(false);
  
  // State to handle errors during API fetch
  const [error, setError] = useState(null);
  
  // State to manage pagination (current page)
  const [currentPage, setCurrentPage] = useState(1);
  
  // Number of photos per page for pagination
  const [photosPerPage] = useState(12);

  // useEffect hook to fetch Mars Rover photos when the component mounts
  useEffect(() => {
    const fetchMarsPhotos = async () => {
      setLoading(true);  // Set loading state to true
      setError(null);    // Reset any previous errors

      // Check if the data is already cached in localStorage
      const cachedData = localStorage.getItem('marsPhotos');

      if (cachedData) {
        setData(JSON.parse(cachedData));
        setLoading(false);
      } else {
        // If no cached data, fetch from the API
        try {
          const response = await axios.get('https://nasa-app-explorer-backend1.vercel.app/mars');
          
          // Filter out duplicate photos by comparing img_src
          const uniquePhotos = response.data.photos.filter(
            (photo, index, self) => index === self.findIndex((p) => p.img_src === photo.img_src)
          );
          
          // Set the unique photos to the state
          setData(uniquePhotos);
          
          // Cache the photos in localStorage for future use
          localStorage.setItem('marsPhotos', JSON.stringify(uniquePhotos));
        } catch (error) {
          // Handle any errors during the API call
          console.error('Error fetching Mars photos:', error);
          setError('Failed to load Mars Rover photos.');
        } finally {
          // Stop the loading spinner once fetching is complete
          setLoading(false);
        }
      }
    };

    fetchMarsPhotos();
  }, []); 

  // Calculate the index range for the current page photos
  const indexOfLastPhoto = currentPage * photosPerPage;
  const indexOfFirstPhoto = indexOfLastPhoto - photosPerPage;
  
  // Get the photos for the current page
  const currentPhotos = data.slice(indexOfFirstPhoto, indexOfLastPhoto);

  const nextPage = () => {
    if (currentPage < Math.ceil(data.length / photosPerPage)) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  // Handle moving to the previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  return (
    <div className="mars-container">
      <h1>Mars Rover Photos</h1>

      {/* Show loading message while data is being fetched */}
      {loading && <p style={{ color: 'white' }}>Loading...</p>}
      
      {/* Display error message if there is an error */}
      {error && <p className="error-message">{error}</p>}
      
      {/* Display message if no photos are available */}
      {!loading && !error && currentPhotos.length === 0 && (
        <p style={{ color: 'white' }}>No photos available.</p>
      )}

      {/* Mars photos gallery */}
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

      {/* Pagination controls */}
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
