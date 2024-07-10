"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class StudyMember extends Model {
    static associate(models) {
      this.belongsTo(models.StudyGroup, {
        foreignKey: "study_id",
        targetKey: "studyGroupId",
        as: "studyGroup",
      });

      this.belongsTo(models.User, {
        foreignKey: "userId",
        targetKey: "id",
        as: "user",
      });
    }
  }
  StudyMember.init(
    {
      studyName: DataTypes.STRING,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "StudyMember",
    }
  );
  return StudyMember;
};
