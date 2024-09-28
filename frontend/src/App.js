import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from './Home';
import {Navbar} from './Components/Navbar';
import { Mars } from './Components/Mars';
import { APOD } from './Components/APOD';
import { NasaImg } from './Components/NasaImg';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mars" element={<Mars />} />
        <Route path="/apod" element={<APOD />} />
        <Route path="/nasa-img" element={<NasaImg />} />
      </Routes>
    </Router>
  );
}

export default App;
