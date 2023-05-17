"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  users.init(
    {
      registrationNum: {
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      user_id: DataTypes.STRING,
      user_password: DataTypes.STRING,
      user_name: DataTypes.STRING,
      user_birth: DataTypes.DATE,
      user_age: DataTypes.INTEGER,
      user_gender: DataTypes.STRING,
      user_mail: DataTypes.STRING,
      user_phone: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "users",
    }
  );
  return users;
};
