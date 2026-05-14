import { TextField } from "@mui/material";

function SearchBar({search}){

return(

<TextField
fullWidth
label="Search Medicines"
onChange={(e)=>search(e.target.value)}
/>

)

}

export default SearchBar;
