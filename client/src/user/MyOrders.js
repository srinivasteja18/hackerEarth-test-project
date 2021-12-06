import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getUserOrders } from "../admin/helper/adminapicall";
import { isAuthenticated } from "../auth/helper";
import cart from "../images/empty.png";

// import { API } from "../backend";
import Base from "../core/Base";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const { user, token } = isAuthenticated();

  const preLoad = () => {
    getUserOrders(user._id, token).then((data) => {
      if (data.error) {
        toast(data.error, { type: "error" });
        console.log("USER ORDERS ERROR");
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
      <h2>My Orders</h2>
      <div>
        {orders &&
          orders.map((order, index) => (
            <div key={index} className="orders-container">
              {order.products.map((product, ind) => (
                <div key={ind} className="order-card">
                  <div className="order-photo-div">
                    <img
                      alt="product"
                      src={`/api/products/photo/${product._id}`}
                    />
                  </div>
                  <div className="order-product-details">
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
      <Link to="/user/dashboard" className="category-button">
        Back
      </Link>
    </div>
  );

  return (
    <Base title="My Orders" description="manage and deliver the orders">
      {!orders.length ? (
        <div className="empty-cart-div">
          <div
            className="empty-cart-img-div"
            style={{ margin: "0 auto", textAlign: "center" }}
          >
            <img alt="product" src={cart} />
          </div>
          <Link style={{ margin: "0 auto" }} className="category-button" to="/">
            Buy Products
          </Link>
        </div>
      ) : (
        <div>{allOrders()}</div>
      )}
    </Base>
  );
};

export default MyOrders;
