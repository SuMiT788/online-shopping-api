const UniqueQuestions = (db) => {
  db.UniqueQuestions.hasMany(db.Users, { foreignKey: "UniqueQuestionId" });
};

module.exports = UniqueQuestions;
