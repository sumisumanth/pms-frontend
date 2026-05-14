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
Button,
Dialog,
DialogTitle,
DialogContent,
DialogContentText,
DialogActions
} from "@mui/material";

function AdminUsersPage(){

const [users,setUsers] = useState([]);
const [deleteId,setDeleteId] = useState(null);

/* LOAD USERS */

const loadUsers = () => {

API.get("/admin/users")
.then(res => setUsers(res.data))
.catch(err => console.log(err));

};

useEffect(()=>{

loadUsers();

},[]);


/* DELETE USER */

const confirmDelete = async()=>{

await API.delete(`/admin/users/${deleteId}`);

setDeleteId(null);

loadUsers();

};

return(

<Container sx={{marginTop:5}}>

<Typography variant="h4" gutterBottom>
Users Management
</Typography>

<TableContainer component={Paper} elevation={4}>

<Table>

<TableHead>

<TableRow sx={{backgroundColor:"#1976d2"}}>

<TableCell sx={{color:"white"}}>ID</TableCell>
<TableCell sx={{color:"white"}}>Name</TableCell>
<TableCell sx={{color:"white"}}>Email</TableCell>
<TableCell sx={{color:"white"}}>Total Orders</TableCell>
<TableCell sx={{color:"white"}}>Action</TableCell>

</TableRow>

</TableHead>

<TableBody>

{users.map(user => (

<TableRow key={user.id} hover>

<TableCell>{user.id}</TableCell>
<TableCell>{user.name}</TableCell>
<TableCell>{user.email}</TableCell>
<TableCell>{user.orders}</TableCell>

<TableCell>

<Button
variant="contained"
color="error"
onClick={()=>setDeleteId(user.id)}
>
Delete
</Button>

</TableCell>

</TableRow>

))}

</TableBody>

</Table>

</TableContainer>


{/* DELETE CONFIRMATION DIALOG */}

<Dialog open={deleteId != null} onClose={()=>setDeleteId(null)}>

<DialogTitle>
Delete User
</DialogTitle>

<DialogContent>

<DialogContentText>
Are you sure you want to delete this user?
</DialogContentText>

</DialogContent>

<DialogActions>

<Button onClick={()=>setDeleteId(null)}>
Cancel
</Button>

<Button color="error" onClick={confirmDelete}>
Delete
</Button>

</DialogActions>

</Dialog>

</Container>

)

}

export default AdminUsersPage;