// 모듈 import
const express = require("express");
const router = express.Router();

const db = require("../../../models/index.js");
const User = db.users;

const bcrypt = require("bcrypt");
const saltRounds = 10;

router.post("/register", async (req, res) => {
  try {
    const {
      createEmail,
      createPassword,
      createName,
      createBirth,
      createGender,
    } = req.body;

    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(createPassword, salt);

    await User.create({
      registrationNum: 1,
      user_mail: createEmail,
      user_password: hash,
      user_name: createName,
      user_birth: createBirth,
      user_gender: createGender,
    });

    res.status(201).send("User created successfully");
  } catch (error) {
    console.log(err);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
