import { BrowserRouter,Routes,Route } from "react-router-dom";

import Navbar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import OrdersPage from "./pages/OrdersPage";
import AdminDashboard from "./pages/AdminDashBoard";
import AddProductPage from "./pages/AddProductPage";

function App(){

return(

<BrowserRouter>

<Navbar/>

<Routes>

<Route path="/" element={<HomePage/>}/>

<Route path="/cart" element={<CartPage/>}/>

<Route path="/orders" element={<OrdersPage/>}/>

<Route path="/admin" element={<AdminDashboard/>}/>

<Route path="/admin/add-product" element={<AddProductPage/>}/>

</Routes>

</BrowserRouter>

)

}

export default App;
