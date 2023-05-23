const express = require("express");
const router = express.Router();

const userRoute = require("../controllers/user/index.js");

router.use("/api/user", userRoute);

module.exports = router;
