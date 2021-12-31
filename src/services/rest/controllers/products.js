const {
  getProductsByCategory,
  getAllCategories,
  getProductsByFilter,
  getProductByProductId,
  getAllSubcategoriesOfCategory,
  getAllProducts,
  findProducts,
} = require("../subscribers/products");
const errMessage = require("../../../utils/errMessages");

const viewAllCategories = async (req, res) => {
  try {
    const { error, result } = await getAllCategories(req.body);
    console.log(
      "-> viewAllCategories responseTime",
      new Date() - req.startTime,
      "ms"
    );

    if (error) {
      if (result === errMessage.noProductCategoryFound) {
        return res.status(400).send({
          code: 400,
          message:
            errMessage.noProductCategoryFound || "Internal server error!",
        });
      }
      return res.status(400).send({
        code: 400,
        message: errMessage.invalidReq || "Internal server error!",
      });
    }

    if (result) {
      return res
        .status(200)
        .send({ code: 200, message: errMessage.success, data: result });
    }

    return res.status(400).send({
      code: 400,
      message: errMessage.invalidReq || "Internal server error!",
    });
  } catch (err) {
    console.log("-> viewAllCategories Error:", err);
    return res.status(500).send({
      code: 500,
      message: err.serverError || "Internal server error!",
    });
  }
};

const viewProductsByCategory = async (req, res) => {
  try {
    const { error, result } = await getProductsByCategory(req.body);
    console.log(
      "-> viewProductsByCategory responseTime",
      new Date() - req.startTime,
      "ms"
    );

    if (error) {
      if (result === errMessage.noProductsFound) {
        return res.status(400).send({
          code: 400,
          message: errMessage.noProductsFound || "Internal server error!",
        });
      }
      return res.status(400).send({
        code: 400,
        message: errMessage.invalidReq || "Internal server error!",
      });
    }

    if (result) {
      return res.status(200).send({ code: 200, message: result });
    }

    return res.status(400).send({
      code: 400,
      message: errMessage.invalidReq || "Internal server error!",
    });
  } catch (err) {
    console.log("-> viewProductsByCategory Error:", err);
    return res.status(500).send({
      code: 500,
      message: err.serverError || "Internal server error!",
    });
  }
};

const viewProductsByFilter = async (req, res) => {
  try {
    const { error, result } = await getProductsByFilter(req.body);
    console.log(
      "-> viewProductsByFilter responseTime",
      new Date() - req.startTime,
      "ms"
    );

    if (error) {
      if (result === errMessage.noProductsFound) {
        return res.status(400).send({
          code: 400,
          message: errMessage.noProductsFound || "Internal server error!",
        });
      }
      return res.status(400).send({
        code: 400,
        message: errMessage.invalidReq || "Internal server error!",
      });
    }

    if (result) {
      return res
        .status(200)
        .send({ code: 200, message: errMessage.success, data: result });
    }

    return res.status(400).send({
      code: 400,
      message: errMessage.invalidReq || "Internal server error!",
    });
  } catch (err) {
    console.log("-> viewProductsByFilter Error:", err);
    return res.status(500).send({
      code: 500,
      message: err.serverError || "Internal server error!",
    });
  }
};

const viewProduct = async (req, res) => {
  try {
    const { error, result } = await getProductByProductId(req.body);
    console.log(
      "-> viewProduct responseTime",
      new Date() - req.startTime,
      "ms"
    );

    if (error) {
      if (result === errMessage.noProductsFound) {
        return res.status(400).send({
          code: 400,
          message: errMessage.noProductsFound || "Internal server error!",
        });
      }
      return res.status(400).send({
        code: 400,
        message: errMessage.invalidReq || "Internal server error!",
      });
    }

    if (result) {
      return res
        .status(200)
        .send({ code: 200, message: errMessage.success, data: result });
    }

    return res.status(400).send({
      code: 400,
      message: errMessage.invalidReq || "Internal server error!",
    });
  } catch (err) {
    console.log("-> viewProduct Error:", err);
    return res.status(500).send({
      code: 500,
      message: err.serverError || "Internal server error!",
    });
  }
};

const getSubcategoriesOfCategory = async (req, res) => {
  try {
    const { error, result } = await getAllSubcategoriesOfCategory(req.body);
    console.log(
      "-> getSubcategoriesOfCategory responseTime",
      new Date() - req.startTime,
      "ms"
    );

    if (error) {
      if (result === errMessage.noProductsFound) {
        return res.status(400).send({
          code: 400,
          message: errMessage.noProductsFound || "Internal server error!",
        });
      }
      return res.status(400).send({
        code: 400,
        message: errMessage.invalidReq || "Internal server error!",
      });
    }

    if (result) {
      return res
        .status(200)
        .send({ code: 200, message: errMessage.success, data: result });
    }

    return res.status(400).send({
      code: 400,
      message: errMessage.invalidReq || "Internal server error!",
    });
  } catch (err) {
    console.log("-> getSubcategoriesOfCategory Error:", err);
    return res.status(500).send({
      code: 500,
      message: err.serverError || "Internal server error!",
    });
  }
};

const viewAllProducts = async (req, res) => {
  try {
    const { error, result } = await getAllProducts(req.body);
    console.log(
      "-> viewAllProducts responseTime",
      new Date() - req.startTime,
      "ms"
    );

    if (error) {
      if (result === errMessage.noProductsFound) {
        return res.status(400).send({
          code: 400,
          message: errMessage.noProductsFound || "Internal server error!",
        });
      }
      return res.status(400).send({
        code: 400,
        message: errMessage.invalidReq || "Internal server error!",
      });
    }

    if (result) {
      return res
        .status(200)
        .send({ code: 200, message: errMessage.success, data: result });
    }

    return res.status(400).send({
      code: 400,
      message: errMessage.invalidReq || "Internal server error!",
    });
  } catch (err) {
    console.log("-> viewAllProducts Error:", err);
    return res.status(500).send({
      code: 500,
      message: err.serverError || "Internal server error!",
    });
  }
};

const searchProducts = async (req, res) => {
  try {
    const { error, result } = await findProducts({
      UserId: req.UserId,
      ...req.body,
    });
    console.log(
      "-> searchProducts responseTime",
      new Date() - req.startTime,
      "ms"
    );

    if (error) {
      if (result === errMessage.noProductsFound) {
        return res.status(400).send({
          code: 400,
          message: errMessage.noProductsFound || "Internal server error!",
        });
      }
      return res.status(400).send({
        code: 400,
        message: errMessage.invalidReq || "Internal server error!",
      });
    }

    if (result) {
      return res
        .status(200)
        .send({ code: 200, message: errMessage.success, data: result });
    }

    return res.status(400).send({
      code: 400,
      message: errMessage.invalidReq || "Internal server error!",
    });
  } catch (err) {
    console.log("-> searchProducts Error:", err);
    return res.status(500).send({
      code: 500,
      message: err.serverError || "Internal server error!",
    });
  }
};

module.exports = {
  viewAllCategories,
  viewProductsByCategory,
  viewProductsByFilter,
  viewProduct,
  getSubcategoriesOfCategory,
  viewAllProducts,
  searchProducts,
};
