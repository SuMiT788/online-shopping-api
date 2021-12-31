const sequelize = require("sequelize");
const db = require("../../../db");
const errMessage = require("../../../utils/errMessages");
const createToken = require("../../../middleware/createToken");
const {
  encryptData,
  bcryptCompare,
} = require("../../../utils/commonFunctions");
const {
  findOneUserByMobOrEmail,
  createUser,
  checkUser,
  confirmIdPass,
  findOneUserByUserId,
  updateUser,
  updateToNewPassword,
  confirmUserByUniqueQuestion,
  destroyUser,
  UsersUpdateUniqueQuestionAnswerByUserId,
  UserFindOneUniqueQuestionByUserId,
} = require("../../../db/queries/Users");
const {
  createUserToken,
  checkLoggedInDevicesCount,
  deleteAllUserTokens,
  deleteUserToken,
} = require("../../../db/queries/UserTokens");
const {
  UniqueQuestionsFindOneById,
} = require("../../../db/queries/UniqueQuestions");
const Op = sequelize.Op;

const addUser = async (data) => {
  const findOneUserResult = await findOneUserByMobOrEmail({
    MobileNumber: data.MobileNumber,
    Email: data.Email,
  });
  if (!findOneUserResult) {
    data.encryptedPassword = encryptData(data.Password);
    data.encryptedAnswer = encryptData(data.UniqueQuestionAnswer);
    const createUserResult = await createUser(data);
    const userData = {
      UserId: createUserResult.dataValues.UserId,
      Name: createUserResult.dataValues.Name,
      MobileNumber: createUserResult.dataValues.MobileNumber,
      Email: createUserResult.dataValues.Email,
      Role: createUserResult.dataValues.Role,
    };
    const result = { userData };
    return { error: false, result };
  } else {
    return {
      error: true,
      result: errMessage.userAlreadyExists,
    };
  }
};

const checkIfUserExists = async (data) => {
  const checkUserResult = await checkUser(data);
  if (!checkUserResult) {
    return { error: true, result: errMessage.userNotFound };
  }
  return {
    error: false,
    result: {
      UserId: checkUserResult.UserId,
      Name: checkUserResult.Name,
      Email: checkUserResult.Email,
      MobileNumber: checkUserResult.MobileNumber,
      UniqueQuestion: checkUserResult["UniqueQuestion.Question"],
      IsBlocked: checkUserResult.IsBlocked,
    },
  };
};

const loginUser = async (data) => {
  const confirmIdPassResult = await confirmIdPass(data);
  if (!confirmIdPassResult)
    return { error: true, result: errMessage.userNotFound };

  const checkLoggedInDevicesCountResult = await checkLoggedInDevicesCount({
    UserId: confirmIdPassResult.UserId,
  });

  if (checkLoggedInDevicesCountResult.length >= 4)
    return { error: true, result: errMessage.maxDeviceCount };
  const token = createToken({
    UserId: confirmIdPassResult.UserId,
    Role: confirmIdPassResult.Role,
  });
  const result = {
    userData: {
      Name: confirmIdPassResult.Name,
      MobileNumber: confirmIdPassResult.MobileNumber,
      Email: confirmIdPassResult.Email,
      IsBlocked: confirmIdPassResult.IsBlocked,
    },
    Token: token,
  };
  await createUserToken({
    UserId: confirmIdPassResult.UserId,
    Token: token,
  });
  return {
    error: false,
    result,
  };
};

const logoutAllDevices = async (data) => {
  const userInfo = await confirmIdPass(data);
  if (!userInfo) return { error: true, result: errMessage.noUserFound };
  const deleteAllUserTokensResult = await deleteAllUserTokens(userInfo);
  return { error: false, result: true };
};

const logoutDevice = async (data) => {
  const deleteUserTokenresult = await deleteUserToken(data);
  return { error: false, result: true };
};

const getUserData = async (data) => {
  const findOneUserByUserIdResult = await findOneUserByUserId(data);
  console.log("-> findOneUserByUserIdResult:", findOneUserByUserIdResult);
  const userData = {
    Name: findOneUserByUserIdResult.Name,
    MobileNumber: findOneUserByUserIdResult.MobileNumber,
    Email: findOneUserByUserIdResult.Email,
    Role: findOneUserByUserIdResult.Role,
    IsBlocked: findOneUserByUserIdResult.IsBlocked,
  };
  return { error: false, result: userData };
};

const updateUserData = async (data) => {
  const findOneUserByMobOrEmailResult = await findOneUserByMobOrEmail(data);
  if (
    findOneUserByMobOrEmailResult &&
    findOneUserByMobOrEmailResult.UserId !== data.UserId
  )
    return { error: true, result: errMessage.userAlreadyExists };
  const updateUserResult = await updateUser(data);
  return { error: false, result: updateUserResult };
};

const updateUserPassword = async (data) => {
  const findOneUserByUserIdResult = await findOneUserByUserId(data);
  if (!findOneUserByUserIdResult)
    return { error: true, result: errMessage.userNotFound };
  const passCompareResult = await bcryptCompare(
    data.Password,
    findOneUserByUserIdResult.Password
  );
  if (!passCompareResult)
    return { error: true, result: errMessage.invalidPass };
  data.encryptedNewPassword = encryptData(data.NewPassword);
  const updateToNewPasswordResult = await updateToNewPassword(data);
  if (!updateToNewPasswordResult)
    return { error: true, result: errMessage.serverError };
  return { error: false, result: errMessage.success };
};

const forgotPassword = async (data) => {
  const confirmUserByUniqueQuestionResult = await confirmUserByUniqueQuestion(
    data
  );
  if (!confirmUserByUniqueQuestionResult)
    return { error: true, result: errMessage.invalidUniqueAns };
  data.encryptedNewPassword = encryptData(data.NewPassword);
  const updateToNewPasswordResult = await updateToNewPassword({
    UserId: data.UserId,
    encryptedNewPassword: data.encryptedNewPassword,
  });
  if (!updateToNewPasswordResult)
    return { error: true, result: errMessage.serverError };
  return { error: false, result: errMessage.success };
};

const destroyUserAccount = async (data) => {
  const userInfo = await findOneUserByUserId(data);
  if (!userInfo) return { error: true, result: errMessage.userIdNotFound };
  const destroyUserResult = await destroyUser(data);
  return { error: false, result: destroyUserResult };
};

const updateUniqueQuestion = async (data) => {
  const userInfo = await findOneUserByUserId(data);
  if (!userInfo) return { error: true, result: errMessage.userIdNotFound };
  const comparePassResult = await bcryptCompare(
    data.Password,
    userInfo.Password
  );
  if (!comparePassResult)
    return { error: true, result: errMessage.invalidPass };
  const checkQuestionResult = await UniqueQuestionsFindOneById(data);
  if (!checkQuestionResult)
    return { error: true, result: errMessage.noQuestionsFound };
  data.encryptedAnswer = encryptData(data.UniqueQuestionAnswer);
  const updateUniqueQuestionResult =
    await UsersUpdateUniqueQuestionAnswerByUserId(data);
  if (!updateUniqueQuestionResult) return { error: true, result: null };
  return { error: false, result: updateUniqueQuestionResult };
};

const viewUserUniqueQuestion = async (data) => {
  const userInfo = await UserFindOneUniqueQuestionByUserId(data);
  if (!userInfo) return { error: true, result: errMessage.userIdNotFound };
  return { error: false, result: userInfo };
};

module.exports = {
  addUser,
  checkIfUserExists,
  loginUser,
  logoutAllDevices,
  logoutDevice,
  getUserData,
  updateUserData,
  updateUserPassword,
  forgotPassword,
  destroyUserAccount,
  updateUniqueQuestion,
  viewUserUniqueQuestion,
};
