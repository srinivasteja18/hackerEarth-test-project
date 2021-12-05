const express = require("express");
const router = express.Router();

const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getUserById, pushOrderInProductList } = require("../controllers/user");
const {
  getOrderById,
  createOrder,
  getAllOrders,
  getOrderStatus,
  updateStatus,
  getOrdersByUserId,
} = require("../controllers/order");

// param
router.param("userId", getUserById);
router.param("orderId", getOrderById);

//create route
router.post(
  "/order/create/:userId",
  isSignedIn,
  isAuthenticated,
  pushOrderInProductList,
  createOrder
  // updateStock
);

//get route
router.get(
  "/order/all/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  getAllOrders
);

//status routes
router.get(
  "/order/status/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  getOrderStatus
);
router.put(
  "/order/:orderId/status/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateStatus
);

router.get(
  "/user/orders/:userId",
  isSignedIn,
  isAuthenticated,
  getOrdersByUserId
);

module.exports = router;
