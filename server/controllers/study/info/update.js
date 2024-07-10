// 모듈 import
const express = require("express");
const router = express.Router();

const db = require("../../../models/index.js");

const User = db.User;
const StudyGroup = db.StudyGroup;
const StudyMember = db.StudyMember;

const multer = require("multer");
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

// 스터디 배너 수정
router.put("/:id/banner", upload.single("image"), async (req, res) => {
  try {
    await StudyGroup.update(
      {
        studyBanner: req.file.path,
      },
      { where: { studyGroupId: req.params.id } }
    );

    return res.json({
      success: true,
    });
  } catch (error) {
    return res.json({
      success: false,
    });
  }
});

// 스터디 설명 수정
router.put("/detail", async (req, res) => {
  try {
    const { studyId, detail } = req.body;

    await StudyGroup.update(
      { studyGroupDetail: detail },
      { where: { studyGroupId: studyId } }
    );

    return res.json({
      success: true,
    });
  } catch (error) {
    return res.json({
      success: false,
    });
  }
});

// 스터디 멤버 삭제
router.delete("/member/delete", async (req, res) => {
  try {
    const { studyId, userId } = req.body;

    const studyGroup = await StudyGroup.findOne({
      where: {
        studyGroupId: studyId,
      },
    });

    if (studyGroup) {
      await studyGroup.decrement("studyGroupMember", { by: 1 });
    }

    await StudyMember.destroy({
      where: {
        study_id: studyId,
        userId: userId,
      },
    });

    return res.json({
      success: true,
    });
  } catch (error) {
    console.log(error);

    return res.json({
      success: false,
    });
  }
});

// 스터디 그룹 운영자 변경
router.put("/admin", async (req, res) => {
  try {
    const { studyId, userId } = req.body;

    await StudyGroup.update(
      { studyAdmin: userId },
      { where: { studyGroupId: studyId } }
    );

    return res.json({
      success: true,
    });
  } catch (error) {
    return res.json({
      success: false,
    });
  }
});

module.exports = router;
