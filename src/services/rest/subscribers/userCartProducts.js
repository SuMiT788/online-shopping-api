const { productsFindOne } = require("../../../db/queries/Products");
const {
  userCartProductsFindOneByUserIdAndProductId,
  userCartProductsCreate,
  userCartProductsDestroyByUserIdAndProductId,
  userCartProductsUpdateQuantity,
  userCartProductsUpdateQuantityByUserId,
  userCartProductsDestroyById,
  destroyAllUserCartProducts,
  userCartProductsFindAllByUserId,
} = require("../../../db/queries/UserCartProducts");
const errMessage = require("../../../utils/errMessages");

const addProductToCart = async (data) => {
  const productFindResult = await productsFindOne(data);
  if (!productFindResult)
    return { error: true, result: errMessage.noProductsFound };
  const cartProductFindResult =
    await userCartProductsFindOneByUserIdAndProductId(data);
  let cartProductAddResult;
  if (cartProductFindResult) {
    data.Quantity += cartProductFindResult.Quantity;
    console.log("-> Quantity:", data.Quantity);
    cartProductAddResult = await userCartProductsUpdateQuantityByUserId(data);
  } else {
    cartProductAddResult = await userCartProductsCreate(data);
  }
  if (!cartProductAddResult) return { error: true, result: null };
  return { error: false, result: cartProductAddResult };
};

const removeProductFromCart = async (data) => {
  console.log("-> removecart data:", data);
  const cartProductFindResult =
    await userCartProductsFindOneByUserIdAndProductId(data);
  if (!cartProductFindResult)
    return { error: true, result: errMessage.notPresentInUserCart };
  const cartProductRemoveResult =
    await userCartProductsDestroyByUserIdAndProductId(data);
  if (!cartProductRemoveResult) return { error: true, result: null };
  return { error: false, result: cartProductRemoveResult };
};

const increaseCartProductQuantity = async (data) => {
  const cartProductFindResult =
    await userCartProductsFindOneByUserIdAndProductId(data);
  if (!cartProductFindResult)
    return { error: true, result: errMessage.notPresentInUserCart };
  const cartProductUpdateQuantityResult = await userCartProductsUpdateQuantity({
    UserCartProductId: cartProductFindResult.UserCartProductId,
    Quantity: ++cartProductFindResult.Quantity,
  });
  if (!cartProductUpdateQuantityResult) return { error: true, result: null };
  return { error: false, result: cartProductUpdateQuantityResult };
};

const decreaseCartProductQuantity = async (data) => {
  const cartProductFindResult =
    await userCartProductsFindOneByUserIdAndProductId(data);
  if (!cartProductFindResult)
    return { error: true, result: errMessage.notPresentInUserCart };
  if (cartProductFindResult.Quantity == 1) {
    const deleteUserCartProductResult = await userCartProductsDestroyById({
      UserCartProductId: cartProductFindResult.UserCartProductId,
    });
    if (!deleteUserCartProductResult) return { error: true, result: null };
    return { error: false, result: deleteUserCartProductResult };
  } else {
    const cartProductUpdateQuantityResult =
      await userCartProductsUpdateQuantity({
        UserCartProductId: cartProductFindResult.UserCartProductId,
        Quantity: --cartProductFindResult.Quantity,
      });
    if (!cartProductUpdateQuantityResult) return { error: true, result: null };
    return { error: false, result: cartProductUpdateQuantityResult };
  }
};

const deleteUserCartProducts = async (data) => {
  const destroyAllUserCartProductsResult = await destroyAllUserCartProducts(
    data
  );
  if (!destroyAllUserCartProductsResult)
    return { error: true, result: errMessage.noProductsFound };
  return { error: false, result: destroyAllUserCartProductsResult };
};

const getUserCartProducts = async (data) => {
  const getUserCartProductsResult = await userCartProductsFindAllByUserId(data);
  console.log("-> cartProducts:", getUserCartProductsResult);
  if (!getUserCartProductsResult || getUserCartProductsResult.length === 0)
    return { error: true, result: errMessage.noProductsFound };
  return { error: false, result: getUserCartProductsResult };
};

module.exports = {
  addProductToCart,
  removeProductFromCart,
  increaseCartProductQuantity,
  decreaseCartProductQuantity,
  deleteUserCartProducts,
  getUserCartProducts,
};
