const WishListProducts = (sequelize, DataTypes) =>
  sequelize.define(
    "WishListProducts",
    {
      WishListProductId: {
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

module.exports = WishListProducts;
