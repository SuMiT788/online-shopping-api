const {
  addProductToWishList,
  removeProductFromWishList,
  findAllWishListProducts,
} = require("../subscribers/wishListProducts");
const errMessage = require("../../../utils/errMessages");

const addToWishList = async (req, res) => {
  try {
    const { error, result } = await addProductToWishList({
      UserId: req.UserId,
      ProductId: req.body.ProductId,
    });
    console.log(
      "-> addToWishList responseTime",
      new Date() - req.startTime,
      "ms"
    );

    if (error) {
      if (result === errMessage.alreadyWished) {
        return res.status(200).send({
          code: 200,
          message: errMessage.alreadyWished || "Internal server error!",
        });
      }
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
    console.log("-> addToWishList Error:", err);
    return res.status(500).send({
      code: 500,
      message: err.serverError || "Internal server error!",
    });
  }
};

const removeFromWishList = async (req, res) => {
  try {
    const { error, result } = await removeProductFromWishList({
      UserId: req.UserId,
      ProductId: req.body.ProductId,
    });
    console.log(
      "-> removeFromWishList responseTime",
      new Date() - req.startTime,
      "ms"
    );

    if (error) {
      if (result === errMessage.notPresentInWishList) {
        return res.status(200).send({
          code: 200,
          message: errMessage.notPresentInWishList || "Internal server error!",
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
    console.log("-> removeFromWishList Error:", err);
    return res.status(500).send({
      code: 500,
      message: err.serverError || "Internal server error!",
    });
  }
};

const viewWishListProducts = async (req, res) => {
  try {
    const { error, result } = await findAllWishListProducts({
      UserId: req.UserId,
    });
    console.log(
      "-> viewWishListProducts responseTime",
      new Date() - req.startTime,
      "ms"
    );

    if (error) {
      if (result === errMessage.noProductsFound) {
        return res.status(200).send({
          code: 200,
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
    console.log("-> viewWishListProducts Error:", err);
    return res.status(500).send({
      code: 500,
      message: err.serverError || "Internal server error!",
    });
  }
};

module.exports = { addToWishList, removeFromWishList, viewWishListProducts };
