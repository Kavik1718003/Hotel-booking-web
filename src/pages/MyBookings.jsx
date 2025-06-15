import React, { useState } from 'react';
import Title from '../components/Title';
import { assets, userBookingsDummyData } from '../assets/assets';

const MyBookings = () => {
  const [bookings, setBookings] = useState(userBookingsDummyData);
  const [showModal, setShowModal] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
    name: '',
  });

  // Open Payment Modal
  const openPaymentModal = (bookingId) => {
    setSelectedBookingId(bookingId);
    setShowModal(true);
  };

  // Close Modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedBookingId(null);
    setPaymentDetails({
      cardNumber: '',
      expiry: '',
      cvv: '',
      name: '',
    });
  };

  // Handle Payment Field Changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails({ ...paymentDetails, [name]: value });
  };

  // Submit Payment
  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    const updatedBookings = bookings.map((booking) =>
      booking._id === selectedBookingId ? { ...booking, isPaid: true } : booking
    );
    setBookings(updatedBookings);
    closeModal();
  };

  // Cancel Booking
  const handleCancelBooking = (bookingId) => {
    const confirmCancel = window.confirm('Are you sure you want to cancel this booking?');
    if (!confirmCancel) return;

    const updatedBookings = bookings.filter((booking) => booking._id !== bookingId);
    setBookings(updatedBookings);
  };

  return (
    <div className='py-28 md:pb-35 md:pt-32 px-4 md:px-16 lg:px-24 xl:px-32'>
      <Title
        title='My Bookings'
        subTitle='Easily manage your past, current, and upcoming hotel reservations in one place. Plan trips seamlessly with just a few clicks'
        align='left'
      />

      <div className='max-w-6xl mt-8 w-full text-gray-800'>
        <div className='hidden md:grid md:grid-cols-[3fr_2fr_1fr] w-full border-b border-gray-300 font-medium text-base py-3'>
          <div>Hotels</div>
          <div>Date & Timings</div>
          <div>Payment</div>
        </div>

        {bookings.map((booking) => (
          <div
            key={booking._id}
            className='grid grid-cols-1 md:grid-cols-[3fr_2fr_1fr] w-full border-b border-gray-300 py-6 first:border-t'
          >
            {/* Hotel Details */}
            <div className='flex flex-col md:flex-row'>
              <img
                src={booking.room.images[0]}
                alt='hotel-img'
                className='w-full md:w-44 h-32 object-cover rounded shadow'
              />
              <div className='flex flex-col gap-1.5 mt-3 md:mt-0 md:ml-4'>
                <p className='font-playfair text-xl'>{booking.hotel.name}</p>
                <span className='font-inter text-sm text-gray-600'>
                  ({booking.room.roomType})
                </span>
                <div className='flex items-center gap-1 text-sm text-gray-500'>
                  <img src={assets.locationIcon} alt='location-icon' className='w-4 h-4' />
                  <span>{booking.hotel.address}</span>
                </div>
                <div className='flex items-center gap-1 text-sm text-gray-500'>
                  <img src={assets.guestsIcon} alt='guest-icon' className='w-4 h-4' />
                  <span>Guests: {booking.guests}</span>
                </div>
                <p className='text-base text-gray-800'>Total: ₹{booking.totalPrice}</p>
              </div>
            </div>

            {/* Date & Timings */}
            <div className='flex flex-col justify-center gap-1 text-sm mt-4 md:mt-0 text-gray-600'>
              <p><strong>Check-in:</strong> {new Date(booking.checkInDate).toDateString()}</p>
              <p><strong>Check-out:</strong> {new Date(booking.checkOutDate).toDateString()}</p>
            </div>

            {/* Payment Section */}
            <div className='flex flex-col items-start justify-center pt-3'>
              <div className='flex items-center gap-2'>
                <div className={`h-3 w-3 rounded-full ${booking.isPaid ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <p className={`text-sm ${booking.isPaid ? 'text-green-600' : 'text-red-600'}`}>
                  {booking.isPaid ? 'Paid' : 'Unpaid'}
                </p>
              </div>

              {/* Pay Now Button */}
              {!booking.isPaid && (
                <button
                  onClick={() => openPaymentModal(booking._id)}
                  className='px-4 py-1.5 mt-4 text-xs border border-gray-400 rounded-full hover:bg-gray-50 transition-all cursor-pointer'
                >
                  Pay Now
                </button>
              )}

              {/* Cancel Button — Only if Paid */}
              {booking.isPaid && (
                <button
                  onClick={() => handleCancelBooking(booking._id)}
                  className='px-4 py-1.5 mt-2 text-xs border border-red-400 text-red-600 rounded-full hover:bg-red-50 transition-all cursor-pointer'
                >
                  Cancel Booking
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Payment Modal */}
      {showModal && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-white p-6 rounded-lg shadow-lg w-full max-w-md'>
            <h2 className='text-xl font-semibold mb-4'>Enter Payment Details</h2>
            <form onSubmit={handlePaymentSubmit} className='space-y-4'>
              <input
                type='text'
                name='cardNumber'
                placeholder='Card Number'
                value={paymentDetails.cardNumber}
                onChange={handleInputChange}
                className='w-full border px-3 py-2 rounded outline-none'
                required
              />
              <div className='flex gap-2'>
                <input
                  type='text'
                  name='expiry'
                  placeholder='MM/YY'
                  value={paymentDetails.expiry}
                  onChange={handleInputChange}
                  className='w-1/2 border px-3 py-2 rounded outline-none'
                  required
                />
                <input
                  type='password'
                  name='cvv'
                  placeholder='CVV'
                  value={paymentDetails.cvv}
                  onChange={handleInputChange}
                  className='w-1/2 border px-3 py-2 rounded outline-none'
                  required
                />
              </div>
              <input
                type='text'
                name='name'
                placeholder='Name on Card'
                value={paymentDetails.name}
                onChange={handleInputChange}
                className='w-full border px-3 py-2 rounded outline-none'
                required
              />
              <div className='flex justify-between mt-4'>
                <button
                  type='button'
                  onClick={closeModal}
                  className='px-4 py-2 bg-gray-300 rounded hover:bg-gray-400'
                >
                  Cancel
                </button>
                <button
                  type='submit'
                  className='px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700'
                >
                  Pay Now
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBookings;
