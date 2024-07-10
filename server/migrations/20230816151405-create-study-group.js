'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('StudyGroups', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      studyGroupNum: {
        type: Sequelize.INTEGER
      },
      studyGroupName: {
        type: Sequelize.STRING
      },
      studyGroupDetail: {
        type: Sequelize.STRING
      },
      studyGroupManager: {
        type: Sequelize.STRING
      },
      studyGroupCategory: {
        type: Sequelize.STRING
      },
      studyGroupSubCategory: {
        type: Sequelize.STRING
      },
      studyGroupMemberNum: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('StudyGroups');
  }
};