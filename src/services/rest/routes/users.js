const express = require("express");
const {
  userSignup,
  checkUser,
  userSignin,
  userLogoutAll,
  userLogout,
  userViewProfile,
  userEditProfile,
  changeUserPassword,
  userForgotPassword,
  deleteUserAccount,
  changeUniqueQuestion,
  getUserUniqueQuestion,
} = require("../controllers/users");
const { validateUserId } = require("../validator/users");
const { verifyToken } = require("../../../middleware/");
const router = express.Router();

router.get("/api/checkConnection", (req, res) => {
  res.status(200);
  res.send("Looking all good.");
});
router.post("/api/signup", userSignup);
router.post("/api/checkUser", [validateUserId], checkUser);
router.post("/api/signin", userSignin);
router.post("/api/logoutAll", userLogoutAll);
router.delete("/api/logout", [verifyToken], userLogout);
router.get("/api/viewProfile", [verifyToken], userViewProfile);
router.patch("/api/editProfile", [verifyToken], userEditProfile);
router.patch("/api/changePassword", [verifyToken], changeUserPassword);
router.patch("/api/forgotPassword", userForgotPassword);
router.delete("/api/deleteAccount", [verifyToken], deleteUserAccount);
router.patch("/api/changeUniqueQuestion", [verifyToken], changeUniqueQuestion);
router.get("/api/getUserUniqueQuestion", [verifyToken], getUserUniqueQuestion);

module.exports = router;
