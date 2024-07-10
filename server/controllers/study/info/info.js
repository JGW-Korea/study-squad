// 모듈 import
const express = require("express");
const router = express.Router();

const db = require("../../../models/index.js");
const { Op } = require("sequelize");

const User = db.User;
const StudyGroup = db.StudyGroup;
const StudyMember = db.StudyMember;

// 사용자가 가입 한 스터디
// 멤버로 구분 가능
router.get("/user/joined", async (req, res) => {
  try {
    const myStudyInfo = await StudyMember.findAll({
      where: {
        userId: req.session.userId.id,
      },
      include: [
        {
          model: db.StudyGroup,
          as: "studyGroup",
        },
      ],
    });

    return res.json({
      study: myStudyInfo,
      success: true,
    });
  } catch (error) {
    return res.json({
      success: false,
    });
  }
});

// 가입 안 한 모든 스터디
router.get("/user/not-joined", async (req, res) => {
  try {
    const allGroups = await StudyGroup.findAll({
      include: [
        {
          model: StudyMember,
          as: "studyMembers",
        },
        {
          model: db.User,
          as: "studyAdminUser",
          attributes: { exclude: ["password"] }, // password 속성을 제외합니다.
        },
      ],
    });

    const unMatchedGroup = allGroups.filter(
      (group) =>
        !group.studyMembers.some(
          (member) => member.userId === req.session.userId.id
        )
    );

    return res.json({ study: unMatchedGroup, success: true });
  } catch (error) {
    console.log(error);

    return res.json({ success: false });
  }
});

// 해당 페이지 스터디 정보 가져오기
router.get("/study/:id", async (req, res) => {
  try {
    const StudyInfo = await StudyGroup.findOne({
      where: {
        studyGroupId: req.params.id,
      },
      include: [
        {
          model: StudyMember,
          as: "studyMembers",
          include: [
            {
              model: User,
              as: "user",
            },
          ],
        },
      ],
    });

    return res.json({
      success: true,
      info: StudyInfo,
    });
  } catch (error) {
    return res.json({
      success: false,
    });
  }
});

// 스터디 정보 검색
router.get("/search", async (req, res) => {
  try {
    const page = parseInt(req.query.page) - 1 || 0;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";

    let sort = req.query.sort || "studyGroupMember,desc";
    sort = sort.split(",");

    let category = req.query.category || "All";

    const categoryOptions = [
      "경제/재테크",
      "어학/외국어",
      "취업/자격증",
      "음악",
      "스포츠",
      "IT/컴퓨터",
    ];

    category === "All"
      ? (category = [...categoryOptions])
      : (category = req.query.category.split(","));

    // req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);

    const studyGroups = await StudyGroup.findAll({
      where: {
        studyGroupCategory: { [Op.in]: category },
        studyName: { [Op.like]: "%" + search + "%" },
      },
      include: [
        {
          model: StudyMember,
          as: "studyMembers",
        },
        {
          model: db.User,
          as: "studyAdminUser",
          attributes: { exclude: ["password"] }, // password 속성을 제외합니다.
        },
      ],
      order: [[sort[0], sort[1]]],
      offset: page * limit,
      limit: limit,
    });

    const unMatchedGroup = studyGroups.filter(
      (studyGroup) =>
        !studyGroup.studyMembers.some(
          (member) => member.userId === req.session.userId.id
        )
    );

    const total = await StudyGroup.count({
      where: {
        studyGroupCategory: { [Op.in]: category },
        studyName: { [Op.like]: "%" + search + "%" },
      },
    });

    return res.json({
      success: true,
      study: unMatchedGroup,
      total: total,
      page: page + 1,
      category: categoryOptions,
      limit,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
    });
  }
});

module.exports = router;
