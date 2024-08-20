'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('maestro_provision', {
      id_maestro_provision: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      // Referencia al Tipo de Provisión
      id_tipo_provision: {
        type: Sequelize.INTEGER,
        references: {
          model: 'tipo_provision',
          key: 'id_tipo_provision'
        },
        allowNull: false
      },
      codigo_provision: {
        type:Sequelize.STRING,
        allowNull: false
      },
      descripcion_provision: {
        type:Sequelize.STRING,
        allowNull: false
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
    await queryInterface.dropTable('maestro_provision');
  }
};
