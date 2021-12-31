const sequelize = require("sequelize");
const db = require("../");
const Op = sequelize.Op;

const productsAllCategories = async () =>
  db.Products.findAll({
    attributes: ["Category"],
    raw: true,
    group: ["Category"],
  });

const productsByCategoryFindAndCountAll = async (data) =>
  db.Products.findAndCountAll({
    raw: true,
    where: {
      Category: data.Category,
    },
    offset: (data.PageNo - 1) * 12,
    limit: 12,
  });

const productsByFilterFindAndCountAll = async (data) =>
  db.Products.findAndCountAll({
    raw: true,
    where: {
      Category: data.Category,
      Subcategory: data.Subcategory,
      Price: { [Op.between]: [data.MinPrice, data.MaxPrice] },
    },
    offset: (data.PageNo - 1) * 12,
    limit: 12,
  });

const productsFindOne = async (data) =>
  db.Products.findOne({
    raw: true,
    where: {
      ProductId: data.ProductId,
    },
  });

const productsFindAllSubcategoriesOfCategory = async (data) =>
  db.Products.findAndCountAll({
    attributes: ["Subcategory"],
    raw: true,
    where: { Category: data.Category },
    group: ["Subcategory"],
  });

const productsCreate = async (data) =>
  db.Products.create({
    Name: data.Name,
    Description: data.Description,
    Price: data.Price,
    Category: data.Category,
    Subcategory: data.Subcategory,
    ImagePath: data.ImagePath,
  });

const productsDestroyById = async (data) =>
  db.Products.destroy({
    where: { ProductId: data.ProductId },
  });

const productsUpdateById = async (data) =>
  db.Products.update(
    {
      Name: data.Name,
      Description: data.Description,
      Price: data.Price,
      Category: data.Category,
      Subcategory: data.Subcategory,
      ImagePath: data.ImagePath,
    },
    {
      where: { ProductId: data.ProductId },
    }
  );

const productsFindAndCountAll = async (data) =>
  db.Products.findAndCountAll({
    raw: true,
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
    order: [["Category"], ["Subcategory"]],
    offset: (data.PageNo - 1) * 12,
    limit: 12,
  });

const productsFindAndCountAllByKeyword = async (data) =>
  db.Products.findAndCountAll({
    raw: true,
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
    where: {
      Name: {
        [Op.iLike]: `%${data.Keyword}%`,
      },
    },
    order: ["Category", "Subcategory"],
    offset: (data.PageNo - 1) * 12,
    limit: 12,
  });

const productsFindAndCountAllByCategory = async (data) =>
  db.Products.findAndCountAll({
    raw: true,
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
    where: {
      Category: data.Category,
    },
    order: ["Category", "Subcategory"],
    offset: (data.PageNo - 1) * 12,
    limit: 12,
  });

const productsFindAndCountAllByCategoryAndKeyword = async (data) =>
  db.Products.findAndCountAll({
    raw: true,
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
    where: {
      Category: data.Category,
      Name: {
        [Op.iLike]: `%${data.Keyword}%`,
      },
    },
    order: ["Category", "Subcategory"],
    offset: (data.PageNo - 1) * 12,
    limit: 12,
  });

module.exports = {
  productsByCategoryFindAndCountAll,
  productsAllCategories,
  productsByFilterFindAndCountAll,
  productsFindOne,
  productsFindAllSubcategoriesOfCategory,
  productsCreate,
  productsDestroyById,
  productsUpdateById,
  productsFindAndCountAll,
  productsFindAndCountAllByKeyword,
  productsFindAndCountAllByCategory,
  productsFindAndCountAllByCategoryAndKeyword,
};
