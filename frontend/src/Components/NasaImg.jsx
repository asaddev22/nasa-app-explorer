import React, { useState } from 'react';
import axios from "axios";
import CSS from '../style/nasaimg.css'


export const NasaImg = () => {
    const [value, setValue] = useState(''); 
    const [data, setData] = useState([]);   
    const [loading, setLoading] = useState(false); 
    const [error, setError] = useState('');
  
    const fetchAstronomyData = async (e) => {
      e.preventDefault();
      setLoading(true);
      setError(''); 
      try {
        const response = await axios.get('/search', {  
          params: {
            q: value,        
            media_type: 'image' 
          }
        });
  
        const items = response.data.collection.items;
  
        if (items.length === 0) {
          setError('No results found for your search.');
          setData([]);
        } else {
          setData(items);
        }
      } catch (error) {
        setError('Error fetching data. Please try again.');
        setData([]); 
      }
      setLoading(false);
    };
  
    return (
      <div className="nasa-img-container">
        <form onSubmit={fetchAstronomyData} className="search-form">
          <input 
            type="text" 
            placeholder="Search NASA images..." 
            value={value} 
            onChange={(e) => setValue(e.target.value)} 
            className="search-input"
          />
          <button type="submit" className="search-button">Search</button>
        </form>
  
        {loading && <p className="loading">Loading...</p>}
        {error && <p className="error-message">{error}</p>}
  
        <div className="nasa-gallery">
          {data.length > 0 && (
            data.map((item, index) => (
              <div key={index} className="nasa-card">
                <h3>{item.data[0].title}</h3>
                <img src={item.links[0].href} alt={item.data[0].title} className="nasa-image" />
                <p style={{fontSize: '15px'}}>{item.data[0].description}</p>
              </div>
            ))
          )}
        </div>
      </div>
    );
  };