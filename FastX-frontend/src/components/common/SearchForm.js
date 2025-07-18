import React, { useState } from 'react';
import {
  AutoComplete,
  DatePicker,
  Button,
  Row,
  Col,
  Space,
  message,
  Typography,
} from 'antd';
import dayjs from 'dayjs';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const { Text } = Typography;

const SearchForm = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState(null);
  const [originOptions, setOriginOptions] = useState([]);
  const [destinationOptions, setDestinationOptions] = useState([]);

  const navigate = useNavigate();
  const LOCATION_API = 'http://localhost:9000/api/locations/search?query=';

  const fetchSuggestions = async (value, type) => {
  if (!value.trim()) return;

  try {
    console.log(`Fetching suggestions for "${value}" (${type})`);

    const res = await axios.get(`${LOCATION_API}${value}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    const options = res.data.map((loc) => ({
      value: loc,
      label: (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <i className="fas fa-map-marker-alt" style={{ color: '#bb6ae0' }} />
          {loc}
        </div>
      ),
    }));

    console.log('Options received:', options);

    if (type === 'origin') setOriginOptions(options);
    else setDestinationOptions(options);
  } catch (err) {
    console.error('Suggestion fetch failed:', err);
    if (type === 'origin') setOriginOptions([]);
    else setDestinationOptions([]);
  }
};


  const disabledDate = (current) => current && current < dayjs().startOf('day');
  const setToday = () => setDate(dayjs());
  const setTomorrow = () => setDate(dayjs().add(1, 'day'));

  const handleSearch = () => {
    if (!origin || !destination || !date)
      return message.error('Please fill all fields');

    if (origin.toLowerCase() === destination.toLowerCase())
      return message.error('Origin and Destination must differ');

    const formattedDate = date.format('YYYY-MM-DD');
    navigate(`/user/search?origin=${origin}&destination=${destination}&date=${formattedDate}`);

  };

  return (
    <div
  style={{
    padding: '3rem 2rem',
    marginBottom: '8rem',
    borderRadius: '20px',
    background: 'linear-gradient(145deg, #1a001f, #2d003a)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    color: '#fff',
    boxShadow: '0 8px 25px rgba(0,0,0,0.3)',
  }}
>

      <Text style={{ fontSize: '1.5rem', color: '#f6e9ff', fontWeight: '600' }}>
        Plan Your Journey
      </Text>

      <Row gutter={[20, 20]} style={{ marginTop: '1.5rem' }} justify="center">
        <Col xs={24} sm={12} md={6}>
          <AutoComplete
            size="large"
            options={originOptions}
            onSearch={(val) => fetchSuggestions(val, 'origin')}
            onSelect={setOrigin}
            value={origin}
            onChange={setOrigin}
            placeholder="Origin"
            style={{ width: '100%' }}
            allowClear
            filterOption={false} // 🔥 CRITICAL for remote filtering
          />
        </Col>

        <Col xs={24} sm={12} md={6}>
          <AutoComplete
            size="large"
            options={destinationOptions}
            onSearch={(val) => fetchSuggestions(val, 'destination')}
            onSelect={setDestination}
            value={destination}
            onChange={setDestination}
            placeholder="Destination"
            style={{ width: '100%' }}
            allowClear
            filterOption={false} 
          />
        </Col>

        <Col xs={24} sm={12} md={6}>
          <DatePicker
            size="large"
            disabledDate={disabledDate}
            value={date}
            onChange={setDate}
            style={{ width: '100%' }}
            placeholder="Journey Date"
          />
          <Space style={{ marginTop: '0.5rem' }}>
            <Button
              size="middle"
              onClick={setToday}
              style={{
                background: 'linear-gradient(135deg, #b26ce1, #8c3ebf)',
                color: '#fff',
                border: 'none',
                fontWeight: 'bold',
                boxShadow: '0 3px 10px rgba(187, 106, 224, 0.3)',
              }}
              onMouseEnter={(e) => (e.target.style.filter = 'brightness(1.1)')}
              onMouseLeave={(e) => (e.target.style.filter = 'brightness(1.0)')}
            >
              Today
            </Button>

            <Button
              size="middle"
              onClick={setTomorrow}
              style={{
                background: 'linear-gradient(135deg, #b26ce1, #8c3ebf)',
                color: '#fff',
                border: 'none',
                fontWeight: 'bold',
                boxShadow: '0 3px 10px rgba(187, 106, 224, 0.3)',
              }}
              onMouseEnter={(e) => (e.target.style.filter = 'brightness(1.1)')}
              onMouseLeave={(e) => (e.target.style.filter = 'brightness(1.0)')}
            >
              Tomorrow
            </Button>
          </Space>
        </Col>

        <Col xs={24} sm={12} md={4}>
          <Button
            type="primary"
            size="large"
            block
            style={{
              backgroundColor: '#bb6ae0',
              borderColor: '#bb6ae0',
              fontWeight: 'bold',
              height: '48px',
              boxShadow: '0 6px 20px rgba(187, 106, 224, 0.4)',
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = '#a94bcf')}
            onMouseLeave={(e) => (e.target.style.backgroundColor = '#bb6ae0')}
            onClick={handleSearch}
          >
            Search
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default SearchForm;
