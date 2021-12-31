const UserCartProducts = (db) => {
  db.UserCartProducts.belongsTo(db.Products, { foreignKey: "ProductId" });
  db.UserCartProducts.belongsTo(db.Users, { foreignKey: "UserId" });
};

module.exports = UserCartProducts;
