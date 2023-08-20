"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class StudyGroup extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  StudyGroup.init(
    {
      studyGroupNum: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
      },
      studyGroupBannerImage: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      studyGroupName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      studyGroupDetail: {
        type: DataTypes.STRING,
      },
      studyGroupManager: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      studyGroupCategory: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      studyGroupMemberNum: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      studyGroupDisclosure: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "StudyGroup",
    }
  );
  return StudyGroup;
};
