// 모듈 import
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  // 로그인이 되어있지 않을경우에 로그아웃에 접근할 경우
  if (!req.session.userId) {
    res.status(400).json({
      logoutSuccess: false,
      message: "logout faild",
    });
  } else {
    // logout을 하기위해 session 값을 삭제한다.
    req.session.destroy(() => {
      res.status(200).json({ message: "logout success" });
    });
  }
});

module.exports = router;
