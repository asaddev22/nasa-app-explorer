# NASA Web App

The NASA Web App is a React-based web application that fetches and displays space-related data from NASA's public APIs, including APOD (Astronomy Picture of the Day), Mars Rover photos, and a NASA Image Library search. This application is separated into two parts: the **backend** (Node.js/Express) and the **frontend** (React).

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Folder Structure](#folder-structure)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Endpoints](#endpoints)
- [Contributing](#contributing)

---

## Features

- **APOD (Astronomy Picture of the Day)**: View NASA's picture of the day along with a description.
- **Mars Rover Photos**: Explore photos taken by NASA's Mars Rovers.
- **NASA Image Library Search**: Search for various images in NASA's image library.

---

## Technologies Used

- **Frontend**: 
  - React.js
  - Axios for API calls
  - CSS for styling
- **Backend**:
  - Node.js
  - Express.js
  - Axios for making API requests to NASA's public APIs

---

## Getting Started

To get started with the NASA Web App, follow the instructions below.

### Prerequisites

- **Node.js**: Make sure you have Node.js installed on your machine.
- **npm**: Ensure that npm (Node Package Manager) is available.

---

## Folder Structure

```bash
NASA WEB APP
├── backend
│   ├── controllers/
│   ├── node_modules/
│   ├── .env
│   ├── package-lock.json
│   ├── package.json
│   └── server.js
├── frontend
│   ├── build/
│   ├── node_modules/
│   ├── public/
│   ├── src/
│       ├── Components/
│       │   ├── APOD.jsx
│       │   ├── Mars.jsx
│       │   ├── NasaImg.jsx
│       │   └── Navbar.jsx
│       ├── style/
│       ├── App.css
│       ├── App.js
│       ├── Home.jsx
│       ├── index.css
│       ├── index.js
│       ├── reportWebVitals.js
│       └── setupTests.js
└── README.md
```

### Backend Folder

Contains the Node.js backend code responsible for handling API requests to NASA’s public APIs.

- **server.js**: The main file that initializes the Express server and handles the API routes.
- **controllers/**: Contains the controller logic for fetching data from NASA's APIs.

### Frontend Folder

Contains the React frontend code responsible for displaying the fetched data.

- **Components/**: Contains the React components like `APOD.jsx`, `Mars.jsx`, `NasaImg.jsx`, and `Navbar.jsx`.
- **App.js**: The main entry point of the React app.
- **style/**: Contains the CSS files used to style the application.

---

## Environment Variables

To connect the backend with NASA APIs, you need to set up an `.env` file in the `backend/` folder with the following:

```
NASA_API_KEY=your_nasa_api_key
```

Make sure you get a NASA API key from [https://api.nasa.gov](https://api.nasa.gov).

---

## Running the Application

### Backend

1. Navigate to the `backend/` directory.
   ```bash
   cd backend
   ```

2. Install the necessary dependencies.
   ```bash
   npm install
   ```

3. Start the backend server.
   ```bash
   npm start
   ```

By default, the backend server will run on `http://localhost:5000`.

### Frontend

1. Navigate to the `frontend/` directory.
   ```bash
   cd frontend
   ```

2. Install the necessary dependencies.
   ```bash
   npm install
   ```

3. Start the frontend development server.
   ```bash
   npm start
   ```

By default, the frontend will be served on `http://localhost:3000`.

---

## Endpoints

### Backend API Endpoints

- **Mars Rover Photos**: `GET /mars`
  - Returns images taken by Mars Rovers.
  
- **APOD (Astronomy Picture of the Day)**: `GET /apod`
  - Returns the Astronomy Picture of the Day along with its description.
  
- **NASA Image Library Search**: `GET /search?q=<query>`
  - Searches NASA’s image library based on the query parameter.

---

## Contributing

If you'd like to contribute to this project, please follow the steps below:

1. Fork the repository.
2. Create a new branch.
3. Make your changes.
4. Submit a pull request with a detailed description of your changes.

---
