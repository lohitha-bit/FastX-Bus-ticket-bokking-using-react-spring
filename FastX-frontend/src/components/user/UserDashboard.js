import React, { useEffect, useState } from 'react';
import { Card, Header, Icon, Grid, Button, Segment, Divider } from 'semantic-ui-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const UserDashboard = () => {
  const [userName, setUserName] = useState('');
  const [frequentRoutes, setFrequentRoutes] = useState([]);
  const navigate = useNavigate();

  const offers = [
    { title: "🎉 Independence Day Offer", desc: "Get 15% off on all routes", date: "15 August" },
    { title: "✨ Diwali Dhamaka", desc: "Flat ₹50 OFF", date: "12 November" },
    { title: "🎄 Christmas Special", desc: "Buy 1 Get 1 50% OFF", date: "25 December" }
  ];

  useEffect(() => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  if (token && user?.userId) {
    axios.get(`http://localhost:9000/api/users/${user.userId}`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
      setUserName(res.data.name); // Now you have full name
    });

    axios.get(`http://localhost:9000/api/bookings/user/${user.userId}/frequent-routes`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
      setFrequentRoutes(res.data);
    }).catch(err => console.error("Error fetching frequent routes:", err));
  }
}, []);

  return (
    <Segment padded style={{ background: '#f9f0fb', display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '90%', maxWidth: '1200px' }}>
        <Header as="h2" icon textAlign="center" style={{ color: '#6B008C' }}>
          <Icon name="user circle" />
          Welcome, {userName} 👋
          <Header.Subheader>Your personalized FastX dashboard</Header.Subheader>
        </Header>

        <Divider section />

        <Header as="h3" icon textAlign="center" style={{ color: '#800080' }}>
          <Icon name="map marker alternate" />
          Your Frequent Routes
        </Header>
        <Grid columns={3} stackable>
          {frequentRoutes.length > 0 ? frequentRoutes.map((r, i) => (
            <Grid.Column key={i}>
              <Card fluid color='purple'>
                <Card.Content>
                  <Card.Header>{r.origin} ➡ {r.destination}</Card.Header>
                  <Card.Meta>Based on your past bookings</Card.Meta>
                </Card.Content>
              </Card>
            </Grid.Column>
          )) : (
            <p style={{ marginLeft: '1em', color: 'gray' }}>No frequent routes yet. Book a trip to see them here!</p>
          )}
        </Grid>

        <Divider section />

        <Header as="h3" icon textAlign="center" style={{ color: '#800080' }}>
          <Icon name="gift" />
          Deals & Offers
        </Header>
        <Grid columns={3} stackable>
          {offers.map((offer, i) => (
            <Grid.Column key={i}>
              <Card color="violet">
                <Card.Content>
                  <Card.Header>{offer.title}</Card.Header>
                  <Card.Description>{offer.desc}</Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <Icon name="calendar" /> {offer.date}
                </Card.Content>
              </Card>
            </Grid.Column>
          ))}
        </Grid>

        <Divider section />

        <div style={{ textAlign: 'center' }}>
          <Button color="purple" size="large" onClick={() => navigate('/')}>
            <Icon name="home" /> Home Page
          </Button>
        </div>
      </div>
    </Segment>
  );
};

export default UserDashboard;
