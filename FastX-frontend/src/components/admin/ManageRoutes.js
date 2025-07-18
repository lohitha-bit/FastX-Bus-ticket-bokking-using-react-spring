import React, { useEffect, useState } from "react";
import {
  Segment,
  Header,
  Table,
  Button,
  Icon,
  Message,
  Form,
  Modal,
} from "semantic-ui-react";
import axios from "axios";

const ManageRoutes = () => {
  const [routes, setRoutes] = useState([]);
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const [selectedRoute, setSelectedRoute] = useState(null);
  const [routeToDelete, setRouteToDelete] = useState(null);

  const [newRoute, setNewRoute] = useState({
    origin: "",
    destination: "",
    distanceInKm: "",
    departureTime: "",
    arrivalTime: "",
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchRoutes();
  }, []);

  const fetchRoutes = async () => {
    try {
      const res = await axios.get("http://localhost:9000/api/routes", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRoutes(res.data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to fetch routes.");
    }
  };

  const deleteRoute = async (id) => {
    try {
      await axios.delete(`http://localhost:9000/api/routes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuccess("Route deleted successfully.");
      fetchRoutes();
    } catch (err) {
      console.error(err);
      setError("Failed to delete route.");
    }
  };

  const searchRoutes = async (e) => {
    e.preventDefault();
    if (!origin || !destination) {
      setError("Please provide both origin and destination.");
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:9000/api/routes/search?origin=${origin}&destination=${destination}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setRoutes(response.data);
      setSuccess("Routes fetched successfully.");
      setError("");
    } catch (err) {
      console.error(err);
      setError("Search failed.");
      setRoutes([]);
    }
  };

  const openEditModal = (route) => {
    setSelectedRoute({ ...route });
    setEditModalOpen(true);
  };

  const handleEditChange = (e, field) => {
    setSelectedRoute({ ...selectedRoute, [field]: e.target.value });
  };

  const handleUpdateRoute = async () => {
    try {
      await axios.put(
        `http://localhost:9000/api/routes/${selectedRoute.routeId}`,
        selectedRoute,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEditModalOpen(false);
      setSelectedRoute(null);
      setSuccess("Route updated successfully.");
      fetchRoutes();
    } catch (err) {
      console.error(err);
      setError("Failed to update route.");
    }
  };

  const handleAddRoute = async () => {
    try {
      await axios.post("http://localhost:9000/api/routes", newRoute, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCreateModalOpen(false);
      setNewRoute({
        origin: "",
        destination: "",
        distanceInKm: "",
        departureTime: "",
        arrivalTime: "",
      });
      setSuccess("Route added successfully.");
      fetchRoutes();
    } catch (err) {
      console.error(err);
      setError("Failed to add route.");
    }
  };

  return (
    <div
      style={{
        padding: "2rem",
        maxWidth: "1200px",
        margin: "0 auto",
        background: "#f9f9f9",
        minHeight: "100vh",
        color: "#1a1a1a",
        fontFamily: "Segoe UI, sans-serif",
      }}
    >
      <Header
        as="h2"
        textAlign="center"
        style={{ color: "#333", fontWeight: "bold" }}
      >
        <Icon name="map" />
        Manage Routes
      </Header>

      <Segment
        style={{
          padding: "2rem",
          borderRadius: "10px",
          background: "#ffffff",
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
        }}
      >
        <Button
          icon
          labelPosition="left"
          onClick={() => setCreateModalOpen(true)}
          style={{
            background: "#4b0082",
            color: "white",
            marginBottom: "1rem",
          }}
        >
          <Icon name="plus" />
          Add New Route
        </Button>

        <Form onSubmit={searchRoutes} style={{ marginBottom: "1.5rem" }}>
          <Form.Group widths="equal">
            <Form.Input
              label="Origin"
              placeholder="Enter origin"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
            />
            <Form.Input
              label="Destination"
              placeholder="Enter destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
          </Form.Group>
          <Button
            icon
            labelPosition="left"
            type="submit"
            style={{ background: "#4b0082", color: "white" }}
          >
            <Icon name="search" />
            Search
          </Button>
          <Button
            type="button"
            onClick={fetchRoutes}
            style={{ marginLeft: "1em", background: "#e0e0e0" }}
          >
            Reset
          </Button>
        </Form>

        {error && <Message negative content={error} />}
        {success && <Message positive content={success} />}

        <Table celled striped compact style={{ marginTop: "1rem" }}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Route ID</Table.HeaderCell>
              <Table.HeaderCell>Origin</Table.HeaderCell>
              <Table.HeaderCell>Destination</Table.HeaderCell>
              <Table.HeaderCell>Distance (km)</Table.HeaderCell>
              <Table.HeaderCell>Departure Time</Table.HeaderCell>
              <Table.HeaderCell>Arrival Time</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">Actions</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {routes.length > 0 ? (
              routes.map((route) => (
                <Table.Row key={route.routeId}>
                  <Table.Cell>{route.routeId}</Table.Cell>
                  <Table.Cell>{route.origin}</Table.Cell>
                  <Table.Cell>{route.destination}</Table.Cell>
                  <Table.Cell>{route.distanceInKm}</Table.Cell>
                  <Table.Cell>
                    {route.departureTime?.replace("T", " ")}
                  </Table.Cell>
                  <Table.Cell>
                    {route.arrivalTime?.replace("T", " ")}
                  </Table.Cell>
                  <Table.Cell textAlign="center">
                    <Button
                      icon
                      color="green"
                      size="small"
                      onClick={() => openEditModal(route)}
                    >
                      <Icon name="edit" />
                    </Button>
                    <Button
                      icon
                      color="red"
                      size="small"
                      onClick={() => {
                        setRouteToDelete(route);
                        setDeleteModalOpen(true);
                      }}
                    >
                      <Icon name="trash" />
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))
            ) : (
              <Table.Row>
                <Table.Cell colSpan="7" textAlign="center">
                  No routes available.
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      </Segment>

      {/* Edit Modal */}
      <Modal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        size="small"
        closeIcon
      >
        <Header icon="edit" content="Edit Route" />
        <Modal.Content>
          <Form>
            <Form.Input
              label="Origin"
              value={selectedRoute?.origin}
              onChange={(e) => handleEditChange(e, "origin")}
            />
            <Form.Input
              label="Destination"
              value={selectedRoute?.destination}
              onChange={(e) => handleEditChange(e, "destination")}
            />
            <Form.Input
              label="Distance (km)"
              type="number"
              value={selectedRoute?.distanceInKm}
              onChange={(e) => handleEditChange(e, "distanceInKm")}
            />
            <Form.Input
              label="Departure Time"
              type="datetime-local"
              value={selectedRoute?.departureTime?.slice(0, 16)}
              onChange={(e) =>
                setSelectedRoute((prev) => ({
                  ...prev,
                  departureTime: e.target.value,
                }))
              }
            />
            <Form.Input
              label="Arrival Time"
              type="datetime-local"
              value={selectedRoute?.arrivalTime?.slice(0, 16)}
              onChange={(e) =>
                setSelectedRoute((prev) => ({
                  ...prev,
                  arrivalTime: e.target.value,
                }))
              }
            />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color="red" onClick={() => setEditModalOpen(false)}>
            <Icon name="remove" /> Cancel
          </Button>
          <Button color="green" onClick={handleUpdateRoute}>
            <Icon name="checkmark" /> Update
          </Button>
        </Modal.Actions>
      </Modal>

      {/* Create Modal */}
      <Modal
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        size="small"
        closeIcon
      >
        <Header icon="plus" content="Add New Route" />
        <Modal.Content>
          <Form>
            <Form.Input
              label="Origin"
              value={newRoute.origin}
              onChange={(e) =>
                setNewRoute({ ...newRoute, origin: e.target.value })
              }
            />
            <Form.Input
              label="Destination"
              value={newRoute.destination}
              onChange={(e) =>
                setNewRoute({ ...newRoute, destination: e.target.value })
              }
            />
            <Form.Input
              label="Distance (km)"
              type="number"
              value={newRoute.distanceInKm}
              onChange={(e) =>
                setNewRoute({ ...newRoute, distanceInKm: e.target.value })
              }
            />
            <Form.Input
              label="Departure Time"
              type="datetime-local"
              value={newRoute.departureTime}
              onChange={(e) =>
                setNewRoute({ ...newRoute, departureTime: e.target.value })
              }
            />
            <Form.Input
              label="Arrival Time"
              type="datetime-local"
              value={newRoute.arrivalTime}
              onChange={(e) =>
                setNewRoute({ ...newRoute, arrivalTime: e.target.value })
              }
            />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color="red" onClick={() => setCreateModalOpen(false)}>
            <Icon name="remove" /> Cancel
          </Button>
          <Button color="green" onClick={handleAddRoute}>
            <Icon name="checkmark" /> Add
          </Button>
        </Modal.Actions>
      </Modal>

      {/* Delete Modal */}
      <Modal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        size="tiny"
        closeIcon
      >
        <Header icon="trash" content="Confirm Delete" />
        <Modal.Content>
          <p>
            Are you sure you want to delete route{" "}
            <strong>#{routeToDelete?.routeId}</strong> from{" "}
            <strong>{routeToDelete?.origin}</strong> to{" "}
            <strong>{routeToDelete?.destination}</strong>?
          </p>
        </Modal.Content>
        <Modal.Actions>
          <Button color="grey" onClick={() => setDeleteModalOpen(false)}>
            <Icon name="remove" /> Cancel
          </Button>
          <Button
            color="red"
            onClick={() => {
              deleteRoute(routeToDelete.routeId);
              setDeleteModalOpen(false);
              setRouteToDelete(null);
            }}
          >
            <Icon name="trash" /> Delete
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
};

export default ManageRoutes;
