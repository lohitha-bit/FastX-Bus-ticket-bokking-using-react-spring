import React from 'react';
import { Card, Icon, Grid, Header, Button, Segment } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';

const BusOperatorDashboard = () => {
  const navigate = useNavigate();

  return (
    <Segment
      style={{
        padding: '3em',
        marginTop: '3em',
        background: 'linear-gradient(to right, #f9f0ff, #ffffff)',
        borderRadius: '10px',
      }}
    >
      <Header as="h1" icon textAlign="center" style={{ color: '#6B008C', marginBottom: '2em' }}>
        <Icon name="dashboard" circular style={{ color: '#6B008C' }} />
        Bus Operator Dashboard
        <Header.Subheader style={{ fontSize: '1.2em', marginTop: '0.5em' }}>
          Welcome! Manage your buses, routes, and bookings from here.
        </Header.Subheader>
      </Header>

      <Grid stackable columns={3} textAlign="center">
        <Grid.Row>
          {/* Manage Buses */}
          <Grid.Column>
            <Card fluid color="purple">
              <Card.Content>
                <Icon name="bus" size="huge" style={{ float: 'right', color: '#6B008C' }} />
                <Card.Header style={{ color: '#6B008C' }}>Manage Buses</Card.Header>
                <Card.Description>
                  Add, update, or remove buses and their schedules.
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <Button
                  color="purple"
                  fluid
                  onClick={() => navigate('/operator/manage-bus')}
                >
                  Go to Manage Buses
                </Button>
              </Card.Content>
            </Card>
          </Grid.Column>

          {/* Manage Routes */}
          <Grid.Column>
            <Card fluid color="purple">
              <Card.Content>
                <Icon name="map outline" size="huge" style={{ float: 'right', color: '#6B008C' }} />
                <Card.Header style={{ color: '#6B008C' }}>Manage Routes</Card.Header>
                <Card.Description>
                  Define bus routes and update fare, time, and stops.
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <Button
                  color="purple"
                  fluid
                  onClick={() => navigate('/operator/manage-route')}
                >
                  Go to Manage Routes
                </Button>
              </Card.Content>
            </Card>
          </Grid.Column>

          {/* View Bookings */}
          <Grid.Column>
            <Card fluid color="purple">
              <Card.Content>
                <Icon name="ticket alternate" size="huge" style={{ float: 'right', color: '#6B008C' }} />
                <Card.Header style={{ color: '#6B008C' }}>View Bookings</Card.Header>
                <Card.Description>
                  Check and manage all user bookings for your buses.
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <Button
                  color="purple"
                  fluid
                  onClick={() => navigate('/operator/bookings')}
                >
                  View Bookings
                </Button>
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  );
};

export default BusOperatorDashboard;