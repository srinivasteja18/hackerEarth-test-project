import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useState, useEffect } from "react/cjs/react.development";
import { isAuthenticated } from "../auth/helper";
import { API } from "../backend";
import Base from "../core/Base";
import { deleteProduct, getAllProducts } from "./helper/adminapicall";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);

  const { user, token } = isAuthenticated();

  const preLoad = () => {
    getAllProducts().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  useEffect(() => {
    preLoad();
  }, []);

  //Deleting a product
  const deleteThisProduct = (productId) => {
    deleteProduct(productId, user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
        toast("product Delete Failed!!", { type: "error" });
      } else {
        toast("Product Deleted Succesfully", { type: "success" });
        preLoad();
      }
    });
  };

  const Allproducts = () => (
    <div className="products-section">
      <h2>All Products</h2>
      <div className="products-container">
        {products &&
          products.map((product, index) => (
            <div key={index} className="product-card">
              <div className="product-photo-div">
                <img
                  alt="product"
                  src={`${API}products/photo/${product._id}`}
                />
              </div>
              <div className="product-details">
                <p className="product-detail">
                  <span className="product-property">Name: </span>
                  {product.name}
                </p>
                <p className="product-detail">
                  <span className="product-property">Description: </span>
                  {product.description}
                </p>
                <p className="product-detail">
                  <span className="product-property">Stock: </span>
                  {product.stock}
                </p>
                <p className="product-detail">
                  <span className="product-property">Price: </span>
                  {product.price}
                </p>
              </div>
              <div className="product-buttons">
                <Link
                  to={`/admin/update/product/${product._id}`}
                  className=" product-button"
                >
                  Update
                </Link>
                <button
                  onClick={() => deleteThisProduct(product._id)}
                  className=" product-button"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>
      <Link to="/admin/dashboard" className="category-button">
        Back
      </Link>
    </div>
  );
  return (
    <Base
      title="Manage your Products"
      description="customize and update your products"
    >
      {Allproducts()}
    </Base>
  );
};
export default ManageProducts;
