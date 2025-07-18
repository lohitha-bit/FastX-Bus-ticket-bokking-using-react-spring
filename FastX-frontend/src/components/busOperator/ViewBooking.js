import React, { useEffect, useState } from "react";
import {
  Segment,
  Header,
  Table,
  Button,
  Icon,
  Label,
  Modal,
  Form,
  Message,
  Dropdown,
} from "semantic-ui-react";
import axios from "axios";

const statusOptions = [
  { key: "all", text: "All", value: "" },
  { key: "confirmed", text: "Confirmed", value: "CONFIRMED" },
  { key: "cancelled", text: "Cancelled", value: "CANCELLED" },
  { key: "refunded", text: "Refunded", value: "REFUNDED" },
];

const ViewBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const [filterUserId, setFilterUserId] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [filterTicket, setFilterTicket] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const token = localStorage.getItem("token");

  const fetchFilteredBookings = async () => {
    setLoading(true);
    setError("");
    try {
      let res;
      if (filterTicket.trim()) {
        res = await axios.get(
          `http://localhost:9000/api/bookings/ticket/${filterTicket.trim()}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setBookings(res.data ? [res.data] : []);
      } else if (filterUserId.trim()) {
        res = await axios.get(
          `http://localhost:9000/api/bookings/user/${filterUserId.trim()}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setBookings(res.data);
      } else if (filterDate.trim()) {
        res = await axios.get(
          `http://localhost:9000/api/bookings/date?date=${filterDate.trim()}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setBookings(res.data);
      } else if (filterStatus) {
        res = await axios.get(
          `http://localhost:9000/api/bookings/status?status=${filterStatus}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setBookings(res.data);
      } else {
        res = await axios.get("http://localhost:9000/api/bookings", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBookings(res.data);
      }
    } catch (err) {
      setError("Failed to fetch bookings.");
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  const cancelBooking = async (bookingId) => {
    if (!window.confirm(`Cancel booking #${bookingId}?`)) return;
    try {
      await axios.delete(`http://localhost:9000/api/bookings/${bookingId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      await fetchFilteredBookings(); // Refresh after cancellation
      alert("Booking cancelled.");
    } catch (err) {
      alert("Failed to cancel booking.");
    }
  };

  const formatDateTime = (dt) =>
    dt ? new Date(dt).toLocaleString("en-IN") : "";

  const openModal = (booking) => {
    setSelectedBooking(booking);
    setModalOpen(true);
  };

  useEffect(() => {
    fetchFilteredBookings();
    // eslint-disable-next-line
  }, []);

  const getStatusLabel = (status) => {
    const colorMap = {
      CONFIRMED: "green",
      CANCELLED: "red",
      REFUNDED: "purple",
    };
    return (
      <Label color={colorMap[status] || "grey"} horizontal>
        {status}
      </Label>
    );
  };

  return (
    <Segment
      style={{
        background: "#f9f7fd",
        minHeight: "80vh",
        padding: "2rem 3rem",
        boxShadow: "0 0 15px rgb(106 13 173 / 0.15)",
        borderRadius: "10px",
      }}
    >
      <Header
        as="h2"
        icon
        textAlign="center"
        style={{ color: "#6a0dad", marginBottom: "1.5rem" }}
      >
        <Icon name="clipboard list" />
        Manage Bookings
      </Header>

      {/* Filter Form */}
      <Form onSubmit={(e) => { e.preventDefault(); fetchFilteredBookings(); }} style={{ marginBottom: "2rem" }}>
        <Form.Group widths="equal">
          <Form.Input
            label="User ID"
            placeholder="Enter User ID"
            type="number"
            value={filterUserId}
            onChange={(e) => setFilterUserId(e.target.value)}
          />
          <Form.Input
            label="Booking Date"
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
          />
          <Form.Input
            label="Ticket Number"
            placeholder="Enter Ticket Number"
            value={filterTicket}
            onChange={(e) => setFilterTicket(e.target.value)}
          />
          <Form.Field>
            <label>Status</label>
            <Dropdown
              placeholder="Select Status"
              fluid
              selection
              options={statusOptions}
              value={filterStatus}
              onChange={(e, { value }) => setFilterStatus(value)}
            />
          </Form.Field>
        </Form.Group>
        <Button color="purple" icon labelPosition="left" type="submit">
          <Icon name="filter" />
          Apply Filters
        </Button>
        <Button
          basic
          color="grey"
          onClick={() => {
            setFilterUserId("");
            setFilterDate("");
            setFilterTicket("");
            setFilterStatus("");
            fetchFilteredBookings();
          }}
          style={{ marginLeft: "1em" }}
        >
          Clear Filters
        </Button>
      </Form>

      {/* Error Message */}
      {error && (
        <Message negative>
          <Message.Header>Error</Message.Header>
          <p>{error}</p>
        </Message>
      )}

      {/* Booking Table */}
      <Table celled striped compact selectable stackable>
        <Table.Header>
          <Table.Row style={{ backgroundColor: "#e3d7f5" }}>
            <Table.HeaderCell>#</Table.HeaderCell>
            <Table.HeaderCell>Booking ID</Table.HeaderCell>
            <Table.HeaderCell>User ID</Table.HeaderCell>
            <Table.HeaderCell>Route ID</Table.HeaderCell>
            <Table.HeaderCell>Bus ID</Table.HeaderCell>
            <Table.HeaderCell>Seats</Table.HeaderCell>
            <Table.HeaderCell>Time</Table.HeaderCell>
            <Table.HeaderCell>Total (₹)</Table.HeaderCell>
            <Table.HeaderCell>Ticket</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {loading ? (
            <Table.Row>
              <Table.Cell colSpan="11" textAlign="center">
                Loading...
              </Table.Cell>
            </Table.Row>
          ) : bookings.length === 0 ? (
            <Table.Row>
              <Table.Cell colSpan="11" textAlign="center">
                No bookings found.
              </Table.Cell>
            </Table.Row>
          ) : (
            bookings.map((b, idx) => (
              <Table.Row key={b.bookingId}>
                <Table.Cell>{idx + 1}</Table.Cell>
                <Table.Cell>{b.bookingId}</Table.Cell>
                <Table.Cell>{b.userId}</Table.Cell>
                <Table.Cell>{b.routeId}</Table.Cell>
                <Table.Cell>{b.busId}</Table.Cell>
                <Table.Cell>{b.seatIds?.join(", ") || "-"}</Table.Cell>
                <Table.Cell>{formatDateTime(b.bookingTime)}</Table.Cell>
                <Table.Cell>₹{parseFloat(b.totalamount).toFixed(2)}</Table.Cell>
                <Table.Cell>{b.ticketNumber}</Table.Cell>
                <Table.Cell>{getStatusLabel(b.status)}</Table.Cell>
                <Table.Cell textAlign="center">
                  <Button
                    icon="eye"
                    size="small"
                    color="purple"
                    onClick={() => openModal(b)}
                    style={{ marginRight: "0.5em" }}
                  />
                  {b.status !== "CANCELLED" && b.status !== "REFUNDED" && (
                    <Button
                      icon="cancel"
                      size="small"
                      color="red"
                      onClick={() => cancelBooking(b.bookingId)}
                    />
                  )}
                </Table.Cell>
              </Table.Row>
            ))
          )}
        </Table.Body>
      </Table>

      {/* Booking Detail Modal */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        size="small"
        closeIcon
      >
        <Header icon="info circle" content="Booking Details" />
        <Modal.Content>
          {selectedBooking ? (
            <div style={{ fontSize: "1rem", lineHeight: "1.6" }}>
              <p><strong>Booking ID:</strong> {selectedBooking.bookingId}</p>
              <p><strong>User ID:</strong> {selectedBooking.userId}</p>
              <p><strong>Route ID:</strong> {selectedBooking.routeId}</p>
              <p><strong>Bus ID:</strong> {selectedBooking.busId}</p>
              <p><strong>Seats:</strong> {selectedBooking.seatIds?.join(", ")}</p>
              <p><strong>Booking Time:</strong> {formatDateTime(selectedBooking.bookingTime)}</p>
              <p><strong>Total Amount:</strong> ₹{parseFloat(selectedBooking.totalamount).toFixed(2)}</p>
              <p><strong>Ticket Number:</strong> {selectedBooking.ticketNumber}</p>
              <p><strong>Status:</strong> {getStatusLabel(selectedBooking.status)}</p>
            </div>
          ) : (
            <p>No booking selected.</p>
          )}
        </Modal.Content>
      </Modal>
    </Segment>
  );
};

export default ViewBooking;
