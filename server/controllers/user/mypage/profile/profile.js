// 모듈 import
const express = require("express");
const router = express.Router();
const multer = require("multer");

const db = require("../../../../models/index.js");
const { Op } = require("sequelize");
const User = db.User;

const fs = require("fs");

try {
  fs.readdirSync("uploads");
} catch (error) {
  console.log("uploads 폴더가 없습니다. 폴더를 생성합니다.");
  fs.mkdirSync("uploads");
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    return res.json({
      imageUpdateSuccess: true,
      url: req.file.path,
      fileName: req.file.filename,
    });
  } catch (error) {
    return res.json({
      imageUpdateSuccess: false,
    });
  }
});

router.post("/update", async (req, res) => {
  try {
    const { email, name, path } = req.body;

    console.log(req.body);

    // User Table에 새로운 값들을 각각의 attribute에 넣어준다.
    await User.update(
      {
        profileImage: path,
      },
      { where: { email: email, name: name } }
    );

    req.session.userId.profileImage = path;

    // 성공하면 Client에 이 정보들을 보내준다.
    res.status(200).json({
      userProfileImgUpdateSuccess: true,
      userInfo: req.session.userId,
    });
  } catch (error) {
    console.log(error);
    res.json({
      userProfileImgUpdateSuccess: false,
    });
  }
});

module.exports = router;
