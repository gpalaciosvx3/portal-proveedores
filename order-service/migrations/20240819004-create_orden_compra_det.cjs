'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('orden_compra_det', {
      id_orden_compra_det: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      // Referencia a id_orden_compra_cab
      id_orden_compra_cab: {
        type: Sequelize.INTEGER,
        references: {
          model: 'orden_compra_cab',
          key: 'id_orden_compra_cab'
        },
        allowNull: false
      },
      // Referencia al maestro de Provisión utilizado en la OC(mate,serv,etc..)
      id_maestro_provision: {
        type: Sequelize.INTEGER,
        references: {
          model: 'maestro_provision',
          key: 'id_maestro_provision'
        },
        allowNull: false
      },
      posicion: {
        type: Sequelize.INTEGER,
        allowNull: false  
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
    await queryInterface.dropTable('orden_compra_det');
  }
};
