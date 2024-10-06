// Helper function to handle API errors
const handleApiError = (error, res, resourceName) => {
    if (error.response) {
      const status = error.response.status;
  
      // API Rate Limit (429)
      if (status === 429) {
        console.error(`Error fetching ${resourceName}: API rate limit reached`);
        return res.status(429).json({
          error: `API rate limit reached. Please try again later.`,
        });
      }
  
      // Resource Not Found (404)
      if (status === 404) {
        console.error(`Error fetching ${resourceName}: Resource not found`);
        return res.status(404).json({
          error: `${resourceName} not found.`,
        });
      }
  
      // General error handling for other status codes
      console.error(`Error fetching ${resourceName}: ${error.message}`);
      return res.status(status).json({
        error: `Failed to fetch ${resourceName}. Status code: ${status}`,
      });
    } else {
      // Network or other unknown error
      console.error(`Error fetching ${resourceName}: ${error.message}`);
      return res.status(500).json({
        error: `Failed to fetch ${resourceName}. Please try again later.`,
      });
    }
  };
  
  module.exports = { handleApiError };
  