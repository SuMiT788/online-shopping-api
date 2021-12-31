const db = require("../index");

const createUserToken = (data) =>
  db.UserTokens.create({
    Token: data.Token,
    UserId: data.UserId,
  });

const checkLoggedInDevicesCount = (data) =>
  db.UserTokens.findAll({
    raw: true,
    where: {
      UserId: data.UserId,
    },
  });

const deleteAllUserTokens = (data) =>
  db.UserTokens.destroy({
    where: { UserId: data.UserId },
  });

const deleteUserToken = (data) =>
  db.UserTokens.destroy({
    where: { UserTokenId: data.UserTokenId },
  });

const findOneUserToken = (data) =>
  db.UserTokens.findOne({
    raw: true,
    where: { UserId: data.UserId, Token: data.Token },
  });

module.exports = {
  createUserToken,
  checkLoggedInDevicesCount,
  deleteAllUserTokens,
  deleteUserToken,
  findOneUserToken,
};
