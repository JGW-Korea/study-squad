// 모듈 import
const express = require("express");
const router = express.Router();

const db = require("../../../models/index.js");
const User = db.User;

const bcrypt = require("bcrypt");
const saltRounds = 10;

router.post("/", async (req, res) => {
  try {
    // 회원 가입 할 떄 필요한 정보들을 Client에서 가져온 후 각각의 변수에 넣어준다.
    const { email, password, name, birth } = req.body;

    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);

    // User Table에 새로운 값들을 각각의 attribute에 넣어준다.
    await User.create({
      email: email,
      password: hash,
      name: name,
      birth: new Date(birth),
    });

    // 성공하면 Client에 이 정보들을 보내준다.
    res.status(200).json({
      success: true,
    });
  } catch (error) {
    // 실패하면 err을 보여주고 Client에 실패된 정보들을 보내준다.
    console.log(err);
    res.json({
      success: false,
    });
  }
});

module.exports = router;
