import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

import {
Container,
Typography,
Table,
TableBody,
TableCell,
TableHead,
TableRow,
IconButton,
Button,
Paper,
Box
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";

function CartPage(){

const [cart,setCart] = useState([]);
const navigate = useNavigate();

const user = JSON.parse(localStorage.getItem("user"));

useEffect(()=>{

if(!user) return;

API.get(`/user/cart/${user.id}`)
.then(res=>setCart(res.data))
.catch(err=>console.error(err));

},[]);


/* INCREASE QTY */

const increaseQty = async(item)=>{

const newQty = item.quantity + 1;

await API.put(`/user/cart/update/${item.id}`,{
quantity:newQty
});

setCart(cart.map(c =>
c.id === item.id ? {...c,quantity:newQty} : c
));

};


/* DECREASE QTY */

const decreaseQty = async(item)=>{

if(item.quantity === 1) return;

const newQty = item.quantity - 1;

await API.put(`/user/cart/update/${item.id}`,{
quantity:newQty
});

setCart(cart.map(c =>
c.id === item.id ? {...c,quantity:newQty} : c
));

};


/* REMOVE ITEM */

const removeItem = async(id)=>{

await API.delete(`/user/cart/delete/${id}`);

setCart(cart.filter(c => c.id !== id));

};


/* TOTAL PRICE */

const totalPrice = cart.reduce(
(sum,item)=> sum + (item.price * item.quantity),
0
);


return(

<Container sx={{marginTop:4}}>

<Typography variant="h4" gutterBottom>
My Cart
</Typography>

<Paper sx={{padding:3}}>

<Table>

<TableHead>

<TableRow>

<TableCell>Product</TableCell>
<TableCell>Price</TableCell>
<TableCell>Quantity</TableCell>
<TableCell>Subtotal</TableCell>
<TableCell>Action</TableCell>

</TableRow>

</TableHead>

<TableBody>

{cart.map(item => (

<TableRow key={item.id}>

<TableCell>

<Box sx={{display:"flex",alignItems:"center",gap:2}}>

<img
src={`http://localhost:8080/uploads/products/${item.image}`}
width="70"
alt={item.name}
/>

<Typography>
{item.name}
</Typography>

</Box>

</TableCell>

<TableCell>
₹ {item.price}
</TableCell>

<TableCell>

<IconButton onClick={()=>decreaseQty(item)}>
<RemoveIcon/>
</IconButton>

{item.quantity}

<IconButton onClick={()=>increaseQty(item)}>
<AddIcon/>
</IconButton>

</TableCell>

<TableCell>
₹ {item.price * item.quantity}
</TableCell>

<TableCell>

<IconButton color="error" onClick={()=>removeItem(item.id)}>
<DeleteIcon/>
</IconButton>

</TableCell>

</TableRow>

))}

</TableBody>

</Table>

</Paper>


{/* ORDER SUMMARY */}

<Box
sx={{
marginTop:3,
display:"flex",
justifyContent:"space-between",
alignItems:"center"
}}
>

<Typography variant="h6">
Total: ₹ {totalPrice}
</Typography>

<Button
variant="contained"
size="large"
onClick={()=>navigate("/checkout")}
>
Proceed to Checkout
</Button>

</Box>

</Container>

)

}

export default CartPage;
