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
];

const ManageBookings = () => {
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
      if (filterTicket.trim()) {
        const res = await axios.get(
          `http://localhost:9000/api/bookings/ticket/${filterTicket.trim()}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setBookings(res.data ? [res.data] : []);
      } else if (filterUserId.trim()) {
        const res = await axios.get(
          `http://localhost:9000/api/bookings/user/${filterUserId.trim()}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setBookings(res.data);
      } else if (filterDate.trim()) {
        const res = await axios.get(
          `http://localhost:9000/api/bookings/date?date=${filterDate.trim()}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setBookings(res.data);
      } else if (filterStatus) {
        const res = await axios.get(
          `http://localhost:9000/api/bookings/status?status=${filterStatus}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setBookings(res.data);
      } else {
        const res = await axios.get("http://localhost:9000/api/bookings", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBookings(res.data);
      }
    } catch (err) {
      setError("Failed to fetch bookings with filters.");
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = (e) => {
    e.preventDefault();
    fetchFilteredBookings();
  };

  const cancelBooking = async (bookingId) => {
    if (
      !window.confirm(
        `Are you sure you want to cancel booking #${bookingId}? This action cannot be undone.`
      )
    )
      return;

    try {
      await axios.delete(`http://localhost:9000/api/bookings/${bookingId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings((prev) =>
        prev.map((b) =>
          b.bookingId === bookingId ? { ...b, status: "CANCELLED" } : b
        )
      );
      alert("Booking cancelled successfully.");
    } catch (err) {
      alert("Failed to cancel booking.");
    }
  };

  const formatDateTime = (dtString) =>
    dtString ? new Date(dtString).toLocaleString() : "";

  const openModal = (booking) => {
    setSelectedBooking(booking);
    setModalOpen(true);
  };

  useEffect(() => {
    fetchFilteredBookings();
    // eslint-disable-next-line
  }, []);

  return (
    <Segment
      style={{
        background: "#f5f8fc",
        minHeight: "100vh",
        padding: "3rem 2rem",
        borderRadius: "12px",
        boxShadow: "0 0 10px rgba(0,0,0,0.06)",
        maxWidth: "1200px",
        margin: "auto",
      }}
    >
      <Header
        as="h2"
        textAlign="center"
        style={{
          color: "#34495e",
          fontWeight: "600",
          fontSize: "2.2rem",
          marginBottom: "2rem",
        }}
      >
        <Icon name="clipboard list" />
        Booking Management
      </Header>

      {/* Filter Form */}
      <Form onSubmit={handleFilter} style={{ marginBottom: "2rem" }}>
        <Form.Group widths="equal">
          <Form.Input
            label="User ID"
            placeholder="e.g. 1"
            value={filterUserId}
            onChange={(e) => setFilterUserId(e.target.value)}
            type="number"
            min="1"
          />
          <Form.Input
            label="Booking Date"
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
          />
          <Form.Input
            label="Ticket Number"
            placeholder="e.g. FXT123456"
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
        <div style={{ marginTop: "1rem" }}>
          <Button color="blue" icon labelPosition="left" type="submit">
            <Icon name="search" />
            Apply Filters
          </Button>
          <Button
            basic
            color="grey"
            type="button"
            style={{ marginLeft: "1em" }}
            onClick={() => {
              setFilterUserId("");
              setFilterDate("");
              setFilterTicket("");
              setFilterStatus("");
              fetchFilteredBookings();
            }}
          >
            Clear
          </Button>
        </div>
      </Form>

      {error && (
        <Message negative>
          <Message.Header>Error</Message.Header>
          <p>{error}</p>
        </Message>
      )}

      <Table celled compact striped stackable>
        <Table.Header>
          <Table.Row style={{ backgroundColor: "#eaf0f9" }}>
            <Table.HeaderCell>#</Table.HeaderCell>
            <Table.HeaderCell>Booking ID</Table.HeaderCell>
            <Table.HeaderCell>User ID</Table.HeaderCell>
            <Table.HeaderCell>Route ID</Table.HeaderCell>
            <Table.HeaderCell>Bus ID</Table.HeaderCell>
            <Table.HeaderCell>Seats</Table.HeaderCell>
            <Table.HeaderCell>Booked On</Table.HeaderCell>
            <Table.HeaderCell>Amount (₹)</Table.HeaderCell>
            <Table.HeaderCell>Ticket No.</Table.HeaderCell>
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
                <Table.Cell>{b.seatIds?.join(", ")}</Table.Cell>
                <Table.Cell>{formatDateTime(b.bookingTime)}</Table.Cell>
                <Table.Cell>{b.totalamount}</Table.Cell>
                <Table.Cell>{b.ticketNumber}</Table.Cell>
                <Table.Cell>
                  <Label color={b.status === "CONFIRMED" ? "green" : "red"}>
                    {b.status}
                  </Label>
                </Table.Cell>
                <Table.Cell textAlign="center">
                  <Button
                    icon="eye"
                    color="blue"
                    size="small"
                    title="View"
                    onClick={() => openModal(b)}
                  />
                  {b.status !== "CANCELLED" && (
                    <Button
                      icon="ban"
                      color="red"
                      size="small"
                      title="Cancel"
                      style={{ marginLeft: "0.5em" }}
                      onClick={() => cancelBooking(b.bookingId)}
                    />
                  )}
                </Table.Cell>
              </Table.Row>
            ))
          )}
        </Table.Body>
      </Table>

      {/* Booking Details Modal */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        size="small"
        closeIcon
      >
        <Header icon="info circle" content="Booking Details" />
        <Modal.Content>
          {selectedBooking ? (
            <div style={{ lineHeight: "1.6" }}>
              <p><strong>Booking ID:</strong> {selectedBooking.bookingId}</p>
              <p><strong>User ID:</strong> {selectedBooking.userId}</p>
              <p><strong>Route ID:</strong> {selectedBooking.routeId}</p>
              <p><strong>Bus ID:</strong> {selectedBooking.busId}</p>
              <p><strong>Seats:</strong> {selectedBooking.seatIds?.join(", ")}</p>
              <p><strong>Booking Time:</strong> {formatDateTime(selectedBooking.bookingTime)}</p>
              <p><strong>Total Amount:</strong> ₹{selectedBooking.totalamount}</p>
              <p><strong>Ticket Number:</strong> {selectedBooking.ticketNumber}</p>
              <p><strong>Status:</strong> 
                <Label
                  color={selectedBooking.status === "CONFIRMED" ? "green" : "red"}
                  style={{ marginLeft: "0.5em" }}
                >
                  {selectedBooking.status}
                </Label>
              </p>
            </div>
          ) : (
            <p>No booking selected.</p>
          )}
        </Modal.Content>
      </Modal>
    </Segment>
  );
};

export default ManageBookings;
