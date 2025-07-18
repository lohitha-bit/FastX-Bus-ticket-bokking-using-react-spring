import React, { useEffect, useState } from "react";
import {
  Segment,
  Header,
  Table,
  Button,
  Icon,
  Modal,
  Form,
  Message,
} from "semantic-ui-react";
import axios from "axios";

const ManageAmenities = () => {
  const [amenities, setAmenities] = useState([]);
  const [formData, setFormData] = useState({ name: "", description: "" });
  const [selectedAmenityId, setSelectedAmenityId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [amenityToDelete, setAmenityToDelete] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchAmenities();
  }, []);

  const fetchAmenities = async () => {
    try {
      const res = await axios.get("http://localhost:9000/api/amenities", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAmenities(res.data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to fetch amenities.");
    }
  };

  const openModal = (amenity = null) => {
    if (amenity) {
      setSelectedAmenityId(amenity.amenityId);
      setFormData({ name: amenity.name, description: amenity.description || "" });
    } else {
      setSelectedAmenityId(null);
      setFormData({ name: "", description: "" });
    }
    setError("");
    setModalOpen(true);
  };

  const handleChange = (e, { name, value }) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    if (!formData.name.trim()) {
      setError("Amenity name is required.");
      return;
    }

    try {
      if (selectedAmenityId) {
        await axios.put(
          `http://localhost:9000/api/amenities/${selectedAmenityId}`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setSuccess("Amenity updated successfully.");
      } else {
        await axios.post("http://localhost:9000/api/amenities", formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSuccess("Amenity added successfully.");
      }
      setModalOpen(false);
      setFormData({ name: "", description: "" });
      fetchAmenities();
    } catch (err) {
      console.error("Submit error", err);
      setError("Failed to save amenity.");
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:9000/api/amenities/${amenityToDelete.amenityId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDeleteModalOpen(false);
      setSuccess("Amenity deleted successfully.");
      fetchAmenities();
    } catch (err) {
      console.error("Delete error", err);
      setError("Failed to delete amenity.");
    }
  };

  return (
    <div
      style={{
        padding: "2rem",
        maxWidth: "1000px",
        margin: "0 auto",
        background: "#f9f9fb",
        minHeight: "100vh",
      }}
    >
      <Header
        as="h2"
        textAlign="center"
        style={{
          color: "#2c3e50",
          fontWeight: "600",
          fontFamily: "'Segoe UI', sans-serif",
          marginBottom: "2rem",
        }}
      >
        <Icon name="cog" /> Amenity Management
      </Header>

      <Segment
        style={{
          background: "#fff",
          padding: "2rem",
          borderRadius: "10px",
          boxShadow: "0 4px 16px rgba(0, 0, 0, 0.05)",
        }}
      >
        <Button
          icon
          labelPosition="left"
          onClick={() => openModal()}
          style={{
            background: "#4a69bd",
            color: "white",
            marginBottom: "1rem",
          }}
        >
          <Icon name="add circle" />
          Add Amenity
        </Button>

        {error && <Message negative content={error} />}
        {success && <Message positive content={success} />}

        <Table celled striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>ID</Table.HeaderCell>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Description</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">Actions</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {amenities.length > 0 ? (
              amenities.map((amenity) => (
                <Table.Row key={amenity.amenityId}>
                  <Table.Cell>{amenity.amenityId}</Table.Cell>
                  <Table.Cell>{amenity.name}</Table.Cell>
                  <Table.Cell>{amenity.description || "-"}</Table.Cell>
                  <Table.Cell textAlign="center">
                    <Button icon color="blue" size="small" onClick={() => openModal(amenity)}>
                      <Icon name="pencil alternate" />
                    </Button>
                    <Button
                      icon
                      color="red"
                      size="small"
                      style={{ marginLeft: "0.5em" }}
                      onClick={() => {
                        setAmenityToDelete(amenity);
                        setDeleteModalOpen(true);
                      }}
                    >
                      <Icon name="trash alternate" />
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))
            ) : (
              <Table.Row>
                <Table.Cell colSpan="4" textAlign="center">
                  No amenities available.
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      </Segment>

      {/* Add/Edit Modal */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} size="small" closeIcon>
        <Header icon="cogs" content={selectedAmenityId ? "Edit Amenity" : "Add Amenity"} />
        <Modal.Content>
          <Form>
            <Form.Input
              label="Amenity Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter amenity name"
              required
            />
            <Form.Input
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Optional description"
            />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color="grey" onClick={() => setModalOpen(false)}>
            <Icon name="remove" /> Cancel
          </Button>
          <Button color="teal" onClick={handleSubmit}>
            <Icon name="check" /> Save
          </Button>
        </Modal.Actions>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        size="tiny"
        closeIcon
      >
        <Header icon="trash alternate" content="Confirm Deletion" />
        <Modal.Content>
          <p>
            Are you sure you want to delete amenity{" "}
            <strong>{amenityToDelete?.name}</strong>?
          </p>
        </Modal.Content>
        <Modal.Actions>
          <Button color="grey" onClick={() => setDeleteModalOpen(false)}>
            <Icon name="remove" /> Cancel
          </Button>
          <Button color="red" onClick={handleDelete}>
            <Icon name="trash alternate" /> Delete
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
};

export default ManageAmenities;
