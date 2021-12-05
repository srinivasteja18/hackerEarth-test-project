const { ObjectId } = require("mongoose");
const mongoose = require("mongoose");

const productCartSchema = mongoose.Schema({
  product: {
    type: ObjectId,
    ref: "Product",
  },
  amount: Number,
  name: String,
  count: Number,
});

const orderSchema = mongoose.Schema(
  {
    products: [productCartSchema],
    transaction_id: {
      type: String,
    },
    amount: Number,
    address: {
      type: String,
      maxLength: 3000,
    },
    updated: Date,
    user: {
      type: ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const ProductCart = mongoose.model("ProductCart", productCartSchema);
const Order = mongoose.model("Order", orderSchema);

module.exports = { ProductCart, Order };
