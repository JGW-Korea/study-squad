// 모듈 import
const express = require("express");
const router = express.Router();

const db = require("../../../models/index.js");
const { Op } = require("sequelize");
const User = db.User;

const bcrypt = require("bcrypt");
const saltRounds = 10;

router.post("/finduserpassword", async (req, res) => {
  const { email, name } = req.body;

  try {
    const user = await User.findOne({
      attributes: ["email", "name"],
      where: {
        email: { [Op.eq]: email },
        name: { [Op.eq]: name },
      },
    });

    if (user !== null) {
      res.json({
        findUserEmail: true,
        data: user,
      });
    } else {
      res.json({
        findUserEmail: false,
      });
    }
  } catch (error) {
    console.log("에러");
    next(error);
  }
});

router.post("/userpasswordreset", async (req, res) => {
  try {
    const { email, name, password } = req.body;

    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);

    //   // User Table에 새로운 값들을 각각의 attribute에 넣어준다.
    await User.update(
      {
        password: hash,
      },
      { where: { email: email, name: name } }
    );

    // 성공하면 Client에 이 정보들을 보내준다.
    res.status(200).json({
      userPasswordResetSuccess: true,
    });
  } catch (error) {
    console.log(error);
    res.json({
      userPasswordResetSuccess: false,
    });
  }
});

module.exports = router;
