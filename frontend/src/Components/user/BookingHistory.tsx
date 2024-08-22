

/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authAxios from '../../redux/api/authApi';
import { FaCalendarAlt, FaClock, FaUserFriends } from 'react-icons/fa';
import ReviewModal from './AddReview';
import ConfirmCancellationModal from '../../layouts/CancellationModal';

interface Booking {
  bookingId: string;
  restaurantId: string;
  tableId: string;
  featuredImage: string;
  restaurantName: string;
  bookingStatus: string;
  guests: number;
  bookingDate: string;
  bookingTime: string;
  cancellationReason: string
}

interface ReviewData {
  username?: string;
  description: string;
  rating: number;
}

type BookingHistoryProps = {
  userId: string;
};

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'confirmed':
      return 'text-green-600';
    case 'cancelled':
      return 'text-red-600';
    case 'checkedin':
      return 'text-blue-600';
    case 'pending':
      return 'text-orange-600';
    case 'completed':
      return 'text-gray-600';
    default:
      return 'text-gray-600';
  }
};

const Shimmer = () => (
  <div className="animate-pulse flex space-x-4 p-4 bg-gray-200 rounded-lg">
    <div className="bg-gray-300 h-[100px] w-[150px] md:h-[120px] md:w-[200px] rounded-lg"></div>
    <div className="flex-1 space-y-4 py-1">
      <div className="h-4 bg-gray-300 rounded w-3/4"></div>
      <div className="space-y-2">
        <div className="h-4 bg-gray-300 rounded w-5/6"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
      </div>
    </div>
  </div>
);

const BookingHistory: React.FC<BookingHistoryProps> = ({ userId }) => {
  const navigate = useNavigate();

  const [bookingDetails, setBookingDetails] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isReviewModalOpen, setReviewModalOpen] = useState<boolean>(false);
  const [selectedRestaurantId, setSelectedRestaurantId] = useState<string | null>(null);
  const [isCancellationModalOpen, setCancellationModalOpen] = useState<boolean>(false);
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(null);


  console.log(selectedBookingId)

  const [currentPage, setCurrentPage] = useState(1);
  const bookingPerPage = 5;


  useEffect(() => {
    fetchBookingData();
  }, [userId]);

  const fetchBookingData = async () => {
    try {
      if (userId) {
        setLoading(true);
        const res = await authAxios.get(`/booking-history/${userId}`);
        const bookings = res.data.bookingDatas.map((booking: any) => ({
          bookingId: booking.bookingId,
          restaurantId: booking.restaurantId._id,
          tableId: booking.tableId._id,
          featuredImage: booking.restaurantId.featuredImage,
          restaurantName: booking.restaurantId.restaurantName,
          bookingStatus: booking.bookingStatus,
          guests: booking.guests,
          bookingDate: booking.bookingDate,
          bookingTime: booking.bookingTime,
        }));
        setBookingDetails(bookings);
        setLoading(false);
      } else {
        console.error('Unauthorized access or invalid role');
        setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching booking data', error);
      setLoading(false);
    }
  };

  const handleBookingClick = (bookingId: string) => {
    navigate(`/booking-details/${bookingId}`);
  };

  const handleAddReview = (restaurantId: string) => {
    setSelectedRestaurantId(restaurantId);
    setReviewModalOpen(true);
  };

  const handleReviewSubmit = async (reviewData: ReviewData) => {
    if (!selectedRestaurantId) return;

    try {
      await authAxios.post(`/add-review/${selectedRestaurantId}`, {
        ...reviewData,
        userId,
      });
      console.log('Review submitted successfully');
    } catch (error) {
      console.error('Error submitting review:', error);
    } finally {
      setReviewModalOpen(false);
    }
  };

  const handleCancellation = (bookingId: string) => {
    setSelectedBookingId(bookingId);
    setCancellationModalOpen(true);
  };

  const confirmCancellation = async (cancellationReason: string) => {
    if (!selectedBookingId) return;

    const selectedBooking: any = bookingDetails.find(booking =>booking.bookingId === selectedBookingId)

    try {
      await authAxios.post(`/cancel-booking/${selectedBookingId}`, { userId, cancellationReason, tableId:selectedBooking.tableId });
      console.log('Booking cancelled successfully');
      setBookingDetails((prevDetails) =>
        prevDetails.map((booking) =>
          booking.bookingId === selectedBookingId
            ? { ...booking, bookingStatus: 'CANCELLED' }
            : booking
        )
      );
    } catch (error) {
      console.error('Error cancelling booking:', error);
    } finally {
      setCancellationModalOpen(false);
    }
  };

  const indexOfLastBooking = currentPage * bookingPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingPerPage;
  const currentBookings = bookingDetails.slice(indexOfFirstBooking, indexOfLastBooking);

  const totalPages = Math.ceil(bookingDetails.length / bookingPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const isBookingDatePassed = (bookingDate: string) => {
    const today = new Date();
    const booking = new Date(bookingDate);
    return booking > today;
  };

  return (
    <div>
      <h2 className="text-xl md:text-2xl font-bold mb-4">Booking History</h2>
      <div className="space-y-4">
        {loading ? (
          Array.from({ length: 3 }).map((_, index) => <Shimmer key={index} />)
        ) : currentBookings.length > 0 ? (
          currentBookings.map((booking, index) => (
            <div
              key={index}
              className="bg-gray-100 p-4 rounded-lg shadow-md cursor-pointer"
              onClick={() => handleBookingClick(booking.bookingId)}
            >
              <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
                <img
                  src={booking.featuredImage}
                  alt={booking.restaurantName}
                  className="w-[150px] h-[100px] md:w-[200px] md:h-[120px] object-cover rounded-lg"
                />
                <div className="flex-grow text-center md:text-left">
                  <h3 className="text-lg md:text-xl text-teal-700 font-bold mb-2">
                    {booking.restaurantName}
                  </h3>
                  <p className="flex items-center justify-center md:justify-start">
                    <FaCalendarAlt className="mr-2" />
                    {new Date(booking.bookingDate).toLocaleDateString()}
                  </p>
                  <p className="flex items-center justify-center md:justify-start">
                    <FaClock className="mr-2" />
                    {booking.bookingTime}
                  </p>
                  <p className="flex items-center justify-center md:justify-start">
                    <FaUserFriends className="mr-2" />
                    Guests: {booking.guests}
                  </p>
                  <p>
                    <span className="font-medium">Status:</span>
                    <span className={`ml-2 ${getStatusColor(booking.bookingStatus)}`}>
                      {booking.bookingStatus}
                    </span>
                  </p>
                </div>
                <div className="flex-grow text-center md:text-right">
                  {booking.bookingStatus.toLowerCase() === 'completed' && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddReview(booking.restaurantId);
                      }}
                      className="bg-teal-600 hover:bg-teal-800 text-white p-2 rounded text-sm md:text-base"
                    >
                      Add Review
                    </button>
                  )}

                  {booking.bookingStatus.toLowerCase() !== 'completed' &&
                    booking.bookingStatus.toLowerCase() !== 'cancelled' &&
                    !isBookingDatePassed(booking.bookingDate) && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCancellation(booking.bookingId);
                        }}
                        className="bg-red-600 hover:bg-red-800 text-white p-2 rounded text-sm md:text-base"
                      >
                        Cancel Booking
                      </button>
                    )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No booking history found.</p>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="bg-teal-600 hover:bg-teal-800 text-white p-2 rounded-l disabled:bg-gray-400"
        >
          Prev
        </button>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="bg-teal-600 hover:bg-teal-800 text-white p-2 rounded-r disabled:bg-gray-400"
        >
          Next
        </button>
      </div>

      {/* Modals */}
      {isReviewModalOpen && (
        <ReviewModal
          isOpen={isReviewModalOpen}
          onClose={() => setReviewModalOpen(false)}
          onSubmit={handleReviewSubmit}
        />
      )}
      {isCancellationModalOpen && (
        <ConfirmCancellationModal
          isOpen={isCancellationModalOpen}
          onClose={() => setCancellationModalOpen(false)}
          onConfirm={confirmCancellation}
        />
      )}
    </div>
  );
};

export default BookingHistory;
