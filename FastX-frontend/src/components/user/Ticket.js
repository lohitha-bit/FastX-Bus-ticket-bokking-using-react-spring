import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, Typography, Button, Divider, List, Tag } from 'antd';
import './Ticket.css';

const { Title, Text } = Typography;

const Ticket = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const { booking, passengers, paymentMethod, farePerSeat, selectedSeats } = state || {};

  const seatNumbers = selectedSeats?.map(seat => seat.seatNumber).join(', ') || 'N/A';

  const infoLineStyle = { marginBottom: '8px' };
  const sectionTitleStyle = { textAlign: 'center', marginBottom: '16px' };

  return (
    <div className="ticket-page-container">
      <Card className="ticket-card">
        <div className="ticket-header">
          <Title level={2} className="success-title">🎉 Booking Successful!</Title>
          <Text className="sub-text">Thank you for booking with <b>FastX</b></Text>
        </div>

        <Divider />

        <div className="booking-info">
          <Title level={4} style={sectionTitleStyle}>🚌 Bus & Route Details</Title>
          <div style={infoLineStyle}><Text strong>Bus Name:</Text> <Text>{booking?.bus?.busName}</Text></div>
          <div style={infoLineStyle}><Text strong>Bus Number:</Text> <Text>{booking?.bus?.busNumber}</Text></div>
          <div style={infoLineStyle}><Text strong>Bus Type:</Text> <Text>{booking?.bus?.busType}</Text></div>
          <div style={infoLineStyle}><Text strong>From:</Text> <Text>{booking?.route?.origin}</Text></div>
          <div style={infoLineStyle}><Text strong>To:</Text> <Text>{booking?.route?.destination}</Text></div>
          <div style={infoLineStyle}><Text strong>Journey Date:</Text> <Text>{booking?.journeyDate}</Text></div>
        </div>

        <Divider />

        <div className="booking-info">
          <Title level={4} style={sectionTitleStyle}>📄 Booking Summary</Title>
          <div style={infoLineStyle}><Text strong>Ticket No:</Text> <Text code>{booking?.ticketNumber}</Text></div>
          <div style={infoLineStyle}><Text strong>Status:</Text> <Tag color="green">{booking?.status}</Tag></div>
          <div style={infoLineStyle}><Text strong>Booking Time:</Text> <Text>{new Date(booking?.bookingTime).toLocaleString()}</Text></div>
          <div style={infoLineStyle}><Text strong>Payment Method:</Text> <Text>{paymentMethod}</Text></div>
          <div style={infoLineStyle}><Text strong>Seats:</Text> <Text>{seatNumbers}</Text></div>
          <div style={infoLineStyle}><Text strong>Total Amount:</Text> <Text>₹{booking?.seatIds?.length * farePerSeat}</Text></div>
        </div>

        <Divider />

        <Title level={4} className="passenger-title" style={sectionTitleStyle}>🧍 Passenger Details</Title>
        <List
          itemLayout="horizontal"
          dataSource={passengers}
          renderItem={(p, index) => (
            <List.Item>
              <List.Item.Meta
                title={`Passenger ${index + 1}: ${p.name}`}
                description={
                  <>
                    <Text>Age: {p.age}</Text> | <Text>Gender: {p.gender}</Text> |{' '}
                    <Text>Seat: {selectedSeats?.[index]?.seatNumber || p.seatNumber}</Text>
                  </>
                }
              />
            </List.Item>
          )}
          style={{ marginBottom: '20px' }}
        />

        <Divider />

        <div className="ticket-buttons">
          <Button type="default" onClick={() => window.print()} className="print-btn">
            🖨️ Print Ticket
          </Button>
          <Button type="primary" className="home-btn" onClick={() => navigate('/')}>
            Go to Home Page
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Ticket;
