import { useState } from "react";
import API from "../services/api";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper
} from "@mui/material";

function AddProductPage() {

  const [name,setName] = useState("");
  const [description,setDescription] = useState("");
  const [price,setPrice] = useState("");
  const [quantity,setQuantity] = useState("");
  const [image,setImage] = useState(null);

  const submit = async (e) => {

    e.preventDefault();

    try{

      if(!image){
        alert("Please select an image");
        return;
      }

      const formData = new FormData();

      formData.append("name",name);
      formData.append("description",description);
      formData.append("price",price);
      formData.append("quantity",quantity);
      formData.append("image",image);

      await API.post("/admin/products/add", formData,{
        headers:{
          "Content-Type":"multipart/form-data"
        }
      });

      alert("Product Added Successfully");

      setName("");
      setDescription("");
      setPrice("");
      setQuantity("");
      setImage(null);

    }catch(error){

      console.error("Add product error:",error);
      alert(error?.response?.data?.message || "Failed to add product");

    }

  };

  return(

    <Container maxWidth="sm">

      <Paper elevation={4} sx={{padding:4,marginTop:5}}>

        <Typography variant="h4" gutterBottom align="center">
          Add New Product
        </Typography>

        <Box component="form" onSubmit={submit}>

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

          <Box sx={{marginTop:2}}>
            <input
              type="file"
              onChange={(e)=>setImage(e.target.files[0])}
            />
          </Box>

          <Button
            variant="contained"
            color="primary"
            fullWidth
            type="submit"
            sx={{marginTop:3,padding:1.5}}
          >
            Add Product
          </Button>

        </Box>

      </Paper>

    </Container>

  )

}

export default AddProductPage;