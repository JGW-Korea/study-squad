const express = require("express");
const router = express.Router();

const StudyCreate = require("./create/create.js");

router.use("/create", StudyCreate);

module.exports = router;
