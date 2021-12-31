const WishListProducts = (db) => {
  db.WishListProducts.belongsTo(db.Users, { foreignKey: "UserId" });
  db.WishListProducts.belongsTo(db.Products, { foreignKey: "ProductId" });
};

module.exports = WishListProducts;
