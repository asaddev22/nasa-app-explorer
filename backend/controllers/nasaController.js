const axios = require('axios');
require('dotenv').config(); 

const NASA_API_KEY = process.env.NASA_API_KEY;

// Controller to get Mars rover photos
const getMarsPhotos = async (req, res) => {
  try {
    const response = await axios.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos`, {
      params: { sol: 1000, api_key: NASA_API_KEY }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching Mars rover photos:', error.message);
    res.status(500).json({ error: 'Failed to fetch Mars rover photos' });
  }
};

// Controller to get Astronomy Picture of the Day (APOD)
const getAPOD = async (req, res) => {
  try {
    const response = await axios.get(`https://api.nasa.gov/planetary/apod`, {
      params: { api_key: NASA_API_KEY }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching APOD:', error.message);
    res.status(500).json({ error: 'Failed to fetch APOD' });
  }
};

// Controller to search NASA Image and Video Library
const searchImages = async (req, res) => {
  const { q, media_type } = req.query; 
  try {
    const response = await axios.get(`https://images-api.nasa.gov/search`, {
      params: {
        q: q || '',
        media_type: media_type || 'image',
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching data from NASA Image and Video Library:', error.message);
    res.status(500).json({ error: 'Failed to fetch data from NASA Image and Video Library' });
  }
};

module.exports = {
  getMarsPhotos,
  getAPOD,
  searchImages,
};
