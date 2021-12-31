const UserCartProducts = (sequelize, DataTypes) =>
  sequelize.define(
    "UserCartProducts",
    {
      UserCartProductId: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
      },
      ProductId: {
        type: DataTypes.INTEGER,
      },
      UserId: {
        type: DataTypes.INTEGER,
      },
      Quantity: {
        type: DataTypes.INTEGER,
      },
    },
    {
      timestamps: true,
      schema: "public",
    },
    {
      createdAt: "createdAt",
      updatedAt: "modifiedAt",
    }
  );

module.exports = UserCartProducts;
