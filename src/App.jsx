import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";




import Navbar from "./components/NavBar.jsx";

import HomePage from "./pages/HomePage";

import CartPage from "./pages/CartPage";

import OrdersPage from "./pages/OrdersPage";

import LoginPage from "./pages/LoginPage";

import RegisterPage from "./pages/RegisterPage";

import AdminDashboard from "./pages/AdminDashBoard.jsx";

import AddProductPage from "./pages/AddProductPage";

import AdminProductPage from "./pages/AdminProductPage";

import { AuthProvider } from "./context/AuthContext.jsx";

import AdminLoginPage from "./pages/AdminLoginPage";

import EditProductPage from "./pages/EditProductPage";

import AdminUsersPage from "./pages/AdminUsersPage.jsx";

import AdminOrdersPage from "./pages/AdminOrdersPage.jsx";

import ProductsPage from "./pages/ProductPage";

import CheckoutPage from "./pages/CheckOutPage.jsx";


function App() {
  return (
    <AuthProvider>

      <BrowserRouter>

        <Navbar />

        <Routes>

          <Route path="/" element={<HomePage />} />

          <Route path="/home" element={<HomePage />} />

          <Route path="/cart" element={<CartPage />} />

          <Route path="/orders" element={<OrdersPage />} />

          <Route path="/login" element={<LoginPage />} />

          <Route path="/register" element={<RegisterPage />} />

          <Route path="/admin" element={<AdminDashboard />} />

          <Route path="/admin/add-product" element={<AddProductPage />} />

          <Route path="/admin-login" element={<AdminLoginPage/>}/>

          <Route path="/admin" element={<AdminDashboard/>}/>

          <Route path="/admin/products" element={<AdminProductPage/>}/>

          <Route path="/admin/edit-product/:id" element={<EditProductPage/>}/>

          <Route path="/admin/users" element={<AdminUsersPage />} />

          <Route path="/admin/orders" element={<AdminOrdersPage />} />

          <Route path="/products" element={<ProductsPage/>}/>

          <Route path="/checkout" element={<CheckoutPage />} />

        </Routes>

      </BrowserRouter>

    </AuthProvider>
  );
}

export default App;
