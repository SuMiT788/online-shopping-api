const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");

const createToken = (data) => {
  const privateKey = fs.readFileSync(
    path.resolve(process.env.rootdir, "private.key")
  );
  const token = jwt.sign({ data }, privateKey, {
    algorithm: "RS256",
  });
  return token;
};

module.exports = createToken;
