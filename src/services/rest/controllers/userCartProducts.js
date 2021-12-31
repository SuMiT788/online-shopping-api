const {
  addProductToCart,
  removeProductFromCart,
  increaseCartProductQuantity,
  decreaseCartProductQuantity,
  deleteUserCartProducts,
  getUserCartProducts,
} = require("../subscribers/userCartProducts");
const errMessage = require("../../../utils/errMessages");

const addToCart = async (req, res) => {
  try {
    const { error, result } = await addProductToCart({
      UserId: req.UserId,
      ...req.body,
    });
    console.log("-> addToCart responseTime", new Date() - req.startTime, "ms");

    if (error) {
      if (result === errMessage.noProductsFound) {
        return res.status(200).send({
          code: 400,
          message: errMessage.noProductsFound || "Internal server error!",
        });
      }
      if (result === errMessage.alreadyAddedToCart) {
        return res.status(200).send({
          code: 400,
          message: errMessage.alreadyAddedToCart || "Internal server error!",
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
    console.log("-> addToCart Error:", err);
    return res.status(500).send({
      code: 500,
      message: err.serverError || "Internal server error!",
    });
  }
};

const removeFromCart = async (req, res) => {
  try {
    console.log("req.body:", req.body);
    const { error, result } = await removeProductFromCart({
      UserId: req.UserId,
      ...req.body,
    });
    console.log(
      "-> removeFromCart responseTime",
      new Date() - req.startTime,
      "ms"
    );

    if (error) {
      if (result === errMessage.notPresentInUserCart) {
        return res.status(200).send({
          code: 400,
          message: errMessage.notPresentInUserCart || "Internal server error!",
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
    console.log("-> removeFromCart Error:", err);
    return res.status(500).send({
      code: 500,
      message: err.serverError || "Internal server error!",
    });
  }
};

const increaseQuantity = async (req, res) => {
  try {
    const { error, result } = await increaseCartProductQuantity({
      UserId: req.UserId,
      ProductId: req.body.ProductId,
    });
    console.log(
      "-> increaseQuantity responseTime",
      new Date() - req.startTime,
      "ms"
    );

    if (error) {
      if (result === errMessage.notPresentInUserCart) {
        return res.status(200).send({
          code: 400,
          message: errMessage.notPresentInUserCart || "Internal server error!",
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
    console.log("-> increaseQuantity Error:", err);
    return res.status(500).send({
      code: 500,
      message: err.serverError || "Internal server error!",
    });
  }
};

const decreaseQuantity = async (req, res) => {
  try {
    const { error, result } = await decreaseCartProductQuantity({
      UserId: req.UserId,
      ProductId: req.body.ProductId,
    });
    console.log(
      "-> decreaseQuantity responseTime",
      new Date() - req.startTime,
      "ms"
    );

    if (error) {
      if (result === errMessage.notPresentInUserCart) {
        return res.status(200).send({
          code: 400,
          message: errMessage.notPresentInUserCart || "Internal server error!",
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
    console.log("-> decreaseQuantity Error:", err);
    return res.status(500).send({
      code: 500,
      message: err.serverError || "Internal server error!",
    });
  }
};

const clearCart = async (req, res) => {
  try {
    const { error, result } = await deleteUserCartProducts({
      UserId: req.UserId,
    });
    console.log("-> clearCart responseTime", new Date() - req.startTime, "ms");

    if (error) {
      if (result === errMessage.noProductsFound) {
        return res.status(200).send({
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
    console.log("-> clearCart Error:", err);
    return res.status(500).send({
      code: 500,
      message: err.serverError || "Internal server error!",
    });
  }
};

const viewCartProducts = async (req, res) => {
  try {
    const { error, result } = await getUserCartProducts({
      UserId: req.UserId,
    });
    console.log(
      "-> viewCartProducts responseTime",
      new Date() - req.startTime,
      "ms"
    );

    if (error) {
      if (result === errMessage.noProductsFound) {
        return res.status(200).send({
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
    console.log("-> viewCartProducts Error:", err);
    return res.status(500).send({
      code: 500,
      message: err.serverError || "Internal server error!",
    });
  }
};

module.exports = {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
  viewCartProducts,
};
