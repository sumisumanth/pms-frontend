import React, { useState, useContext } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  InputAdornment,
  IconButton
} from "@mui/material";

import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LocalPharmacyIcon from "@mui/icons-material/LocalPharmacy";

import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import API from "../services/api";

function LoginPage() {

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const res = await API.post("/auth/login", {
        email,
        password
      });

      const userData = {
        id: res.data.id,
        name: res.data.name,
        role: res.data.role
      };

      localStorage.setItem("user", JSON.stringify(userData));
      login(userData);

      navigate("/products");

    } catch (error) {
      alert("Invalid credentials");
    }

  };

  return (

    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(to right, #e3f2fd, #ffffff)"
      }}
    >

      <Container maxWidth="xs">

        <Paper
          elevation={6}
          sx={{
            padding: 4,
            borderRadius: 4
          }}
        >

          {/* HEADER */}
          <Box textAlign="center" mb={3}>
            {/* <LocalPharmacyIcon sx={{ fontSize: 50, color: "#1976d2" }} /> */}

            <Typography variant="h5" fontWeight="bold" mt={1}>
              Welcome Back
            </Typography>

            <Typography variant="body2" color="gray">
              Login to your account
            </Typography>
          </Box>

          {/* FORM */}
          <form onSubmit={handleLogin}>

            <TextField
              label="Email"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{
                
              }}
            />

            <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
               
              }}
            />

            <Button
              variant="contained"
              fullWidth
              type="submit"
              sx={{
                mt: 3,
                py: 1.5,
                borderRadius: 3,
                fontWeight: "bold",
                backgroundColor: "#1976d2"
              }}
            >
              Login
            </Button>

          </form>

          {/* FOOTER */}
          <Typography
            variant="body2"
            textAlign="center"
            mt={3}
          >
            Don’t have an account?{" "}
            <span
              style={{
                color: "#1976d2",
                cursor: "pointer",
                fontWeight: "bold"
              }}
              onClick={() => navigate("/register")}
            >
              Register
            </span>
          </Typography>

        </Paper>

      </Container>

    </Box>

  );

}

export default LoginPage;