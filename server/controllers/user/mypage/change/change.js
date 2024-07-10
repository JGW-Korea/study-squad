// 모듈 import
const express = require("express");
const router = express.Router();

const { Op } = require("sequelize");

const db = require("../../../../models/index.js");
const User = db.User;

const bcrypt = require("bcrypt");
const saltRounds = 10;

router.post("/name", async (req, res) => {
  try {
    const { name } = req.body;

    // User Table에 새로운 값들을 각각의 attribute에 넣어준다.
    await User.update(
      {
        name: name,
      },
      { where: { id: req.session.userId.id, email: req.session.userId.email } }
    );

    req.session.userId.name = name;

    return res.json({
      nameChangeSucess: true,
      name: name,
    });
  } catch (error) {
    return res.json({
      nameChangeSucess: false,
    });
  }
});

router.post("/birth", async (req, res) => {
  try {
    const { birth } = req.body;

    // User Table에 새로운 값들을 각각의 attribute에 넣어준다.
    await User.update(
      {
        birth: birth,
      },
      { where: { id: req.session.userId.id, email: req.session.userId.email } }
    );

    // req.session.userId.birth = birth;

    return res.json({
      birthChangeSucess: true,
      birth: birth,
    });
  } catch (error) {
    return res.json({
      birthChangeSucess: false,
    });
  }
});

router.post("/email", async (req, res) => {
  try {
    const { email } = req.body;

    // User Table에 새로운 값들을 각각의 attribute에 넣어준다.
    await User.update(
      {
        email: email,
      },
      { where: { id: req.session.userId.id, email: req.session.userId.email } }
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

router.post("/password", async (req, res) => {
  try {
    const { userUsePassword, userNewPassword } = req.body;

    const userInfo = await User.findOne({
      where: {
        email: { [Op.eq]: req.session.userId.email },
      },
    });

    const isMatch = await bcrypt.compare(userUsePassword, userInfo.password);

    if (!isMatch) {
      return res.json({
        userChangePasswordSuccess: false,
        type: "PASSWORD_MIS_MATCH",
        message: "현재 사용하시는 비밀번호가 틀리셨습니다.",
      });
    } else {
      const isChangePasswordMatch = await bcrypt.compare(
        userNewPassword,
        userInfo.password
      );

      if (isChangePasswordMatch) {
        return res.json({
          userChangePasswordSuccess: false,
          type: "PRVS_USE_PASSWORD",
          message:
            "현재 사용 중이신 비밀번호 입니다. 새로운 비밀번호를 사용해 주세요.",
        });
      } else {
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(userNewPassword, salt);

        // User Table에 새로운 값들을 각각의 attribute에 넣어준다.
        await User.update(
          {
            password: hash,
          },
          {
            where: {
              email: req.session.userId.email,
              name: req.session.userId.name,
            },
          }
        );
        // 성공하면 Client에 이 정보들을 보내준다.

        return req.session.destroy(() => {
          res.status(200).json({
            userChangePasswordSuccess: true,
          });
        });
      }
    }
  } catch (error) {
    console.log(error);

    return res.json({
      userChangePasswordSuccess: false,
    });
  }
});

module.exports = router;
