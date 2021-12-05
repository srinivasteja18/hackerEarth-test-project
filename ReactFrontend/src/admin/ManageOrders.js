import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { isAuthenticated } from "../auth/helper";
import { API } from "../backend";
import Base from "../core/Base";
import { getAllOrders } from "./helper/adminapicall";

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);

  const { user, token } = isAuthenticated();

  const preLoad = () => {
    getAllOrders(user._id, token).then((data) => {
      if (data.error) {
        toast(data.error, { type: "error" });
      } else {
        setOrders(data);
      }
    });
  };

  useEffect(() => {
    preLoad();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const allOrders = () => (
    <div className="products-section">
      <h2>All Orders</h2>
      <div>
        {orders &&
          orders.map((order, index) => (
            <div key={index} className="orders-container">
              {order.products.map((product, ind) => (
                <div key={ind} className="order-card">
                  <div className="product-photo-div">
                    <img
                      alt="product"
                      src={`${API}products/photo/${product._id}`}
                    />
                  </div>
                  <div className="product-details">
                    <p className="order-detail product-detail">
                      <span className="product-property">{product.name}</span>
                    </p>
                    <p className="order-detail product-detail">
                      <span className="product-property">
                        Rs. {order.amount}
                      </span>
                    </p>
                  </div>
                  <div className="delivery-details">
                    <span className="order-delivery">
                      Estimated Delivery: 18 dec 2021
                    </span>
                    <br />
                    <span>This item has been shipped recently</span>
                  </div>
                </div>
              ))}
            </div>
          ))}
      </div>
      <Link to="/admin/dashboard" className="category-button">
        Back
      </Link>
    </div>
  );

  return (
    <Base title="All Orders" description="manage and deliver the orders">
      {allOrders()}
    </Base>
  );
};

export default ManageOrders;
