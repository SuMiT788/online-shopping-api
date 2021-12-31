const { findAllUniqueQuestions } = require("../subscribers/uniqueQuestions");
const errMessage = require("../../../utils/errMessages");

const getAllUniqueQuestions = async (req, res) => {
  try {
    const { error, result } = await findAllUniqueQuestions();
    console.log(
      "-> getAllUniqueQuestions responseTime",
      new Date() - req.startTime,
      "ms"
    );

    if (error) {
      if (result === errMessage.noQuestionsFound)
        return res.status(400).send({
          code: 400,
          message: errMessage.noQuestionsFound || "Internal server error!",
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
    console.log("-> getAllUniqueQuestions Error:", err);
    return res.status(500).send({
      code: 500,
      message: err.serverError || "Internal server error!",
    });
  }
};

module.exports = { getAllUniqueQuestions };
