import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";

import {
Container,
TextField,
Button,
Typography,
Paper,
Box
} from "@mui/material";

function EditProductPage(){

const { id } = useParams();
const navigate = useNavigate();

const [name,setName] = useState("");
const [description,setDescription] = useState("");
const [price,setPrice] = useState("");
const [quantity,setQuantity] = useState("");

const [image,setImage] = useState(null);
const [preview,setPreview] = useState("");

/* LOAD PRODUCT */

useEffect(()=>{

API.get("/admin/products/all")
.then(res => {

const product = res.data.find(p => p.id == id);

if(product){
setName(product.name);
setDescription(product.description);
setPrice(product.price);
setQuantity(product.quantity);

/* SHOW OLD IMAGE */
setPreview(`http://localhost:8080/uploads/products/${product.image}`);
}

})
.catch(err => console.log(err));

},[id]);

/* HANDLE IMAGE CHANGE */

const handleImageChange = (e) => {
const file = e.target.files[0];
setImage(file);

if(file){
setPreview(URL.createObjectURL(file));
}
};

/* UPDATE PRODUCT */

const updateProduct = async(e)=>{

e.preventDefault();

try{

const formData = new FormData();

formData.append("name", name);
formData.append("description", description);
formData.append("price", price);
formData.append("quantity", quantity);

/* ADD IMAGE ONLY IF SELECTED */
if(image){
formData.append("image", image);
}

await API.put(`/admin/products/update/${id}`, formData, {
headers: {
"Content-Type": "multipart/form-data"
}
});

alert("Product Updated Successfully");

navigate("/admin/products");

}catch(err){

console.error(err);
alert("Update failed");

}

};

return(

<Box
sx={{
minHeight:"100vh",
background:"#f5f7fa",
paddingTop:6
}}
>

<Container maxWidth="sm">

<Paper
sx={{
padding:4,
borderRadius:3,
boxShadow:"0 4px 20px rgba(0,0,0,0.08)"
}}
>

<Typography
variant="h4"
sx={{mb:3,fontWeight:"bold"}}
>
Edit Product
</Typography>

<Box component="form" onSubmit={updateProduct}>

<TextField
label="Product Name"
fullWidth
margin="normal"
value={name}
onChange={(e)=>setName(e.target.value)}
/>

<TextField
label="Description"
fullWidth
margin="normal"
value={description}
onChange={(e)=>setDescription(e.target.value)}
/>

<TextField
label="Price"
type="number"
fullWidth
margin="normal"
value={price}
onChange={(e)=>setPrice(e.target.value)}
/>

<TextField
label="Quantity"
type="number"
fullWidth
margin="normal"
value={quantity}
onChange={(e)=>setQuantity(e.target.value)}
/>

{/* IMAGE PREVIEW */}
{preview && (
<Box sx={{mt:2, textAlign:"center"}}>
<img
src={preview}
alt="preview"
width="140"
style={{borderRadius:"10px"}}
/>
</Box>
)}

{/* IMAGE UPLOAD */}
<Button
variant="outlined"
component="label"
fullWidth
sx={{mt:2}}
>
Upload New Image
<input
type="file"
hidden
onChange={handleImageChange}
/>
</Button>

<Button
variant="contained"
fullWidth
type="submit"
sx={{
mt:3,
py:1.4,
borderRadius:2,
fontWeight:"bold"
}}
>
Update Product
</Button>

</Box>

</Paper>

</Container>

</Box>

)

}

export default EditProductPage;