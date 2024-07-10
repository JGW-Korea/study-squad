const express = require("express");
const router = express.Router();

const db = require("../../../models/index.js");
const { Op } = require("sequelize");
const { sequelize } = require("../../../models");

const StudyJoinStatus = db.StudyJoinStatus;
const StudyMember = db.StudyMember;
const StudyGroup = db.StudyGroup;

// 스터디 가입 신청 현황
router.get("/other", async (req, res) => {
  try {
    const info = await StudyJoinStatus.findAll({
      where: {
        userId: { [Op.eq]: req.session.userId.id },
      },
      include: [
        {
          model: db.StudyGroup,
          as: "studyGroup",
        },
      ],
    });

    return res.json({
      StudyJoinLoad: true,
      StudyInfo: info,
    });
  } catch (error) {
    console.log(error);

    return res.json({
      StudyJoinLoad: false,
    });
  }
});

// 스터디 가입 신청 현황 신청 취소
router.delete("/cancel", async (req, res) => {
  try {
    await StudyJoinStatus.destroy({
      where: {
        userId: req.session.userId.id,
        studyId: req.body.study.studyId,
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

// 스터디 가입 신청 상태 삭제
router.delete("/delete", async (req, res) => {
  try {
    await StudyJoinStatus.destroy({
      where: {
        userId: req.session.userId.id,
        studyId: req.body.study.studyId,
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

// My 스터디 가입 신청 인원
router.get("/my-study/join", async (req, res) => {
  try {
    const info = await StudyJoinStatus.findAll({
      where: {
        state: "waite",
      },
      include: [
        {
          model: db.StudyGroup,
          as: "studyGroup",
          where: {
            studyAdmin: req.session.userId.id,
          },
          include: [
            {
              model: db.User,
              as: "studyAdminUser",
              attributes: { exclude: ["password"] }, // password 속성을 제외합니다.
            },
          ],
        },
        {
          model: db.User,
          as: "user",
          attributes: { exclude: ["password"] }, // password 속성을 제외합니다.
        },
      ],
      order: [["createdAt", "ASC"]],
    });

    return res.json({
      StudyJoinLoad: true,
      StudyInfo: info,
    });
  } catch (error) {
    console.log(error);

    return res.json({
      StudyJoinLoad: false,
    });
  }
});

// My 스터디 가입 승인
router.put("/my-study/approve", async (req, res) => {
  try {
    const { info } = req.body;

    await sequelize.transaction(async (t) => {
      // 스터디 가입 상태 '승인'으로 변경 (Update)
      await StudyJoinStatus.update(
        { state: "approve" },
        {
          where: {
            id: info.id,
            userId: info.userId,
            studyId: info.studyId,
          },
          transaction: t,
        }
      );

      // 해당 스터디 회원 추가 (Create)
      await StudyMember.create({
        studyName: info.studyGroup.studyName,
        userId: info.userId,
        study_id: info.studyId,
      });

      // 스터디 회원 수 증가를 시키고 싶은 해당 스터디 찾기
      const studyGroup = await StudyGroup.findByPk(info.studyId, {
        transaction: t,
      });

      // 스터디 회원 수 증가
      await studyGroup.increment("studyGroupMember", { by: 1, transaction: t });
    });

    return res.json({
      refuseSuccess: true,
    });
  } catch (error) {
    console.log(error);

    return res.json({
      refuseSuccess: false,
    });
  }
});

// My 스터디 가입 거절
router.put("/my-study/refuse", async (req, res) => {
  try {
    const { info } = req.body;

    await StudyJoinStatus.update(
      { state: "refuse" },
      {
        where: {
          id: info.id,
          userId: info.userId,
          studyId: info.studyId,
        },
      }
    );

    return res.json({
      refuseSuccess: true,
    });
  } catch (error) {
    console.log(error);

    return res.json({
      refuseSuccess: false,
    });
  }
});

module.exports = router;
