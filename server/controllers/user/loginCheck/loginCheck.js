// 모듈 import
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const data = req.session;
    res.status(200).json({
      data: data,
    });
  } catch (error) {
    console.log("에러");
    next(error);
  }
});

module.exports = router;
