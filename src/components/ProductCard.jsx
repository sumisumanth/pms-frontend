import { Card, CardMedia, CardContent, Button } from "@mui/material";

function ProductCard({product,addToCart}){

return(

<Card>

<CardMedia
component="img"
height="200"
image={`http://localhost:8080/products/${product.image}`}
/>

<CardContent>

<h3>{product.name}</h3>

<p>{product.description}</p>

<h4>₹ {product.price}</h4>

<Button
variant="contained"
onClick={()=>addToCart(product.id)}
>
Add to Cart
</Button>

</CardContent>

</Card>

)

}

export default ProductCard;
