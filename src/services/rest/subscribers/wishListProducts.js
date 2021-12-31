const {
  wishListProductCreate,
  WishListProductsFindOne,
  wishListProductDestroyById,
  wishListProductsFindAllByUserId,
} = require("../../../db/queries/WishListProducts");
const { productsFindOne } = require("../../../db/queries/Products");
const errMessage = require("../../../utils/errMessages");

const addProductToWishList = async (data) => {
  const productsFindOneResult = await productsFindOne({
    ProductId: data.ProductId,
  });
  if (!productsFindOneResult)
    return { error: true, result: errMessage.noProductsFound };
  const wishListFindOneResult = await WishListProductsFindOne(data);
  if (wishListFindOneResult)
    return { error: true, result: errMessage.alreadyWished };
  const wishListAddResult = await wishListProductCreate(data);
  if (!wishListAddResult) return { error: true, result: null };
  return { error: false, result: wishListAddResult };
};

const removeProductFromWishList = async (data) => {
  const wishListFindOneResult = await WishListProductsFindOne(data);
  if (!wishListFindOneResult)
    return { error: true, result: errMessage.notPresentInWishList };
  const wishListRemoveResult = await wishListProductDestroyById({
    WishListProductId: wishListFindOneResult.WishListProductId,
  });
  if (!wishListRemoveResult) return { error: true, result: null };
  return { error: false, result: wishListRemoveResult };
};

const findAllWishListProducts = async (data) => {
  const findAllWishListProductsResult = await wishListProductsFindAllByUserId(
    data
  );
  if (
    !findAllWishListProductsResult ||
    findAllWishListProductsResult.length === 0
  )
    return { error: true, result: errMessage.noProductsFound };
  return { error: false, result: findAllWishListProductsResult };
};

module.exports = {
  addProductToWishList,
  removeProductFromWishList,
  findAllWishListProducts,
};
