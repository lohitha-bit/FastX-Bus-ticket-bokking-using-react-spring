import React, { useState, useEffect } from 'react';
import {
  Segment,
  Header,
  Icon,
  Table,
  Button,
  Loader,
  Message,
  Modal,
  Form,
} from 'semantic-ui-react';
import axios from 'axios';

const ManageRoute = () => {
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [editRoute, setEditRoute] = useState(null);
  const [formData, setFormData] = useState({
    origin: '',
    destination: '',
    departureTime: '',
    arrivalTime: '',
    distanceInKm: '',
  });

  const token = localStorage.getItem('token');
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  const fetchRoutes = async () => {
    try {
      const res = await axios.get('http://localhost:9000/api/routes');
      setRoutes(res.data);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch route data.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (routeId) => {
    if (!window.confirm('Are you sure you want to delete this route?')) return;
    try {
      await axios.delete(`http://localhost:9000/api/routes/${routeId}`);
      setRoutes(routes.filter((r) => r.routeId !== routeId));
    } catch (err) {
      console.error('Delete failed:', err);
      setError('Failed to delete route.');
    }
  };

  const handleOpen = (route = null) => {
    setEditRoute(route);
    setFormData(
      route
        ? {
            origin: route.origin,
            destination: route.destination,
            departureTime: route.departureTime?.slice(0, 16),
            arrivalTime: route.arrivalTime?.slice(0, 16),
            distanceInKm: route.distanceInKm,
          }
        : {
            origin: '',
            destination: '',
            departureTime: '',
            arrivalTime: '',
            distanceInKm: '',
          }
    );
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
    setEditRoute(null);
    setFormData({
      origin: '',
      destination: '',
      departureTime: '',
      arrivalTime: '',
      distanceInKm: '',
    });
  };

  const handleChange = (_, { name, value }) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      if (editRoute) {
        await axios.put(`http://localhost:9000/api/routes/${editRoute.routeId}`, formData);
      } else {
        await axios.post('http://localhost:9000/api/routes', formData);
      }
      handleClose();
      fetchRoutes();
    } catch (err) {
      console.error('Error saving route:', err);
      setError('Failed to save route.');
    }
  };

  useEffect(() => {
    fetchRoutes();
  }, []);

  return (
    <Segment padded="very" style={{ background: '#f5e6fa', minHeight: '80vh' }}>
      <Header as="h2" icon textAlign="center" style={{ color: '#6B008C' }}>
        <Icon name="map" />
        Manage Routes
      </Header>

      <Button color="purple" onClick={() => handleOpen()} style={{ marginBottom: '1em' }}>
        <Icon name="plus" /> Add Route
      </Button>

      {loading ? (
        <Loader active inline="centered" size="large">
          Loading Routes...
        </Loader>
      ) : error ? (
        <Message negative>{error}</Message>
      ) : routes.length === 0 ? (
        <Message info>No routes found.</Message>
      ) : (
        <Table celled striped color="purple">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>ID</Table.HeaderCell>
              <Table.HeaderCell>Origin</Table.HeaderCell>
              <Table.HeaderCell>Destination</Table.HeaderCell>
              <Table.HeaderCell>Departure</Table.HeaderCell>
              <Table.HeaderCell>Arrival</Table.HeaderCell>
              <Table.HeaderCell>Distance (km)</Table.HeaderCell>
              <Table.HeaderCell>Actions</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {routes.map((route) => (
              <Table.Row key={route.routeId}>
                <Table.Cell>{route.routeId}</Table.Cell>
                <Table.Cell>{route.origin}</Table.Cell>
                <Table.Cell>{route.destination}</Table.Cell>
                <Table.Cell>{new Date(route.departureTime).toLocaleString()}</Table.Cell>
                <Table.Cell>{new Date(route.arrivalTime).toLocaleString()}</Table.Cell>
                <Table.Cell>{route.distanceInKm}</Table.Cell>
                <Table.Cell>
                  <Button size="tiny" basic color="green" onClick={() => handleOpen(route)}>
                    Edit
                  </Button>
                  <Button size="tiny" basic color="red" onClick={() => handleDelete(route.routeId)}>
                    Delete
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      )}

      {/* Modal for Add/Edit */}
      <Modal open={openModal} onClose={handleClose} size="tiny">
        <Modal.Header>{editRoute ? 'Edit Route' : 'Add Route'}</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Input
              label="Origin"
              name="origin"
              placeholder="e.g. Mumbai"
              value={formData.origin}
              onChange={handleChange}
              required
            />
            <Form.Input
              label="Destination"
              name="destination"
              placeholder="e.g. Pune"
              value={formData.destination}
              onChange={handleChange}
              required
            />
            <Form.Input
              label="Departure Time"
              name="departureTime"
              type="datetime-local"
              value={formData.departureTime}
              onChange={handleChange}
              required
            />
            <Form.Input
              label="Arrival Time"
              name="arrivalTime"
              type="datetime-local"
              value={formData.arrivalTime}
              onChange={handleChange}
              required
            />
            <Form.Input
              label="Distance (km)"
              name="distanceInKm"
              type="number"
              min="1"
              value={formData.distanceInKm}
              onChange={handleChange}
              required
            />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button color="purple" onClick={handleSubmit}>
            {editRoute ? 'Update' : 'Add'}
          </Button>
        </Modal.Actions>
      </Modal>
    </Segment>
  );
};

export default ManageRoute;
