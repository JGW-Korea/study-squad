// 모듈 import
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  // logout을 하기위해 session 값을 삭제한다.
  req.session.destroy(() => {
    res.status(200).json({ message: "logout success" });
  });
});

module.exports = router;
