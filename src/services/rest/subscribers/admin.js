const {
  userFindAdmin,
  usersFindAll,
  usersFindOneById,
  userUpdateIsBlockedByUserId,
} = require("../../../db/queries/Users");
const {
  productsCreate,
  productsFindOne,
  productsDestroyById,
  productsUpdateById,
} = require("../../../db/queries/Products");
const {
  createUserToken,
  checkLoggedInDevicesCount,
} = require("../../../db/queries/UserTokens");
const {
  userCartProductsDestroyByProductId,
} = require("../../../db/queries/UserCartProducts");
const {
  wishListProductsDestroyByProductId,
} = require("../../../db/queries/WishListProducts");
const { bcryptCompare } = require("../../../utils/commonFunctions");
const createToken = require("../../../middleware/createToken");
const errMessage = require("../../../utils/errMessages");

const confirmAdmin = async (data) => {
  const adminInfo = await userFindAdmin();
  console.log("-> adminInfo:", adminInfo);

  const checkLoggedInDevicesCountResult = await checkLoggedInDevicesCount({
    UserId: adminInfo.UserId,
  });

  if (checkLoggedInDevicesCountResult.length >= 4)
    return { error: true, result: errMessage.maxDeviceCount };

  const isAdminName =
    data.UniqueId === adminInfo.Email ||
    data.UniqueId === adminInfo.MobileNumber;
  console.log("-> isAdminName:", isAdminName);
  if (!isAdminName) return { error: true, result: errMessage.userNotFound };

  const isAdminPass = await bcryptCompare(data.Password, adminInfo.Password);
  console.log("-> isAdminPass:", isAdminPass);
  if (!isAdminPass) return { error: true, result: errMessage.userNotFound };

  const token = createToken({
    UserId: adminInfo.UserId,
    Role: adminInfo.Role,
  });

  await createUserToken({
    UserId: adminInfo.UserId,
    Token: token,
  });

  const userData = {
    Name: adminInfo.Name,
    MobileNumber: adminInfo.MobileNumber,
    Email: adminInfo.Email,
    IsBlocked: adminInfo.IsBlocked,
  };

  return { error: false, result: { userData, token } };
};

const createProduct = async (data) => {
  const productCreateResult = await productsCreate(data);

  if (!productCreateResult) return { error: true, result: false };

  return { error: false, result: productCreateResult };
};

const deleteProduct = async (data) => {
  const productInfo = await productsFindOne(data);
  if (!productInfo) return { error: true, result: errMessage.noProductsFound };
  await wishListProductsDestroyByProductId(data);
  await userCartProductsDestroyByProductId(data);
  await productsDestroyById(data);
  return { error: false, result: true };
};

const updateProduct = async (data) => {
  const productInfo = await productsFindOne(data);
  if (!productInfo) return { error: true, result: errMessage.noProductsFound };
  const updateProductResult = await productsUpdateById(data);
  if (!updateProductResult) return { error: true, result: null };
  return { error: false, result: updateProductResult };
};

const findAllUsers = async () => {
  const allUsersInfo = await usersFindAll();
  if (!allUsersInfo) return { error: true, result: errMessage.noUserFound };
  return { error: false, result: allUsersInfo };
};

const updateUserIsBlocked = async (data) => {
  const userInfo = await usersFindOneById(data);
  if (!userInfo) return { error: true, result: errMessage.noUserFound };
  const banResult = await userUpdateIsBlockedByUserId(data);
  if (!banResult) return { error: true, result: null };
  return { error: false, result: banResult };
};

module.exports = {
  confirmAdmin,
  createProduct,
  deleteProduct,
  updateProduct,
  findAllUsers,
  updateUserIsBlocked,
};
