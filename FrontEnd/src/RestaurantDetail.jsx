import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Modal from 'react-modal';

Modal.setAppElement('#root');  // Appropriate for accessibility reasons.

function RestaurantDetail() {
  const [restaurant, setRestaurant] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [reservation, setReservation] = useState({
    name: "",
    email: "",
    quantity: "",
    reservation_time: "",
    restaurant_name: ""
  });
  const { id } = useParams();

  useEffect(() => {
    axios.get(`https://9b1mk5xs85.execute-api.us-east-1.amazonaws.com/all-restaurants/${id}`)
      .then(response => {
        setRestaurant(response.data);
        setReservation(prev => ({ ...prev, restaurant_name: response.data.RestaurantName }));
      })
      .catch(error => console.error('Error fetching restaurant details:', error));
  }, [id]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setReservation(prev => ({ ...prev, [name]: value }));
  };

  const submitReservation = () => {
    if (!reservation.name || !reservation.email || !reservation.quantity || !reservation.reservation_time) {
      alert("Please fill in all fields before submitting.");
      return;
    }

    axios.post('https://9b1mk5xs85.execute-api.us-east-1.amazonaws.com/reservations', reservation)
      .then(response => {
        console.log('Reservation successful:', response);
        setModalIsOpen(false);  // Close the modal on successful submission
        alert("Reservation submitted successfully!");
      })
      .catch(error => {
        console.error('Error submitting reservation:', error);
        alert("Failed to submit reservation.");
      });
  };

  if (!restaurant) return <div className="text-center mt-10 text-xl">Loading...</div>;

  return (
    <div className="bg-gradient-to-r from-green-400 to-blue-500 min-h-screen flex flex-col items-center pt-10">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900">{restaurant.RestaurantName}</h2>
        <p className="text-gray-600 mt-1">Cuisine: {restaurant.CuisineType}</p>
        <p className="text-gray-600 mt-1">Ratings: {restaurant.Ratings.toFixed(1)}</p>
        <button onClick={() => setModalIsOpen(true)} className="mt-4 px-6 py-2 text-sm text-white font-medium leading-6 text-center transition bg-blue-500 rounded-full shadow ripple hover:shadow-lg hover:bg-blue-600 focus:outline-none">
          Reserve Seats
        </button>
      </div>
      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} className="bg-white rounded-md p-6 shadow-lg max-w-md m-auto">
        <h2 className="text-xl font-bold mb-4">Reserve Your Seat at {restaurant.RestaurantName}</h2>
        <input type="text" name="name" placeholder="Your Name" value={reservation.name} onChange={handleInput} className="mb-4 px-4 py-2 border rounded-md w-full" />
        <input type="email" name="email" placeholder="Email" value={reservation.email} onChange={handleInput} className="mb-4 px-4 py-2 border rounded-md w-full" />
        <input type="text" name="quantity" placeholder="Number of Seats" value={reservation.quantity} onChange={handleInput} className="mb-4 px-4 py-2 border rounded-md w-full" />
        <input type="text" name="reservation_time" placeholder="Reservation Time (e.g., 12:00 PM)" value={reservation.reservation_time} onChange={handleInput} className="mb-4 px-4 py-2 border rounded-md w-full" />
        <button onClick={submitReservation} className="px-6 py-2 text-sm text-white font-medium leading-6 text-center transition bg-blue-500 rounded-full shadow ripple hover:shadow-lg hover:bg-blue-600 focus:outline-none">
          Submit Reservation
        </button>
      </Modal>
    </div>
  );
}

export default RestaurantDetail;
