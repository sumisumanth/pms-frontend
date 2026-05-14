import { useEffect, useState } from "react";
import API from "../services/api";

import {
Container,
Typography,
Table,
TableBody,
TableCell,
TableContainer,
TableHead,
TableRow,
Paper,
Chip
} from "@mui/material";

function AdminOrdersPage(){

const [orders,setOrders] = useState([]);

useEffect(()=>{

API.get("/admin/orders")
.then(res => setOrders(res.data))
.catch(err => console.log(err));

},[]);

return(

<Container sx={{marginTop:5}}>

<Typography variant="h4" gutterBottom>
Orders Management
</Typography>

<TableContainer component={Paper} elevation={4}>

<Table>

<TableHead>

<TableRow sx={{background:"#1976d2"}}>

<TableCell sx={{color:"white"}}>Order ID</TableCell>
<TableCell sx={{color:"white"}}>User</TableCell>
<TableCell sx={{color:"white"}}>Product</TableCell>
<TableCell sx={{color:"white"}}>Quantity</TableCell>
<TableCell sx={{color:"white"}}>Price</TableCell>
<TableCell sx={{color:"white"}}>Address</TableCell> {/* ✅ NEW */}
<TableCell sx={{color:"white"}}>Status</TableCell>
<TableCell sx={{color:"white"}}>Date</TableCell>

</TableRow>

</TableHead>

<TableBody>

{orders.map(order => (

<TableRow key={order.id} hover>

<TableCell>{order.id}</TableCell>
<TableCell>{order.username}</TableCell>
<TableCell>{order.productName}</TableCell>
<TableCell>{order.quantity}</TableCell>
<TableCell>₹ {order.price}</TableCell>

{/* ✅ NEW ADDRESS COLUMN */}
<TableCell>{order.address}</TableCell>

<TableCell>
<Chip
label={order.status}
color={order.status === "Delivered" ? "success" : "warning"}
/>
</TableCell>

<TableCell>
{new Date(order.date).toLocaleDateString()}
</TableCell>

</TableRow>

))}

</TableBody>

</Table>

</TableContainer>

</Container>

)

}

export default AdminOrdersPage;