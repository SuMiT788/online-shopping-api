const sequelize = require("sequelize");
const db = require("../");

const destroyAllUserCartProducts = async (data) =>
  db.UserCartProducts.destroy({
    where: { UserId: data.UserId },
  });

const userCartProductsFindOneByUserIdAndProductId = async (data) =>
  db.UserCartProducts.findOne({
    raw: true,
    where: { ProductId: data.ProductId, UserId: data.UserId },
  });

const userCartProductsCreate = async (data) =>
  db.UserCartProducts.create({
    ProductId: data.ProductId,
    UserId: data.UserId,
    Quantity: data.Quantity,
  });

const userCartProductsDestroyByUserIdAndProductId = async (data) =>
  db.UserCartProducts.destroy({
    where: { ProductId: data.ProductId, UserId: data.UserId },
  });

const userCartProductsUpdateQuantity = async (data) =>
  db.UserCartProducts.update(
    {
      Quantity: data.Quantity,
    },
    {
      where: { UserCartProductId: data.UserCartProductId },
    }
  );

const userCartProductsUpdateQuantityByUserId = async (data) =>
  db.UserCartProducts.update(
    {
      Quantity: data.Quantity,
    },
    {
      where: { UserId: data.UserId, ProductId: data.ProductId },
    }
  );

const userCartProductsDestroyById = async (data) =>
  db.UserCartProducts.destroy({
    where: { UserCartProductId: data.UserCartProductId },
  });

const userCartProductsDestroyByProductId = async (data) =>
  db.UserCartProducts.destroy({
    where: { ProductId: data.ProductId },
  });

const userCartProductsFindAllByUserId = async (data) =>
  db.UserCartProducts.findAll({
    attributes: ["UserCartProductId", "UserId", "Quantity"],
    include: [
      {
        attributes: { exclude: ["createdAt", "updatedAt"] },
        model: db.Products,
        required: true,
      },
    ],
    raw: true,
    where: { UserId: data.UserId },
    order: [[db.Products, "Name"]],
  });

module.exports = {
  destroyAllUserCartProducts,
  userCartProductsFindOneByUserIdAndProductId,
  userCartProductsCreate,
  userCartProductsDestroyByUserIdAndProductId,
  userCartProductsUpdateQuantity,
  userCartProductsUpdateQuantityByUserId,
  userCartProductsDestroyById,
  userCartProductsDestroyByProductId,
  userCartProductsFindAllByUserId,
};
