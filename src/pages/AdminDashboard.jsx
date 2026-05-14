import { Container, Grid, Paper, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

import InventoryIcon from "@mui/icons-material/Inventory";
import PeopleIcon from "@mui/icons-material/People";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AddBoxIcon from "@mui/icons-material/AddBox";

function AdminDashboard(){

const navigate = useNavigate();

const cardStyle = {
height:230, 
width:200,  // 🔥 increased size
display:"flex",
flexDirection:"column",
alignItems:"center",
justifyContent:"center",
cursor:"pointer",
borderRadius:"14px",
background:"#ffffff",
transition:"0.25s",
boxShadow:"0 4px 18px rgba(0,0,0,0.08)",

"&:hover":{
transform:"translateY(-6px)",
boxShadow:"0 10px 30px rgba(0,0,0,0.15)"
}
};

return(

<Box
sx={{
minHeight:"100vh",
background:"#f5f7fa",   // cleaner background
paddingTop:8,
paddingBottom:8
}}
>

<Container maxWidth="lg">

<Typography
variant="h4"
align="center"
sx={{
fontWeight:"bold",
marginBottom:6
}}
>
Admin Dashboard
</Typography>

<Grid container spacing={5} justifyContent="center">

{/* Manage Products */}

<Grid item xs={12} sm={6} md={5}>
<Paper sx={cardStyle} onClick={()=>navigate("/admin/products")}>
<Box sx={{color:"#1976d2"}}>
<InventoryIcon sx={{fontSize:70}}/>
</Box>
<Typography variant="h6" sx={{mt:2,fontWeight:600}}>
Manage Products
</Typography>
</Paper>
</Grid>

{/* View Users */}

<Grid item xs={12} sm={6} md={5}>
<Paper sx={cardStyle} onClick={()=>navigate("/admin/users")}>
<Box sx={{color:"#2e7d32"}}>
<PeopleIcon sx={{fontSize:70}}/>
</Box>
<Typography variant="h6" sx={{mt:2,fontWeight:600}}>
View Users
</Typography>
</Paper>
</Grid>

{/* View Orders */}

<Grid item xs={12} sm={6} md={5}>
<Paper sx={cardStyle} onClick={()=>navigate("/admin/orders")}>
<Box sx={{color:"#ed6c02"}}>
<ShoppingCartIcon sx={{fontSize:70}}/>
</Box>
<Typography variant="h6" sx={{mt:2,fontWeight:600}}>
View Orders
</Typography>
</Paper>
</Grid>

{/* Add Product */}

<Grid item xs={12} sm={6} md={5}>
<Paper sx={cardStyle} onClick={()=>navigate("/admin/add-product")}>
<Box sx={{color:"#9c27b0"}}>
<AddBoxIcon sx={{fontSize:70}}/>
</Box>
<Typography variant="h6" sx={{mt:2,fontWeight:600}}>
Add Product
</Typography>
</Paper>
</Grid>

</Grid>

</Container>

</Box>

)

}

export default AdminDashboard;