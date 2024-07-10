// 모듈 import
const express = require("express");
const router = express.Router();

const db = require("../../../models/index.js");
const { Op } = require("sequelize");
const User = db.User;

const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  // 요청된 이메일을 DB에서 찾는다.
  try {
    const user = await User.findOne({
      where: {
        email: { [Op.eq]: email },
      },
    });

    // DB에 값이 없을 경우
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "해당 이메일은 존재하지 않습니다.",
      });
    } else {
      // 요청된 이메일이 DB에 있다면 비밀번호가 맞는 비밀번호인지 확인한다.
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.json({
          loginSuccess: false,
          message: "비밀번호가 틀렸습니다.",
        });
      } else {
        // 이메일에 맞는 비밀번호라면 세션을 생성한다.
        req.session.save(() => {
          req.session.userId = {
            id: user.id,
            isAdmin: user.role === "user" ? false : true,
            isLoggingIn: true,
            email: user.email,
            name: user.name,
            role: user.role,
            profileImage: user.profileImage,
            birth: user.birth,
          };

          const data = req.session;

          res.json({
            loginSuccess: true,
            data: data,
          });
        });
      }
    }
  } catch (error) {
    console.log("err");
  }
});

router.get("/success", async (req, res) => {
  if (await req.session.userId) {
    res.json({
      isLogged: true,
      data: req.session.userId,
    });
  } else {
    res.json({
      isLogged: false,
    });
  }
});

module.exports = router;
