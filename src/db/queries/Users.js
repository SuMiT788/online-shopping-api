const sequelize = require("sequelize");
const db = require("../index");
const { deleteAllUserTokens } = require("./UserTokens");
const { destroyAllUserCartProducts } = require("./UserCartProducts");
const { destroyAllWishListProducts } = require("./WishListProducts");
const { bcryptCompare } = require("../../utils/commonFunctions");
const Op = sequelize.Op;

const findOneUserByMobOrEmail = async (data) =>
  db.Users.findOne({
    raw: true,
    where: {
      [Op.or]: [
        {
          MobileNumber: { [Op.eq]: data.MobileNumber },
        },
        {
          Email: { [Op.eq]: data.Email },
        },
      ],
    },
  });

const createUser = async (data) =>
  db.Users.create({
    Name: data.Name,
    MobileNumber: data.MobileNumber,
    Email: data.Email,
    Password: data.encryptedPassword,
    UniqueQuestionId: data.UniqueQuestionId,
    UniqueQuestionAnswer: data.encryptedAnswer,
    Role: "User",
    IsBlocked: false,
  });

const checkUser = async (data) =>
  db.Users.findOne({
    raw: true,
    where: {
      [Op.or]: [
        {
          MobileNumber: { [Op.eq]: data.UniqueId },
        },
        {
          Email: { [Op.eq]: data.UniqueId },
        },
      ],
    },
    include: [
      {
        attributes: ["Question"],
        model: db.UniqueQuestions,
        required: true,
      },
    ],
  });

const confirmIdPass = async (data) => {
  const checkUserResult = await checkUser(data);
  if (!checkUserResult) return null;
  const passCompareResult = await bcryptCompare(
    data.Password,
    checkUserResult.Password
  );
  if (passCompareResult) return checkUserResult;
  return false;
};

const findOneUserByUserId = async (data) =>
  db.Users.findOne({
    raw: true,
    where: { UserId: data.UserId },
  });

const updateUser = async (data) =>
  db.Users.update(
    {
      Name: data.Name,
      Email: data.Email,
      MobileNumber: data.MobileNumber,
    },
    {
      where: { UserId: data.UserId },
    }
  );

const updateToNewPassword = async (data) =>
  db.Users.update(
    {
      Password: data.encryptedNewPassword,
    },
    {
      where: { UserId: data.UserId },
    }
  );

const confirmUserByUniqueQuestion = async (data) => {
  const userInfo = await findOneUserByUserId({ UserId: data.UserId });
  if (!userInfo) return false;
  const ansCompareResult = await bcryptCompare(
    data.UniqueQuestionAnswer,
    userInfo.UniqueQuestionAnswer
  );
  if (!ansCompareResult) return false;
  return true;
};

const destroyUserByUserId = async (data) =>
  db.Users.destroy({
    where: { UserId: data.UserId },
  });

const destroyUser = async (data) => {
  await deleteAllUserTokens(data);
  await destroyAllWishListProducts(data);
  await destroyAllUserCartProducts(data);
  await destroyUserByUserId(data);
  return true;
};

const userFindAdmin = async (data) =>
  db.Users.findOne({
    raw: true,
    where: { Role: "Admin" },
  });

const usersFindAll = async () =>
  db.Users.findAll({
    raw: true,
  });

const usersFindOneById = async (data) =>
  db.Users.findAll({
    raw: true,
    where: { UserId: data.UserId },
  });

const userUpdateIsBlockedByUserId = async (data) =>
  db.Users.update(
    {
      IsBlocked: data.IsBlocked,
    },
    {
      where: { UserId: data.UserId },
    }
  );

const UsersUpdateUniqueQuestionAnswerByUserId = async (data) =>
  db.Users.update(
    {
      UniqueQuestionId: data.UniqueQuestionId,
      UniqueQuestionAnswer: data.encryptedAnswer,
    },
    {
      where: { UserId: data.UserId },
    }
  );

const UserFindOneUniqueQuestionByUserId = async (data) =>
  db.Users.findOne({
    attributes: [
      "UserId",
      [sequelize.col("UniqueQuestion.Question"), "UniqueQuestion"],
    ],
    include: [
      {
        attributes: [],
        model: db.UniqueQuestions,
        required: true,
      },
    ],
    raw: true,
    where: { UserId: data.UserId },
  });

module.exports = {
  findOneUserByMobOrEmail,
  createUser,
  checkUser,
  confirmIdPass,
  findOneUserByUserId,
  updateUser,
  updateToNewPassword,
  confirmUserByUniqueQuestion,
  destroyUser,
  userFindAdmin,
  usersFindAll,
  usersFindOneById,
  userUpdateIsBlockedByUserId,
  UsersUpdateUniqueQuestionAnswerByUserId,
  UserFindOneUniqueQuestionByUserId,
};
