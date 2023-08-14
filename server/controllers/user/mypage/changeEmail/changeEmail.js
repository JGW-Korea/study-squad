// 모듈 import
const express = require("express");
const router = express.Router();

const db = require("../../../../models/index.js");
const User = db.User;

router.post("/", async (req, res) => {
  try {
    const { email } = req.body;

    // User Table에 새로운 값들을 각각의 attribute에 넣어준다.
    await User.update(
      {
        email: email,
      },
      { where: { email: req.session.userId.email } }
    );

    req.session.destroy(() => {
      res.status(200).json({
        emailChangeSuccess: true,
      });
    });
  } catch (error) {
    res.json({
      emailChangeSuccess: false,
    });
  }
});

module.exports = router;
