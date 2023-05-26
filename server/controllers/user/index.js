const express = require("express");
const router = express.Router();

const IdCheckRoute = require("./idCheck/idCheck.js");
const RegisterRoute = require("./register/register.js");
const LoginRoute = require("./login/login.js");
const LogoutRoute = require("./logout/logout.js");

router.use("/idCheck", IdCheckRoute);
router.use("/register", RegisterRoute);
router.use("/login", LoginRoute);
router.use("/logout", LogoutRoute);

module.exports = router;
