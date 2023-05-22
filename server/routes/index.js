const express = require("express");
const router = express.Router();

const userRoute = require("../controllers/user/register/register");

router.use("/api/user", userRoute);

module.exports = router;
