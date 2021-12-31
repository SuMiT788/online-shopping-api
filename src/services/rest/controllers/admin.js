const {
  confirmAdmin,
  createProduct,
  deleteProduct,
  updateProduct,
  findAllUsers,
  updateUserIsBlocked,
} = require("../subscribers/admin");
const errMessage = require("../../../utils/errMessages");

const adminLogin = async (req, res) => {
  try {
    const { error, result } = await confirmAdmin(req.body);
    console.log("-> adminLogin responseTime", new Date() - req.startTime, "ms");

    if (error) {
      if (result === errMessage.maxDeviceCount) {
        return res.status(200).send({
          code: 200,
          message: errMessage.maxDeviceCount || "Internal server error!",
        });
      }
      if (result === errMessage.userNotFound) {
        return res.status(200).send({
          code: 200,
          message: errMessage.userNotFound || "Internal server error!",
        });
      }
      return res.status(400).send({
        code: 400,
        message: errMessage.invalidReq || "Internal server error!",
      });
    }

    if (result) {
      return res.status(200).send({
        code: 200,
        message: errMessage.success,
        data: result,
      });
    }

    return res.status(400).send({
      code: 400,
      message: errMessage.invalidReq || "Internal server error!",
    });
  } catch (err) {
    console.log("-> adminLogin Error:", err);
    return res.status(500).send({
      code: 500,
      message: err.serverError || "Internal server error!",
    });
  }
};

const addProduct = async (req, res) => {
  try {
    const { error, result } = await createProduct(req.body);
    console.log("-> addProduct responseTime", new Date() - req.startTime, "ms");

    if (error) {
      return res.status(400).send({
        code: 400,
        message: errMessage.invalidReq || "Internal server error!",
      });
    }

    if (result) {
      return res.status(200).send({
        code: 200,
        message: errMessage.success,
        data: result,
      });
    }

    return res.status(400).send({
      code: 400,
      message: errMessage.invalidReq || "Internal server error!",
    });
  } catch (err) {
    console.log("-> addProduct Error:", err);
    return res.status(500).send({
      code: 500,
      message: err.serverError || "Internal server error!",
    });
  }
};

const removeProduct = async (req, res) => {
  try {
    const { error, result } = await deleteProduct(req.body);
    console.log(
      "-> removeProduct responseTime",
      new Date() - req.startTime,
      "ms"
    );

    if (error) {
      if (result === errMessage.noProductsFound)
        return res.status(400).send({
          code: 400,
          message: errMessage.noProductsFound || "Internal server error!",
        });
      return res.status(400).send({
        code: 400,
        message: errMessage.invalidReq || "Internal server error!",
      });
    }

    if (result)
      return res.status(200).send({
        code: 200,
        message: errMessage.success,
        data: result,
      });

    return res.status(400).send({
      code: 400,
      message: errMessage.invalidReq || "Internal server error!",
    });
  } catch (err) {
    console.log("-> removeProduct Error:", err);
    return res.status(500).send({
      code: 500,
      message: err.serverError || "Internal server error!",
    });
  }
};

const editProduct = async (req, res) => {
  try {
    const { error, result } = await updateProduct(req.body);
    console.log(
      "-> editProduct responseTime",
      new Date() - req.startTime,
      "ms"
    );

    if (error) {
      if (result === errMessage.noProductsFound)
        return res.status(400).send({
          code: 400,
          message: errMessage.noProductsFound || "Internal server error!",
        });
      return res.status(400).send({
        code: 400,
        message: errMessage.invalidReq || "Internal server error!",
      });
    }

    if (result)
      return res.status(200).send({
        code: 200,
        message: errMessage.success,
        data: result,
      });

    return res.status(400).send({
      code: 400,
      message: errMessage.invalidReq || "Internal server error!",
    });
  } catch (err) {
    console.log("-> editProduct Error:", err);
    return res.status(500).send({
      code: 500,
      message: err.serverError || "Internal server error!",
    });
  }
};

const viewAllUsers = async (req, res) => {
  try {
    const { error, result } = await findAllUsers();
    console.log(
      "-> viewAllUsers responseTime",
      new Date() - req.startTime,
      "ms"
    );

    if (error) {
      if (result === errMessage.noUserFound)
        return res.status(400).send({
          code: 400,
          message: errMessage.noUserFound || "Internal server error!",
        });
      return res.status(400).send({
        code: 400,
        message: errMessage.invalidReq || "Internal server error!",
      });
    }

    if (result)
      return res.status(200).send({
        code: 200,
        message: errMessage.success,
        data: result,
      });

    return res.status(400).send({
      code: 400,
      message: errMessage.invalidReq || "Internal server error!",
    });
  } catch (err) {
    console.log("-> viewAllUsers Error:", err);
    return res.status(500).send({
      code: 500,
      message: err.serverError || "Internal server error!",
    });
  }
};

const editUserIsBlocked = async (req, res) => {
  try {
    const { error, result } = await updateUserIsBlocked(req.body);
    console.log(
      "-> editUserIsBlocked responseTime",
      new Date() - req.startTime,
      "ms"
    );

    if (error) {
      if (result === errMessage.noUserFound)
        return res.status(400).send({
          code: 400,
          message: errMessage.noUserFound || "Internal server error!",
        });
      return res.status(400).send({
        code: 400,
        message: errMessage.invalidReq || "Internal server error!",
      });
    }

    if (result)
      return res.status(200).send({
        code: 200,
        message: errMessage.success,
        data: result,
      });

    return res.status(400).send({
      code: 400,
      message: errMessage.invalidReq || "Internal server error!",
    });
  } catch (err) {
    console.log("-> editUserIsBlocked Error:", err);
    return res.status(500).send({
      code: 500,
      message: err.serverError || "Internal server error!",
    });
  }
};

module.exports = {
  adminLogin,
  addProduct,
  removeProduct,
  editProduct,
  viewAllUsers,
  editUserIsBlocked,
};
