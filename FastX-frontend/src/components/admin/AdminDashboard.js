import React from "react";
import { Card, Icon, Grid, Header, Container, Segment } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const sections = [
    { title: "Manage Users", icon: "user circle", path: "/admin/manage-users" },
    { title: "Manage Buses", icon: "truck", path: "/admin/manage-buses" },
    { title: "Manage Routes", icon: "map signs", path: "/admin/manage-routes" },
    { title: "Manage Amenities", icon: "clipboard list", path: "/admin/manage-amenities" },
    { title: "View Bookings", icon: "calendar check", path: "/admin/manage-bookings" },
  ];

  return (
    <div style={{ background: "#f2f4f7", minHeight: "100vh", padding: "3rem 0" }}>
      <Container>
        <Segment
          style={{
            borderRadius: "10px",
            background: "#ffffff",
            padding: "2.5rem",
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          }}
        >
          <Header
            as="h2"
            textAlign="center"
            style={{
              color: "#2c3e50",
              fontWeight: 600,
              fontSize: "2.2rem",
              marginBottom: "2rem",
              fontFamily: "'Segoe UI', sans-serif",
            }}
          >
            Admin Panel
          </Header>

          <Grid columns={3} stackable doubling centered>
            {sections.map((section, idx) => (
              <Grid.Column key={idx} style={{ display: "flex", justifyContent: "center" }}>
                <Card
                  onClick={() => navigate(section.path)}
                  style={{
                    cursor: "pointer",
                    borderRadius: "10px",
                    minWidth: "200px",
                    maxWidth: "220px",
                    padding: "1rem",
                    textAlign: "center",
                    border: "1px solid #dedede",
                    transition: "all 0.25s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-5px)";
                    e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.12)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <div style={{ marginBottom: "0.8rem", color: "#4a69bd" }}>
                    <Icon name={section.icon} size="big" />
                  </div>
                  <Card.Content>
                    <Card.Header
                      style={{
                        fontSize: "1.1rem",
                        fontWeight: "600",
                        color: "#2c3e50",
                        fontFamily: "'Segoe UI', sans-serif",
                      }}
                    >
                      {section.title}
                    </Card.Header>
                  </Card.Content>
                </Card>
              </Grid.Column>
            ))}
          </Grid>
        </Segment>
      </Container>
    </div>
  );
};

export default AdminDashboard;
