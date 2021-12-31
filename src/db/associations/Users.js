const Users = (db) => {
  db.Users.belongsTo(db.UniqueQuestions, { foreignKey: "UniqueQuestionId" });
  db.Users.hasMany(db.UserTokens, { foreignKey: "UserId" });
  db.Users.hasMany(db.UserCartProducts, { foreignKey: "UserId" });
  db.Users.hasMany(db.WishListProducts, { foreignKey: "UserId" });
};

module.exports = Users;
