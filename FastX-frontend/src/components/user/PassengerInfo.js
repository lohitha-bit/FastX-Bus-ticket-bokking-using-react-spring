import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, Typography, Form, Input, Select, Button, message } from 'antd';
import './PassengerInfo.css';

const { Title } = Typography;
const { Option } = Select;

const PassengerInfo = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { booking, paymentMethod, farePerSeat,selectedSeats} = state || {};

  const [form] = Form.useForm();
  const totalPassengers = booking?.seatIds?.length || 0;

  const handleSubmit = (values) => {
    const passengers = Object.keys(values)
      .filter(key => key.startsWith('name'))
      .map((_, index) => ({
        name: values[`name${index}`],
        age: values[`age${index}`],
        gender: values[`gender${index}`],
        seatNumber: selectedSeats[index]?.seatNumber , // map each passenger to their seat
      }));

    message.success("Passenger details saved!");

    navigate('/user/ticket', {
      state: {
        booking,
        passengers,
        paymentMethod,
        farePerSeat,
        selectedSeats  
      }
    });
  };

  return (
    <div className="passenger-info-container">
      <Card className="passenger-card">
        <Title level={3} className="title-purple">Passenger Details</Title>

        <Form layout="vertical" form={form} onFinish={handleSubmit}>
          {Array.from({ length: totalPassengers }, (_, i) => (
            <div key={i} className="passenger-form-group">
              <Title level={5}>Passenger {i + 1}</Title>
              <Form.Item label="Full Name" name={`name${i}`} rules={[{ required: true }]}>
                <Input placeholder="Enter full name" />
              </Form.Item>
              <Form.Item label="Age" name={`age${i}`} rules={[{ required: true }]}>
                <Input type="number" min={1} placeholder="Enter age" />
              </Form.Item>
              <Form.Item label="Gender" name={`gender${i}`} rules={[{ required: true }]}>
                <Select placeholder="Select gender">
                  <Option value="Male">Male</Option>
                  <Option value="Female">Female</Option>
                  <Option value="Other">Other</Option>
                </Select>
              </Form.Item>
            </div>
          ))}

          <Form.Item>
            <Button type="primary" htmlType="submit" block className="confirm-btn">
              Confirm & Show Ticket
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default PassengerInfo;
