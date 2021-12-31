const errMessages = require("../../../utils/errMessages");
const {
  uniqueQuestionsFindAll,
} = require("../../../db/queries/UniqueQuestions");

const findAllUniqueQuestions = async () => {
  const uniqueQuestionsResult = await uniqueQuestionsFindAll();
  if (!uniqueQuestionsResult)
    return { error: true, result: errMessages.noQuestionsFound };
  return { error: false, result: uniqueQuestionsResult };
};

module.exports = { findAllUniqueQuestions };
