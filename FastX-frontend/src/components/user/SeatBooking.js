import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Spin, Button, Typography, Divider, message } from 'antd';
import './SeatBooking.css';

const { Title, Text } = Typography;

const statusColors = {
  AVAILABLE: '#4caf50',
  BOOKED: '#f44336',
  RESERVED: '#2196f3',
  SELECTED: '#9c27b0',
};

const SeatBooking = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const busId = searchParams.get('busId');
  const date = searchParams.get('date');

  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [seatPrice, setSeatPrice] = useState(0);

  useEffect(() => {
    const fetchSeats = async () => {
      try {
        const token = localStorage.getItem('token');
        const [seatsRes, busRes] = await Promise.all([
          axios.get(`http://localhost:9000/api/seats/bus/${busId}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`http://localhost:9000/api/buses/${busId}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);
        setSeats(seatsRes.data);
        setSeatPrice(busRes.data.fare || 500);
      } catch (err) {
        console.error(err);
        message.error('Error fetching seat/bus data');
      } finally {
        setLoading(false);
      }
    };
    if (busId) fetchSeats();
  }, [busId]);

  const toggleSeat = (seat) => {
    if (seat.status !== 'AVAILABLE') return;
    const isSelected = selectedSeats.find((s) => s.seatId === seat.seatId);
    if (isSelected) {
      setSelectedSeats((prev) =>
        prev.filter((s) => s.seatId !== seat.seatId)
      );
    } else {
      setSelectedSeats((prev) => [...prev, seat]);
    }
  };

  
  const seatRows = {};
  seats.forEach((seat) => {
    const row = seat.seatNumber.slice(1); 
    const col = seat.seatNumber.charAt(0); 
    if (!seatRows[row]) seatRows[row] = {};
    seatRows[row][col] = seat;
  });

  const sortedRowNumbers = Object.keys(seatRows).sort(
    (a, b) => parseInt(a) - parseInt(b)
  );

  const handleConfirm = () => {
    if (selectedSeats.length === 0) {
      message.warning('Select at least one seat!');
      return;
    }
    navigate('/user/booking', {
      state: {
        busId,
        date,
        selectedSeats,
        farePerSeat: seatPrice,
        totalPrice: selectedSeats.length * seatPrice,
      },
    });
  };

  return (
    <div className="seat-booking-container">
      <div className="seat-layout">
        <Title level={3} className="title-purple center-text" style={{fontSize: '40px',color: 'white'}}>Select Your Seats</Title>
        {loading ? (
          <Spin size="large" />
        ) : (
          <div className="seat-matrix">
            {sortedRowNumbers.map((rowNum) => (
              <div className="seat-row" key={rowNum}>
                {['A', 'B', 'C'].map((letter) => {
                  const seat = seatRows[rowNum][letter];
                  return (
                    <div
                      key={letter + rowNum}
                      className="seat"
                      style={{
                        backgroundColor: selectedSeats.find(
                          (s) => s.seatId === seat?.seatId
                        )
                          ? statusColors.SELECTED
                          : statusColors[seat?.status] || '#555',
                        cursor:
                          seat?.status === 'AVAILABLE'
                            ? 'pointer'
                            : 'not-allowed',
                      }}
                      onClick={() => seat && toggleSeat(seat)}
                    >
                      {seat?.seatNumber}
                    </div>
                  );
                })}
                <div className="aisle-gap" />
                {(() => {
                  const seat = seatRows[rowNum]['D'];
                  return (
                    <div
                      key={'D' + rowNum}
                      className="seat"
                      style={{
                        backgroundColor: selectedSeats.find(
                          (s) => s.seatId === seat?.seatId
                        )
                          ? statusColors.SELECTED
                          : statusColors[seat?.status] || '#555',
                        cursor:
                          seat?.status === 'AVAILABLE'
                            ? 'pointer'
                            : 'not-allowed',
                      }}
                      onClick={() => seat && toggleSeat(seat)}
                    >
                      {seat?.seatNumber}
                    </div>
                  );
                })()}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="booking-summary">
        <Title level={4} className="summary-title center-text" style={{color: 'white'}}>Booking Summary</Title>
        <Divider className="divider-light" />
        <Text className="summary-label">Fare per Seat: ₹{seatPrice}</Text>
        <Text className="summary-label">Selected Seats:</Text>
        <ul className="selected-seats-list">
          {selectedSeats.length === 0 ? (
            <li>None</li>
          ) : (
            selectedSeats.map((seat) => (
              <li key={seat.seatId} className="selected-seat-item">
                {seat.seatNumber}
              </li>
            ))
          )}
        </ul>
        <Divider className="divider-light" />
        <Text className="summary-total">
          Total Price: ₹{selectedSeats.length * seatPrice}
        </Text>
        <Button
          type="primary"
          disabled={selectedSeats.length === 0}
          className="btn-proceed"
          onClick={handleConfirm}
        >
          Proceed to Pay
        </Button>
      </div>
    </div>
  );
};

export default SeatBooking;
