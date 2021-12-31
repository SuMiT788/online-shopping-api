const UniqueQuestions = require("./UniqueQuestions");
const Users = require("./Users");
const UserTokens = require("./UserTokens");
const Products = require("./Products");
const UserCartProducts = require("./UserCartProducts");
const WishListProducts = require("./WishListProducts");

const setupAssociations = (db) => {
  UniqueQuestions(db);
  Users(db);
  Products(db);
  UserTokens(db);
  UserCartProducts(db);
  WishListProducts(db);
};

module.exports = { setupAssociations };
