const express = require("express");
const router = express.Router();

const {
  getUserById,
  getUser,
  updateUser,
  getUserOrderList,
} = require("../controllers/user");
const { isSignedIn, isAuthenticated } = require("../controllers/auth");

router.param("userId", getUserById);

router.get("/user/:userId", isSignedIn, isAuthenticated, getUser);

router.put("/user/update/:userId", isSignedIn, isAuthenticated, updateUser);

router.get(
  "orders/user/:userId",
  isSignedIn,
  isAuthenticated,
  getUserOrderList
);

module.exports = router;
