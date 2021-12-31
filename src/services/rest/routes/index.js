const users = require("./users");
const products = require("./products");
const wishListProducts = require("./wishListProducts");
const userCartProducts = require("./userCartProducts");
const admin = require("./admin");
const uniqueQuestions = require("./uniqueQuestions");

const routes = [
  users,
  products,
  wishListProducts,
  userCartProducts,
  admin,
  uniqueQuestions,
];

module.exports = routes;
