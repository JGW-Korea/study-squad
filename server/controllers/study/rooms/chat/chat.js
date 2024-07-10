const express = require("express");
const router = express.Router();

const db = require("../../../../models/index");
const { Op, fn, literal, Sequelize, where } = require("sequelize");

const User = db.User;
const StudyGroup = db.StudyGroup;
const StudyMember = db.StudyMember;
const Message = db.Message;

// 채팅에 액세스하거나 채팅을 생성하기 위한 경로 (1 : 1 채팅을 생성하거나 가져오는 역할)
// router.post("/", async (req, res) => {
//   res.send("Hello");
// });

// 특정 사용자가 수행한 모든 채팅을 반환한다.
router.get("/", async (req, res) => {
  try {
    const userId = req.session.userId.id;

    const studyGroups = await StudyGroup.findAll({
      order: [["updatedAt", "DESC"]],
    });

    let result = [];

    for (let group of studyGroups) {
      const memberMatch = group.dataValues.studyGroupMember.find(
        (member) => member.id === userId
      );
      if (memberMatch) {
        result.push(group);
      }
    }

    res.status(200).send(result);
  } catch (error) {
    console.log(error);
  }
});

/* 

    그룹 채팅 생성
        -> 현재 프로젝트에서는 따로 그룹 인원들을 초대해서 채팅방을 만드는 것이 아닌
           스터디를 생성하면 거기에 채팅방이 있기 때문에 강의에서 나오는 그룹 채팅방을 만드는 것은
           현재 프로젝트에서는 스터디를 생성하는 것과 같다.

        -> 강의에서의 그룹 API
            1. 클라이언트에서 채팅방에 초대하는 인원들과, 새로 만들 채팅 방 이름을 가져온다.
                - 조건 1. 3명 이상의 인원이 있어야 한다.
                - 조건 2. 채팅방에 초대한 사람(사용자)도 포함시킨다.
            
            2. 채팅방을 형성할 사람이 정해지면, 채팅방 DB에 새로운 채팅방을 생성한다.
            3. 방금 DB에 생성된 채팅 방을 클라이언트에 다시 보내주어 사용자에게 보여준다.

    router.post("/group", async (req, res) => {

      // users의 정보와 chatName이 없으면 에러 문자 메세지를 클라이언트에 보낸다.
      if(!req.body.users || !req.body.chatName) {
        res.status(400).send({Message: "Please Fill all the feilds"});
      };

      // 채팅방에 초대 된 모든 사용자를 가져와서 JSON 형태로 변환
      var users = JSON.parse(req.body.users)

      // 그룹 채팅 방에 초대되는 인원이2명 이하이면 2명 이상의 인원이 있어야 한다.
      if(users.length < 2) {
        return res.status(400).send({Message: "More than 2 users are required to form a group chat"});
      };

      // 채팅방에 초대한 사람도 포함시킨다.
      users.push(req.session.userId);

      try{
        
        // 채팅방을 형성할 사람이 구성되면, 채팅방 db에 새로운 채팅방을 생성한다.
        const groupChat = awiat Chat.create({
          chatName: req.body.name,
          users: users,
          isGroupChat: true,
          groupAdmin: req.session.userId,
        });

        // 채팅방을 생성 후 클라이언트에 그룹 채팅방을 보여주어야 하기 때문에, DB에서 생성된 그룹 채팅을 가져와,
        // 사용자에게 다시 보내주는 작업을 해준다.
        const fullGrouptChat = await Chat.findOne({_id : groupChat._id})
          .populate("users", "-password")
          .populate("groupAdmin", "-password");

        res.status(200).json(fullGroupChat);

      } catch (error) {
        res.status(400);
        throw new Error(error.message);
      }

    });

*/

/*

    그룹 채팅 명 변경
      1. 클라이언트에서 채팅 방 이름을 변경할 Chat Id와 Chat Name을 가져온다.
      2. DB에 Chat ID와 일치한 채팅방 이름을 수정한다.
      3. 클라이언트에 수정된 채팅 방을 보내준다.
          - Chat ID를 DB에서 찾지 못할 경우 에러 메세지를 보낸다.
      
      -> 차이점 : 없음

    router.put("/rename", async (req, res) => {
      const { chatId, chatName } = req.body;

      const updatedChat = await Chat.findByIdAndUpdate(
        chatId, 
        {
          chatName: chatName
        },
        {
          new: true,
        }
      )
        .populate("users", "-password")
        .populate("groupAdmin", "-password");
      
      if(!updatedChat) {
        res.status(404);
        throw new Error("Chat Not Found");
      } else {
        res.json(updatedChat);
      }

    });

*/

/*

    채팅 방에 인원 추가하기
      1. 클라이언트에서 채팅방 Chat Id와 채팅방에 추가할 User Id를 가져온다.
      2. DB에 Chat ID와 일치한 채팅방에 인원을 추가해준다.
      3. 클라이언트에 수정된 채팅 방을 보내준다.
          - Chat ID를 DB에서 찾지 못할 경우 에러 메세지를 보낸다.

      -> 차이점
          - 강의 : 채팅방을 개설 후 인원을 직접 추가한다.
          - 프로젝트 : 스터디를 개설 후 관리자가 직접 추가하는 것이 아닌, 신청을 받고 승인을 받아야 인원이 추가된다.

    router.put("/groupadd", async (req, res) => {
      const { chatId, userId } = req.body;

      const added = await Chat.findByIdAndUpdate( chatId, 
        {
          $push: { users : userId },
        }, 
        {
          new: true
        })
        .populate("users", "-password")
        .populate("groupAdmin", "-password");
        
        if(!added) {
          res.status(404);
          throw new Error("Chat Not Found");
        } else {
          res.json(added);
        }

    });

*/

async function updateStudyMemberInfo(studyId, member) {
  await StudyMember.update(
    {
      studyMemberInfo: member,
    },
    {
      where: {
        study_id: { [Op.eq]: studyId },
      },
    }
  );
}

router.put("/join", async (req, res) => {
  const { studyId, user } = req.body;

  const studyGroup = await StudyGroup.findOne({
    where: {
      studyGroupId: { [Op.eq]: studyId },
    },
  });

  if (!studyGroup) throw new Error("존재하지 않는 스터디 입니다.");

  const member = studyGroup.dataValues.studyGroupMember || [];
  member.push(user);

  await StudyGroup.update(
    { studyGroupMember: member },
    {
      where: {
        studyGroupId: { [Op.eq]: studyId },
      },
    }
  );

  await updateStudyMemberInfo(studyGroup.dataValues.studyGroupId, member);
});

/*

    채팅 방에 인원 제거하기
      1. 클라이언트에서 채팅방 Chat Id와 채팅방에 제거하는 User Id를 가져온다.
      2. DB에 Chat ID와 일치한 채팅방에 인원을 제거해준다..
      3. 클라이언트에 수정된 채팅 방을 보내준다.
          - Chat ID를 DB에서 찾지 못할 경우 에러 메세지를 보낸다.

      -> 차이점 : 없음

    router.put("/groupadd", async (req, res) => {
      const { chatId, userId } = req.body;

      const removed = await Chat.findByIdAndUpdate( chatId, 
        {
          $pull: { users : userId },
        }, 
        {
          new: true
        })
        .populate("users", "-password")
        .populate("groupAdmin", "-password");
        
        if(!removed) {
          res.status(404);
          throw new Error("Chat Not Found");
        } else {
          res.json(removed);
        }

    });

*/

module.exports = router;
