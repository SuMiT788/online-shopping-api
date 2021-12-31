const sequelize = require("sequelize");
const db = require("../");

const destroyAllWishListProducts = async (data) =>
  db.WishListProducts.destroy({
    where: { UserId: data.UserId },
  });

const WishListProductsFindOne = async (data) =>
  db.WishListProducts.findOne({
    raw: true,
    where: { UserId: data.UserId, ProductId: data.ProductId },
  });

const wishListProductCreate = async (data) =>
  db.WishListProducts.create({
    ProductId: data.ProductId,
    UserId: data.UserId,
  });

const wishListProductDestroyById = async (data) =>
  db.WishListProducts.destroy({
    where: { WishListProductId: data.WishListProductId },
  });

const wishListProductsDestroyByProductId = async (data) =>
  db.WishListProducts.destroy({
    where: { ProductId: data.ProductId },
  });

const wishListProductsFindAllByUserId = async (data) =>
  db.WishListProducts.findAll({
    attributes: ["WishListProductId", "UserId"],
    include: [
      {
        attributes: { exclude: ["createdAt", "updatedAt"] },
        model: db.Products,
        required: true,
      },
    ],
    raw: true,
    where: { UserId: data.UserId },
  });

module.exports = {
  destroyAllWishListProducts,
  WishListProductsFindOne,
  wishListProductCreate,
  wishListProductDestroyById,
  wishListProductsDestroyByProductId,
  wishListProductsFindAllByUserId,
};
