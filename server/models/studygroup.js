"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class StudyGroup extends Model {
    static associate(models) {
      this.hasMany(models.StudyMember, {
        foreignKey: "study_id",
        sourceKey: "studyGroupId",
        as: "studyMembers",
      });
      this.hasMany(models.StudyJoinStatus, {
        foreignKey: "studyId",
        as: "joinStatuses",
      });

      this.belongsTo(models.User, {
        foreignKey: "studyAdmin",
        as: "studyAdminUser",
      });

      this.hasOne(models.GroupDocuments, {
        foreignKey: "studyId",
        as: "groupDocument",
      });

      this.hasMany(models.Message, {
        foreignKey: "studyId",
        as: "studyMessage",
      });
    }
  }
  StudyGroup.init(
    {
      studyGroupId: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      studyBanner: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      studyName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      studyGroupDetail: {
        type: DataTypes.TEXT,
      },
      studyAdmin: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      studyGroupCategory: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      studyGroupMember: {
        type: DataTypes.INTEGER,
      },
      studyGroupLimitedMember: {
        type: DataTypes.INTEGER,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "StudyGroup",
    }
  );
  return StudyGroup;
};
