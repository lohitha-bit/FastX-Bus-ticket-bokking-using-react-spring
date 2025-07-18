import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Typography, Button, Card, Divider, message, Spin } from 'antd';
import './Booking.css';

const { Title, Text } = Typography;

const Booking = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const { busId, date, selectedSeats, farePerSeat, totalPrice } = state || {};
  const [busDetails, setBusDetails] = useState(null);
  const [routeDetails, setRouteDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('token');
  const userId = JSON.parse(localStorage.getItem('user'))?.userId;

  useEffect(() => {
    const fetchBusAndRoute = async () => {
      try {
        const busRes = await axios.get(`http://localhost:9000/api/buses/${busId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const bus = busRes.data;
        setBusDetails(bus);

        if (bus.routeId) {
          const routeRes = await axios.get(`http://localhost:9000/api/routes/${bus.routeId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setRouteDetails(routeRes.data);
        }
      } catch (err) {
        console.error(err);
        message.error('Failed to load booking details.');
      } finally {
        setLoading(false);
      }
    };

    if (busId) fetchBusAndRoute();
  }, [busId]);

  const handleConfirmBooking = async () => {
    try {
      const seatIds = selectedSeats.map(seat => seat.seatId);
      const body = {
        userId,
        routeId: routeDetails?.routeId,
        busId,
        seatIds,
      };
      console.log("Booking Body:", body); 
      const res = await axios.post('http://localhost:9000/api/bookings', body, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const booking = res.data;
      message.success('Booking Confirmed!');
      navigate('/user/payment', {
  state: {
    booking: {
      ...booking,
      bus: busDetails,
      route: routeDetails,
      journeyDate: date
    },
    farePerSeat,
    selectedSeats
  }
});
    } catch (err) {
      console.error(err);
      message.error('Failed to confirm booking.');
    }
  };

  if (loading || !busDetails || !routeDetails) {
    return <Spin size="large" style={{ display: 'block', margin: 'auto', padding: '40px' }} />;
  }

  return (
    <div className="booking-page-container">
      <Card className="booking-card">
      <Title level={3} className="title-purple">Review Your Booking</Title>
      <Divider className="divider" />

      <Text className="label">Bus Name:</Text> <Text strong>{busDetails.busName}</Text><br />
      <Text className="label">Bus Number:</Text> <Text>{busDetails.busNumber}</Text><br />
      <Text className="label">Type:</Text> <Text>{busDetails.busType}</Text><br />

      <Text className="label">From:</Text> <Text>{routeDetails.origin}</Text><br />
      <Text className="label">To:</Text> <Text>{routeDetails.destination}</Text><br />
      <Text className="label">Journey Date:</Text> <Text>{date}</Text><br />

      <Text className="label">Selected Seats:</Text> <Text>{selectedSeats.map(s => s.seatNumber).join(', ')}</Text><br />
      <Text className="label">Fare per Seat:</Text> <Text>₹{farePerSeat}</Text><br />
      <Text className="label">Total Price:</Text><Text>₹{totalPrice}</Text> <br />

      <Divider className="divider" />
      <Button type="primary" className="confirm-btn" onClick={handleConfirmBooking}>
        Confirm Booking
      </Button>
    </Card>

    </div>
  );
};

export default Booking;
