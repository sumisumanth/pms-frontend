import React from "react";
import {
  Container,
  Typography,
  Button,
  Box,
  Grid,
  Paper
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import LocalPharmacyIcon from "@mui/icons-material/LocalPharmacy";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

function HomePage() {

  const navigate = useNavigate();

  return (

    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #e3f2fd, #ffffff)",
        paddingTop: 10
      }}
    >

      <Container maxWidth="lg">

        {/* HERO SECTION */}
        <Box textAlign="center" mb={6}>

          <LocalPharmacyIcon sx={{ fontSize: 70, color: "#1976d2" }} />

          <Typography
            variant="h3"
            sx={{ fontWeight: "bold", mt: 2 }}
          >
            Pharmacy Management System
          </Typography>

          <Typography
            variant="h6"
            sx={{ color: "gray", mt: 1 }}
          >
            Fast • Secure • Reliable Online Pharmacy
          </Typography>

        </Box>

        {/* FEATURES SECTION */}
        <Grid container spacing={3} justifyContent="center">

          <Grid item xs={12} md={4}>
            <Paper
              elevation={3}
              sx={{
                padding: 3,
                textAlign: "center",
                borderRadius: 3
              }}
            >
              <MedicalServicesIcon sx={{ fontSize: 40, color: "#1976d2" }} />
              <Typography variant="h6" mt={1}>
                Quality Medicines
              </Typography>
              <Typography variant="body2" color="gray">
                Trusted and verified pharmacy products
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper
              elevation={3}
              sx={{
                padding: 3,
                textAlign: "center",
                borderRadius: 3
              }}
            >
              <ShoppingCartIcon sx={{ fontSize: 40, color: "#1976d2" }} />
              <Typography variant="h6" mt={1}>
                Easy Ordering
              </Typography>
              <Typography variant="body2" color="gray">
                Add to cart and place orders instantly
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper
              elevation={3}
              sx={{
                padding: 3,
                textAlign: "center",
                borderRadius: 3
              }}
            >
              <LocalPharmacyIcon sx={{ fontSize: 40, color: "#1976d2" }} />
              <Typography variant="h6" mt={1}>
                Quick Delivery
              </Typography>
              <Typography variant="body2" color="gray">
                Fast delivery to your doorstep
              </Typography>
            </Paper>
          </Grid>

        </Grid>

        {/* ACTION BUTTONS */}
        <Box textAlign="center" mt={6}>

          <Button
            variant="contained"
            size="large"
            sx={{
              m: 2,
              px: 4,
              borderRadius: 3,
              backgroundColor: "#1976d2"
            }}
            onClick={() => navigate("/register")}
          >
            User Register
          </Button>

          <Button
            variant="contained"
            size="large"
            sx={{
              m: 2,
              px: 4,
              borderRadius: 3,
              backgroundColor: "#9c27b0"
            }}
            onClick={() => navigate("/login")}
          >
            User Login
          </Button>

          <Button
            variant="contained"
            size="large"
            sx={{
              m: 2,
              px: 4,
              borderRadius: 3,
              backgroundColor: "#000"
            }}
            onClick={() => navigate("/admin-login")}
          >
            Admin Login
          </Button>

        </Box>

      </Container>

    </Box>

  );

}

export default HomePage;