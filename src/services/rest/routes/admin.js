const express = require("express");
const { verifyAdmin } = require("../../../middleware/");
const {
  adminLogin,
  addProduct,
  removeProduct,
  editProduct,
  viewAllUsers,
  editUserIsBlocked,
} = require("../controllers/admin.js");
const router = express.Router();

router.post("/api/adminLogin", adminLogin);
router.post("/api/addProduct", [verifyAdmin], addProduct);
router.delete("/api/removeProduct", [verifyAdmin], removeProduct);
router.patch("/api/editProduct", [verifyAdmin], editProduct);
router.get("/api/viewAllUsers", [verifyAdmin], viewAllUsers);
router.patch("/api/editUserIsBlocked", [verifyAdmin], editUserIsBlocked);

module.exports = router;
