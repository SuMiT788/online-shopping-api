const express = require("express");
const { verifyToken } = require("../../../middleware");
const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
  viewCartProducts,
} = require("../controllers/userCartProducts");
const router = express.Router();

router.post("/api/addToCart", [verifyToken], addToCart);
router.post("/api/removeFromCart", [verifyToken], removeFromCart);
router.patch("/api/increaseQuantity", [verifyToken], increaseQuantity);
router.patch("/api/decreaseQuantity", [verifyToken], decreaseQuantity);
router.delete("/api/clearCart", [verifyToken], clearCart);
router.get("/api/viewCartProducts", [verifyToken], viewCartProducts);

module.exports = router;
