'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('maestro_proveedor', {
      id_proveedor: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      // Referencia al País
      id_pais: {
        type: Sequelize.INTEGER,
        references: {
          model: 'maestro_pais',
          key: 'id_pais'
        },
        allowNull: false
      },
      ruc_proveedor: {
        type:Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      razon_social_proveedor: {
        type:Sequelize.STRING,
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
    await queryInterface.dropTable('maestro_proveedor');
  }
};
