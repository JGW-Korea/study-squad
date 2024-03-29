const express = require("express");
const router = express.Router();

const IdCheckRoute = require("./idCheck/idCheck.js");
const RegisterRoute = require("./register/register.js");
const LoginRoute = require("./login/login.js");
const LogoutRoute = require("./logout/logout.js");
const LoginCheck = require("./loginCheck/loginCheck.js");
const PasswordModify = require("./PasswordModify/PasswordModify.js");
const DeleteUserAccount = require("./deleteUserAccount/deleteUserAccount.js");
const MyPage = require("./mypage/mypage.js");

router.use("/idCheck", IdCheckRoute);
router.use("/register", RegisterRoute);
router.use("/login", LoginRoute);
router.use("/logout", LogoutRoute);
router.use("/loginCheck", LoginCheck);
router.use("/passwordModify", PasswordModify);
router.use("/deleteUserAccount", DeleteUserAccount);
router.use("/mypage", MyPage);

module.exports = router;
