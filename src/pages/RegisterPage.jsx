import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import API from "../services/api";

function RegisterPage() {

  const navigate = useNavigate();

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const handleRegister = async (e) => {

    e.preventDefault();

    try {

      await API.post("/auth/register",{
        name,
        email,
        password
      });

      alert("Registration Successful");
      navigate("/login");

    } catch(error){
      alert("Registration Failed");
    }

  };

  return (

    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(to right, #eef2f3, #dfe9f3)"
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
            Create Account
          </Typography>

          <Typography
            variant="body2"
            align="center"
            sx={{ color: "gray", mb: 3 }}
          >
            Register to access pharmacy services
          </Typography>

          {/* FORM */}
          <Box component="form" onSubmit={handleRegister}>

            <TextField
              label="Full Name"
              fullWidth
              margin="normal"
              value={name}
              onChange={(e)=>setName(e.target.value)}
            />

            <TextField
              label="Email"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />

            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                mt: 3,
                py: 1.4,
                borderRadius: 2,
                fontWeight: "bold",
                backgroundColor: "#1976d2"
              }}
            >
              Register
            </Button>

          </Box>

          {/* FOOTER */}
          <Typography
            variant="body2"
            align="center"
            sx={{ mt: 3 }}
          >
            Already have an account?{" "}
            <span
              style={{
                color: "#1976d2",
                cursor: "pointer",
                fontWeight: "bold"
              }}
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </Typography>

        </Paper>

      </Container>

    </Box>

  );
}

export default RegisterPage;