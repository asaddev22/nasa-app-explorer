import React, { useState } from 'react';
import axios from "axios";
import '../style/nasaimg.css';

export const NasaImg = () => {
    const [value, setValue] = useState(''); 
    
    // State to store the fetched NASA image data
    const [data, setData] = useState([]);   
    
    // State to manage loading status
    const [loading, setLoading] = useState(false);
    
    const [error, setError] = useState('');
    
    // State to track the current page for pagination
    const [currentPage, setCurrentPage] = useState(1); 
    
    // Number of items to display per page
    const [itemsPerPage] = useState(6); 
  
    // Function to fetch data from the NASA API
    const fetchAstronomyData = async (e) => {
      e.preventDefault();  
      setLoading(true);    // Set loading to true when starting the fetch
      setError('');        
      try {
        const response = await axios.get('https://nasa-app-explorer-backend1.vercel.app/search', {  
          params: {
            q: value,        // Search term from the input
            media_type: 'image' // Restrict results to images
          }
        });
  
        // Extract the items array from the response
        const items = response.data.collection.items;
  
        // If no items are found, set an error message
        if (items.length === 0) {
          setError('No results found for your search.');
          setData([]); 
        } else {
          setData(items);  // Store the fetched data
          setCurrentPage(1);  // Reset to page 1 after a new search
        }
      } catch (error) {
        setError('Error fetching data. Please try again.');  // Catch and display any errors
        setData([]);  // Reset data on error
      }
      setLoading(false);  // Stop loading once data is fetched or error occurs
    };

    // Calculate the index range for the items to be displayed on the current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    
    // Get the items for the current page
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    // Function to go to the next page
    const nextPage = () => {
      if (currentPage < Math.ceil(data.length / itemsPerPage)) {
        setCurrentPage(prevPage => prevPage + 1);
      }
    };

    // Function to go to the previous page
    const prevPage = () => {
      if (currentPage > 1) {
        setCurrentPage(prevPage => prevPage - 1);
      }
    };

    return (
      <div className="nasa-img-container">
        {/* Form for searching NASA images */}
        <form onSubmit={fetchAstronomyData} className="search-form">
          <input 
            type="text" 
            placeholder="Search NASA images..." 
            value={value} 
            onChange={(e) => setValue(e.target.value)}  // Update search input state
            className="search-input"
          />
          <button type="submit" className="search-button">Search</button>
        </form>
  
        {/* Show loading message while data is being fetched */}
        {loading && <p className="loading">Loading...</p>}
        
        {/* Display error message if there is one */}
        {error && <p className="error-message">{error}</p>}
  
        {/* Gallery of NASA images */}
        <div className="nasa-gallery">
          {/* Only display images if there are any current items */}
          {currentItems.length > 0 && (
            currentItems.map((item, index) => (
              <div key={index} className="nasa-card">
                <h3>{item.data[0].title}</h3>  {/* Image title */}
                <img src={item.links[0].href} alt={item.data[0].title} className="nasa-image" /> {/* Image */}
                <p style={{fontSize: '15px'}}>{item.data[0].description}</p>  {/* Image description */}
              </div>
            ))
          )}
        </div>
  
        {/* Pagination controls */}
        {!loading && !error && data.length > 0 && (
          <div className="pagination">
            <button className="pagination-button" onClick={prevPage} disabled={currentPage === 1}>
              Previous
            </button>
            <span> Page {currentPage} of {Math.ceil(data.length / itemsPerPage)} </span>
            <button className="pagination-button" onClick={nextPage} disabled={currentPage === Math.ceil(data.length / itemsPerPage)}>
              Next
            </button>
          </div>
        )}
      </div>
    );
};
