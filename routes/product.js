const express = require("express");
const router = express.Router();

const {
  createProduct,
  getProductById,
  getProduct,
  photo,
  updateProduct,
  deleteProduct,
  getAllProducts,
} = require("../controllers/product");

router.param("productId", getProductById);

router.post("/new", createProduct);

router.get("/:productId/show", getProduct);
router.get("/photo/:productId", photo);

router.put("/:productId/edit", updateProduct);

router.delete("/delete/:productId", deleteProduct);

router.get("/products", getAllProducts);

module.exports = router;
