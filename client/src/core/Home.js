import React, { useState, useEffect } from "react";
import Base from "./Base";
import Card from "./Card";
import { getAllProducts } from "./helper/productApiCalls";
import { Link } from "react-router-dom";
import { Circle } from "better-react-spinkit";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const preLoad = () => {
    setLoading(true);
    getAllProducts().then((data) => {
      if (data && data.error) {
        console.log("Fetching products Failed!", data.error);
      } else {
        setProducts(data);
        setLoading(false);
      }
    });
  };
  useEffect(() => {
    preLoad();
  }, []);

  if (loading) {
    return (
      <div className="loading-div">
        <Circle color="white" size={100} />
      </div>
    );
  }

  return (
    <Base title="Homepage">
      <div className="home-container">
        {products &&
          products.map((product, index) => (
            <Link className="card-link" key={index} to={`/show/${product._id}`}>
              <Card product={product} />
            </Link>
          ))}
      </div>
    </Base>
  );
}
