const express = require("express");
const router = express.Router();

const IdCheckRoute = require("./idCheck/idCheck.js");
const RegisterRoute = require("./register/register.js");

router.use("/idCheck", IdCheckRoute);
router.use("/register", RegisterRoute);

module.exports = router;
