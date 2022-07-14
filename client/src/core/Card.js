import React from "react";

const Card = ({ product }) => {
  return (
    <div className="card">
      <div className="card-image-div">
        <img alt="product" src={`/photo/${product._id}`} />
      </div>
      <div className="card-details">
        <h2 className="card-name">{product.name}</h2>
        <p className="card-description">
          <span className="card-price">Description: </span>
          {product.description}
        </p>
      </div>
    </div>
  );
};
export default Card;
