// 모듈 import
const express = require("express");
const router = express.Router();

const db = require("../../../models/index.js");
const User = db.User;

const StudyGroup = db.StudyGroup;
const StudyMember = db.StudyMember;
const StudyJoinStatus = db.StudyJoinStatus;

const { sequelize } = require("../../../models");

router.delete("/", async (req, res) => {
  const { id, email, name } = req.body;

  const transaction = await sequelize.transaction();

  try {
    await StudyGroup.update(
      { studyAdmin: 2 },
      {
        where: {
          studyAdmin: id,
        },
      },
      { transaction }
    );

    await db.Message.update(
      { senderId: 2 },
      {
        where: {
          senderId: id,
        },
      },
      { transaction }
    );

    // 해당 사용자가 가입한 모든 정보가 담긴 StudyMember에서 값을 삭제합니다.
    const userStudyMembers = await StudyMember.findAll({
      where: {
        userId: id,
      },
    });

    for (const userStudyMember of userStudyMembers) {
      const studyGroup = await StudyGroup.findOne({
        where: {
          studyGroupId: userStudyMember.study_id,
        },
      });

      if (studyGroup) {
        // StudyGroup의 StudyGroupMember 속성의 값이 1 감소합니다.
        await studyGroup.decrement("StudyGroupMember", { by: 1 });
      }
    }

    await StudyMember.destroy(
      {
        where: {
          userId: id,
        },
      },
      { transaction }
    );

    await StudyJoinStatus.destroy(
      {
        where: {
          userId: id,
        },
      },
      { transaction }
    );

    await User.destroy(
      {
        where: {
          id: id,
          email: email,
          name: name,
        },
      },
      { transaction }
    );

    req.session.destroy(() => {
      res.status(200).json({
        deleteSuccess: true,
        message: "delete success",
      });
    });

    await transaction.commit();
  } catch (error) {
    console.log(error);

    await transaction.rollback();

    res.json({
      deleteSuccess: false,
      message: "delete false",
    });
  }
});

module.exports = router;
