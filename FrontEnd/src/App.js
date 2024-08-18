import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Restaurants from './Restaurants';
import RestaurantDetail from './RestaurantDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Restaurants />} exact />
        <Route path="/restaurant/:id" element={<RestaurantDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
