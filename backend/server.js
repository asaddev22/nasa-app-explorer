const express = require('express');
const { getMarsPhotos, getAPOD, searchImages } = require('./controllers/nasaController'); 
require('dotenv').config(); 
const path = require('path'); // Add this line

const app = express();
const PORT = process.env.PORT || 5000;
const cors = require('cors');

//connect backend to frontend
app.use(cors({
  origin: ['https://nasa-app-explorer-8h7q.vercel.app', 'http://localhost:3000']  // Array of allowed origins
}));


// Route to get Mars rover photos
app.get('/mars', getMarsPhotos);

// Route to get Astronomy Picture of the Day (APOD)
app.get('/apod', getAPOD);

// Route to search NASA Image and Video Library
app.get('/search', searchImages);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
