import React, { useState } from "react";
import { useNavigate } from "react-router";
import { API } from "../backend";
import { addItemToCart } from "./helper/cartHelper";

const Card = ({ product }) => {
  const navigate = useNavigate();
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);

  const handleAddToCart = () => {
    addItemToCart(product, () => {
      setRedirect(true);
      setCount(count);
    });
  };

  const getRedirect = (redirect) => {
    if (redirect) {
      navigate("/cart");
    }
  };

  return (
    <div className="card">
      {getRedirect(redirect)}
      <div className="card-image-div">
        <img alt="product" src={`${API}products/photo/${product._id}`} />
      </div>
      <div className="card-details">
        <h2 className="card-name">{product.name}</h2>
        <p>
          <span className="card-price">Price:</span> {product.price}
        </p>
        <p className="card-description">
          <span className="card-price">Description: </span>
          {product.description}
        </p>

        <button onClick={handleAddToCart} className="card-buttons">
          Add to Cart
        </button>
      </div>
    </div>
  );
};
export default Card;
