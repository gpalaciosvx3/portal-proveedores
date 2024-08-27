'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('orden_compra_cab', {
      id_orden_compra_cab: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      // Referencia a id_user (id del proveedor)
      id_user: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      nro_orden_compra: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      fecha_documento: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      importe_bruto: {
        type: Sequelize.DECIMAL,
        allowNull: false
      },
      importe_neto:{
        type: Sequelize.DECIMAL,
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
    await queryInterface.dropTable('orden_compra_cab');
  }
};
