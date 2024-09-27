const express = require('express');
const { getMarsPhotos, getAPOD, searchImages } = require('./controllers/nasaController'); 
require('dotenv').config(); 

const app = express();
const PORT = process.env.PORT || 5000;
const cors = require('cors');

app.use(cors({
  origin: 'https://nasa-web-explorer.onrender.com',  
}));

app.get('/', (req, res) => {
  res.send('Welcome to NASA App Explorer Backend');
});
// Route to get Mars rover photos
app.get('/mars', getMarsPhotos);

// Route to get Astronomy Picture of the Day (APOD)
app.get('/apod', getAPOD);

// Route to search NASA Image and Video Library
app.get('/search', searchImages);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
