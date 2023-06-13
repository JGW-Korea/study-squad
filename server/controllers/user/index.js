const express = require("express");
const router = express.Router();

const IdCheckRoute = require("./idCheck/idCheck.js");
const RegisterRoute = require("./register/register.js");
const LoginRoute = require("./login/login.js");
const LogoutRoute = require("./logout/logout.js");
const LoginCheck = require("./loginCheck/loginCheck.js");

router.use("/idCheck", IdCheckRoute);
router.use("/register", RegisterRoute);
router.use("/login", LoginRoute);
router.use("/logout", LogoutRoute);
router.use("/loginCheck", LoginCheck);

module.exports = router;
