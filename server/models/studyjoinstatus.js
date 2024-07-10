"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class StudyJoinStatus extends Model {
    static associate(models) {
      this.belongsTo(models.StudyGroup, {
        foreignKey: "studyId",
        as: "studyGroup",
      });

      this.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
      });
    }
  }
  StudyJoinStatus.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      studyId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      message: DataTypes.TEXT,
      state: { type: DataTypes.STRING, defaultValue: "waite" },
    },
    {
      sequelize,
      modelName: "StudyJoinStatus",
    }
  );
  return StudyJoinStatus;
};
