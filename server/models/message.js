"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    static associate(models) {
      this.belongsTo(models.StudyGroup, {
        foreignKey: "studyId",
        targetKey: "studyGroupId",
        as: "studyMessage",
      });

      this.belongsTo(models.User, {
        foreignKey: "senderId",
        targetKey: "id",
        as: "sender",
      });
    }
  }
  Message.init(
    {
      senderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      }, // 보낸 사람 User Info
      content: DataTypes.JSON, // 채팅 내용
      studyId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Message",
    }
  );
  return Message;
};
