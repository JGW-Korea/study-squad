// 모듈 import
const express = require("express");
const router = express.Router();

const db = require("../../../models/index.js");
const User = db.User;

router.delete("/", async (req, res) => {
  const { id, email, name } = req.body;

  try {
    await User.destroy({
      where: {
        id: id,
        email: email,
        name: name,
      },
    });

    req.session.destroy(() => {
      res.status(200).json({
        deleteSuccess: true,
        message: "delete success",
      });
    });
  } catch (error) {
    console.log("에러");
    res.json({
      deleteSuccess: false,
      message: "delete false",
    });
  }
});

module.exports = router;
