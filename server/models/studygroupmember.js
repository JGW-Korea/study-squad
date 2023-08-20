"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class StudyGroupMember extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  StudyGroupMember.init(
    {
      studyGroupMemberNum: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
      },
      studyGroupName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      studyGroupMemberName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      studyGroupMemberShip: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "student",
      },
    },
    {
      sequelize,
      modelName: "StudyGroupMember",
    }
  );
  return StudyGroupMember;
};
