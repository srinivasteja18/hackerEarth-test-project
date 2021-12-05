import React, { useState, useEffect } from "react";
import Base from "./Base";
import Card from "./Card";
import { getAllProducts } from "../admin/helper/adminapicall";

export default function Home() {
  const [products, setProducts] = useState([]);
  const preLoad = () => {
    getAllProducts().then((data) => {
      if (data.error) {
        console.log("Fetching products Failed!", data.error);
      } else {
        setProducts(data);
      }
    });
  };
  useEffect(() => {
    preLoad();
  }, []);

  return (
    <Base title="Homepage">
      {/* <h1 className="middle-section">All Products</h1> */}
      <div className="home-container">
        {products &&
          products.map((product, index) => (
            <Card key={index} product={product} />
          ))}
      </div>
    </Base>
  );
}
