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

function AdminLoginPage(){

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");

  const handleLogin = async (e)=>{

    e.preventDefault();

    try{

      const res = await API.post("/auth/login",{
        email: username,
        password: password
      });

      if(res.data.role !== "ADMIN"){
        alert("Invalid admin credentials");
        return;
      }

      const adminData = {
        id: res.data.id,
        name: res.data.name,
        role: res.data.role
      };

      localStorage.setItem("user", JSON.stringify(adminData));
      login(adminData);

      navigate("/admin");

    }catch(err){
      alert("Invalid admin credentials");
    }

  }

  return(

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
              label="Username"
              fullWidth
              margin="normal"
              value={username}
              onChange={(e)=>setUsername(e.target.value)}
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
              variant="contained"
              type="submit"
              fullWidth
              sx={{
                mt: 3,
                py: 1.4,
                borderRadius: 2,
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

  )

}

export default AdminLoginPage;