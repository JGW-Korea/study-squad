// 모듈 import
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    res.status(200).json({
      data: req.session,
    });
  } catch (error) {
    res.status(403).json("User Not Found");
  }
});

module.exports = router;
