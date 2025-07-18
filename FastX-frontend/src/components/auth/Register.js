// src/components/auth/Register.js
import React, { useState } from 'react';
import {
  Form,
  Button,
  Segment,
  Header,
  Icon,
  Message,
  Dropdown,
} from 'semantic-ui-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const roleOptions = [
  { key: 'user', value: 'passenger', text: 'User' },
  { key: 'operator', value: 'bus operator', text: 'Bus Operator' },
  { key: 'admin', value: 'admin', text: 'Admin' },
];

const genderOptions = [
  { key: 'm', value: 'Male', text: 'Male' },
  { key: 'f', value: 'Female', text: 'Female' },
  { key: 'o', value: 'Other', text: 'Other' },
];

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    email: '',
    contactNumber: '',
    password: '',
    role: '',
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e, { name, value }) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    setSuccessMsg('');
    try {
      const res = await axios.post('http://localhost:9000/api/users/register', formData);
      setSuccessMsg(res.data);
      setFormData({
        name: '',
        gender: '',
        email: '',
        contactNumber: '',
        password: '',
        role: '',
      });
    } catch (err) {
      setError(err.response?.data || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Segment
  stacked
  padded="very"
  style={{
    maxWidth: 600,
    margin: '5em auto',
    background: '#fff',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    color: '#1a1a1a',
  }}
>
  <Header
    as="h2"
    icon
    textAlign="center"
    style={{ color: '#1a1a1a', fontWeight: 'bold' }}
  >
    <Icon name="signup" />
    Register New Account
  </Header>

  <Form onSubmit={handleSubmit} loading={loading} success={!!successMsg} error={!!error}>
    <Form.Input
      label={<span style={{ color: '#333' }}>Full Name</span>}
      placeholder="Enter your full name"
      name="name"
      value={formData.name}
      onChange={handleChange}
      required
    />
    <Form.Field>
      <label style={{ color: '#333' }}>Gender</label>
      <Dropdown
        placeholder="Select Gender"
        fluid
        selection
        options={genderOptions}
        name="gender"
        value={formData.gender}
        onChange={handleChange}
        required
      />
    </Form.Field>
    <Form.Input
      label={<span style={{ color: '#333' }}>Email</span>}
      name="email"
      placeholder="Enter your email"
      value={formData.email}
      onChange={handleChange}
      icon="mail"
      iconPosition="left"
      required
      type="email"
    />
    <Form.Input
      label={<span style={{ color: '#333' }}>Mobile Number</span>}
      name="contactNumber"
      placeholder="Enter mobile number"
      value={formData.contactNumber}
      onChange={handleChange}
      icon="phone"
      iconPosition="left"
      required
    />
    <Form.Input
      label={<span style={{ color: '#333' }}>Password</span>}
      name="password"
      type="password"
      placeholder="Create password"
      value={formData.password}
      onChange={handleChange}
      icon="lock"
      iconPosition="left"
      required
    />
    <Form.Field>
      <label style={{ color: '#333' }}>Role</label>
      <Dropdown
        placeholder="Select Role"
        fluid
        selection
        options={roleOptions}
        name="role"
        value={formData.role}
        onChange={handleChange}
        required
      />
    </Form.Field>

    <Message
      success
      content={successMsg}
      style={{ backgroundColor: '#e0f7e9', color: '#276749' }}
    />
    <Message
      error
      content={error}
      style={{ backgroundColor: '#fdecea', color: '#b71c1c' }}
    />

    <Button
      fluid
      style={{
        backgroundColor: '#1a1a1a',
        color: 'white',
        marginTop: '1em',
      }}
    >
      Register
    </Button>

    <div style={{ textAlign: 'center', marginTop: '1.5em' }}>
      Already have an account?{' '}
      <Button
        basic
        color="black"
        size="tiny"
        onClick={() => navigate('/login')}
        style={{ marginLeft: '5px' }}
      >
        Login
      </Button>
    </div>
  </Form>
</Segment>

  );
};

export default Register;
