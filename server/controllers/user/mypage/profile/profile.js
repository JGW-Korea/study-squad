// 모듈 import
const express = require("express");
const router = express.Router();
const multer = require("multer");

const db = require("../../../../models/index.js");
const { Op } = require("sequelize");
const User = db.User;

const fs = require("fs");

try {
  fs.readdirSync("uploads/profile");
} catch (error) {
  console.log("uploads/profile 폴더가 없습니다. 폴더를 생성합니다.");
  fs.mkdirSync("uploads/profile");
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/profile");
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
    await User.update(
      {
        profileImage: req.file.path,
      },
      { where: { id: req.session.userId.id, email: req.session.userId.email } }
    );

    req.session.userId.profileImage = req.file.path;

    return res.json({
      imageUpdateSuccess: true,
      url: req.file.path,
    });
  } catch (error) {
    return res.json({
      imageUpdateSuccess: false,
    });
  }
});

module.exports = router;
