const express = require("express");
const { verifyToken } = require("../../../middleware");
const { getAllUniqueQuestions } = require("../controllers/uniqueQuestions");
const router = express.Router();

router.get("/api/getAllUniqueQuestions", getAllUniqueQuestions);

module.exports = router;
