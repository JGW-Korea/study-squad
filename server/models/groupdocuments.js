"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class GroupDocuments extends Model {
    static associate(models) {
      this.belongsTo(models.StudyGroup, {
        foreignKey: "studyId",
        targetKey: "studyGroupId",
        as: "studyGroup",
      });
    }
  }
  GroupDocuments.init(
    {
      studyId: {
        primaryKey: true,
        type: DataTypes.STRING,
        allowNull: false,
      },
      data: {
        type: DataTypes.JSON,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "GroupDocuments",
    }
  );
  return GroupDocuments;
};
