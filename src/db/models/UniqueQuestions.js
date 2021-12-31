const UniqueQuestions = (sequelize, DataTypes) =>
  sequelize.define(
    "UniqueQuestions",
    {
      UniqueQuestionId: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
      },
      Question: {
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

module.exports = UniqueQuestions;
