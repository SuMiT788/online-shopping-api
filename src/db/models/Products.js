const Products = (sequelize, DataTypes) =>
  sequelize.define(
    "Products",
    {
      ProductId: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
      },
      Name: {
        type: DataTypes.STRING,
      },
      Description: {
        type: DataTypes.STRING,
      },
      Price: {
        type: DataTypes.INTEGER,
      },
      Category: {
        type: DataTypes.STRING,
      },
      Subcategory: {
        type: DataTypes.STRING,
      },
      ImagePath: {
        type: DataTypes.STRING,
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

module.exports = Products;
