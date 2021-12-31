const express = require("express");
const { verifyToken } = require("../../../middleware");
const {
  addToWishList,
  removeFromWishList,
  viewWishListProducts,
} = require("../controllers/wishListProducts");

const router = express.Router();

router.post("/api/addToWishList", [verifyToken], addToWishList);
router.post("/api/removeFromWishList", [verifyToken], removeFromWishList);
router.get("/api/viewWishListProducts", [verifyToken], viewWishListProducts);

module.exports = router;
