import { useEffect, useState } from "react";
import API from "../services/api";

import {
Container,
Grid,
Card,
CardContent,
CardMedia,
Typography,
Button,
TextField,
CircularProgress,
Box
} from "@mui/material";

function ProductsPage(){

const [products,setProducts] = useState([]);
const [search,setSearch] = useState("");
const [loading,setLoading] = useState(false);
const [adding,setAdding] = useState(null);


/* LOAD PRODUCTS */

useEffect(()=>{

fetchProducts();

},[]);

const fetchProducts = async()=>{

try{

setLoading(true);

const res = await API.get("/admin/products/all");

setProducts(res.data);

}
catch(err){

console.error(err);

}
finally{
setLoading(false);
}

};


/* SEARCH PRODUCT */

const searchProduct = async()=>{

try{

setLoading(true);

const res = await API.get(`/admin/products/search?name=${search}`);

setProducts(res.data);

}
catch(err){

console.log(err);

}
finally{

setLoading(false);

}

};


/* ADD TO CART */

const addToCart = async(productId)=>{

const user = JSON.parse(localStorage.getItem("user"));

if(!user){
alert("Please login first");
return;
}

try{

setAdding(productId);

await API.post("/user/cart/add",{
userId:user.id,
productId:productId,
quantity:1
});

alert("Product added to cart");

}
catch(err){

console.error(err);
alert("Failed to add product");

}
finally{

setAdding(null);

}

};


return(

<Container sx={{marginTop:5}}>

<Typography variant="h4" sx={{fontWeight:"bold"}} gutterBottom>
All Products
</Typography>


<Box sx={{display:"flex",gap:2,marginBottom:3}}>

<TextField
label="Search Medicine"
value={search}
onChange={(e)=>setSearch(e.target.value)}
fullWidth
/>

<Button
variant="contained"
onClick={searchProduct}
>
Search
</Button>

</Box>


{/* LOADING */}

{loading && (
<Box sx={{display:"flex",justifyContent:"center",marginTop:5}}>
<CircularProgress/>
</Box>
)}


<Grid container spacing={4}>

{products.map(p => (

<Grid item xs={12} sm={6} md={3} key={p.id}>

<Card
sx={{
height:"100%",
display:"flex",
flexDirection:"column",
justifyContent:"space-between",
boxShadow:3,
borderRadius:3
}}
>

<CardMedia
component="img"
height="200"
image={`http://localhost:8080/uploads/products/${p.image}`}
alt={p.name}
/>

<CardContent>

<Typography variant="h6" sx={{fontWeight:"bold"}}>
{p.name}
</Typography>

<Typography sx={{marginTop:1}}>
₹ {p.price}
</Typography>

<Button
variant="contained"
fullWidth
sx={{marginTop:2}}
disabled={adding === p.id}
onClick={()=>addToCart(p.id)}
>
{adding === p.id ? "Adding..." : "Add to Cart"}
</Button>

</CardContent>

</Card>

</Grid>

))}

</Grid>

</Container>

)

}

export default ProductsPage;