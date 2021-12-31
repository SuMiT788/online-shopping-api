process.env.NODE_ENV = "dev";
require("dotenv").config({
  path: `./environments/.${process.env.NODE_ENV}.env`,
});

const express = require("express");
const cors = require("cors");
const routes = require("./src/services/rest/routes");
require("./src/db/connection");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());
app.use("/public", express.static("public"));

app.use("/", routes);

app.listen(PORT, () => {
  console.log(`-> app listening on port ${PORT}`);
});
