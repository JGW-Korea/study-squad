// 모듈 import
const express = require("express");
const router = express.Router();

const db = require("../../../../models/index.js");
const { Op } = require("sequelize");

const User = db.User;

const bcrypt = require("bcrypt");
const saltRounds = 10;

router.post("/", async (req, res) => {
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
        message: "비밀번호를 잘못 입력하셨습니다.",
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
            "죄송합니다. 이미 사용하셨던 비밀번호입니다. 새로운 비밀번호를 사용해 주세요.",
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
    return res.json({
      userChangePasswordSuccess: false,
    });
  }
});

module.exports = router;
