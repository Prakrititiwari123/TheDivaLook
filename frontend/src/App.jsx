import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import TryMakeup from "./pages/TryMakeup";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from "./pages/Products";


const App = () => {
  
  return (
    <>
        <BrowserRouter>
          <Navbar />

          <Routes>
          
            <Route path="/" element={<Home />} />
            <Route path="/try-makeup" element={<TryMakeup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} /> 
            <Route path="/products" element={<Products />} />
            
          </Routes>

          <Footer />
            
        </BrowserRouter>
    </>
  );
};

export default App;