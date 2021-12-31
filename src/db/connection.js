const { Sequelize } = require("sequelize");

const initConnection = (Seq) => {
  return new Seq({
    database: process.env.database,
    username: process.env.user,
    password: process.env.password,
    dialect: "postgresql",
    port: process.env.port,
    host: process.env.host,
    pool: {
      max: 5,
      min: 0,
      idle: 600000,
      acquire: 600000,
    },
    logging: false,
    dialectOptions: {
      connectTimeout: 600000,
      charset: "utf8mb4",
    },
  });
};
const sequelize = initConnection(Sequelize);

const checkConnection = (seq) => {
  seq
    .authenticate()
    .then(() => console.log("-> Established connection to database"))
    .catch((err) => console.error(err));
};
checkConnection(sequelize);

module.exports = sequelize;
