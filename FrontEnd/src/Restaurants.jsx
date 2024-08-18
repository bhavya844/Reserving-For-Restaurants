import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

function Restaurants() {
  const [restaurants, setRestaurants] = useState([]);
  const [email, setEmail] = useState('');
  const [reservations, setReservations] = useState([]);
  const [reservationMessage, setReservationMessage] = useState('');
  const [loadingReservations, setLoadingReservations] = useState(false);

  useEffect(() => {
    axios.get('https://9b1mk5xs85.execute-api.us-east-1.amazonaws.com/all-restaurants')
      .then(response => {
        setRestaurants(response.data);
      })
      .catch(error => console.error('Error fetching restaurants:', error));
  }, []);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const fetchReservations = () => {
    setLoadingReservations(true);
    axios.post('https://9b1mk5xs85.execute-api.us-east-1.amazonaws.com/bookings', { email })
      .then(response => {
        if (response.data.message) {
          // Set the reservation message when no reservations are found
          setReservationMessage(response.data.message);
          setReservations([]);
        } else {
          setReservationMessage('');
          setReservations(response.data);
        }
        setLoadingReservations(false);
      })
      .catch(error => {
        console.error('Error fetching reservations:', error);
        setLoadingReservations(false);
        setReservationMessage('Failed to fetch reservations. Please try again.');
      });
  };

  return (
    <>
      <Helmet>
        <title>Restaurant Reservation System</title>
      </Helmet>
      <div className="bg-gradient-to-r from-green-400 to-blue-500 min-h-screen flex flex-col items-center">
        <h1 className="text-4xl font-bold text-white mt-10 mb-5">Restaurant Reservation System</h1>
        <h2 className="text-2xl text-white mb-2">Restaurants for Reservation</h2>
        <div className="flex flex-wrap justify-center w-full">
          {restaurants.map(restaurant => (
            <div key={restaurant.id} className="m-4 bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-500 hover:scale-105">
              <Link to={`/restaurant/${restaurant.id}`}>
                <div className="p-6 hover:bg-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{restaurant.RestaurantName}</h3>
                  <p className="text-gray-600">Cuisine: {restaurant.CuisineType}</p>
                  <p className="text-gray-600">Ratings: {restaurant.Ratings}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
        <h2 className="text-xl text-white mb-2">Want to know about your past reservations?</h2>
        <div className="flex items-center justify-center mb-6">
          <input type="email" placeholder="Enter your email" value={email} onChange={handleEmailChange} className="p-4 w-96 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition-all duration-300 ease-in-out" />
          <button onClick={fetchReservations} className="bg-white text-blue-500 font-bold p-4 rounded-r-lg hover:bg-gray-100 transition duration-300">Submit</button>
        </div>
        {loadingReservations ? <p className="text-white">Loading...</p> : (
          reservationMessage ? <p className="text-red-500">{reservationMessage}</p> : (
            <div className="flex flex-wrap justify-center w-full">
              {reservations.length > 0 ? reservations.map((res, index) => (
                <div key={index} className="m-4 bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-500 hover:scale-105">
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{res.restaurant_name}</h3>
                    <p className="text-gray-600">Name: {res.name}</p>
                    <p className="text-gray-600">Quantity: {res.quantity}</p>
                    <p className="text-gray-600">Reservation Time: {res.reservation_time}</p>
                  </div>
                </div>
              )) : <p className="text-white font-bold from-neutral-200">No reservations found for this email.</p>}
            </div>
          )
        )}
      </div>
    </>
  );
}

export default Restaurants;
