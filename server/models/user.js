"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.hasMany(models.StudyGroup, {
        foreignKey: "studyAdmin",
        as: "adminGroups",
      });

      this.hasMany(models.StudyJoinStatus, {
        foreignKey: "userId",
        as: "studyJoinStatuses",
      });

      this.hasMany(models.StudyMember, {
        foreignKey: "userId",
        as: "studyMembers",
      });

      this.hasMany(models.Message, {
        foreignKey: "senderId",
        as: "sentMessages",
      });
    }
  }
  User.init(
    {
      profileImage: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      birth: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "user",
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
