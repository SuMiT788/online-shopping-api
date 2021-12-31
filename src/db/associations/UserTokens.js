const UserTokens = (db) => {
  db.UserTokens.belongsTo(db.Users, { foreignKey: "UserId" });
};

module.exports = UserTokens;
