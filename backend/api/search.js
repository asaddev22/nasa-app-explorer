const { searchImages } = require('../controllers/nasaController');
const cors = require('cors');

const allowedOrigins = ['https://nasa-app-explorer-8h7q.vercel.app', 'http://localhost:3000'];

const handler = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', allowedOrigins.includes(req.headers.origin) ? req.headers.origin : '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end(); 
  }

  if (req.method === 'GET') {
    searchImages(req, res);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};

module.exports = handler;
