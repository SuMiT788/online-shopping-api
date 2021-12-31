const Users = (sequelize, DataTypes) =>
  sequelize.define(
    "Users",
    {
      UserId: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
      },
      Name: {
        type: DataTypes.STRING,
      },
      MobileNumber: {
        type: DataTypes.INTEGER,
      },
      Email: {
        type: DataTypes.STRING,
      },
      Password: {
        type: DataTypes.STRING,
      },
      UniqueQuestionId: {
        type: DataTypes.INTEGER,
      },
      UniqueQuestionAnswer: {
        type: DataTypes.STRING,
      },
      Role: {
        type: DataTypes.STRING,
      },
      IsBlocked: {
        type: DataTypes.BOOLEAN,
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

module.exports = Users;
