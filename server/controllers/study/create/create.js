// 모듈 import
const express = require("express");
const router = express.Router();

const multer = require("multer");
const uuid = require("uuid");

const studyGroupId = uuid.v4();

const db = require("../../../models/index.js");
const { Op } = require("sequelize");

const { sequelize } = require("../../../models");

const StudyGroup = db.StudyGroup;
const StudyMember = db.StudyMember;

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

const joinStudy = async (newStudyGroup, adminMember) => {
  return sequelize.transaction(async (t) => {
    const studyGroup = await StudyGroup.findByPk(newStudyGroup.studyGroupId, {
      transaction: t,
    });

    if (!studyGroup) throw new Error("Study Group not found");

    await StudyMember.create(
      {
        studyName: studyGroup.studyName,
        userId: adminMember.id,
        study_id: studyGroup.studyGroupId,
      },
      { transaction: t }
    );

    const studyMembersCount = await StudyMember.count({
      where: { study_id: studyGroupId },
      transaction: t,
    });

    await studyGroup.update(
      { studyGroupMember: studyMembersCount },
      { transaction: t }
    );
  });
};

router.post("/", async (req, res) => {
  try {
    const { bannerPath, category, limitedMember, title, detail } = req.body;

    const studyNameCheck = await StudyGroup.findAll({
      where: { studyName: { [Op.eq]: title } },
    });

    if (studyNameCheck.length) {
      res.json({
        studyGroupCreate: false,
        message: "동일한 스터디명을 가진 스터디가 존재합니다.",
      });
    } else {
      const newStudyGroup = await StudyGroup.create({
        studyGroupId: studyGroupId,
        studyBanner: bannerPath,
        studyName: title,
        studyGroupDetail: detail,
        studyAdmin: req.session.userId.id,
        studyGroupCategory: category,
        studyGroupLimitedMember: limitedMember,
      });

      await joinStudy(newStudyGroup, req.session.userId);

      res.json({
        studyGroupCreate: true,
      });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
