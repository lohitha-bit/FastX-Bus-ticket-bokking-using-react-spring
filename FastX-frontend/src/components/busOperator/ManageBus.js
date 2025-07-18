import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Card,
  Button,
  Icon,
  Header,
  Segment,
  Message,
  Modal,
  Form,
  Loader,
} from 'semantic-ui-react';

const ManageBus = () => {
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);

  const [selectedBus, setSelectedBus] = useState(null);
  const [editForm, setEditForm] = useState({
    busName: '',
    busNumber: '',
    busType: '',
    fare: '',
    totalSeats: '',
  });

  const [addForm, setAddForm] = useState({
    busName: '',
    busNumber: '',
    busType: '',
    fare: '',
    totalSeats: '',
    routeId: '',
  });

  const token = localStorage.getItem('token');

  const fetchBuses = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:9000/api/buses', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBuses(res.data);
    } catch (err) {
      setError('Failed to fetch buses.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this bus?')) return;
    try {
      await axios.delete(`http://localhost:9000/api/buses/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBuses(buses.filter((b) => b.busId !== id));
    } catch {
      setError('Bus deletion failed.');
    }
  };

  const handleEditClick = (bus) => {
    setSelectedBus(bus);
    setEditForm({
      busName: bus.busName,
      busNumber: bus.busNumber,
      busType: bus.busType,
      fare: bus.fare,
      totalSeats: bus.seatCount,
    });
    setEditModalOpen(true);
  };

  const handleEditSubmit = async () => {
    try {
      await axios.put(
        `http://localhost:9000/api/buses/${selectedBus.busId}`,
        editForm,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEditModalOpen(false);
      fetchBuses();
    } catch {
      setError('Update failed.');
    }
  };

  const handleAddSubmit = async () => {
    try {
      await axios.post('http://localhost:9000/api/buses', addForm, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAddModalOpen(false);
      fetchBuses();
    } catch {
      setError('Bus creation failed.');
    }
  };

  useEffect(() => {
    fetchBuses();
  }, []);

  return (
    <Segment padded="very" style={{ background: '#f5e6fa', minHeight: '80vh' }}>
      <Header as="h2" icon textAlign="center" style={{ color: '#6B008C' }}>
        <Icon name="bus" />
        Manage Buses
      </Header>

      <Button
        icon
        labelPosition="left"
        color="purple"
        onClick={() => setAddModalOpen(true)}
        style={{ marginBottom: '1em' }}
      >
        <Icon name="plus" />
        Add New Bus
      </Button>

      {loading ? (
        <Loader active inline="centered">
          Loading buses...
        </Loader>
      ) : error ? (
        <Message negative>{error}</Message>
      ) : buses.length === 0 ? (
        <Message info>No buses available.</Message>
      ) : (
        <Card.Group itemsPerRow={2} stackable>
          {buses.map((bus) => (
            <Card key={bus.busId} color="purple" raised>
              <Card.Content>
                <Card.Header>{bus.busName}</Card.Header>
                <Card.Meta>
                  {bus.busNumber} — {bus.busType}
                </Card.Meta>
                <Card.Description>
                  <p>
                    <strong>Fare:</strong> ₹{bus.fare}
                  </p>
                  <p>
                    <strong>Total Seats:</strong> {bus.seatCount}
                  </p>
                  <p>
                    <strong>Route ID:</strong> {bus.routeId}
                  </p>
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <Button.Group widths="2">
                  <Button basic color="green" onClick={() => handleEditClick(bus)}>
                    Edit
                  </Button>
                  <Button basic color="red" onClick={() => handleDelete(bus.busId)}>
                    Delete
                  </Button>
                </Button.Group>
              </Card.Content>
            </Card>
          ))}
        </Card.Group>
      )}

      {/* Edit Modal */}
      <Modal open={editModalOpen} onClose={() => setEditModalOpen(false)}>
        <Modal.Header>Edit Bus</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Input
              label="Bus Name"
              value={editForm.busName}
              onChange={(e) => setEditForm({ ...editForm, busName: e.target.value })}
            />
            <Form.Input
              label="Bus Number"
              value={editForm.busNumber}
              onChange={(e) => setEditForm({ ...editForm, busNumber: e.target.value })}
            />
            <Form.Input
              label="Bus Type"
              value={editForm.busType}
              onChange={(e) => setEditForm({ ...editForm, busType: e.target.value })}
            />
            <Form.Input
              label="Fare (₹)"
              type="number"
              value={editForm.fare}
              onChange={(e) => setEditForm({ ...editForm, fare: e.target.value })}
            />
            <Form.Input
              label="Total Seats"
              type="number"
              value={editForm.totalSeats}
              onChange={(e) => setEditForm({ ...editForm, totalSeats: e.target.value })}
            />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => setEditModalOpen(false)}>Cancel</Button>
          <Button color="purple" onClick={handleEditSubmit}>
            Update
          </Button>
        </Modal.Actions>
      </Modal>

      {/* Add Modal */}
      <Modal open={addModalOpen} onClose={() => setAddModalOpen(false)}>
        <Modal.Header>Add New Bus</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Input
              label="Bus Name"
              value={addForm.busName}
              onChange={(e) => setAddForm({ ...addForm, busName: e.target.value })}
            />
            <Form.Input
              label="Bus Number"
              value={addForm.busNumber}
              onChange={(e) => setAddForm({ ...addForm, busNumber: e.target.value })}
            />
            <Form.Input
              label="Bus Type"
              value={addForm.busType}
              onChange={(e) => setAddForm({ ...addForm, busType: e.target.value })}
            />
            <Form.Input
              label="Fare (₹)"
              type="number"
              value={addForm.fare}
              onChange={(e) => setAddForm({ ...addForm, fare: e.target.value })}
            />
            <Form.Input
              label="Total Seats"
              type="number"
              value={addForm.totalSeats}
              onChange={(e) => setAddForm({ ...addForm, totalSeats: e.target.value })}
            />
            <Form.Input
              label="Route ID"
              type="number"
              value={addForm.routeId}
              onChange={(e) => setAddForm({ ...addForm, routeId: e.target.value })}
            />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => setAddModalOpen(false)}>Cancel</Button>
          <Button color="purple" onClick={handleAddSubmit}>
            Add
          </Button>
        </Modal.Actions>
      </Modal>
    </Segment>
  );
};

export default ManageBus;
