import React, { useEffect, useState } from "react";
import { API } from "../backend";
import Base from "./Base";
import { emptyCart, loadCart, removeItemFromCart } from "./helper/cartHelper";
import StripeCheckout from "react-stripe-checkout";
import { createOrder } from "./helper/orderHelper";
import { isAuthenticated } from "../auth/helper";
import cart from "../images/empty.png";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);
  // const [success, setSuccess] = useState(false);
  // const [orderData, setOrderData] = useState({});
  const authToken = isAuthenticated() && isAuthenticated().token;
  const userId = isAuthenticated() && isAuthenticated().user._id;

  useEffect(() => {
    setProducts(loadCart());
  }, []);

  useEffect(() => {
    setProducts(loadCart());
  }, [reload]);

  const removeFromCart = (productId) => {
    console.log("REMOVE ITEM");
    removeItemFromCart(productId);
    setReload(!reload);
  };

  const getTotalAmount = () => {
    let amount = 0;
    products.forEach((p) => {
      amount = amount + p.price;
    });
    return amount;
  };

  const makePayment = (token) => {
    console.log(token);
    const body = {
      token: token,
      products: products,
    };
    const headers = {
      "Content-Type": "application/json",
    };
    return fetch(`${API}stripepayment`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    }).then((res) => {
      //console.log(res.json());
      return res.json().then((response) => {
        emptyCart(() => {
          console.log("Cart Emptied");
        });
        toast("Order Placed Succesfully !!", { type: "success" });
        const orderData = {
          transaction_id: response.id,
          products: products,
          amount: response.amount,
          user: userId,
        };
        // setOrderData(orderData);
        // setSuccess(true);
        createOrder(userId, authToken, orderData);
        setReload(!reload);
      });
    });
  };

  // const createNewOrder = () => {
  //   if (success && orderData) {
  //     console.log(orderData);
  //     setSuccess(false);
  //     createOrder(userId, authToken, orderData).then((data) => {
  //       if (data.error) {
  //         console.log("ERROR", data.error);
  //       }
  //       setOrderData({});
  //     });
  //   }
  // };

  const orders = () => {
    return (
      <div className="orders">
        {products &&
          products.map((product, index) => (
            <div key={index} className="cart-card">
              <div className="helper">
                <div className="cart-card-image-div">
                  <img
                    alt="product"
                    src={`${API}products/photo/${product._id}`}
                  />
                </div>
                <div className="cart-card-details">
                  <h2 className="cart-card-name">{product.name}</h2>
                  <p className="cart-card-description">
                    <span className="cart-card-span">Description: </span>
                    {product.description}
                  </p>
                </div>
              </div>
              <div className="cart-card-buttons">
                <p className="cart-card-price">{product.price}/-</p>
                <button
                  onClick={() => removeFromCart(product._id)}
                  className="card-buttons cart-card-button"
                >
                  Remove<span>h</span>Item
                </button>
              </div>
            </div>
          ))}
        <Link to="/" className="category-button">
          Add More
        </Link>
      </div>
    );
  };

  //stripe checkout
  const checkout = () => {
    return (
      <div className="checkout-card">
        <h2>Your Order</h2>
        <p className="checkout-summary">Order Summary</p>
        <div className="checkout-items">
          <div className="checkout-item">
            <p>Total Items: </p>
            <span>{products.length}</span>
          </div>
          <div className="checkout-item">
            <p>Total Amount: </p>
            <span>Rs. {getTotalAmount()}</span>
          </div>
        </div>
        <StripeCheckout
          stripeKey={`${process.env.REACT_APP_PUBLISHKEY}`}
          token={makePayment}
          shippingAddress
          billingAddress
          amount={getTotalAmount() * 100}
          name="Buy T-shirts"
        >
          <button className="category-button">Proceed to Pay</button>
        </StripeCheckout>
      </div>
    );
  };

  return (
    <Base title="Cart" description="Checkout your Orders">
      <div className="cart-section">
        {!products.length ? (
          <div className="empty-cart-div">
            <div
              className="empty-cart-img-div"
              style={{ margin: "0 auto", textAlign: "center" }}
            >
              <img alt="product" src={cart} />
            </div>
            <Link
              style={{ margin: "0 auto" }}
              className="category-button"
              to="/"
            >
              Buy Products
            </Link>
          </div>
        ) : (
          <div className="cart-section">
            {orders()}
            {checkout()}
            {/* {createNewOrder()} */}
          </div>
        )}
      </div>
    </Base>
  );
};

export default Cart;
