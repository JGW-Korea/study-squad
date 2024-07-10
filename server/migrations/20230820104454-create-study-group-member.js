'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('StudyGroupMembers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      studyGroupMemberNum: {
        type: Sequelize.INTEGER
      },
      studyGroupName: {
        type: Sequelize.STRING
      },
      studyGroupMemberName: {
        type: Sequelize.STRING
      },
      studyGroupMemberShip: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('StudyGroupMembers');
  }
};