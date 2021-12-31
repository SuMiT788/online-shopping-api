const req = {
  UserId: 1,
  body: {
    UniqueQuestionId: 10,
    UniqueQuestionAnswer: "Something",
    Password: "Something",
  },
};

const data = { UserId: req.UserId, ...req.body };

console.log("-> data:", data);
