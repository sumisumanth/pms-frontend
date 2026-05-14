import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

import {
Container,
Typography,
TextField,
Button,
Table,
TableHead,
TableRow,
TableCell,
TableBody,
Paper,
Box
} from "@mui/material";

function CheckoutPage(){

const [cart,setCart] = useState([]);
const [address,setAddress] = useState("");

const navigate = useNavigate();

const user = JSON.parse(localStorage.getItem("user"));

/* LOAD CART */

useEffect(()=>{

if(!user) return;

API.get(`/user/cart/${user.id}`)
.then(res=>setCart(res.data))
.catch(err=>console.error(err));

},[]);


/* TOTAL PRICE */

const totalPrice = cart.reduce(
(sum,item)=> sum + (item.price * item.quantity),
0
);


/* PLACE ORDER */
const placeOrder = async () => {

if(!address){
alert("Please enter delivery address");
return;
}

try{

await API.post(`/user/orders/place/${user.id}`,{
address: address
});

alert("Order Placed Successfully");

navigate("/orders");

}catch(error){

console.error(error);
alert("Failed to place order");

}

};


return(

<Container sx={{marginTop:4}}>

<Typography variant="h4" gutterBottom>
Checkout
</Typography>

<Paper sx={{padding:3}}>

<Table>

<TableHead>

<TableRow>

<TableCell>Product</TableCell>
<TableCell>Price</TableCell>
<TableCell>Quantity</TableCell>
<TableCell>Total</TableCell>

</TableRow>

</TableHead>

<TableBody>

{cart.map(item => (

<TableRow key={item.id}>

<TableCell>
{item.name}
</TableCell>

<TableCell>
₹ {item.price}
</TableCell>

<TableCell>
{item.quantity}
</TableCell>

<TableCell>
₹ {item.price * item.quantity}
</TableCell>

</TableRow>

))}

</TableBody>

</Table>


<Box sx={{marginTop:2}}>

<Typography variant="h6">
Total Price : ₹ {totalPrice}
</Typography>

</Box>


<TextField
label=" please enter your full address with name and phone number"
fullWidth
multiline
rows={3}
sx={{marginTop:3}}
value={address}
onChange={(e)=>setAddress(e.target.value)}
/>


<Button
variant="contained"
size="large"
sx={{marginTop:3}}
onClick={placeOrder}
>
Place Order
</Button>

</Paper>

</Container>

)

}

export default CheckoutPage;