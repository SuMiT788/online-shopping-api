const {
  productsByCategoryFindAndCountAll,
  productsAllCategories,
  productsByFilterFindAndCountAll,
  productsFindOne,
  productsFindAllSubcategoriesOfCategory,
  productsFindAndCountAll,
  productsFindAndCountAllByKeyword,
  productsFindAndCountAllByCategory,
  productsFindAndCountAllByCategoryAndKeyword,
} = require("../../../db/queries/Products");
const errMessage = require("../../../utils/errMessages");

const getAllCategories = async (data) => {
  const categoriesResult = await productsAllCategories();
  if (!categoriesResult || categoriesResult.length === 0)
    return { error: true, result: errMessage.noProductCategoryFound };
  return { error: false, result: categoriesResult };
};

const getProductsByCategory = async (data) => {
  const getProductsResult = await productsByCategoryFindAndCountAll(data);
  if (!getProductsResult || getProductsResult.length === 0)
    return { error: true, result: errMessage.noProductsFound };
  return { error: false, result: getProductsResult };
};

const getProductsByFilter = async (data) => {
  const getProductsResult = await productsByFilterFindAndCountAll(data);
  if (!getProductsResult || getProductsResult.length === 0)
    return { error: true, result: errMessage.noProductsFound };
  return { error: false, result: getProductsResult };
};

const getProductByProductId = async (data) => {
  const getProductsResult = await productsFindOne(data);
  if (!getProductsResult || getProductsResult.length === 0)
    return { error: true, result: errMessage.noProductsFound };
  return { error: false, result: getProductsResult };
};

const getAllSubcategoriesOfCategory = async (data) => {
  const getSubcategoriesResult = await productsFindAllSubcategoriesOfCategory(
    data
  );
  if (!getSubcategoriesResult || getSubcategoriesResult.length === 0)
    return { error: true, result: errMessage.noProductsFound };
  return { error: false, result: getSubcategoriesResult };
};

const getAllProducts = async (data) => {
  const productsResult = await productsFindAndCountAll(data);
  if (!productsResult)
    return { error: true, result: errMessage.noProductsFound };
  return { error: false, result: productsResult };
};

const findProducts = async (data) => {
  console.log("-> findProducts data:", data);
  let findProductsResult = null;
  if (data.Category === "" && data.Keyword === "") {
    findProductsResult = await productsFindAndCountAll(data);
  } else if (data.Category === "") {
    findProductsResult = await productsFindAndCountAllByKeyword(data);
  } else if (data.Keyword === "") {
    findProductsResult = await productsFindAndCountAllByCategory(data);
  } else {
    findProductsResult = await productsFindAndCountAllByCategoryAndKeyword(
      data
    );
  }
  if (!findProductsResult || !Object.keys(findProductsResult).length)
    return { error: true, result: errMessage.noProductsFound };
  return { error: false, result: findProductsResult };
};

module.exports = {
  getProductsByCategory,
  getAllCategories,
  getProductsByFilter,
  getProductByProductId,
  getAllSubcategoriesOfCategory,
  getAllProducts,
  findProducts,
};
