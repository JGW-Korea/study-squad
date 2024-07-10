const express = require("express");
const router = express.Router();

const Profile = require("./profile/profile.js");
const ChangeEmail = require("./changeEmail/changeEmail.js");
const ChangePassword = require("./changePassword/changePassword.js");
const Change = require("./change/change.js");

router.use("/profile", Profile);
router.use("/changeEmail", ChangeEmail);
router.use("/changePassword", ChangePassword);
router.use("/change", Change);

module.exports = router;
