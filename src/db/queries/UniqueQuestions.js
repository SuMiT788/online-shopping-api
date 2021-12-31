const db = require("..");

const uniqueQuestionsFindAll = async () =>
  db.UniqueQuestions.findAll({
    raw: true,
    attributes: ["UniqueQuestionId", "Question"],
  });

const UniqueQuestionsFindOneById = async (data) =>
  db.UniqueQuestions.findOne({
    raw: true,
    where: {
      UniqueQuestionId: data.UniqueQuestionId,
    },
  });

module.exports = { uniqueQuestionsFindAll, UniqueQuestionsFindOneById };
