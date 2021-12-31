const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");
const errMessage = require("../utils/errMessages");
const { findOneUserToken } = require("../db/queries/UserTokens");

const verifyAdmin = async (req, res, next) => {
  try {
    req.startTime = new Date();
    if (!req.headers["authorization"])
      return res
        .status(401)
        .send({ code: 401, message: errMessage.authNotFount });

    const bearer = req.headers["authorization"].split(" ");
    const token = bearer[1];
    if (!token)
      return res
        .status(401)
        .send({ code: 401, message: errMessage.invalidToken });

    const publicKey = fs.readFileSync(
      path.resolve(process.env.rootdir, "public.key")
    );
    if (!publicKey)
      return res
        .status(401)
        .send({ code: 401, message: errMessage.serverError });

    const payload = jwt.verify(token, publicKey, { algorithm: "RS256" });
    if (!payload)
      return res
        .status(401)
        .send({ code: 401, message: errMessage.invalidToken });

    if (payload.data.Role !== "Admin")
      return res
        .status(401)
        .send({ code: 401, message: errMessage.invalidToken });

    const findOneUserTokenResult = await findOneUserToken({
      UserId: payload.data.UserId,
      Token: token,
    });

    if (!findOneUserTokenResult)
      return res
        .status(401)
        .send({ code: 401, message: errMessage.invalidToken });

    req.UserId = payload.data.UserId;
    req.UserTokenId = findOneUserTokenResult.UserTokenId;
    return next();
  } catch (err) {
    console.log("-> verifyAdmin Error:", err);
    return res.status(401).send({ code: 401, message: errMessage.invalidReq });
  }
};

module.exports = verifyAdmin;
