import React, { useState, useContext } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Box
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import API from "../services/api";

function AdminLoginPage() {

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {

    e.preventDefault();

    if (!username || !password) {
      alert("Please enter username and password");
      return;
    }

    try {

      setLoading(true);

      const response = await API.post("/auth/login", {
        email: username,
        password: password
      });

      console.log("Login Response:", response.data);

      // CHECK USER EXISTS
      if (!response.data) {
        alert("Login failed");
        return;
      }

      // CHECK ADMIN ROLE
      if (response.data.role !== "ADMIN") {
        alert("Access denied. Not an admin account.");
        return;
      }

      // STORE ADMIN DATA
      const adminData = {
        id: response.data.id,
        name: response.data.name,
        email: response.data.email,
        role: response.data.role
      };

      localStorage.setItem("user", JSON.stringify(adminData));

      login(adminData);

      alert("Admin login successful");

      navigate("/admin");

    } catch (error) {

      console.error("Admin Login Error:", error);

      if (error.response) {
        alert(error.response.data.message || "Invalid admin credentials");
      } else {
        alert("Server connection failed");
      }

    } finally {
      setLoading(false);
    }

  };

  return (

    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(to right, #f5f7fa, #c3cfe2)"
      }}
    >

      <Container maxWidth="xs">

        <Paper
          elevation={5}
          sx={{
            padding: 4,
            borderRadius: 3
          }}
        >

          {/* TITLE */}
          <Typography
            variant="h5"
            align="center"
            sx={{ fontWeight: "bold", mb: 2 }}
          >
            Admin Login
          </Typography>

          <Typography
            variant="body2"
            align="center"
            sx={{ color: "gray", mb: 3 }}
          >
            Enter your credentials to access dashboard
          </Typography>

          {/* FORM */}
          <form onSubmit={handleLogin}>

            <TextField
              label="Admin Email"
              type="email"
              fullWidth
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Button
              variant="contained"
              type="submit"
              fullWidth
              disabled={loading}
              sx={{
                mt: 3,
                py: 1.4,
                borderRadius: 2,
                fontWeight: "bold",
                backgroundColor: "#1976d2"
              }}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>

          </form>

          {/* FOOTER */}
          <Typography
            variant="body2"
            align="center"
            sx={{ mt: 3 }}
          >
            Back to{" "}
            <span
              style={{
                color: "#1976d2",
                cursor: "pointer",
                fontWeight: "bold"
              }}
              onClick={() => navigate("/")}
            >
              Home
            </span>
          </Typography>

        </Paper>

      </Container>

    </Box>

  );

}

export default AdminLoginPage;