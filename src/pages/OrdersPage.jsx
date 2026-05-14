import { useEffect, useState } from "react";
import API from "../services/api";

import {
Container,
Typography,
Paper,
Table,
TableHead,
TableRow,
TableCell,
TableBody,
Chip
} from "@mui/material";

function OrdersPage(){

const [orders,setOrders] = useState([]);

const user = JSON.parse(localStorage.getItem("user"));

useEffect(()=>{

if(!user) return;

API.get(`/user/orders/history/${user.id}`)
.then(res => {
console.log(res.data); // DEBUG
setOrders(res.data);
})
.catch(err => console.log(err));

},[]);


return(

<Container sx={{marginTop:4}}>

<Typography variant="h4" gutterBottom>
Order History
</Typography>

<Paper sx={{padding:2}}>

<Table>

<TableHead>

<TableRow>
<TableCell>Order ID</TableCell>
<TableCell>Product</TableCell>
<TableCell>Quantity</TableCell>
<TableCell>Price</TableCell>
<TableCell>Address</TableCell>
<TableCell>Status</TableCell>
<TableCell>Date</TableCell>
</TableRow>

</TableHead>

<TableBody>

{orders.length === 0 ? (
<TableRow>
<TableCell colSpan={7} align="center">
No Orders Found
</TableCell>
</TableRow>
) : (

orders.map(o => (

<TableRow key={o.id}>

<TableCell>{o.id}</TableCell>
<TableCell>{o.productName}</TableCell>
<TableCell>{o.quantity}</TableCell>
<TableCell>₹ {o.price}</TableCell>
<TableCell>{o.address}</TableCell>

<TableCell>
<Chip label={o.status} color="success"/>
</TableCell>

<TableCell>
{new Date(o.date).toLocaleDateString()}
</TableCell>

</TableRow>

))

)}

</TableBody>

</Table>

</Paper>

</Container>

)

}

export default OrdersPage;