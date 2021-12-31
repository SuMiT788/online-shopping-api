const Products = (db) => {
  db.Products.hasMany(db.UserCartProducts, { foreignKey: "ProductId" });
  db.Products.hasMany(db.WishListProducts, { foreignKey: "ProductId" });
};

module.exports = Products;
