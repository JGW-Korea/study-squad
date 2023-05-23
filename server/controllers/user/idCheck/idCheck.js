// 모듈 import
const express = require("express");
const router = express.Router();

const db = require("../../../models/index.js");
const { Op } = require("sequelize");
const User = db.User;

router.post("/", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({
      attributes: ["name"],
      where: {
        email: { [Op.eq]: email },
      },
    });

    if (user !== null) {
      res.json({
        duplicate: true,
      });
    } else {
      res.json({
        duplicate: false,
      });
    }
  } catch (error) {
    console.log("에러");
    next(error);
  }
});

module.exports = router;
