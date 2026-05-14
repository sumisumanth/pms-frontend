import React, { useContext } from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Navbar(){

const { user, logout } = useContext(AuthContext);
const navigate = useNavigate();

const handleLogout = () => {
logout();
navigate("/");
};

/* HOME NAVIGATION */

const goHome = () => {

if(user && user.role === "USER"){
navigate("/products");
}
else if(user && user.role === "ADMIN"){
navigate("/admin");
}
else{
navigate("/");
}

};

return(

<AppBar position="static" sx={{ background:"#1976d2" }}>

<Toolbar>

<Typography variant="h6" sx={{ flexGrow:1 }}>
Pharmacy Store
</Typography>

<Box sx={{ display:"flex", alignItems:"center", gap:1 }}>

{/* Welcome message */}

{user && user.role === "ADMIN" && (
<Typography sx={{ mr:2 }}>
Welcome, Admin 👨‍💼
</Typography>
)}

{user && user.role === "USER" && (
<Typography sx={{ mr:2 }}>
Welcome, {user.name} 👤
</Typography>
)}

{/* HOME BUTTON */}

<Button color="inherit" onClick={goHome}>
Home
</Button>


{/* USER NAVIGATION */}

{user && user.role === "USER" && (
<>
<Button color="inherit" component={Link} to="/products">
Products
</Button>

<Button color="inherit" component={Link} to="/cart">
Cart
</Button>

<Button color="inherit" component={Link} to="/orders">
Orders
</Button>
</>
)}


{/* ADMIN NAVIGATION */}

{user && user.role === "ADMIN" && (
<Button color="inherit" component={Link} to="/admin">
Dashboard
</Button>
)}


{/* NOT LOGGED IN */}

{!user && (
<>
<Button color="inherit" component={Link} to="/login">
User Login
</Button>

<Button color="inherit" component={Link} to="/register">
Register
</Button>

<Button color="inherit" component={Link} to="/admin-login">
Admin Login
</Button>
</>
)}


{/* LOGOUT */}

{user && (
<Button color="inherit" onClick={handleLogout}>
Logout
</Button>
)}

</Box>

</Toolbar>

</AppBar>

);

}

export default Navbar;