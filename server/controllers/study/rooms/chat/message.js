const express = require("express");
const router = express.Router();

const db = require("../../../../models/index");
const { Op } = require("sequelize");

const Message = db.Message;

// 메세지 send 보내기
router.post("/sendMessage", async (req, res) => {
  // 채팅 내용과 스터디 id 가져온다.
  const { content, studyId } = req.body;

  // 만약 채팅 내용 또는 스터디 ID를 가져오지 못하면 에러 처리
  if (!content || !studyId) {
    console.log("Invalid data passed into request");
    res.status(400);
  }

  try {
    const newMessage = await Message.create({
      senderId: req.session.userId.id,
      content: content,
      studyId: studyId,
    });

    res.json(newMessage);
  } catch (error) {
    res.status(400);
    console.log(error);
  }
});

/* 모든 메세지 가져오기 */
router.get("/allMessage/:id", async (req, res) => {
  try {
    const messages = await Message.findAll({
      where: {
        studyId: {
          [Op.eq]: req.params.id,
        },
      },
      include: [
        {
          model: db.User,
          as: "sender",
          attributes: { exclude: ["password"] }, // password 속성을 제외합니다.
        },
      ],
    });

    let result = [];

    for (let msg of messages) {
      result.push(msg.dataValues);
    }

    res.json({ result });
  } catch (error) {
    res.status(400);
    console.log(error);
  }
});

module.exports = router;
