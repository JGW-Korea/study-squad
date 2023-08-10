const express = require("express");
const router = express.Router();

// const ChangeEmail = require('./changeEmail/changeEmail.js')
// const ChangePassword = require("./changePassword/changePassword.js");
const Profile = require("./profile/profile.js");

// router.use('/changeEmail', ChangeEmail)
// router.use('/changePassword', ChangePassword)
router.use("/profile", Profile);

module.exports = router;
