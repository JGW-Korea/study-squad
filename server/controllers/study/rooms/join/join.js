const express = require("express");
const router = express.Router();

const db = require("../../../../models/index");
const { Op } = require("sequelize");

const StudyJoinStatus = db.StudyJoinStatus;

// 스터디 가입 신청
router.post("/", async (req, res) => {
  try {
    const { study, message } = req.body;

    // 가입 신청 순서
    // 1. 동일한 스터디에 두번 가입 신청을 보낼 경우 현재 승인 대기 중입니다. 메세지 보내기
    const waiting = await StudyJoinStatus.findAll({
      where: {
        studyId: { [Op.eq]: study.studyGroupId },
        userId: {
          [Op.eq]: req.session.userId.id,
        },
      },
    });

    if (waiting.length > 0) {
      return res.json({
        success: false,
        message: `${req.session.userId.name} 사용자 님은 현재 ${study.studyName} 스터디 가입 대기 중입니다.`,
      });
    }

    // 2. 두번 가입 신청을 보낼 경우가 아닌 경우 승인 대기 목록
    await StudyJoinStatus.create({
      userId: req.session.userId.id,
      studyId: study.studyGroupId,
      message: message,
    });

    res.json({
      success: true,
      message: `가입 신청이 되었습니다. 리더가 승인하실 때까지 기다려 주세요!`,
    });
  } catch (error) {
    console.log(error);

    // 3. 폼에 값이 없을 경우 가입 실패 메세지 처리
    res.json({
      success: false,
      message: `새로고침 후 다시 시도해 주세요`,
    });
  }
});

module.exports = router;
