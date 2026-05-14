import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

import {
Container,
Typography,
Paper,
Table,
TableHead,
TableRow,
TableCell,
TableBody,
TableContainer,
TextField,
Button,
Box
} from "@mui/material";

function AdminProductsPage(){

const [products,setProducts] = useState([]);
const [search,setSearch] = useState("");

const navigate = useNavigate();

/* LOAD PRODUCTS */

const loadProducts = () => {

API.get("/admin/products/all")
.then(res => setProducts(res.data))
.catch(err => console.log(err));

};

useEffect(()=>{

loadProducts();

},[]);


/* DELETE PRODUCT */

const deleteProduct = async(id)=>{

try{

await API.delete(`/admin/products/${id}`);

alert("Product deleted");

loadProducts();

}catch(err){

alert("Delete failed");

}

};


/* SEARCH FILTER */

const filteredProducts = products.filter(p =>
p.name.toLowerCase().includes(search.toLowerCase())
);

return(

<Container sx={{marginTop:5}}>

<Typography variant="h4" gutterBottom>
Manage Products
</Typography>

<Box sx={{marginBottom:3}}>

<TextField
label="Search product"
variant="outlined"
fullWidth
value={search}
onChange={(e)=>setSearch(e.target.value)}
/>

</Box>

<TableContainer component={Paper} elevation={4}>

<Table>

<TableHead>

<TableRow sx={{backgroundColor:"#1976d2"}}>

<TableCell sx={{color:"white"}}>Image</TableCell>
<TableCell sx={{color:"white"}}>Name</TableCell>
<TableCell sx={{color:"white"}}>Description</TableCell>
<TableCell sx={{color:"white"}}>Price</TableCell>
<TableCell sx={{color:"white"}}>Quantity</TableCell>
<TableCell sx={{color:"white"}}>Actions</TableCell>

</TableRow>

</TableHead>

<TableBody>

{filteredProducts.map(p => (

<TableRow key={p.id}>

<TableCell>

<img
src={`http://localhost:8080/uploads/products/${p.image}`}
width="60"
style={{borderRadius:"5px"}}
/>

</TableCell>

<TableCell>{p.name}</TableCell>

<TableCell>{p.description}</TableCell>

<TableCell>₹{p.price}</TableCell>

<TableCell>{p.quantity}</TableCell>

<TableCell>

<Button
variant="contained"
color="primary"
sx={{mr:1}}
onClick={()=>navigate(`/admin/edit-product/${p.id}`)}
>
Edit
</Button>

<Button
variant="contained"
color="error"
onClick={()=>deleteProduct(p.id)}
>
Delete
</Button>

</TableCell>

</TableRow>

))}

</TableBody>

</Table>

</TableContainer>

</Container>

)

}

export default AdminProductsPage