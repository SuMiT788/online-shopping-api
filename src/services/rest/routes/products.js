const express = require("express");
const {
  viewAllCategories,
  viewProductsByCategory,
  viewProductsByFilter,
  viewProduct,
  getSubcategoriesOfCategory,
  viewAllProducts,
  searchProducts,
} = require("../controllers/products");
const { verifyToken } = require("../../../middleware/");
const router = express.Router();

router.get("/api/viewAllCategories", [verifyToken], viewAllCategories);
router.get(
  "/api/viewProductsByCategory",
  [verifyToken],
  viewProductsByCategory
);
router.post("/api/viewAllProducts", [verifyToken], viewAllProducts);
router.post("/api/viewProductsByFilter", [verifyToken], viewProductsByFilter);
router.post("/api/viewProduct", [verifyToken], viewProduct);
router.post(
  "/api/getSubcategoriesOfCategory",
  [verifyToken],
  getSubcategoriesOfCategory
);
router.post("/api/searchProducts", [verifyToken], searchProducts);

module.exports = router;
