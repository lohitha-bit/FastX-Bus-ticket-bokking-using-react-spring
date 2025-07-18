// Footer.js
import React from 'react';
import { Segment, Container, Grid, List, Icon } from 'semantic-ui-react';

const Footer = () => (
  <Segment
  inverted
  vertical
  style={{
    padding: '3em 0em',
    background: '#111',
    color: '#ccc',
    borderTop: '2px solid #333',
  }}
>
  <Container>
    <Grid divided inverted stackable>
      <Grid.Row>
        <Grid.Column width={6}>
          <h4 style={{ color: '#fff', fontWeight: 'bold' }}>FastX</h4>
          <p style={{ color: '#aaa' }}>
            India's trusted bus booking platform. Safe, fast, and reliable journeys every time.
          </p>
        </Grid.Column>

        <Grid.Column width={5}>
          <h4 style={{ color: '#fff', fontWeight: 'bold' }}>Quick Links</h4>
          <List link inverted>
            <List.Item as="a" style={{ color: '#bbb' }}>Home</List.Item>
            <List.Item as="a" style={{ color: '#bbb' }}>Bookings</List.Item>
            <List.Item as="a" style={{ color: '#bbb' }}>Routes</List.Item>
            <List.Item as="a" style={{ color: '#bbb' }}>Contact</List.Item>
          </List>
        </Grid.Column>

        <Grid.Column width={5}>
          <h4 style={{ color: '#fff', fontWeight: 'bold' }}>Connect</h4>
          <List horizontal>
            <List.Item><Icon name="facebook" color="blue" size="large" /></List.Item>
            <List.Item><Icon name="twitter" color="blue" size="large" /></List.Item>
            <List.Item><Icon name="instagram" color="pink" size="large" /></List.Item>
          </List>
          <p style={{ color: '#888' }}>support@fastx.com</p>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </Container>
</Segment>

);

export default Footer;
