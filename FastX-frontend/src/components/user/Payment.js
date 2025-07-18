import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, Typography, Radio, Input, Button, Form, message, Spin, Divider } from 'antd';
import './Payment.css';

const { Title, Text } = Typography;

const Payment = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { booking, farePerSeat,selectedSeats } = state || {};

  const [method, setMethod] = useState('');
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handlePaymentSubmit = async (values) => {
  if (!method) {
    message.warning("Please select a payment method");
    return;
  }

  try {
    setLoading(true);
    const token = localStorage.getItem("token");

    // Backend Payment API call
    const res = await fetch(`http://localhost:9000/api/payments/${booking.bookingId}?method=${method}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new Error("Payment failed");

    const payment = await res.json(); // paymentDTO returned from backend

    message.success("Payment Successful!");

    navigate('/user/passenger-info', {
      state: {
        booking,
        paymentMethod: payment.method,
        farePerSeat,
        selectedSeats
      }
    });
  } catch (err) {
    console.error(err);
    message.error("Payment failed. Please try again.");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="payment-page-container">
      <Card className="payment-card">
        <Title level={3} className="title-purple">Complete Your Payment</Title>
        <Divider />

        <Text className="label">Amount to Pay:</Text>
        <Text strong style={{ fontSize: '18px', marginLeft: 8 }}>₹{booking?.seatIds?.length * farePerSeat}</Text>

        <Form
          form={form}
          onFinish={handlePaymentSubmit}
          layout="vertical"
          style={{ marginTop: 30 }}
        >
          <Form.Item label="Select Payment Method" required>
            <Radio.Group
              onChange={e => setMethod(e.target.value)}
              value={method}
              className="radio-group"
            >
              <Radio value="UPI">UPI</Radio>
              <Radio value="CARD">Card</Radio>
              <Radio value="COD">Cash on Boarding</Radio>
            </Radio.Group>
          </Form.Item>

          {method === 'CARD' && (
            <>
              <Form.Item label="Card Number" name="cardNumber" rules={[{ required: true, message: 'Enter card number' }]}>
                <Input placeholder="1234 5678 9012 3456" />
              </Form.Item>
              <Form.Item label="Expiry Date" name="expiry" rules={[{ required: true }]}>
                <Input placeholder="MM/YY" />
              </Form.Item>
              <Form.Item label="CVV" name="cvv" rules={[{ required: true }]}>
                <Input.Password placeholder="***" />
              </Form.Item>
            </>
          )}

          {method === 'UPI' && (
            <Form.Item label="UPI ID" name="upiId" rules={[{ required: true }]}>
              <Input placeholder="yourname@bank" />
            </Form.Item>
          )}

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="confirm-btn"
              block
              loading={loading}
              style={{ backgroundColor: '#6B008C', borderColor: '#6B008C' }}
            >
              {loading ? 'Processing...' : 'Pay Now'}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Payment;
