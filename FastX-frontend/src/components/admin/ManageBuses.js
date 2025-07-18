import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Header,
  Icon,
  Message,
  Segment,
  Table,
  Modal,
} from "semantic-ui-react";
import axios from "axios";
import { message as antdMessage } from "antd";

const initialFormData = {
  busName: "",
  busNumber: "",
  busType: "",
  totalSeats: "",
  fare: "",
  routeId: "",
  amenities: [],  // Added amenities here
};

const ManageBuses = () => {
  const [buses, setBuses] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [amenitiesList, setAmenitiesList] = useState([]); // to store amenities options
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [editId, setEditId] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState({
    origin: "",
    destination: "",
    minFare: "",
    maxFare: "",
    type: "",
  });

  const token = localStorage.getItem("token");

  // Fetch all buses
  const fetchBuses = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:9000/api/buses", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBuses(res.data);
    } catch (err) {
      antdMessage.error("Failed to fetch buses.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch all routes
  const fetchRoutes = async () => {
    try {
      const res = await axios.get("http://localhost:9000/api/routes", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRoutes(
        res.data.map((route) => ({
          key: route.routeId,
          text: `${route.origin} ⇌ ${route.destination}`,
          value: route.routeId,
          origin: route.origin,
          destination: route.destination,
        }))
      );
    } catch (err) {
      antdMessage.error("Failed to fetch routes.");
    }
  };

  // Fetch all amenities
  const fetchAmenities = async () => {
    try {
      const res = await axios.get("http://localhost:9000/api/amenities", {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Map to options format for semantic-ui Dropdown
      setAmenitiesList(
        res.data.map((amenity) => ({
          key: amenity.amenityId,
          text: amenity.name,
          value: amenity.name, // value is the name string as expected by backend
        }))
      );
    } catch (err) {
      antdMessage.error("Failed to fetch amenities.");
    }
  };

  // Load buses, routes, amenities once on mount
  useEffect(() => {
    fetchBuses();
    fetchRoutes();
    fetchAmenities();
  }, []);

  // Handle form inputs changes
  const handleInputChange = (e, { name, value }) => {
    if (name === "amenities") {
      setFormData((prev) => ({
        ...prev,
        amenities: value, // value is an array of selected amenity names
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: ["fare", "totalSeats", "routeId"].includes(name)
          ? Number(value)
          : value,
      }));
    }
  };

  // Submit form for Add or Update
  const handleSubmit = async () => {
    if (
      !formData.busName ||
      !formData.busNumber ||
      !formData.busType ||
      !formData.totalSeats ||
      !formData.fare ||
      !formData.routeId
    ) {
      setError("Please fill all required fields.");
      return;
    }
    setError("");

    const payload = {
      busName: formData.busName,
      busNumber: formData.busNumber,
      busType: formData.busType,
      seatCount: Number(formData.totalSeats),
      fare: Number(formData.fare),
      routeId: Number(formData.routeId),
      amenities: formData.amenities, // send amenities array here
    };

    try {
      if (editId) {
        await axios.put(`http://localhost:9000/api/buses/${editId}`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        antdMessage.success("Bus updated successfully");
      } else {
        await axios.post("http://localhost:9000/api/buses", payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        antdMessage.success("Bus added successfully");
      }
      setOpenModal(false);
      setFormData(initialFormData);
      setEditId(null);
      fetchBuses();
    } catch (err) {
      antdMessage.error("Failed to save bus.");
    }
  };

  // Edit bus: open modal and prefill form, including amenities
  const handleEdit = (bus) => {
    setFormData({
      busName: bus.busName,
      busNumber: bus.busNumber,
      busType: bus.busType,
      totalSeats: bus.seatCount || bus.totalSeats,
      fare: bus.fare,
      routeId: bus.routeId || (bus.route && bus.route.routeId) || "",
      amenities: bus.amenities || [], // assuming amenities is an array of strings in bus object
    });
    setEditId(bus.busId);
    setOpenModal(true);
  };

  // Delete bus by id
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:9000/api/buses/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      antdMessage.success("Bus deleted successfully");
      fetchBuses();
    } catch (err) {
      antdMessage.error("Failed to delete bus.");
    }
  };

  // Filter buses - unchanged
  const handleFilterSearch = async () => {
    try {
      const params = {
        origin: filter.origin || undefined,
        destination: filter.destination || undefined,
        minFare: filter.minFare || undefined,
        maxFare: filter.maxFare || undefined,
        type: filter.type || undefined,
      };
      const res = await axios.get("http://localhost:9000/api/buses/search", {
        params,
        headers: { Authorization: `Bearer ${token}` },
      });
      setBuses(res.data);
    } catch (err) {
      antdMessage.error("Failed to apply filters.");
    }
  };

  // Clear filters
  const handleClearFilters = () => {
    setFilter({
      origin: "",
      destination: "",
      minFare: "",
      maxFare: "",
      type: "",
    });
    fetchBuses();
  };

  const getRouteDisplay = (routeId) => {
    const route = routes.find((r) => r.value === routeId);
    return route ? `${route.origin} ⇌ ${route.destination}` : "No Route";
  };

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "auto" }}>
      <Header
  as="h2"
  icon
  textAlign="center"
  style={{ color: "#34495e", fontSize: "2rem", marginBottom: "1.5rem" }}
>
  <Icon name="bus" />
  Bus Management
</Header>

<Segment
  style={{
    background: "#f5f8fc",
    padding: "2rem",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.06)",
  }}
>
  <Form>
    <Form.Group widths="equal">
      <Form.Input
        label="Origin"
        placeholder="Enter origin"
        value={filter.origin}
        onChange={(e) => setFilter((prev) => ({ ...prev, origin: e.target.value }))}
      />
      <Form.Input
        label="Destination"
        placeholder="Enter destination"
        value={filter.destination}
        onChange={(e) => setFilter((prev) => ({ ...prev, destination: e.target.value }))}
      />
    </Form.Group>
    <Form.Group widths="equal">
      <Form.Input
        label="Min Fare"
        type="number"
        placeholder="Minimum fare"
        value={filter.minFare}
        onChange={(e) => setFilter((prev) => ({ ...prev, minFare: e.target.value }))}
      />
      <Form.Input
        label="Max Fare"
        type="number"
        placeholder="Maximum fare"
        value={filter.maxFare}
        onChange={(e) => setFilter((prev) => ({ ...prev, maxFare: e.target.value }))}
      />
      <Form.Input
        label="Bus Type"
        placeholder="e.g., Sleeper AC"
        value={filter.type}
        onChange={(e) => setFilter((prev) => ({ ...prev, type: e.target.value }))}
      />
    </Form.Group>
    <Button color="blue" onClick={handleFilterSearch} icon labelPosition="left">
      <Icon name="search" />
      Apply Filters
    </Button>
    <Button
      onClick={handleClearFilters}
      basic
      color="grey"
      style={{ marginLeft: "1em" }}
    >
      Clear
    </Button>
  </Form>
</Segment>

<Segment
  loading={loading}
  style={{
    background: "#ffffff",
    marginTop: "2rem",
    padding: "2rem",
    borderRadius: "10px",
    boxShadow: "0 0 8px rgba(0, 0, 0, 0.04)",
  }}
>
  <Button
    color="purple"
    icon
    labelPosition="left"
    onClick={() => {
      setFormData(initialFormData);
      setEditId(null);
      setOpenModal(true);
    }}
    style={{ marginBottom: "1rem" }}
  >
    <Icon name="plus" />
    Add New Bus
  </Button>

  {buses.length === 0 ? (
    <Message warning content="No buses found." />
  ) : (
    <Table celled striped compact stackable>
      <Table.Header>
        <Table.Row style={{ background: "#eaf0f9" }}>
          <Table.HeaderCell>#</Table.HeaderCell>
          <Table.HeaderCell>Bus Name</Table.HeaderCell>
          <Table.HeaderCell>Number</Table.HeaderCell>
          <Table.HeaderCell>Type</Table.HeaderCell>
          <Table.HeaderCell>Fare</Table.HeaderCell>
          <Table.HeaderCell>Total Seats</Table.HeaderCell>
          <Table.HeaderCell>Route</Table.HeaderCell>
          <Table.HeaderCell>Amenities</Table.HeaderCell>
          <Table.HeaderCell textAlign="center">Actions</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {buses.map((bus, index) => (
          <Table.Row key={bus.busId}>
            <Table.Cell>{index + 1}</Table.Cell>
            <Table.Cell>{bus.busName}</Table.Cell>
            <Table.Cell>{bus.busNumber}</Table.Cell>
            <Table.Cell>{bus.busType}</Table.Cell>
            <Table.Cell>₹{bus.fare}</Table.Cell>
            <Table.Cell>{bus.seatCount}</Table.Cell>
            <Table.Cell>{getRouteDisplay(bus.routeId)}</Table.Cell>
            <Table.Cell>{(bus.amenities || []).join(", ")}</Table.Cell>
            <Table.Cell textAlign="center">
              <Button
                icon="edit"
                size="mini"
                color="blue"
                title="Edit Bus"
                onClick={() => handleEdit(bus)}
              />
              <Button
                icon="trash"
                color="red"
                size="mini"
                title="Delete Bus"
                onClick={() => handleDelete(bus.busId)}
                style={{ marginLeft: "0.5em" }}
              />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )}
</Segment>

<Modal open={openModal} onClose={() => setOpenModal(false)} size="small">
  <Modal.Header style={{ backgroundColor: "#6a0dad", color: "white" }}>
    {editId ? "Update Bus Details" : "Add New Bus"}
  </Modal.Header>
  <Modal.Content>
    {error && <Message negative content={error} />}
    <Form>
      <Form.Input
        label="Bus Name *"
        name="busName"
        placeholder="Enter bus name"
        value={formData.busName}
        onChange={handleInputChange}
        required
      />
      <Form.Input
        label="Bus Number *"
        name="busNumber"
        placeholder="Enter bus number"
        value={formData.busNumber}
        onChange={handleInputChange}
        required
      />
      <Form.Input
        label="Bus Type *"
        name="busType"
        placeholder="e.g., Sleeper AC"
        value={formData.busType}
        onChange={handleInputChange}
        required
      />
      <Form.Group widths="equal">
        <Form.Input
          label="Total Seats *"
          name="totalSeats"
          type="number"
          placeholder="e.g., 40"
          value={formData.totalSeats}
          onChange={handleInputChange}
          required
        />
        <Form.Input
          label="Fare *"
          name="fare"
          type="number"
          placeholder="e.g., 499"
          value={formData.fare}
          onChange={handleInputChange}
          required
        />
      </Form.Group>
      <Form.Dropdown
        label="Route *"
        name="routeId"
        placeholder="Select Route"
        fluid
        selection
        options={routes}
        value={formData.routeId}
        onChange={(e, { value }) =>
          setFormData((prev) => ({ ...prev, routeId: value }))
        }
        required
      />
      <Form.Dropdown
        label="Amenities"
        name="amenities"
        placeholder="Select amenities"
        fluid
        multiple
        selection
        options={amenitiesList}
        value={formData.amenities}
        onChange={handleInputChange}
      />
    </Form>
  </Modal.Content>
  <Modal.Actions>
    <Button onClick={() => setOpenModal(false)}>Cancel</Button>
    <Button color="purple" onClick={handleSubmit}>
      {editId ? "Update" : "Add"}
    </Button>
  </Modal.Actions>
</Modal>

    </div>
  );
};

export default ManageBuses;
