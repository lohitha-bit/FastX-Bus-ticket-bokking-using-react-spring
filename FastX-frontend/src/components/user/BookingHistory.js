import React, { useEffect, useState } from 'react';
import { Card, Button, Tag, Modal, Typography, Spin, message } from 'antd';
import axios from 'axios';
import './BookingHistory.css';

const { Title, Text } = Typography;

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancelId, setCancelId] = useState(null);

  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user?.userId;

  useEffect(() => {
    const fetchBookingSummary = async () => {
      try {
        const res = await axios.get(`http://localhost:9000/api/bookings/user/${userId}/summary`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setBookings(res.data);
      } catch (error) {
        console.error(error);
        message.error("Failed to fetch booking history");
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchBookingSummary();
  }, [userId]);

  const handleCancelBooking = async (bookingId) => {
    try {
      await axios.post(`http://localhost:9000/api/cancellations/${bookingId}?reason=User Requested`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      message.success("Booking cancelled successfully!");
      setBookings(prev =>
        prev.map(b =>
          b.bookingId === bookingId ? { ...b, status: 'CANCELLED' } : b
        )
      );
    } catch (error) {
      console.error("Cancellation failed:", error.response?.data || error.message);
      message.error("Cancellation failed.");
    }
  };

  const confirmCancel = (bookingId) => {
    setCancelId(bookingId);
  };

  const isUpcoming = (journeyDate) => {
    return new Date(journeyDate) >= new Date();
  };

  const upcomingConfirmed = bookings
    .filter(b => b.status === 'CONFIRMED' && isUpcoming(b.journeyDate))
    .sort((a, b) => new Date(a.journeyDate) - new Date(b.journeyDate));

  const nextUpcomingTicketNumber = upcomingConfirmed.length > 0 ? upcomingConfirmed[0].ticketNumber : null;

  if (loading) return <Spin size="large" style={{ display: 'block', margin: 'auto', padding: 40 }} />;

  return (
    <div className="booking-history-container">
      <Title level={2} className="title-purple">📜 My Booking History</Title>

      {bookings.length === 0 ? (
        <Text>No bookings found.</Text>
      ) : (
        <div className="bookings-grid">
          {bookings.map(booking => (
            <Card
              key={booking.ticketNumber}
              className={`booking-card 
                ${isUpcoming(booking.journeyDate) ? 'upcoming' : ''} 
                ${booking.ticketNumber === nextUpcomingTicketNumber ? 'highlight' : ''}`}
              aria-label={`Booking details for ticket ${booking.ticketNumber}`}
            >
              <div className="booking-header">
                <Title level={4}>Ticket #{booking.ticketNumber}</Title>
                <Tag color={booking.status === 'CONFIRMED' ? 'green' : 'red'}>{booking.status}</Tag>
              </div>

              <div className="booking-details">
                <Text><strong>From:</strong> {booking.origin}</Text><br />
                <Text><strong>To:</strong> {booking.destination}</Text><br />
                <Text><strong>Bus:</strong> {booking.busName} ({booking.busType})</Text><br />
                <Text><strong>Journey Date:</strong> {booking.journeyDate}</Text><br />
                <Text><strong>Seats:</strong> {booking.seatNumbers.join(', ')}</Text><br />
                <Text><strong>Total Fare:</strong> ₹{booking.totalFare}</Text><br />
                <Text><strong>Booked At:</strong> {new Date(booking.bookingTime).toLocaleString()}</Text>
              </div>

              {booking.status === 'CONFIRMED' && (
                <Button danger onClick={() => confirmCancel(booking.bookingId)} className="cancel-btn">
                  Cancel Booking
                </Button>
              )}
            </Card>
          ))}
        </div>
      )}

      <Modal
        title="Confirm Cancellation"
        open={!!cancelId}
        onOk={() => {
          handleCancelBooking(cancelId);
          setCancelId(null);
        }}
        onCancel={() => setCancelId(null)}
        okText="Yes, Cancel"
        cancelText="No"
      >
        <p>Are you sure you want to cancel this booking?</p>
      </Modal>
    </div>
  );
};

export default BookingHistory;
