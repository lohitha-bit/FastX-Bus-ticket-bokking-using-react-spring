import { Typography, Button } from 'antd';

const { Title, Paragraph } = Typography;

const HeroSection = () => {
  return (
   <div
  style={{
    background: 'linear-gradient(135deg, #1a1a1a, #2d003a)',
    color: 'white',
    padding: '5rem 2rem',
    textAlign: 'center',
    borderRadius: '20px',
    marginBottom: '3rem',
    boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
  }}
>
  <Title
    style={{
      color: '#ffffff',
      fontSize: '3.2rem',
      fontWeight: 700,
    }}
  >
    FastX - Book Your Bus Journey
  </Title>
  <Paragraph style={{ fontSize: '1.3rem', color: '#ddd' }}>
    Fast. Easy. Reliable. Your one-stop solution for intercity travel.
  </Paragraph>
  <Button
    size="large"
    type="primary"
    style={{
      backgroundColor: '#bb6ae0',
      border: 'none',
      marginTop: '1.5rem',
      padding: '0 2rem',
      height: '3rem',
      fontSize: '1rem',
      boxShadow: '0 4px 15px rgba(187, 106, 224, 0.4)',
    }}
    onMouseEnter={(e) => (e.target.style.backgroundColor = '#a94bcf')}
    onMouseLeave={(e) => (e.target.style.backgroundColor = '#bb6ae0')}
  >
    Book Now
  </Button>
</div>

  );
};

export default HeroSection;
