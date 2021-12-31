const { checkUser } = require("../../../db/queries/Users");
const errMessage = require("../../../utils/errMessages");

const validateUserId = async (req, res, next) => {
  try {
    const checkUserResult = await checkUser(req.body);
    if (!checkUserResult)
      return res
        .status(400)
        .send({ code: 400, message: errMessage.userNotFound });
    return next();
  } catch (err) {
    console.log("-> validateUserId Error:", err);
    return res.status(500).send({ code: 400, message: errMessage.serverError });
  }
};

const validatePass = (data) => {};

const validateToken = (data) => {};

module.exports = { validateUserId, validatePass };
