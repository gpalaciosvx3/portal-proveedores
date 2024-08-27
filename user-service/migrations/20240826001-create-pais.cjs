'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('maestro_pais', {
      id_pais: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      codigo_pais: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      desc_pais: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
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

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('maestro_pais');
  }
};
