/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authAxios from '../../redux/api/authApi';
import { FaCalendarAlt, FaUserFriends } from 'react-icons/fa';
import ReviewModal from './AddReview';

interface Booking {
  bookingId: string;
  restaurantId: string;
  featuredImage: string;
  restaurantName: string;
  bookingStatus: string;
  guests: number;
  bookingDate: string;
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
    <div className="bg-gray-300 h-[120px] w-[200px] rounded-lg"></div>
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

  useEffect(() => {
    const fetchBookingData = async () => {
      try {
        if (userId) {
          setLoading(true);
          const res = await authAxios.get(`/booking-history/${userId}`);
          const bookings = res.data.bookingDatas.map((booking: any) => ({
            bookingId: booking.bookingId,
            restaurantId: booking.restaurantId._id, // Store the restaurantId
            featuredImage: booking.restaurantId.featuredImage,
            restaurantName: booking.restaurantId.restaurantName,
            bookingStatus: booking.bookingStatus,
            guests: booking.tableId.tableCapacity,
            bookingDate: booking.bookingDate,
          }));
          setBookingDetails(bookings);
          setLoading(false);
        } else {
          console.error("Unauthorized access or invalid role");
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching booking data", error);
        setLoading(false);
      }
    };
    fetchBookingData();
  }, [userId]);

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
        userId,  // Include the userId in the review submission
      });
      console.log("Review submitted successfully");
    } catch (error) {
      console.error("Error submitting review:", error);
    } finally {
      setReviewModalOpen(false); // Close the modal after submitting
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Booking History</h2>
      <div className="space-y-4">
        {loading ? (
          Array.from({ length: 3 }).map((_, index) => <Shimmer key={index} />)
        ) : bookingDetails.length > 0 ? (
          bookingDetails.map((booking, index) => (
            <div
              key={index}
              className="bg-gray-100 p-4 rounded-lg shadow-md cursor-pointer"
              onClick={() => handleBookingClick(booking.bookingId)}
            >
              <div className="flex items-center space-x-4">
                <img
                  src={booking.featuredImage}
                  alt={booking.restaurantName}
                  className="w-[200px] h-[120px] object-cover rounded-lg"
                />
                <div className="flex-grow">
                  <h3 className="text-xl text-teal-700 font-bold mb-2">{booking.restaurantName}</h3>
                  <p className="flex items-center">
                    <FaCalendarAlt className="mr-2" />
                    {new Date(booking.bookingDate).toLocaleDateString()}
                  </p>
                  <p className="flex items-center">
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
                {booking.bookingStatus.toLowerCase() === 'completed' && (
                  <div className="flex-grow">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddReview(booking.restaurantId);
                      }}
                      className="bg-teal-600 hover:bg-teal-800 text-white p-2 rounded"
                    >
                      Add Review
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>No booking history found.</p>
        )}
      </div>

      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setReviewModalOpen(false)}
        onSubmit={handleReviewSubmit}
      />
    </div>
  );
};

export default BookingHistory;
