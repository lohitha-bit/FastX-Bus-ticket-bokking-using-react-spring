import React from 'react';
import { Card, Button, Tag, Tooltip, Typography } from 'antd';
import {
  WifiOutlined,
  ThunderboltOutlined,
  CloudOutlined,
  CustomerServiceOutlined,
  ReadOutlined,
  UsbOutlined,
  VideoCameraOutlined,
  RestOutlined,
  CarryOutOutlined,
  SecurityScanOutlined,
  ForkOutlined,
} from '@ant-design/icons';

const { Title, Text } = Typography;

const amenityIcons = {
  Wifi: <WifiOutlined style={{ color: 'red' }} />,
  Premium: <ThunderboltOutlined style={{ color: 'red' }} />,
  'Air Conditioning': <CloudOutlined style={{ color: 'red' }} />,
  'Reclining Seats': <CustomerServiceOutlined style={{ color: 'red' }} />,
  'Reading Lights': <ReadOutlined style={{ color: 'red' }} />,
  'Charging Ports': <UsbOutlined style={{ color: 'red' }} />,
  'Onboard Entertainment': <VideoCameraOutlined style={{ color: 'red' }} />,
  Restroom: <RestOutlined style={{ color: 'red' }} />,
  'Luggage Storage': <CarryOutOutlined style={{ color: 'red' }} />,
  'Security Cameras': <SecurityScanOutlined style={{ color: 'red' }} />,
  'Veg Food': <ForkOutlined style={{ color: 'red' }} />,
  'Blankets & Pillows': <CustomerServiceOutlined style={{ color: 'red' }} />,
};

const BusCard = ({ bus, origin, destination, onBook }) => {
  return (
    <Card
  hoverable
  style={{
    marginBottom: 16,
    background: '#1a1a1a',
    borderRadius: 12,
    color: '#fff',
    boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
    border: '1px solid #333',
  }}
  bodyStyle={{
    padding: 16,
    display: 'flex',
    flexWrap: 'wrap',
    gap: 16,
    alignItems: 'center',
  }}
>
  <img
    src={bus.imageUrl || '/bus-img.jpg'}
    alt={bus.name || 'Unnamed Bus'}
    style={{
      width: 140,
      height: 100,
      objectFit: 'cover',
      borderRadius: 10,
      flexShrink: 0,
    }}
  />

  <div style={{ flex: 1, minWidth: 220 }}>
    <Title level={5} style={{ color: '#bb6ae0', marginBottom: 8 }}>
      {bus.name || 'Unnamed Bus'} ({bus.type || 'Unknown'})
    </Title>

    <Text style={{ color: '#ccc', marginBottom: 8 }}>
      <b>Route:</b> {origin || '-'} → {destination || '-'}
    </Text>
    <br />
    <Text style={{ color: '#ccc' }}>
      <b>Fare:</b> ₹{bus.fare ?? 'N/A'}
    </Text>

    <div style={{ marginTop: 8 }}>
      <Text strong style={{ display: 'block', marginBottom: 4, color: '#eee' }}>
        Amenities
      </Text>
      {(bus.amenities || []).map((amenity) => (
        <Tooltip key={amenity} title={amenity}>
          <Tag
            icon={amenityIcons[amenity]}
            color="purple"
            style={{
              marginBottom: 6,
              fontWeight: 'bold',
              fontSize: '0.85rem',
              background: '#2e003e',
              color: '#fff',
              border: '1px solid #bb6ae0',
            }}
          >
            {amenity}
          </Tag>
        </Tooltip>
      ))}
    </div>
  </div>

  <div style={{ minWidth: 100 }}>
    <Button
      type="primary"
      size="middle"
      style={{
        backgroundColor: '#bb6ae0',
        borderColor: '#bb6ae0',
        fontWeight: 'bold',
      }}
      onClick={() => onBook(bus.id)}
    >
      Book
    </Button>
  </div>
</Card>

  );
};

export default BusCard;
