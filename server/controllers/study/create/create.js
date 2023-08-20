// 모듈 import
const express = require("express");
const router = express.Router();

const multer = require("multer");

const db = require("../../../models/index.js");
const { Op } = require("sequelize");

const StudyGroup = db.StudyGroup;
const StudyGroupMember = db.StudyGroupMember;

const fs = require("fs");

try {
  fs.readdirSync("uploads/StdutBanner");
} catch (error) {
  console.log("uploads/StdutBanner 폴더가 없습니다. 폴더를 생성합니다.");
  fs.mkdirSync("uploads/StdutBanner");
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/StdutBanner");
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

router.post("/banner-upload", upload.single("banner"), async (req, res) => {
  try {
    return res.json({
      BannerUpdateSuccess: true,
      url: req.file.path,
      fileName: req.file.filename,
    });
  } catch (error) {
    return res.json({
      BannerUpdateSuccess: false,
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const { bannerPath, category, disclosure, title } = req.body;

    const studyNameCheck = await StudyGroup.findAll({
      where: { studyGroupName: { [Op.eq]: title } },
    });

    console.log(studyNameCheck.length);

    if (studyNameCheck.length) {
      res.json({
        studyGroupCreate: false,
        message: "동일한 스터디명을 가진 스터디가 존재합니다.",
      });
    } else {
      await StudyGroupMember.create({
        studyGroupName: title,
        studyGroupMemberName: req.session.userId.name,
        studyGroupMemberShip: "admin",
      });

      const studyMembers = await StudyGroupMember.findAndCountAll({
        where: { studyGroupName: { [Op.eq]: title } },
      }).then((result) => result.count);

      await StudyGroup.create({
        studyGroupBannerImage: bannerPath,
        studyGroupName: title,
        studyGroupManager: "admin",
        studyGroupCategory: category,
        studyGroupMemberNum: studyMembers,
        studyGroupDisclosure: disclosure,
      });

      res.json({
        studyGroupCreate: true,
      });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
