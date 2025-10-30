import React, { useEffect, useState } from "react";
import './App.css';
import {
  Container,
  TextField,
  Grid,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  AppBar,
  Toolbar,
} from "@mui/material";

function App() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #e0f7fa 0%, #e3f2fd 100%)",
        minHeight: "100vh",
        paddingBottom: "2rem",
      }}
    >
      <AppBar
        position="static"
        elevation={2}
        style={{
          background: "linear-gradient(90deg, #007bff, #00c6ff)",
        }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            style={{
              flexGrow: 1,
              textAlign: "center",
              fontWeight: "600",
              letterSpacing: "0.5px",
            }}
          >
            RemitBee User Directory
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" style={{ marginTop: "2.5rem" }}>
        <TextField
          fullWidth
          label="Search by name..."
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            marginBottom: "2rem",
            backgroundColor: "white",
            borderRadius: "8px",
          }}
        />

        {loading ? (
          <div style={{ textAlign: "center", marginTop: "3rem" }}>
            <CircularProgress color="primary" />
            <Typography variant="body1" style={{ marginTop: "1rem" }}>
              Fetching users...
            </Typography>
          </div>
        ) : (
          <Grid container spacing={3}>
            {filteredUsers.map((user, index) => (
              <Grid item xs={12} sm={6} md={4} key={user.id}>
                <Card
                  style={{
                    borderRadius: "16px",
                    backdropFilter: "blur(8px)",
                    background:
                      "rgba(255, 255, 255, 0.7)",
                    boxShadow:
                      "0 6px 20px rgba(0, 0, 0, 0.1)",
                    transition: "transform 0.25s ease, box-shadow 0.25s ease",
                    cursor: "pointer",
                    animation: `fadeIn 0.5s ease ${index * 0.1}s both`,
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = "translateY(-6px)";
                    e.currentTarget.style.boxShadow =
                      "0 10px 25px rgba(0, 123, 255, 0.25)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 6px 20px rgba(0, 0, 0, 0.1)";
                  }}
                >
                  <CardContent>
                    <Typography
                      variant="h6"
                      style={{
                        color: "#007bff",
                        fontWeight: 600,
                        marginBottom: "0.5rem",
                      }}
                    >
                      {user.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      style={{ color: "#333", marginBottom: "0.3rem" }}
                    >
                      📧 {user.email}
                    </Typography>
                    <Typography
                      variant="body2"
                      style={{ color: "#333", marginBottom: "0.3rem" }}
                    >
                      📞 {user.phone}
                    </Typography>
                    <Typography variant="body2" style={{ color: "#333" }}>
                      🌍 {user.website}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>

      {/* Fade-in animation style */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </div>
  );
}

export default App;
