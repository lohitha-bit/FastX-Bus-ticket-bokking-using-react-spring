    import React, { useEffect, useState } from 'react';
    import { useLocation, useNavigate } from 'react-router-dom';
    import {
      message,
      Checkbox,
      Radio,
      Slider,
      Typography,
      Spin,
    } from 'antd';
    import axios from 'axios';
    import qs from 'qs';
    import BusCard from '../common/BusCard';

    const { Title, Text } = Typography;

    const amenitiesList = [
      'Wifi', 'Premium', 'Air Conditioning', 'Reclining Seats', 'Reading Lights',
      'Charging Ports', 'Onboard Entertainment', 'Restroom', 'Luggage Storage',
      'Blankets & Pillows', 'Security Cameras', 'Veg Food',
    ];

    const busTypes = ['Sleeper AC', 'Sleeper Non-AC', 'Seater AC', 'Semi-Sleeper'];

    const BusSearch = () => {
      const location = useLocation();
      const navigate = useNavigate();
      const searchParams = new URLSearchParams(location.search);
      const origin = searchParams.get('origin') || '';
      const destination = searchParams.get('destination') || '';
      const date = searchParams.get('date') || '';

      const [fareRange, setFareRange] = useState([0, 2000]);
      const [selectedAmenities, setSelectedAmenities] = useState([]);
      const [selectedBusType, setSelectedBusType] = useState(null);
      const [buses, setBuses] = useState([]);
      const [loading, setLoading] = useState(false);

      useEffect(() => {
        if (!origin || !destination) return;

        const fetchBuses = async () => {
          setLoading(true);
          try {
            const token = localStorage.getItem('token');
            const config = {
              headers: { Authorization: token ? `Bearer ${token}` : '' },
              params: {
                origin,
                destination,
                minFare: fareRange[0],
                maxFare: fareRange[1],
                amenities: selectedAmenities,
                type: selectedBusType ? [selectedBusType] : [],
              },
              paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'repeat' }),
            };

            const res = await axios.get('http://localhost:9000/api/buses/search', config);
            setBuses(res.data);
          } catch (err) {
            console.error(err);
            message.error('Failed to fetch buses.');
            setBuses([]);
          } finally {
            setLoading(false);
          }
        };

        fetchBuses();
      }, [origin, destination, fareRange, selectedAmenities, selectedBusType]);

      const handleBook = (busId) => {
        navigate(`/user/book?busId=${busId}&date=${date}`);
      };

      return (
        <div
          style={{
            display: 'flex',
            gap: 32,
            padding: '24px 32px',
            minHeight: '100vh',
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            color: 'white',
          }}
        >
          {/* Left Filters Section */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: 280 }}>
            <div
              style={{
                background: 'rgb(0, 0, 0)',
                borderRadius: 16,
                padding: 16,
                color: 'white',
                backdropFilter: 'blur(8px)',
              }}
            >
              <Title level={5} style={{ color: '#bb6ae0' }}>Fare Range (₹)</Title>
              <Slider
                range
                min={0}
                max={2000}
                step={50}
                value={fareRange}
                onChange={setFareRange}
                trackStyle={{ backgroundColor: '#a855f7' }}
                handleStyle={[{ borderColor: '#a855f7' }, { borderColor: '#a855f7' }]}
                railStyle={{ backgroundColor: '#d8b4fe' }}
              />
              <Text style={{ color: 'white' }}>₹{fareRange[0]} - ₹{fareRange[1]}</Text>
            </div>

            {/* Amenities */}
            <div
              style={{
                background: 'rgba(0, 0, 0, 1)',
                borderRadius: 16,
                padding: 16,
                color: 'white',
                backdropFilter: 'blur(8px)',
              }}
            >
              <Title level={5} style={{ color: '#bb6ae0' }}>Amenities</Title>
              <Checkbox.Group
                options={amenitiesList}
                value={selectedAmenities}
                onChange={setSelectedAmenities}
                className="white-checkbox-group"
                style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 8 }}
              />
            </div>

            {/* Bus Types (Single Select) */}
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: 16,
                padding: 16,
                color: 'white',
                backdropFilter: 'blur(8px)',
              }}
            >
              <Title level={5} style={{ color: '#bb6ae0' }}>Bus Type</Title>
              <Radio.Group
                options={busTypes}
                value={selectedBusType}
                className="white-checkbox-group"
                onChange={(e) => setSelectedBusType(e.target.value)}
                style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 8 }}
              />
            </div>
          </div>

      
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              maxHeight: 'calc(100vh - 32px)',
              paddingRight: 8,
            }}
          >
            {/* Sticky Header */}
            <div
              style={{
                position: 'sticky',
                top: 0,
                padding: '16px 0',
                zIndex: 10,
                backdropFilter: 'blur(10px)',
              }}
            >
              <Title level={4} style={{ color: '#ffffff', textAlign: 'center' ,fontSize: '40px'}}>
                Showing Buses from{' '}
                <span style={{ fontWeight: 'bold', color: '#FFD700' }}>{origin}</span> →{' '}
                <span style={{ fontWeight: 'bold', color: '#FFD700' }}>{destination}</span>
              </Title>
            </div>

            {/* Bus Cards */}
            <div style={{ marginTop: 16 }}>
              {loading ? (
                <div style={{ textAlign: 'center', marginTop: 100 }}>
                  <Spin tip="Loading buses..." size="large" />
                </div>
              ) : buses.length === 0 ? (
                <Text style={{ color: '#ddd' }}>No buses found for the selected filters.</Text>
              ) : (
                buses.map((bus) => (
                  <BusCard
                    key={bus.busId}
                    bus={{
                      id: bus.busId,
                      name: bus.busName,
                      type: bus.busType,
                      fare: bus.fare,
                      amenities: bus.amenities,
                      imageUrl: bus.imageUrl,
                    }}
                    origin={origin}
                    destination={destination}
                    onBook={handleBook}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      );        
    };

    export default BusSearch;
        