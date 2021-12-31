const UserTokens = (sequelize, DataTypes) =>
  sequelize.define(
    "UserTokens",
    {
      UserTokenId: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
      },
      Token: {
        type: DataTypes.STRING,
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

module.exports = UserTokens;
