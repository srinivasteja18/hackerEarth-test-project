import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getProduct, deleteProduct } from "./helper/productApiCalls";
// import { API } from "../backend";
import Base from "../core/Base";
import { Circle } from "better-react-spinkit";

const ManageProducts = ({ match }) => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);

  const preLoad = (productId) => {
    setLoading(true);
    getProduct(productId).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setLoading(false);
        setProduct(data);
      }
    });
  };

  useEffect(() => {
    preLoad(productId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //Deleting a product
  const deleteThisProduct = (productId) => {
    deleteProduct(productId).then((data) => {
      if (data.error) {
        console.log(data.error);
        toast("product Delete Failed!!", { type: "error" });
      } else {
        toast("Product Deleted Succesfully", { type: "success" });
        navigate("/");
      }
    });
  };

  if (loading) {
    return (
      <div className="loading-div">
        <Circle color="white" size={100} />
      </div>
    );
  }

  const showProduct = () => (
    <div className="products-section">
      <div className="products-container">
        <div className="product-card">
          <div className="product-photo-div">
            <img alt="product" src={`/photo/${product._id}`} />
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
          </div>
          <div className="product-buttons">
            <Link to={`/${product._id}/edit`} className=" product-button">
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
      </div>
      <Link to="/" className="category-button">
        Back
      </Link>
    </div>
  );
  return (
    <Base
      title="Manage your Products"
      description="customize and update your products"
    >
      {showProduct()}
    </Base>
  );
};
export default ManageProducts;
