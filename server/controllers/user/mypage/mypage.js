const express = require("express");
const router = express.Router();

const Profile = require("./profile/profile.js");
const ChangeEmail = require("./changeEmail/changeEmail.js");
const ChangePassword = require("./changePassword/changePassword.js");

router.use("/profile", Profile);
router.use("/changeEmail", ChangeEmail);
router.use("/changePassword", ChangePassword);

module.exports = router;
