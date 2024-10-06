import React, { useState } from 'react';
import axios from "axios";
import '../style/nasaimg.css';
import { spaceKeywords } from '../spaceKeywords';  // Import the spaceKeywords array

export const NasaImg = () => {
    const [value, setValue] = useState(''); 
    const [suggestions, setSuggestions] = useState([]); // State for search suggestions
    const [data, setData] = useState([]);   // State to store the fetched NASA image data
    const [loading, setLoading] = useState(false); // State to manage loading status
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState(1);  // State to track the current page for pagination
    const [itemsPerPage] = useState(6);   // Number of items to display per page
  

    // Function to handle search input change and show suggestions
    const handleInputChange = (e) => {
        const inputValue = e.target.value;
        setValue(inputValue);

        // Filter suggestions based on user input
        if (inputValue.length > 0) {
            const filteredSuggestions = spaceKeywords.filter(keyword =>
                keyword.toLowerCase().startsWith(inputValue.toLowerCase())
            );
            setSuggestions(filteredSuggestions);
        } else {
            setSuggestions([]); // Clear suggestions if input is empty
        }
    };

    // Function to handle clicking a suggestion
    const handleSuggestionClick = (suggestion) => {
        setValue(suggestion); // Set the clicked suggestion to the input field
        setSuggestions([]);   // Clear the suggestions after selection
    };

    // Function to fetch data from the NASA API
    const fetchAstronomyData = async (e) => {
      e.preventDefault();  
      setLoading(true);    // Set loading to true when starting the fetch
      setSuggestions([]);  // Clear suggestions when the form is submitted
      setError('');        
      try {
        const response = await axios.get('/search', {  
          params: {
            q: value,        // Search term from the input
            media_type: 'image' // Restrict results to images
          }
        });
  
        const items = response.data.collection.items;
        if (items.length === 0) {
          setError('No results found for your search.');
          setData([]); 
        } else {
          setData(items);  
          setCurrentPage(1); 
        }
      } catch (error) {
        setError('Error fetching data. Please try again.');
        setData([]);
      }
      setLoading(false);  
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    const nextPage = () => {
      if (currentPage < Math.ceil(data.length / itemsPerPage)) {
        setCurrentPage(prevPage => prevPage + 1);
      }
    };

    const prevPage = () => {
      if (currentPage > 1) {
        setCurrentPage(prevPage => prevPage - 1);
      }
    };

    return (
      <div className="nasa-img-container">
        <form onSubmit={fetchAstronomyData} className="search-form">
          <input 
            type="text" 
            placeholder="Search NASA images..." 
            value={value} 
            onChange={handleInputChange}  // Update search input state and show suggestions
            className="search-input"
          />
          {/* Suggestions Dropdown */}
          {suggestions.length > 0 && (
            <ul className="suggestions-list">
              {suggestions.map((suggestion, index) => (
                <li 
                  key={index} 
                  onClick={() => handleSuggestionClick(suggestion)} 
                  className="suggestion-item"
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
          
          
          <button type="submit" className="search-button">Search</button>
        </form>
  
        {loading && <p className="loading">Loading...</p>}
        {error && <p className="error-message">{error}</p>}
  
        <div className="nasa-gallery">
          {currentItems.length > 0 && (
            currentItems.map((item, index) => (
              <div key={index} className="nasa-card">
                <h3>{item.data[0].title}</h3>
                <img src={item.links[0].href} alt={item.data[0].title} className="nasa-image" />
                <p style={{fontSize: '15px'}}>{item.data[0].description}</p>
              </div>
            ))
          )}
        </div>
  
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
