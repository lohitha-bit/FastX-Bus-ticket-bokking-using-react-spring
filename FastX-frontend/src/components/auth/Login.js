import React, { useState } from 'react';
import { Form, Button, Segment, Header, Icon, Message, Divider } from 'semantic-ui-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e, { name, value }) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.post('http://localhost:9000/api/auth/login', formData);
      const token = res.data.token.replace('Bearer ', ''); 
      localStorage.setItem('token', token);

      localStorage.setItem('user', JSON.stringify({
      userId: res.data.userId,
      email: res.data.email,
      role: res.data.role
    }));

      const decoded = jwtDecode(token);
      const role = decoded.role || res.data.role;

      // Redirect based on role
      if (role === 'USER') navigate('/user/dashboard');
      else if (role === 'BUS_OPERATOR') navigate('/operator/dashboard');
      else if (role === 'ADMIN') navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Segment
  padded="very"
  stacked
  style={{
    maxWidth: 500,
    margin: 'auto',
    marginTop: '5em',
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
    <Icon name="sign-in" />
    Login to FastX
  </Header>

  <Form onSubmit={handleSubmit} loading={loading} error={!!error}>
    <Form.Input
      label={<span style={{ color: '#333' }}>Email</span>}
      icon="mail"
      iconPosition="left"
      placeholder="Enter your email"
      name="email"
      value={formData.email}
      onChange={handleChange}
      required
    />
    <Form.Input
      label={<span style={{ color: '#333' }}>Password</span>}
      icon="lock"
      iconPosition="left"
      placeholder="Enter your password"
      name="password"
      type="password"
      value={formData.password}
      onChange={handleChange}
      required
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
      Login
    </Button>

    <div style={{ marginTop: '1em', textAlign: 'center' }}>
      <Button disabled icon="google" content="Sign in with Google" basic />
    </div>

    <Divider />

    <div style={{ textAlign: 'center' }}>
      <span style={{ color: '#555' }}>Don't have an account?</span>
      <Button
        basic
        color="black"
        size="tiny"
        onClick={() => navigate('/register')}
        style={{ marginLeft: '5px' }}
      >
        Register Now
      </Button>
    </div>

    <div style={{ textAlign: 'center', marginTop: '1em' }}>
      <Button basic color="grey" size="tiny" onClick={() => navigate('/forgot-password')}>
        Forgot Password?
      </Button>
    </div>
  </Form>
</Segment>

  );
};

export default Login;
