import { Card, Row, Col, Typography } from 'antd';
import { CheckCircleOutlined, ClockCircleOutlined, SafetyCertificateOutlined } from '@ant-design/icons';

const { Title } = Typography;

const features = [
  {
    title: 'Easy Booking',
    description: 'Smooth and user-friendly interface to search and book buses in seconds.',
    icon: <CheckCircleOutlined style={{ fontSize: '2rem', color: '#bb6ae0' }} />
  },
  {
    title: 'On-Time Guarantee',
    description: 'We ensure punctual schedules and fast updates on delays.',
    icon: <ClockCircleOutlined style={{ fontSize: '2rem', color: '#bb6ae0' }} />
  },
  {
    title: 'Secure Payments',
    description: 'Payments are encrypted and 100% secure using trusted gateways.',
    icon: <SafetyCertificateOutlined style={{ fontSize: '2rem', color: '#bb6ae0' }} />
  }
];

const WhyChooseUs = () => (
  <div
    style={{
      marginTop: '4rem',
      padding: '2rem',
      background: 'linear-gradient(135deg, #1a001f 0%, #2d003a 100%)',
      borderRadius: '20px',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
      color: '#fff',
      textAlign: 'center'
    }}
  >
    <Title level={2} style={{ color: '#f3e6ff', marginBottom: '2.5rem' }}>
      Why Choose FastX?
    </Title>

    <Row justify="center" gutter={[30, 30]}>
      {features.map((feat, idx) => (
        <Col xs={24} sm={12} md={6} key={idx}>
          <Card
            bordered={false}
            hoverable
            style={{
              borderRadius: '16px',
              background: 'rgba(255, 255, 255, 0.05)',
              color: '#fff',
              backdropFilter: 'blur(12px)',
              minHeight: '240px',
              boxShadow: '0 6px 25px rgba(187, 106, 224, 0.2)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              padding: '1.5rem 1rem',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 12px 30px rgba(187, 106, 224, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 6px 25px rgba(187, 106, 224, 0.2)';
            }}
          >
            <div style={{ marginBottom: '1.5rem' }}>{feat.icon}</div>
            <Title level={4} style={{ color: '#e3c3ff' }}>{feat.title}</Title>
            <p style={{ color: '#ddd', fontSize: '1rem', lineHeight: 1.6 }}>{feat.description}</p>
          </Card>
        </Col>
      ))}
    </Row>
  </div>
);

export default WhyChooseUs;
