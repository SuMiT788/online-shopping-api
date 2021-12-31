const {
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
} = require("../subscribers/users");
const errMessage = require("../../../utils/errMessages");
const res = require("express/lib/response");

const userSignup = async (req, res) => {
  try {
    const startTime = new Date();
    const data = req.body;
    const { error, result } = await addUser(data);
    console.log("-> signIn api response time:", new Date() - startTime, "msec");

    if (error) {
      if (result === errMessage.userAlreadyExists) {
        return res.status(409).send({
          code: 409,
          message: errMessage.userAlreadyExists || "Internal server error!",
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

    return res
      .status(400)
      .send({ code: 400, message: errMessage || "Internal server error!" });
  } catch (err) {
    console.log("-> userSignup Error:", err);
    return res.status(500).send({
      code: 500,
      message: err.message || "Internal server error!",
    });
  }
};

const checkUser = async (req, res) => {
  try {
    const data = req.body;
    const { error, result } = await checkIfUserExists(data);

    if (error) {
      if (result === errMessage.userNotFound) {
        return res.status(409).send({
          code: 409,
          message: errMessage.userNotFound || "Internal server error!",
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
    console.log("-> checkUser Error:", err);
    return res.status(500).send({
      code: 500,
      message: err.serverError || "Internal server error!",
    });
  }
};

const userSignin = async (req, res) => {
  try {
    const data = req.body;

    const { error, result } = await loginUser(data);

    if (error) {
      if (result === errMessage.userNotFound) {
        return res.status(409).send({
          code: 409,
          message: errMessage.userNotFound || "Internal server error!",
        });
      }
      if (result === errMessage.maxDeviceCount) {
        return res.status(403).send({
          code: 403,
          message: errMessage.maxDeviceCount || "Internal server error!",
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
    console.log("-> checkUser Error:", err);
    return res.status(500).send({
      code: 500,
      message: err.serverError || "Internal server error!",
    });
  }
};

const userLogoutAll = async (req, res) => {
  try {
    const { error, result } = await logoutAllDevices(req.body);
    console.log(
      "-> api: userLogoutAll responseTime:",
      new Date() - req.startTime,
      "ms"
    );

    if (error) {
      if (result === errMessage.noUserFound)
        return res.status(409).send({
          code: 409,
          message: errMessage.noUserFound || "Internal server error!",
        });
      return res.status(400).send({
        code: 400,
        message: errMessage.invalidReq || "Internal server error!",
      });
    }

    if (result) {
      return res.status(200).send({ code: 200, message: errMessage.success });
    }

    return res.status(400).send({
      code: 400,
      message: errMessage.invalidReq || "Internal server error!",
    });
  } catch (err) {
    console.log("-> userLogoutAll Error:", err);
    return res.status(500).send({
      code: 500,
      message: err.serverError || "Internal server error!",
    });
  }
};

const userLogout = async (req, res) => {
  try {
    const { error, result } = await logoutDevice({
      UserTokenId: req.UserTokenId,
    });
    console.log(
      "-> api: userLogout responseTime:",
      new Date() - req.startTime,
      "ms"
    );

    if (error) {
      return res.status(400).send({
        code: 400,
        message: errMessage.invalidReq || "Internal server error!",
      });
    }

    if (result) {
      return res.status(200).send({ code: 200, message: errMessage.success });
    }

    return res.status(400).send({
      code: 400,
      message: errMessage.invalidReq || "Internal server error!",
    });
  } catch (err) {
    console.log("-> userLogoutAll Error:", err);
    return res.status(500).send({
      code: 500,
      message: err.serverError || "Internal server error!",
    });
  }
};

const userViewProfile = async (req, res) => {
  try {
    const { error, result } = await getUserData({
      UserId: req.UserId,
    });
    console.log(
      "-> api: userViewProfile responseTime:",
      new Date() - req.startTime,
      "ms"
    );

    if (error) {
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
    console.log("-> userLogoutAll Error:", err);
    return res.status(500).send({
      code: 500,
      message: err.serverError || "Internal server error!",
    });
  }
};

const userEditProfile = async (req, res) => {
  try {
    const { error, result } = await updateUserData({
      UserId: req.UserId,
      Name: req.body.Name,
      Email: req.body.Email,
      MobileNumber: req.body.MobileNumber,
    });
    console.log(
      "-> api: userViewProfile responseTime:",
      new Date() - req.startTime,
      "ms"
    );

    if (error) {
      if (result === errMessage.userAlreadyExists) {
        return res.status(400).send({
          code: 400,
          message: errMessage.userAlreadyExists || "Internal server error!",
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
    console.log("-> userLogoutAll Error:", err);
    return res.status(500).send({
      code: 500,
      message: err.serverError || "Internal server error!",
    });
  }
};

const changeUserPassword = async (req, res) => {
  try {
    const { error, result } = await updateUserPassword({
      UserId: req.UserId,
      Password: req.body.Password,
      NewPassword: req.body.NewPassword,
    });
    console.log(
      "-> api: changeUserPassword responseTime:",
      new Date() - req.startTime,
      "ms"
    );

    if (error) {
      if (result === errMessage.userNotFound) {
        return res.status(400).send({
          code: 400,
          message: errMessage.userNotFound,
        });
      }
      if (result === errMessage.invalidPass) {
        return res.status(400).send({
          code: 400,
          message: errMessage.invalidPass,
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
    console.log("-> changeUserPassword Error:", err);
    return res.status(500).send({
      code: 500,
      message: err.serverError || "Internal server error!",
    });
  }
};

const userForgotPassword = async (req, res) => {
  try {
    const { error, result } = await forgotPassword(req.body);
    console.log(
      "-> api: userForgotPassword responseTime:",
      new Date() - req.startTime,
      "ms"
    );

    if (error) {
      if (result === errMessage.userIdNotFound)
        return res.status(400).send({
          code: 400,
          message: errMessage.userIdNotFound,
        });

      if (result === errMessage.invalidUniqueAns)
        return res.status(400).send({
          code: 400,
          message: errMessage.invalidUniqueAns,
        });

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
    console.log("-> userForgotPassword Error:", err);
    return res.status(500).send({
      code: 500,
      message: err.serverError || "Internal server error!",
    });
  }
};

const deleteUserAccount = async (req, res) => {
  try {
    console.log("-> UserId:", req.UserId);
    const { error, result } = await destroyUserAccount({
      UserId: req.UserId,
    });
    console.log(
      "-> api: deleteUserAccount responseTime:",
      new Date() - req.startTime,
      "ms"
    );

    if (error) {
      if (result === errMessage.userIdNotFound) {
        return res.status(400).send({
          code: 400,
          message: errMessage.userIdNotFound,
        });
      }
      console.log("-> Error");
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
    console.log("-> deleteUserAccount Error:", err);
    return res.status(500).send({
      code: 500,
      message: err.serverError || "Internal server error!",
    });
  }
};

const changeUniqueQuestion = async (req, res) => {
  try {
    console.log("-> UserId:", req.UserId);
    const { error, result } = await updateUniqueQuestion({
      UserId: req.UserId,
      ...req.body,
    });
    console.log(
      "-> api: changeUniqueQuestion responseTime:",
      new Date() - req.startTime,
      "ms"
    );

    if (error) {
      if (result === errMessage.userIdNotFound) {
        return res.status(400).send({
          code: 400,
          message: errMessage.userIdNotFound,
        });
      }
      if (result === errMessage.invalidPass) {
        return res.status(400).send({
          code: 400,
          message: errMessage.invalidPass,
        });
      }
      if (result === errMessage.noQuestionsFound) {
        return res.status(400).send({
          code: 400,
          message: errMessage.noQuestionsFound,
        });
      }
      console.log("-> Error");
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
    console.log("-> changeUniqueQuestion Error:", err);
    return res.status(500).send({
      code: 500,
      message: err.serverError || "Internal server error!",
    });
  }
};

const getUserUniqueQuestion = async (req, res) => {
  try {
    console.log("-> UserId:", req.UserId);
    const { error, result } = await viewUserUniqueQuestion({
      UserId: req.UserId,
    });
    console.log(
      "-> api: getUserUniqueQuestion responseTime:",
      new Date() - req.startTime,
      "ms"
    );

    if (error) {
      if (result === errMessage.userIdNotFound) {
        return res.status(400).send({
          code: 400,
          message: errMessage.userIdNotFound,
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
    console.log("-> getUserUniqueQuestion Error:", err);
    return res.status(500).send({
      code: 500,
      message: err.serverError || "Internal server error!",
    });
  }
};

module.exports = {
  userSignup,
  checkUser,
  userSignin,
  userLogoutAll,
  userLogout,
  userViewProfile,
  userEditProfile,
  changeUserPassword,
  userForgotPassword,
  deleteUserAccount,
  changeUniqueQuestion,
  getUserUniqueQuestion,
};
