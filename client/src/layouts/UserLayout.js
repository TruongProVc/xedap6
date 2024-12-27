import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "../Component/Header/Header";
import Footer from "../Component/Footer/Footer";
import HomePage from "../Page/User/HomePage";
import ProductDetail from "../Page/User/ProductDetail";
import AllProducts from "../Page/User/AllProducts";
import AboutUs from "../Page/User/AboutUs";
import Cart from "../Page/User/Cart";
import Checkout from "../Page/User/CheckOut";
import UserProfile from "../Page/User/UserProfile";
import OrderDetails from "../Page/User/OrderDetail";

const UserLayout = () => {
  return (
    <div>
      <Header />
      <div>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/productdetails/:id" element={<ProductDetail />} />
          <Route path="/AllItem" element={<AllProducts />} />
          <Route path="/AboutUs" element={<AboutUs />} />
          <Route path="/cart" element={<Cart />} /> 
          <Route path="/checkout" element={<Checkout />} /> 
          <Route path="/UserProfile" element={<UserProfile/>}></Route>
          <Route path="/order/:orderId" element={<OrderDetails />} />

        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default UserLayout;