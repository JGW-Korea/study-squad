const express = require("express");
const router = express.Router();

const userRoute = require("../controllers/user/index.js");
const studyRoute = require("../controllers/study/index.js");

router.use("/api/user", userRoute);
router.use("/api/study", studyRoute);

module.exports = router;
