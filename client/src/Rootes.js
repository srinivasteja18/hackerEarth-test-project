import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "./core/Home";
import "./styles.css";
import "react-toastify/dist/ReactToastify.min.css";
import ManageProducts from "./core/ManageProducts";
import UpdateProduct from "./core/UpdateProduct";
import AddProduct from "./core/AddProduct";

export default function Rootes() {
  return (
    <Router>
      <ToastContainer theme="dark" />
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/show/:productId" element={<ManageProducts />} />
        <Route path="/new" element={<AddProduct />} />
        <Route path="/:productId/edit" element={<UpdateProduct />} />
      </Routes>
    </Router>
  );
}
