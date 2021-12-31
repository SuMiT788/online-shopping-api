const fs = require("fs");
const path = require("path");
const { DataTypes } = require("sequelize");
const Sequelize = require("sequelize");
const sequelize = require("./connection");
const { setupAssociations } = require("./associations");

const modelsPath = path.resolve(__dirname, "models");

const importModels = () => {
  const models = {};
  fs.readdirSync(modelsPath)
    .filter((file) => file.indexOf(".") !== 0 && file !== "index.js")
    .forEach((file) => {
      let model = require(path.join(modelsPath, file))(sequelize, DataTypes);
      models[model.name] = model;
    });
  return models;
};

const db = importModels();

setupAssociations(db);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
