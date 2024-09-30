const { getAPOD } = require('../controllers/nasaController');
const cors = require('cors');

const allowedOrigins = ['https://nasa-web-explorer.onrender.com', 'http://localhost:3000'];

const handler = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', allowedOrigins.includes(req.headers.origin) ? req.headers.origin : '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end(); // Allow pre-flight checks for CORS
  }

  if (req.method === 'GET') {
    getAPOD(req, res);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};

module.exports = handler;
