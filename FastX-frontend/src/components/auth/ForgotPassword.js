import React, { useState } from 'react';
import { Form, Button, Segment, Header, Icon, Message } from 'semantic-ui-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [formData, setFormData] = useState({ email: '', newPassword: '' });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e, { name, value }) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setSuccess('');
    setError('');

    try {
      const response = await axios.post('http://localhost:9000/api/users/forgot-password', formData);
      setSuccess(response.data);
      setFormData({ email: '', newPassword: '' });
    } catch (err) {
      setError(err.response?.data || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Segment
      padded="very"
      style={{
        maxWidth: 500,
        margin: '5em auto',
        background: '#ffffff',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        borderRadius: '10px',
        color: '#1a1a1a',
      }}
    >
      <Header
        as="h2"
        icon
        textAlign="center"
        style={{
          color: '#333',
          fontWeight: 'bold',
          marginBottom: '2rem',
        }}
      >
        <Icon name="unlock alternate" style={{ color: '#1a1a1a' }} />
        Forgot Password
      </Header>

      <Form onSubmit={handleSubmit} loading={loading} success={!!success} error={!!error}>
        <Form.Input
          label={<span style={{ color: '#222' }}>Email</span>}
          icon="mail"
          iconPosition="left"
          placeholder="Enter your registered email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <Form.Input
          label={<span style={{ color: '#222' }}>New Password</span>}
          icon="lock"
          iconPosition="left"
          placeholder="Enter new password"
          type="password"
          name="newPassword"
          value={formData.newPassword}
          onChange={handleChange}
          required
        />

        <Message
          success
          content={success}
          style={{ background: '#e0f7e9', color: '#276749' }}
        />
        <Message
          error
          content={error}
          style={{ background: '#fdecea', color: '#b71c1c' }}
        />

        <Button
          fluid
          style={{
            backgroundColor: '#1a1a1a',
            color: '#fff',
            marginTop: '1rem',
          }}
        >
          Reset Password
        </Button>

        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <Button
            basic
            color="grey"
            size="tiny"
            onClick={() => navigate('/login')}
          >
            Back to Login
          </Button>
        </div>
      </Form>
    </Segment>
  );
};

export default ForgotPassword;
